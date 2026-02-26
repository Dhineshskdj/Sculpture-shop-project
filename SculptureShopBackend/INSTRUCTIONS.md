# Backend Development Instructions

## 🎯 Project Overview

Dhinesh Sculpture Shop - Node.js + Express.js backend with MySQL database using stored procedures.

---

## 📁 Project Structure

```
SculptureShopBackend/
├── src/
│   ├── server.js              # Main entry point
│   ├── config/
│   │   └── database.js        # MySQL connection & helper functions
│   ├── routes/
│   │   ├── sculptureRoutes.js # Sculpture endpoints
│   │   ├── categoryRoutes.js  # Category endpoints
│   │   ├── contactRoutes.js   # Contact & custom request endpoints
│   │   ├── adminRoutes.js     # Admin authentication & management
│   │   └── paymentRoutes.js   # Payment info endpoints
│   └── scripts/
│       └── setupDatabase.js   # Database initialization script
├── database/
│   ├── 01_create_database.sql       # Database creation
│   ├── 02_create_tables.sql         # Table schemas
│   ├── 03_stored_procedures.sql     # All stored procedures
│   ├── 04_views.sql                 # Database views
│   └── 05_seed_data.sql             # Initial data
├── uploads/                   # Uploaded sculpture images
├── .env                       # Environment variables (create this)
├── .env.example              # Environment template
└── package.json              # Dependencies
```

---

## 🎨 Coding Conventions

### 1. File Naming

- **Route files**: `camelCaseRoutes.js` (e.g., `sculptureRoutes.js`)
- **Config files**: `camelCase.js` (e.g., `database.js`)
- **Script files**: `camelCase.js` (e.g., `setupDatabase.js`)

### 2. Route File Structure

```javascript
// ============================================
// Feature Routes (e.g., Sculpture Routes)
// ============================================

const express = require("express");
const router = express.Router();
const { callProcedure } = require("../config/database");
const jwt = require("jsonwebtoken"); // If auth required
const multer = require("multer"); // If file upload required

// ============================================
// GET /api/method/sculpture_shop.api.endpoint_name
// Description of endpoint
// ============================================
router.get("/sculpture_shop.api.endpoint_name", async (req, res) => {
  try {
    const { param1, param2 } = req.query;

    // Validate inputs
    if (!param1) {
      return res.status(400).json({
        success: false,
        message: "Parameter required",
      });
    }

    // Call stored procedure
    const results = await callProcedure("sp_procedure_name", [param1 || null, param2 || null]);

    // Return success response
    res.json({
      success: true,
      message: "Success message",
      data: results,
    });
  } catch (error) {
    console.error("Error description:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Generic error message",
    });
  }
});

// Export router at the end
module.exports = router;
```

### 3. Consistent Response Format

All API responses must follow this structure:

```javascript
// Success response
{
  success: true,
  message: "Operation successful",
  data: {} or []
}

// Error response
{
  success: false,
  message: "Error description"
}
```

---

## 🔌 API Endpoint Pattern

### Endpoint Naming Convention

```
/api/method/sculpture_shop.api.{action}_{entity}
```

Examples:

- `/api/method/sculpture_shop.api.get_sculptures`
- `/api/method/sculpture_shop.api.create_sculpture`
- `/api/method/sculpture_shop.api.update_sculpture_status`

### GET Endpoint Pattern

```javascript
// ============================================
// GET /api/method/sculpture_shop.api.get_entities
// Get list of entities with filters
// ============================================
router.get("/sculpture_shop.api.get_entities", async (req, res) => {
  try {
    // Extract query parameters
    const { filter1, filter2, limit, offset } = req.query;

    // Call stored procedure
    const results = await callProcedure("sp_get_entities", [
      filter1 || null,
      filter2 || null,
      limit ? parseInt(limit) : 100,
      offset ? parseInt(offset) : 0,
    ]);

    // Return response
    res.json({
      success: true,
      message: "Entities retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting entities:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve entities",
    });
  }
});
```

### POST Endpoint Pattern

```javascript
// ============================================
// POST /api/method/sculpture_shop.api.create_entity
// Create a new entity
// ============================================
router.post("/sculpture_shop.api.create_entity", async (req, res) => {
  try {
    // Extract body data
    const { field1, field2, field3 } = req.body;

    // Validate required fields
    if (!field1 || !field2) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Call stored procedure
    const results = await callProcedure("sp_create_entity", [field1, field2, field3 || null]);

    // Return success with created ID
    res.status(201).json({
      success: true,
      message: "Entity created successfully",
      data: {
        id: results[0]?.id,
        ...results[0],
      },
    });
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create entity",
    });
  }
});
```

