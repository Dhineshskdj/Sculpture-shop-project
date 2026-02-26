// ============================================
// Contact & Custom Request Routes
// ============================================

const express = require("express");
const router = express.Router();
const { callProcedure } = require("../config/database");

// ============================================
// CONTACT REQUEST ROUTES
// ============================================

// POST /api/method/sculpture_shop.api.create_contact_request
// Submit a contact request (Public)
router.post("/sculpture_shop.api.create_contact_request", async (req, res) => {
  try {
    const { customer_name, mobile_number, email, message, selected_sculpture_ids, request_type } = req.body;

    if (!customer_name || !mobile_number) {
      return res.status(400).json({
        success: false,
        message: "Customer name and mobile number are required",
      });
    }

    const results = await callProcedure("sp_create_contact_request", [
      customer_name,
      mobile_number,
      email || null,
      message || null,
      selected_sculpture_ids || "[]",
      request_type || "inquiry",
    ]);

    res.json({
      success: true,
      message: "Contact request submitted successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error creating contact request:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit contact request",
    });
  }
});

// GET /api/method/sculpture_shop.api.get_contact_requests
// Get all contact requests (Admin)
router.get("/sculpture_shop.api.get_contact_requests", async (req, res) => {
  try {
    const { status, limit, offset } = req.query;

    const results = await callProcedure("sp_get_contact_requests", [
      status || null,
      limit ? parseInt(limit) : 50,
      offset ? parseInt(offset) : 0,
    ]);

    res.json({
      success: true,
      message: "Contact requests retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting contact requests:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve contact requests",
    });
  }
});

// POST /api/method/sculpture_shop.api.update_contact_request_status
// Update contact request status (Admin)
router.post("/sculpture_shop.api.update_contact_request_status", async (req, res) => {
  try {
    const { id, status, admin_notes } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Request ID and status are required",
      });
    }

    const results = await callProcedure("sp_update_contact_request_status", [
      parseInt(id),
      status,
      admin_notes || null,
    ]);

    res.json({
      success: true,
      message: "Status updated successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error updating contact request status:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update status",
    });
  }
});

// ============================================
// CUSTOM REQUEST ROUTES
// ============================================

// POST /api/method/sculpture_shop.api.create_custom_request
// Submit a custom sculpture request (Public)
router.post("/sculpture_shop.api.create_custom_request", async (req, res) => {
  try {
    const {
      customer_name,
      mobile_number,
      email,
      reference_image_url,
      sculpture_type,
      preferred_material,
      expected_height,
      expected_width,
      expected_depth,
      expected_price,
      description,
      special_requirements,
    } = req.body;

    if (!customer_name || !mobile_number) {
      return res.status(400).json({
        success: false,
        message: "Customer name and mobile number are required",
      });
    }

    const results = await callProcedure("sp_create_custom_request", [
      customer_name,
      mobile_number,
      email || null,
      reference_image_url || null,
      sculpture_type || null,
      preferred_material || null,
      expected_height || null,
      expected_width || null,
      expected_depth || null,
      expected_price || null,
      description || null,
      special_requirements || null,
    ]);

    res.json({
      success: true,
      message: "Custom request submitted successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error creating custom request:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit custom request",
    });
  }
});

// GET /api/method/sculpture_shop.api.get_custom_requests
// Get all custom requests (Admin)
router.get("/sculpture_shop.api.get_custom_requests", async (req, res) => {
  try {
    const { status, limit, offset } = req.query;

    const results = await callProcedure("sp_get_custom_requests", [
      status || null,
      limit ? parseInt(limit) : 50,
      offset ? parseInt(offset) : 0,
    ]);

    res.json({
      success: true,
      message: "Custom requests retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting custom requests:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve custom requests",
    });
  }
});

// POST /api/method/sculpture_shop.api.update_custom_request
// Update custom request (Admin)
router.post("/sculpture_shop.api.update_custom_request", async (req, res) => {
  try {
    const { id, status, quoted_price, estimated_days, admin_notes } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Request ID is required",
      });
    }

    const results = await callProcedure("sp_update_custom_request", [
      parseInt(id),
      status || null,
      quoted_price || null,
      estimated_days || null,
      admin_notes || null,
    ]);

    res.json({
      success: true,
      message: "Custom request updated successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error updating custom request:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update custom request",
    });
  }
});

module.exports = router;
