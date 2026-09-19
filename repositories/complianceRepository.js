const { getPool, sql } = require("../config/db");

const createComplianceCheck = async (
    vendorId,
    checkType,
    status
) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .input("checkType", sql.NVarChar(100), checkType)
        .input("status", sql.NVarChar(50), status)
        .query(`
            INSERT INTO Compliance_Check
            (
                VendorID,
                CheckType,
                Status
            )
            OUTPUT
                INSERTED.ComplianceCheckID,
                INSERTED.VendorID,
                INSERTED.CheckType,
                INSERTED.Status,
                INSERTED.CheckedAt
            VALUES
            (
                @vendorId,
                @checkType,
                @status
            )
        `);

    return result.recordset[0];
};

const getComplianceChecks = async (vendorId) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .query(`
            SELECT
                ComplianceCheckID,
                VendorID,
                CheckType,
                Status,
                CheckedAt
            FROM Compliance_Check
            WHERE VendorID = @vendorId
            ORDER BY CheckedAt DESC
        `);

    return result.recordset;
};

module.exports = {
    createComplianceCheck,
    getComplianceChecks
};