### PUT Endpoint Pattern

```javascript
// ============================================
// PUT /api/method/sculpture_shop.api.update_entity
// Update an existing entity
// ============================================
router.put("/sculpture_shop.api.update_entity", async (req, res) => {
  try {
    const { id, field1, field2 } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Entity ID required",
      });
    }

    const results = await callProcedure("sp_update_entity", [id, field1, field2]);

    res.json({
      success: true,
      message: "Entity updated successfully",
      data: { affected_rows: results.affectedRows },
    });
  } catch (error) {
    console.error("Error updating entity:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update entity",
    });
  }
});
```

### DELETE Endpoint Pattern

```javascript
// ============================================
// DELETE /api/method/sculpture_shop.api.delete_entity
// Delete an entity
// ============================================
router.delete("/sculpture_shop.api.delete_entity", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Entity ID required",
      });
    }

    const results = await callProcedure("sp_delete_entity", [id]);

    res.json({
      success: true,
      message: "Entity deleted successfully",
      data: { deleted: true },
    });
  } catch (error) {
    console.error("Error deleting entity:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete entity",
    });
  }
});
```

---

## 🔐 Authentication Middleware

### JWT Middleware Pattern

```javascript
const jwt = require("jsonwebtoken");

// ============================================
// Authentication Middleware
// ============================================
const authenticateToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required",
    });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Attach user info to request
    req.user = user;
    next();
  });
};

// Use in protected routes
router.post(
  "/sculpture_shop.api.admin_action",
  authenticateToken, // Add middleware
  async (req, res) => {
    // Access user info: req.user
    const adminId = req.user.id;
    // ... route logic
  },
);
```

### Login Endpoint Pattern

```javascript
// ============================================
// POST /api/method/sculpture_shop.api.admin_login
// Admin login
// ============================================
router.post("/sculpture_shop.api.admin_login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password required",
      });
    }

    // Get admin from database
    const results = await callProcedure("sp_admin_login", [username]);

    if (!results || results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const admin = results[0];

    // Verify password
    const bcrypt = require("bcryptjs");
    const validPassword = await bcrypt.compare(password, admin.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    // Return token and admin info (without password)
    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          full_name: admin.full_name,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});
```

---

## 📤 File Upload Pattern (Multer)

### Multer Configuration

```javascript
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ============================================
// Multer Storage Configuration
// ============================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads");

    // Create directory if doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-randomstring.ext
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `sculpture-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});
```

### Upload Endpoint Pattern

```javascript
// ============================================
// POST /api/method/sculpture_shop.api.upload_image
// Upload sculpture image
// ============================================
router.post(
  "/sculpture_shop.api.upload_image",
  authenticateToken, // Require auth
  upload.single("image"), // Single file upload
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      // File available in req.file
      const imageUrl = `/uploads/${req.file.filename}`;

      res.json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          filename: req.file.filename,
          url: imageUrl,
          size: req.file.size,
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Upload failed",
      });
    }
  },
);

// Multiple files upload
router.post(
  "/sculpture_shop.api.upload_images",
  authenticateToken,
  upload.array("images", 10), // Max 10 files
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded",
        });
      }

      const uploadedFiles = req.files.map((file) => ({
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        size: file.size,
      }));

      res.json({
        success: true,
        message: "Images uploaded successfully",
        data: uploadedFiles,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Upload failed",
      });
    }
  },
);
```

---

## 🗄️ Database Patterns

### Database Configuration (database.js)

```javascript
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

// Test connection
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

// Call stored procedure helper
const callProcedure = async (procedureName, params = []) => {
  try {
    const placeholders = params.map(() => "?").join(", ");
    const query = `CALL ${procedureName}(${placeholders})`;
    const [results] = await pool.execute(query, params);

    // Return first result set (stored procedures return array of result sets)
    return results[0] || results;
  } catch (error) {
    console.error(`Error calling procedure ${procedureName}:`, error);
    throw error;
  }
};

// Execute raw query helper
const executeQuery = async (query, params = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  }
};

testConnection();

