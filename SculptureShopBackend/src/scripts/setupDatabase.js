// ============================================
// Database Setup Script
// Run this to set up the database and create initial admin user
// Usage: npm run db:setup
// ============================================

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const setupDatabase = async () => {
  console.log("🚀 Starting database setup...\n");

  // Create connection without database first
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  try {
    // Read and execute SQL files in order
    const sqlFiles = [
      "01_create_database.sql",
      "02_create_tables.sql",
      "03_stored_procedures.sql",
      "04_views.sql",
      "05_seed_data.sql",
    ];

    const databaseDir = path.join(__dirname, "../../database");

    for (const file of sqlFiles) {
      const filePath = path.join(databaseDir, file);

      if (fs.existsSync(filePath)) {
        console.log(`📄 Executing ${file}...`);
        const sql = fs.readFileSync(filePath, "utf8");

        // Split by DELIMITER if present (for stored procedures)
        if (sql.includes("DELIMITER")) {
          // Execute stored procedure file with special handling
          const parts = sql.split("DELIMITER");
          for (const part of parts) {
            if (part.trim()) {
              // Clean up and execute
              let cleanPart = part.trim();
              if (cleanPart.startsWith("//")) {
                // Replace // with ; and execute statements
                cleanPart = cleanPart.substring(2).trim();
                const statements = cleanPart.split("//");
                for (const stmt of statements) {
                  const cleanStmt = stmt.trim().replace(/;$/, "");
                  if (cleanStmt && !cleanStmt.startsWith("DELIMITER") && cleanStmt.length > 10) {
                    try {
                      await connection.query(cleanStmt);
                    } catch (err) {
                      // Ignore some errors for procedures that may already exist
                      if (!err.message.includes("already exists")) {
                        console.warn(`  ⚠️ Warning in ${file}: ${err.message.substring(0, 100)}`);
                      }
                    }
                  }
                }
              } else if (cleanPart.startsWith(";")) {
                // Back to normal delimiter
                cleanPart = cleanPart.substring(1).trim();
                if (cleanPart) {
                  try {
                    await connection.query(cleanPart);
                  } catch (err) {
                    console.warn(`  ⚠️ Warning: ${err.message.substring(0, 100)}`);
                  }
                }
              } else {
                // Normal SQL
                try {
                  await connection.query(cleanPart);
                } catch (err) {
                  if (!err.message.includes("already exists")) {
                    console.warn(`  ⚠️ Warning: ${err.message.substring(0, 100)}`);
                  }
                }
              }
            }
          }
        } else {
          // Execute normal SQL file
          try {
            await connection.query(sql);
          } catch (err) {
            if (!err.message.includes("already exists")) {
              console.warn(`  ⚠️ Warning in ${file}: ${err.message.substring(0, 100)}`);
            }
          }
        }
        console.log(`  ✅ ${file} completed`);
      } else {
        console.log(`  ⏭️ Skipping ${file} (not found)`);
      }
    }

    // Create default admin user
    console.log("\n👤 Creating default admin user...");

    const dbName = process.env.DB_NAME || "sculptureShop";
    await connection.query(`USE ${dbName}`);

    // Check if admin exists
    const [admins] = await connection.query("SELECT id FROM admin_users WHERE username = 'admin'");

    if (admins.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      await connection.query(
        "INSERT INTO admin_users (username, password_hash, full_name, is_active) VALUES (?, ?, ?, 1)",
        ["admin", hashedPassword, "Administrator"],
      );
      console.log("  ✅ Default admin created:");
      console.log("     Username: admin");
      console.log("     Password: admin123");
      console.log("     ⚠️ Please change this password after first login!");
    } else {
      console.log("  ℹ️ Admin user already exists");
    }

    console.log("\n✨ Database setup completed successfully!\n");
    console.log("You can now start the server with: npm run dev\n");
  } catch (error) {
    console.error("\n❌ Database setup failed:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
};

// Run the setup
setupDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
