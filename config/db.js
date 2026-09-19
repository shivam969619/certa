const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),

    options: {
        encrypt: false,
        trustServerCertificate: true
    },

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool;

const getPool = async () => {
    if (pool) {
        return pool;
    }

    pool = await sql.connect(dbConfig);

    console.log("Connected to SQL Server");

    return pool;
};

module.exports = {
    sql,
    getPool
};