module.exports = {
  pool,
  callProcedure,
  executeQuery,
  testConnection,
};
```

### Using Stored Procedures

```javascript
const { callProcedure } = require("../config/database");

// Call with parameters
const results = await callProcedure("sp_get_sculptures", [
  categoryId || null,
  materialId || null,
  minPrice || null,
  maxPrice || null,
  searchTerm || null,
  isFeatured !== undefined ? parseInt(isFeatured) : null,
  limit ? parseInt(limit) : 100,
  offset ? parseInt(offset) : 0,
]);

// Stored procedure returns array
// Access results: results[0], results[1], etc.
```

### Creating New Stored Procedures

Add to `database/03_stored_procedures.sql`:

```sql
-- ============================================
-- Stored Procedure: sp_procedure_name
-- Description: What it does
-- Parameters:
--   @param1 - Description
--   @param2 - Description
-- ============================================
DELIMITER //

CREATE PROCEDURE sp_procedure_name(
    IN p_param1 INT,
    IN p_param2 VARCHAR(255),
    IN p_param3 DECIMAL(10,2)
)
BEGIN
    -- Procedure logic
    SELECT * FROM table_name
    WHERE column1 = p_param1
      AND column2 LIKE CONCAT('%', p_param2, '%')
      AND column3 >= p_param3;
END //

DELIMITER ;
```

---

## 🔒 Security Best Practices

### 1. Environment Variables

Never hardcode sensitive data. Use environment variables:

```javascript
// .env
DB_PASSWORD = your_password_here;
JWT_SECRET = your_super_secret_key;
PORT = 8000;

// In code
const password = process.env.DB_PASSWORD;
const secret = process.env.JWT_SECRET;
```

### 2. Input Validation

Always validate user inputs:

```javascript
// Check required fields
if (!username || !email) {
  return res.status(400).json({
    success: false,
    message: "Required fields missing",
  });
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({
    success: false,
    message: "Invalid email format",
  });
}

// Validate numeric values
const id = parseInt(req.query.id);
if (isNaN(id) || id <= 0) {
  return res.status(400).json({
    success: false,
    message: "Invalid ID",
  });
}
```

### 3. SQL Injection Prevention

Use parameterized queries (automatically handled by `callProcedure`):

```javascript
// ✅ SAFE - Uses parameterized query
const results = await callProcedure("sp_get_user", [userId]);

