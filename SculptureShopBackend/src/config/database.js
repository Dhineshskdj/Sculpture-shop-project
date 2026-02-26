// ============================================
// Database Configuration & Connection Pool
// ============================================

const mysql = require("mysql2/promise");

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sculptureShop",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

// Execute a stored procedure
const callProcedure = async (procedureName, params = []) => {
  try {
    const placeholders = params.map(() => "?").join(", ");
    const query = `CALL ${procedureName}(${placeholders})`;
    const [results] = await pool.execute(query, params);
    // Stored procedures return results in first element of array
    return results[0] || results;
  } catch (error) {
    console.error(`Error calling procedure ${procedureName}:`, error);
    throw error;
  }
};

// Execute a raw query
const executeQuery = async (query, params = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  }
};

// Test connection on module load
testConnection();

module.exports = {
  pool,
  callProcedure,
  executeQuery,
  testConnection,
};
