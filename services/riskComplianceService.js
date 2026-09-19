const vendorRepository = require("../repositories/vendorRepository")
const riskRepository = require("../repositories/riskComplianceRepository");
const complianceRepository = require("../repositories/complianceRepository");
const auditRepository = require("../repositories/AuditRepository");

const ensureVendorExists = async (vendorId) => {

    const vendor =
        await vendorRepository.getVendorById(vendorId);

    if (!vendor) {
        const error = new Error("Vendor not found");
        error.statusCode = 404;
        throw error;
    }

    return vendor;
};

const createRiskAssessment = async (
    vendorId,
    riskData,
    userId
) => {

    await ensureVendorExists(vendorId);

    const assessment =
        await riskRepository.createRiskAssessment(
            vendorId,
            riskData.financialRisk,
            riskData.securityRisk,
            riskData.operationalRisk,
            riskData.overallRisk
        );

    await auditRepository.createAuditLog(
        userId,
        vendorId,
        "Created risk assessment"
    );

    return assessment;
};

const getRiskHistory = async (vendorId) => {

    await ensureVendorExists(vendorId);

    return await riskRepository.getRiskHistory(vendorId);
};

const createComplianceCheck = async (
    vendorId,
    complianceData,
    userId
) => {

    await ensureVendorExists(vendorId);

    const check =
        await complianceRepository.createComplianceCheck(
            vendorId,
            complianceData.checkType,
            complianceData.status
        );

    await auditRepository.createAuditLog(
        userId,
        vendorId,
        `Updated compliance check: ${complianceData.checkType}`
    );

    return check;
};

const getComplianceChecks = async (vendorId) => {

    await ensureVendorExists(vendorId);

    return await complianceRepository.getComplianceChecks(vendorId);
};

const getAuditLogs = async (vendorId) => {

    await ensureVendorExists(vendorId);

    return await auditRepository.getAuditLogs(vendorId);
};

module.exports = {
    createRiskAssessment,
    getRiskHistory,
    createComplianceCheck,
    getComplianceChecks,
    getAuditLogs
};