const express = require("express");

const router = express.Router();

const controller =
    require("../controllers/RiskComplianceController");


/*
    Risk APIs
*/

// POST /api/v1/vendors/:vendorId/risk-assessments
router.post(
    "/vendors/:vendorId/risk-assessments",
    controller.createRiskAssessment
);

// GET /api/v1/vendors/:vendorId/risk
router.get(
    "/vendors/:vendorId/risk",
    controller.getRiskHistory
);


/*
    Compliance APIs
*/

// POST /api/v1/vendors/:vendorId/compliance-checks
router.post(
    "/vendors/:vendorId/compliance-checks",
    controller.createComplianceCheck
);

// GET /api/v1/vendors/:vendorId/compliance
router.get(
    "/vendors/:vendorId/compliance",
    controller.getComplianceChecks
);


/*
    Audit APIs
*/

// GET /api/v1/vendors/:vendorId/audit-logs
router.get(
    "/vendors/:vendorId/audit-logs",
    controller.getAuditLogs
);


module.exports = router;