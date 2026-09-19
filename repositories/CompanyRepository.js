const { sql, getPool } = require("../config/db");

const createCompany = async (name) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("name", sql.NVarChar(150), name)
        .query(`
            INSERT INTO Company (Name)
            OUTPUT INSERTED.CompanyID, INSERTED.Name
            VALUES (@name)
        `);

    return result.recordset[0];
};

const getCompanyById = async (companyId) => {
    const pool = await getPool();

    const result = await pool
        .request()
        .input("companyId", sql.Int, companyId)
        .query(`
            SELECT CompanyID, Name
            FROM Company
            WHERE CompanyID = @companyId
        `);

    return result.recordset[0];
};

module.exports = {
    createCompany,
    getCompanyById
};