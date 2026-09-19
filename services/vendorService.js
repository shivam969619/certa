const companyRepository = require("../repositories/CompanyRepository");
const vendorRepository = require("../repositories/vendorRepository");
const auditRepository = require("../repositories/AuditRepository");

const {
    redisClient
} = require("../config/redis");


const createCompany = async (name) => {

    return await companyRepository.createCompany(name);

};


const createVendor = async (
    companyId,
    vendorData
) => {

    const company =
        await companyRepository.getCompanyById(
            companyId
        );

    if (!company) {

        const error =
            new Error("Company not found");

        error.statusCode = 404;

        throw error;
    }

    return await vendorRepository.createVendor(
        companyId,
        vendorData.name,
        vendorData.email,
        vendorData.country,
        vendorData.industryType,
        vendorData.address
    );

};


const getVendors = async (companyId) => {

    const company =
        await companyRepository.getCompanyById(
            companyId
        );

    if (!company) {

        const error =
            new Error("Company not found");

        error.statusCode = 404;

        throw error;
    }

    return await vendorRepository.getVendorsByCompany(
        companyId
    );

};


const getVendor = async (vendorId) => {

    const cacheKey =
        `vendor:${vendorId}`;


    /*
        1. Check Redis
    */

    const cachedVendor =
        await redisClient.get(cacheKey);


    /*
        2. Redis HIT
    */

    if (cachedVendor) {

        console.log(
            `Redis HIT: ${cacheKey}`
        );

        return JSON.parse(cachedVendor);
    }


    /*
        3. Redis MISS
    */

    console.log(
        `Redis MISS: ${cacheKey}`
    );


    /*
        4. Get vendor from database
    */

    const vendor =
        await vendorRepository.getVendorById(
            vendorId
        );


    if (!vendor) {

        const error =
            new Error("Vendor not found");

        error.statusCode = 404;

        throw error;
    }


    /*
        5. Store vendor in Redis

        EX = expiration time
        300 seconds = 5 minutes
    */

    await redisClient.set(
        cacheKey,
        JSON.stringify(vendor),
        {
            EX: 300
        }
    );


    console.log(
        `Redis SET: ${cacheKey}`
    );


    /*
        6. Return vendor
    */

    return vendor;

};


const updateVendorStatus = async (
    vendorId,
    status,
    userId
) => {

    /*
        First get existing vendor
        so we can verify it exists
        and use the old status
        for the audit log.
    */

    const vendor =
        await vendorRepository.getVendorById(
            vendorId
        );


    if (!vendor) {

        const error =
            new Error("Vendor not found");

        error.statusCode = 404;

        throw error;
    }


    /*
        Update vendor in database
    */

    const updatedVendor =
        await vendorRepository.updateVendorStatus(
            vendorId,
            status
        );


    /*
        Invalidate Redis cache

        The cached vendor contains
        the old status.

        Therefore delete it.
    */

    const cacheKey =
        `vendor:${vendorId}`;

    await redisClient.del(cacheKey);


    console.log(
        `Redis cache invalidated: ${cacheKey}`
    );


    /*
        Create audit log
    */

    await auditRepository.createAuditLog(
        userId,
        vendorId,
        `Changed vendor status from ${vendor.Status} to ${status}`
    );


    return updatedVendor;

};


module.exports = {

    createCompany,

    createVendor,

    getVendors,

    getVendor,

    updateVendorStatus

};