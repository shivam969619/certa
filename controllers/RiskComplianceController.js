const riskComplianceService =
    require("../services/riskComplianceService");

const {
    createRiskAssessmentSchema
} = require("../models/RiskAssessment");

const {
    createComplianceCheckSchema
} = require("../models/ComplianceCheck");


const createRiskAssessment = async (req, res) => {

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
        createRiskAssessmentSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues
        });
    }

    const assessment =
        await riskComplianceService.createRiskAssessment(
            vendorId,
            validation.data,
            userId
        );

    res.status(201).json({
        message: "Risk assessment created successfully",
        data: assessment
    });
};


const getRiskHistory = async (req, res) => {

    const vendorId = Number(req.params.vendorId);

    if (!Number.isInteger(vendorId)) {
        return res.status(400).json({
            message: "Invalid vendorId"
        });
    }

    const assessments =
        await riskComplianceService.getRiskHistory(
            vendorId
        );

    res.status(200).json({
        data: assessments
    });
};


const createComplianceCheck = async (req, res) => {

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
        createComplianceCheckSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues
        });
    }

    const check =
        await riskComplianceService.createComplianceCheck(
            vendorId,
            validation.data,
            userId
        );

    res.status(201).json({
        message: "Compliance check created successfully",
        data: check
    });
};


const getComplianceChecks = async (req, res) => {

    const vendorId = Number(req.params.vendorId);

    if (!Number.isInteger(vendorId)) {
        return res.status(400).json({
            message: "Invalid vendorId"
        });
    }

    const checks =
        await riskComplianceService.getComplianceChecks(
            vendorId
        );

    res.status(200).json({
        data: checks
    });
};


const getAuditLogs = async (req, res) => {

    const vendorId = Number(req.params.vendorId);

    if (!Number.isInteger(vendorId)) {
        return res.status(400).json({
            message: "Invalid vendorId"
        });
    }

    const logs =
        await riskComplianceService.getAuditLogs(
            vendorId
        );

    res.status(200).json({
        data: logs
    });
};


module.exports = {
    createRiskAssessment,
    getRiskHistory,
    createComplianceCheck,
    getComplianceChecks,
    getAuditLogs
};