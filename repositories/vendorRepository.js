const { getPool, sql } = require("../config/db");

const createVendor = async (
    companyId,
    name,
    email,
    country,
    industryType,
    address
) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("companyId", sql.Int, companyId)
        .input("name", sql.NVarChar(150), name)
        .input("email", sql.NVarChar(150), email)
        .input("country", sql.NVarChar(100), country)
        .input("industryType", sql.NVarChar(100), industryType || null)
        .input("address", sql.NVarChar(250), address || null)
        .query(`
            INSERT INTO Vendor
            (
                CompanyID,
                Name,
                Email,
                Country,
                IndustryType,
                Address,
                Status
            )
            OUTPUT
                INSERTED.VendorID,
                INSERTED.CompanyID,
                INSERTED.Name,
                INSERTED.Email,
                INSERTED.Country,
                INSERTED.IndustryType,
                INSERTED.Address,
                INSERTED.Status
            VALUES
            (
                @companyId,
                @name,
                @email,
                @country,
                @industryType,
                @address,
                'Pending'
            )
        `);

    return result.recordset[0];
};

const getVendorsByCompany = async (companyId) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("companyId", sql.Int, companyId)
        .query(`
            SELECT
                VendorID,
                CompanyID,
                Name,
                Email,
                Country,
                IndustryType,
                Address,
                Status
            FROM Vendor
            WHERE CompanyID = @companyId
            ORDER BY VendorID DESC
        `);

    return result.recordset;
};

const getVendorById = async (vendorId) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .query(`
            SELECT
                VendorID,
                CompanyID,
                Name,
                Email,
                Country,
                IndustryType,
                Address,
                Status
            FROM Vendor
            WHERE VendorID = @vendorId
        `);

    return result.recordset[0];
};

const updateVendorStatus = async (vendorId, status) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("vendorId", sql.Int, vendorId)
        .input("status", sql.NVarChar(50), status)
        .query(`
            UPDATE Vendor
            SET Status = @status
            OUTPUT
                INSERTED.VendorID,
                INSERTED.CompanyID,
                INSERTED.Name,
                INSERTED.Email,
                INSERTED.Country,
                INSERTED.IndustryType,
                INSERTED.Address,
                INSERTED.Status
            WHERE VendorID = @vendorId
        `);

    return result.recordset[0];
};

module.exports = {
    createVendor,
    getVendorsByCompany,
    getVendorById,
    updateVendorStatus
};