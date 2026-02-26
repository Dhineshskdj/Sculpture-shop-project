// ============================================
// Payment Info Routes
// ============================================

const express = require("express");
const router = express.Router();
const { callProcedure } = require("../config/database");

// ============================================
// GET /api/method/sculpture_shop.api.get_payment_info
// Get payment information
// ============================================
router.get("/sculpture_shop.api.get_payment_info", async (req, res) => {
  try {
    const results = await callProcedure("sp_get_payment_info", []);

    res.json({
      success: true,
      message: "Payment info retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting payment info:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve payment info",
    });
  }
});

module.exports = router;
