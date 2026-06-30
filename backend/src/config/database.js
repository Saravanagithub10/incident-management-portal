const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 1433,

  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

let pool;

async function getPool() {
  if (pool) {
    return pool;
  }

  pool = await sql.connect(config);
  return pool;
}

module.exports = {
  sql,
  getPool
};