// ============================================
// Category & Material Routes
// ============================================

const express = require("express");
const router = express.Router();
const { callProcedure } = require("../config/database");

// ============================================
// CATEGORY ROUTES
// ============================================

// GET /api/method/sculpture_shop.api.get_categories
// Get all active categories
router.get("/sculpture_shop.api.get_categories", async (req, res) => {
  try {
    const results = await callProcedure("sp_get_all_categories", []);

    res.json({
      success: true,
      message: "Categories retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve categories",
    });
  }
});

// GET /api/method/sculpture_shop.api.get_category_by_id
// Get category by ID
router.get("/sculpture_shop.api.get_category_by_id", async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const results = await callProcedure("sp_get_category_by_id", [parseInt(id)]);

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category retrieved successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error getting category by ID:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve category",
    });
  }
});

// GET /api/method/sculpture_shop.api.get_categories_with_count
// Get categories with sculpture count
router.get("/sculpture_shop.api.get_categories_with_count", async (req, res) => {
  try {
    // Using a custom query since we may not have this SP
    const { executeQuery } = require("../config/database");
    const results = await executeQuery(`
      SELECT 
        c.id,
        c.name,
        c.description,
        c.image_url,
        c.display_order,
        c.created_at,
        COUNT(s.id) as sculpture_count
      FROM categories c
      LEFT JOIN sculptures s ON c.id = s.category_id AND s.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.display_order ASC, c.name ASC
    `);

    res.json({
      success: true,
      message: "Categories with count retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting categories with count:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve categories",
    });
  }
});

// POST /api/method/sculpture_shop.api.add_category
// Add new category (Admin)
router.post("/sculpture_shop.api.add_category", async (req, res) => {
  try {
    const { name, description, image_url, display_order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const results = await callProcedure("sp_add_category", [
      name,
      description || null,
      image_url || null,
      display_order || 0,
    ]);

    res.json({
      success: true,
      message: "Category added successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add category",
    });
  }
});

// POST /api/method/sculpture_shop.api.update_category
// Update category (Admin)
router.post("/sculpture_shop.api.update_category", async (req, res) => {
  try {
    const { id, name, description, image_url, display_order, is_active } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const results = await callProcedure("sp_update_category", [
      parseInt(id),
      name || null,
      description || null,
      image_url || null,
      display_order !== undefined ? display_order : null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
    ]);

    res.json({
      success: true,
      message: "Category updated successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update category",
    });
  }
});

// POST /api/method/sculpture_shop.api.delete_category
// Delete category (Admin - Soft Delete)
router.post("/sculpture_shop.api.delete_category", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const results = await callProcedure("sp_delete_category", [parseInt(id)]);

    res.json({
      success: true,
      message: "Category deleted successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete category",
    });
  }
});

// ============================================
// MATERIAL ROUTES
// ============================================

// GET /api/method/sculpture_shop.api.get_materials
// Get all active materials
router.get("/sculpture_shop.api.get_materials", async (req, res) => {
  try {
    const results = await callProcedure("sp_get_all_materials", []);

    res.json({
      success: true,
      message: "Materials retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error getting materials:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve materials",
    });
  }
});

// POST /api/method/sculpture_shop.api.add_material
// Add new material (Admin)
router.post("/sculpture_shop.api.add_material", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Material name is required",
      });
    }

    const results = await callProcedure("sp_add_material", [name, description || null]);

    res.json({
      success: true,
      message: "Material added successfully",
      data: results[0],
    });
  } catch (error) {
    console.error("Error adding material:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add material",
    });
  }
});

module.exports = router;
