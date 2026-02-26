// ============================================
// Admin Routes (Authentication & Dashboard)
// ============================================

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { callProcedure, executeQuery } = require("../config/database");

// ============================================
// Middleware - Verify JWT Token
// ============================================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

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
        message: "Username and password are required",
      });
    }

    // Get admin user by username
    const users = await executeQuery(
      "SELECT id, username, full_name, password_hash FROM admin_users WHERE username = ? AND is_active = 1",
      [username],
    );

    if (!users || users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      // For backward compatibility, also check plain text (remove in production)
      if (password !== user.password_hash) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    }

    // Update last login
    await executeQuery("UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [user.id]);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        token,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.verify_token
// Verify admin token
// ============================================
router.get("/sculpture_shop.api.verify_token", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    data: {
      id: req.admin.id,
      username: req.admin.username,
      fullName: req.admin.fullName,
    },
  });
});

// ============================================
// GET /api/method/sculpture_shop.api.get_dashboard_stats
// Get dashboard statistics (Admin)
// ============================================
router.get("/sculpture_shop.api.get_dashboard_stats", async (req, res) => {
  try {
    const results = await callProcedure("sp_get_dashboard_stats", []);

    res.json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: results[0] || {
        total_sculptures: 0,
        featured_sculptures: 0,
        total_categories: 0,
        pending_inquiries: 0,
        pending_custom_requests: 0,
        total_views: 0,
      },
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve dashboard stats",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_site_settings
// Get site settings
// ============================================
router.get("/sculpture_shop.api.get_site_settings", async (req, res) => {
  try {
    const results = await callProcedure("sp_get_site_settings", []);

    // Convert to key-value object
    const settings = {};
    results.forEach((row) => {
      settings[row.setting_key] = row.setting_value;
    });

    res.json({
      success: true,
      message: "Site settings retrieved successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error getting site settings:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve site settings",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.update_site_setting
// Update a site setting (Admin)
// ============================================
router.post("/sculpture_shop.api.update_site_setting", async (req, res) => {
  try {
    const { setting_key, setting_value } = req.body;

    if (!setting_key) {
      return res.status(400).json({
        success: false,
        message: "Setting key is required",
      });
    }

    const results = await callProcedure("sp_update_site_setting", [setting_key, setting_value || ""]);

    res.json({
      success: true,
      message: "Setting updated successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error updating site setting:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update setting",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.create_admin
// Create admin user (for initial setup)
// ============================================
router.post("/sculpture_shop.api.create_admin", async (req, res) => {
  try {
    const { username, password, full_name } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Check if admin already exists
    const existing = await executeQuery("SELECT id FROM admin_users WHERE username = ?", [username]);

    if (existing && existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new admin
    const result = await executeQuery(
      "INSERT INTO admin_users (username, password_hash, full_name, is_active) VALUES (?, ?, ?, 1)",
      [username, hashedPassword, full_name || username],
    );

    res.json({
      success: true,
      message: "Admin user created successfully",
      data: { id: result.insertId },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create admin",
    });
  }
});

module.exports = router;
