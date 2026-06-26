require('dotenv').config();

const { pool, poolConnect } = require('./config/database');

async function testConnection() {
  try {
    await poolConnect;

    console.log('✅ Connected to Azure SQL Database successfully!');

    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Failed');
    console.error(err);

    process.exit(1);
  }
}

testConnection();