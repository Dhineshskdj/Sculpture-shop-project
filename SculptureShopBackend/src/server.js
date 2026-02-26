// ============================================
// Main Server Entry Point
// ============================================

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

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ============================================
// API Routes
// ============================================

// All routes are prefixed with /api/method to match Frappe-style API
app.use("/api/method", sculptureRoutes);
app.use("/api/method", categoryRoutes);
app.use("/api/method", contactRoutes);
app.use("/api/method", adminRoutes);
app.use("/api/method", paymentRoutes);

// ============================================
// Health Check Route
// ============================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Sculpture Shop API is running",
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Error Handling Middleware
// ============================================

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🎨 Dhinesh Sculpture Shop API Server                     ║
║                                                            ║
║   Server running on: http://localhost:${PORT}                 ║
║   Environment: ${process.env.NODE_ENV || "development"}                              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
