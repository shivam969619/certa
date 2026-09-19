const { getPool, sql } = require("../config/db");

const createAuditLog = async (
    userId,
    vendorId,
    action
) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("vendorId", sql.Int, vendorId)
        .input("action", sql.NVarChar(150), action)
        .query(`
            INSERT INTO Audit_Log
            (
                UserID,
                VendorID,
                Action
            )
            OUTPUT
                INSERTED.AuditLogID,
                INSERTED.UserID,
                INSERTED.VendorID,
                INSERTED.Action,
                INSERTED.CreatedAt
            VALUES
            (
                @userId,
                @vendorId,
                @action
            )
        `);

    return result.recordset[0];
};

const getAuditLogs = async (vendorId) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .query(`
            SELECT
                A.AuditLogID,
                A.UserID,
                U.Name AS UserName,
                A.VendorID,
                A.Action,
                A.CreatedAt
            FROM Audit_Log A
            INNER JOIN AppUser U
                ON A.UserID = U.UserID
            WHERE A.VendorID = @vendorId
            ORDER BY A.CreatedAt DESC
        `);

    return result.recordset;
};

module.exports = {
    createAuditLog,
    getAuditLogs
};