// ❌ DANGEROUS - Never do this
const results = await executeQuery(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ SAFE - Use parameterized query
const results = await executeQuery("SELECT * FROM users WHERE id = ?", [userId]);
```

### 4. Password Hashing

Always hash passwords with bcrypt:

```javascript
const bcrypt = require("bcryptjs");

// Hash password (when creating user)
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Store hashedPassword in database
await callProcedure("sp_create_admin", [username, hashedPassword]);

// Verify password (during login)
const validPassword = await bcrypt.compare(providedPassword, storedPasswordHash);
```

### 5. CORS Configuration

```javascript
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

### 6. Rate Limiting (Optional)

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use("/api/", limiter);
```

---

## 📊 Error Handling

### Standard Error Response

```javascript
try {
  // Route logic
} catch (error) {
  console.error("Error description:", error);

  res.status(500).json({
    success: false,
    message: error.message || "Generic error message",
  });
}
```

### HTTP Status Codes

```javascript
// Success
200 - OK (GET, PUT, DELETE)
201 - Created (POST)

// Client Errors
400 - Bad Request (validation errors)
401 - Unauthorized (authentication required)
403 - Forbidden (authenticated but not authorized)
404 - Not Found

// Server Errors
500 - Internal Server Error
```

### Error Response Examples

```javascript
// Validation error
res.status(400).json({
  success: false,
  message: "Email is required",
});

// Authentication error
res.status(401).json({
  success: false,
  message: "Authentication token required",
});

// Authorization error
res.status(403).json({
  success: false,
  message: "You don't have permission to perform this action",
});

// Not found error
res.status(404).json({
  success: false,
  message: "Sculpture not found",
});

// Server error
res.status(500).json({
  success: false,
  message: "An unexpected error occurred",
});
```

---

## 🧪 Testing Routes

### Manual Testing with curl

```bash
# GET request
curl http://localhost:8000/api/method/sculpture_shop.api.get_sculptures

# POST request
curl -X POST http://localhost:8000/api/method/sculpture_shop.api.create_sculpture \
  -H "Content-Type: application/json" \
  -d '{"name":"Ganesha","price":5000}'

# With authentication
curl http://localhost:8000/api/method/sculpture_shop.api.admin_dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# File upload
curl -X POST http://localhost:8000/api/method/sculpture_shop.api.upload_image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "image=@/path/to/image.jpg"
```

### Using Postman/Insomnia

1. Create a new request
2. Set method (GET, POST, PUT, DELETE)
3. Set URL: `http://localhost:8000/api/method/...`
4. Add headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer TOKEN` (for protected routes)
5. Add body (for POST/PUT):
   ```json
   {
     "field1": "value1",
     "field2": "value2"
   }
   ```

---

## 🚀 Server Setup & Configuration

### Main Server File (server.js)

```javascript
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes
const sculptureRoutes = require("./routes/sculptureRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Import database connection
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8000;

// ============================================
// Middleware
// ============================================

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Parse JSON
app.use(express.json());

// Parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ============================================
// Routes
// ============================================

app.use("/api/method", sculptureRoutes);
app.use("/api/method", categoryRoutes);
app.use("/api/method", contactRoutes);
app.use("/api/method", adminRoutes);
app.use("/api/method", paymentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 API endpoint: http://localhost:${PORT}/api/method`);
});
```

### Environment Variables (.env)

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=sculptureShop

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

---

## 📦 Package.json Scripts

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "db:setup": "node src/scripts/setupDatabase.js"
  }
}
```

### Usage

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Setup database
npm run db:setup
```

---

## 🗄️ Database Management

### Setup Database

```bash
# Option 1: Use setup script
npm run db:setup

# Option 2: Manual setup
mysql -u root -p < database/01_create_database.sql
mysql -u root -p < database/02_create_tables.sql
mysql -u root -p < database/03_stored_procedures.sql
mysql -u root -p < database/04_views.sql
mysql -u root -p < database/05_seed_data.sql
```

### Backup Database

```bash
# Full backup
mysqldump -u root -p sculptureShop > backup.sql

# Structure only
mysqldump -u root -p --no-data sculptureShop > structure.sql

# Data only
mysqldump -u root -p --no-create-info sculptureShop > data.sql
```

### Restore Database

```bash
mysql -u root -p sculptureShop < backup.sql
```

---

## 🎯 Key Principles

1. **Consistent Response Format**: All endpoints return `{ success, message, data }`
2. **Stored Procedures**: Use stored procedures for all database operations
3. **Error Handling**: Always use try-catch and proper error responses
4. **Validation**: Validate all inputs before processing
5. **Security**: Use JWT for auth, bcrypt for passwords, parameterized queries
6. **Documentation**: Add comments for each endpoint
7. **Logging**: Use `console.error()` for errors, `console.log()` for info
8. **HTTP Status Codes**: Use appropriate status codes
9. **Clean Code**: Follow established patterns consistently
10. **Environment Variables**: Never hardcode sensitive data

---

## 📚 Quick Reference

### Common Commands

```bash
npm run dev        # Start development server
npm start          # Start production server
npm run db:setup   # Setup database
```

### Common Imports

```javascript
// Express
const express = require("express");
const router = express.Router();

// Database
const { callProcedure, executeQuery } = require("../config/database");

// Authentication
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// File upload
const multer = require("multer");

// Utilities
const path = require("path");
const fs = require("fs");
```

### Testing Endpoints

```bash
# Health check
curl http://localhost:8000/api/health

# Get sculptures
curl http://localhost:8000/api/method/sculpture_shop.api.get_sculptures

# With auth
curl http://localhost:8000/api/method/sculpture_shop.api.admin_action \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔧 Troubleshooting

### Database Connection Issues

```javascript
// Check connection
const { testConnection } = require("./config/database");
await testConnection();

// Verify environment variables
console.log("DB Host:", process.env.DB_HOST);
console.log("DB Name:", process.env.DB_NAME);
```

### CORS Issues

```javascript
// Update CORS configuration
app.use(
  cors({
    origin: "*", // For development only
    credentials: true,
  }),
);
```

### JWT Issues

```javascript
// Verify token manually
const jwt = require("jsonwebtoken");
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  console.log("Error:", err);
  console.log("Decoded:", decoded);
});
```

---

**Remember**: Maintain consistency across all endpoints. Follow these patterns for all new features!
