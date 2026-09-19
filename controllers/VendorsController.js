const vendorService = require("../services/vendorService");

const {
    createCompanySchema
} = require("../models/company");

const {
    createVendorSchema,
    updateVendorStatusSchema
} = require("../models/vendor");


const createCompany = async (req, res) => {

    const validation =
        createCompanySchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues
        });
    }

    const company =
        await vendorService.createCompany(
            validation.data.name
        );

    res.status(201).json({
        message: "Company created successfully",
        data: company
    });
};


const createVendor = async (req, res) => {

    const companyId = Number(req.params.companyId);

    if (!Number.isInteger(companyId)) {
        return res.status(400).json({
            message: "Invalid companyId"
        });
    }

    const validation =
        createVendorSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues
        });
    }

    const vendor =
        await vendorService.createVendor(
            companyId,
            validation.data
        );

    res.status(201).json({
        message: "Vendor created successfully",
        data: vendor
    });
};


const getVendors = async (req, res) => {

    const companyId = Number(req.params.companyId);

    if (!Number.isInteger(companyId)) {
        return res.status(400).json({
            message: "Invalid companyId"
        });
    }

    const vendors =
        await vendorService.getVendors(companyId);

    res.status(200).json({
        data: vendors
    });
};


const getVendor = async (req, res) => {

    const vendorId = Number(req.params.vendorId);

    if (!Number.isInteger(vendorId)) {
        return res.status(400).json({
            message: "Invalid vendorId"
        });
    }

    const vendor =
        await vendorService.getVendor(vendorId);

    res.status(200).json({
        data: vendor
    });
};


const updateVendorStatus = async (req, res) => {

    const vendorId = Number(req.params.vendorId);

    const userId = Number(req.header("x-user-id"));

    if (!Number.isInteger(vendorId)) {
        return res.status(400).json({
            message: "Invalid vendorId"
        });
    }

    if (!Number.isInteger(userId)) {
        return res.status(400).json({
            message: "x-user-id header is required"
        });
    }

    const validation =
        updateVendorStatusSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues
        });
    }

    const vendor =
        await vendorService.updateVendorStatus(
            vendorId,
            validation.data.status,
            userId
        );

    res.status(200).json({
        message: "Vendor status updated successfully",
        data: vendor
    });
};


module.exports = {
    createCompany,
    createVendor,
    getVendors,
    getVendor,
    updateVendorStatus
};