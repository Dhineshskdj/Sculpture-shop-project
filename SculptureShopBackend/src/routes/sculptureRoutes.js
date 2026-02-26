// ============================================
// Sculpture Routes
// ============================================

const express = require("express");
const router = express.Router();
const { callProcedure } = require("../config/database");

// ============================================
// GET /api/method/sculpture_shop.api.get_sculptures
// Get all sculptures with filters
// ============================================
router.get("/sculpture_shop.api.get_sculptures", async (req, res) => {
  try {
    const { category_id, material_id, min_price, max_price, search_term, is_featured, limit, offset } = req.query;

    const results = await callProcedure("sp_get_sculptures", [
      category_id || null,
      material_id || null,
      min_price || null,
      max_price || null,
      search_term || null,
      is_featured !== undefined ? parseInt(is_featured) : null,
      limit ? parseInt(limit) : 100,
      offset ? parseInt(offset) : 0,
    ]);

    res.json({
      success: true,
      message: "Sculptures retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting sculptures:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve sculptures",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_sculptures_count
// Get sculpture count with filters
// ============================================
router.get("/sculpture_shop.api.get_sculptures_count", async (req, res) => {
  try {
    const { category_id, material_id, min_price, max_price, search_term, is_featured } = req.query;

    const results = await callProcedure("sp_get_sculptures_count", [
      category_id || null,
      material_id || null,
      min_price || null,
      max_price || null,
      search_term || null,
      is_featured !== undefined ? parseInt(is_featured) : null,
    ]);

    res.json({
      success: true,
      message: "Count retrieved successfully",
      data: results[0] || { total_count: 0 },
    });
  } catch (error) {
    console.error("Error getting sculptures count:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve count",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_sculpture_by_id
// Get sculpture by ID
// ============================================
router.get("/sculpture_shop.api.get_sculpture_by_id", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Sculpture ID is required",
      });
    }

    const results = await callProcedure("sp_get_sculpture_by_id", [parseInt(id)]);

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sculpture not found",
      });
    }

    res.json({
      success: true,
      message: "Sculpture retrieved successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error getting sculpture by ID:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve sculpture",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_sculpture_by_slug
// Get sculpture by slug
// ============================================
router.get("/sculpture_shop.api.get_sculpture_by_slug", async (req, res) => {
  try {
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Sculpture slug is required",
      });
    }

    const results = await callProcedure("sp_get_sculpture_by_slug", [slug]);

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sculpture not found",
      });
    }

    res.json({
      success: true,
      message: "Sculpture retrieved successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error getting sculpture by slug:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve sculpture",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_sculpture_images
// Get images for a sculpture
// ============================================
router.get("/sculpture_shop.api.get_sculpture_images", async (req, res) => {
  try {
    const { sculpture_id } = req.query;

    if (!sculpture_id) {
      return res.status(400).json({
        success: false,
        message: "Sculpture ID is required",
      });
    }

    const results = await callProcedure("sp_get_sculpture_images", [parseInt(sculpture_id)]);

    res.json({
      success: true,
      message: "Images retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting sculpture images:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve images",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_featured_sculptures
// Get featured sculptures
// ============================================
router.get("/sculpture_shop.api.get_featured_sculptures", async (req, res) => {
  try {
    const { limit } = req.query;

    const results = await callProcedure("sp_get_featured_sculptures", [limit ? parseInt(limit) : 10]);

    res.json({
      success: true,
      message: "Featured sculptures retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting featured sculptures:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve featured sculptures",
    });
  }
});

// ============================================
// GET /api/method/sculpture_shop.api.get_related_sculptures
// Get related sculptures
// ============================================
router.get("/sculpture_shop.api.get_related_sculptures", async (req, res) => {
  try {
    const { sculpture_id, limit } = req.query;

    if (!sculpture_id) {
      return res.status(400).json({
        success: false,
        message: "Sculpture ID is required",
      });
    }

    const results = await callProcedure("sp_get_related_sculptures", [
      parseInt(sculpture_id),
      limit ? parseInt(limit) : 4,
    ]);

    res.json({
      success: true,
      message: "Related sculptures retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting related sculptures:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve related sculptures",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.add_sculpture
// Add new sculpture (Admin)
// ============================================
router.post("/sculpture_shop.api.add_sculpture", async (req, res) => {
  try {
    const {
      name,
      slug,
      category_id,
      material_id,
      description,
      dimensions,
      height_cm,
      width_cm,
      depth_cm,
      weight_kg,
      price,
      is_featured,
      is_available,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Sculpture name is required",
      });
    }

    const results = await callProcedure("sp_add_sculpture", [
      name,
      slug || null,
      category_id || null,
      material_id || null,
      description || null,
      dimensions || null,
      height_cm || null,
      width_cm || null,
      depth_cm || null,
      weight_kg || null,
      price || 0,
      is_featured ? 1 : 0,
      is_available !== false ? 1 : 0,
    ]);

    res.json({
      success: true,
      message: "Sculpture added successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error adding sculpture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add sculpture",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.update_sculpture
// Update sculpture (Admin)
// ============================================
router.post("/sculpture_shop.api.update_sculpture", async (req, res) => {
  try {
    const {
      id,
      name,
      category_id,
      material_id,
      description,
      dimensions,
      height_cm,
      width_cm,
      depth_cm,
      weight_kg,
      price,
      is_featured,
      is_available,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Sculpture ID is required",
      });
    }

    const results = await callProcedure("sp_update_sculpture", [
      parseInt(id),
      name || null,
      category_id || null,
      material_id || null,
      description || null,
      dimensions || null,
      height_cm || null,
      width_cm || null,
      depth_cm || null,
      weight_kg || null,
      price || null,
      is_featured !== undefined ? (is_featured ? 1 : 0) : null,
      is_available !== undefined ? (is_available ? 1 : 0) : null,
    ]);

    res.json({
      success: true,
      message: "Sculpture updated successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error updating sculpture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update sculpture",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.delete_sculpture
// Delete sculpture (Admin - Soft Delete)
// ============================================
router.post("/sculpture_shop.api.delete_sculpture", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Sculpture ID is required",
      });
    }

    const results = await callProcedure("sp_delete_sculpture", [parseInt(id)]);

    res.json({
      success: true,
      message: "Sculpture deleted successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error deleting sculpture:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete sculpture",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.add_sculpture_image
// Add sculpture image (Admin)
// ============================================
router.post("/sculpture_shop.api.add_sculpture_image", async (req, res) => {
  try {
    const { sculpture_id, image_url, alt_text, is_primary, display_order } = req.body;

    if (!sculpture_id || !image_url) {
      return res.status(400).json({
        success: false,
        message: "Sculpture ID and image URL are required",
      });
    }

    const results = await callProcedure("sp_add_sculpture_image", [
      parseInt(sculpture_id),
      image_url,
      alt_text || null,
      is_primary ? 1 : 0,
      display_order || 0,
    ]);

    res.json({
      success: true,
      message: "Image added successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error adding sculpture image:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add image",
    });
  }
});

// ============================================
// POST /api/method/sculpture_shop.api.delete_sculpture_image
// Delete sculpture image (Admin)
// ============================================
router.post("/sculpture_shop.api.delete_sculpture_image", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Image ID is required",
      });
    }

    const results = await callProcedure("sp_delete_sculpture_image", [parseInt(id)]);

    res.json({
      success: true,
      message: "Image deleted successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error deleting sculpture image:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete image",
    });
  }
});

module.exports = router;
