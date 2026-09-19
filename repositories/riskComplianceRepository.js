const { getPool, sql } = require("../config/db");

const createRiskAssessment = async (
    vendorId,
    financialRisk,
    securityRisk,
    operationalRisk,
    overallRisk
) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .input("financialRisk", sql.Int, financialRisk)
        .input("securityRisk", sql.Int, securityRisk)
        .input("operationalRisk", sql.Int, operationalRisk)
        .input("overallRisk", sql.Int, overallRisk)
        .query(`
            INSERT INTO Risk_Assessment
            (
                VendorID,
                FinancialRisk,
                SecurityRisk,
                OperationalRisk,
                OverallRisk
            )
            OUTPUT
                INSERTED.RiskAssessmentID,
                INSERTED.VendorID,
                INSERTED.FinancialRisk,
                INSERTED.SecurityRisk,
                INSERTED.OperationalRisk,
                INSERTED.OverallRisk,
                INSERTED.CreatedAt
            VALUES
            (
                @vendorId,
                @financialRisk,
                @securityRisk,
                @operationalRisk,
                @overallRisk
            )
        `);

    return result.recordset[0];
};

const getRiskHistory = async (vendorId) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .query(`
            SELECT
                RiskAssessmentID,
                VendorID,
                FinancialRisk,
                SecurityRisk,
                OperationalRisk,
                OverallRisk,
                CreatedAt
            FROM Risk_Assessment
            WHERE VendorID = @vendorId
            ORDER BY CreatedAt DESC
        `);

    return result.recordset;
};

module.exports = {
    createRiskAssessment,
    getRiskHistory
};