// ============================================
// Category & Material API Functions
// ============================================

import apiClient from "./client";
import { Category, Material, ApiResponse } from "@/types";

// ============================================
// Category APIs
// ============================================

// Get all active categories
export const getCategories = async () => {
  return apiClient.get<ApiResponse<Category[]>>("/sculpture_shop.api.get_categories");
};

// Get category by ID
export const getCategoryById = async (id: number) => {
  return apiClient.get<ApiResponse<Category>>("/sculpture_shop.api.get_category_by_id", { id });
};

// Get categories with sculpture count
export const getCategoriesWithCount = async () => {
  return apiClient.get<ApiResponse<Category[]>>("/sculpture_shop.api.get_categories_with_count");
};

// Add new category (Admin)
export const addCategory = async (category: Partial<Category>) => {
  return apiClient.post<ApiResponse<{ id: number }>>("/sculpture_shop.api.add_category", category);
};

// Update category (Admin)
export const updateCategory = async (id: number, category: Partial<Category>) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.update_category", {
    id,
    ...category,
  });
};

// Delete category (Admin)
export const deleteCategory = async (id: number) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.delete_category", { id });
};

// ============================================
// Material APIs
// ============================================

// Get all active materials
export const getMaterials = async () => {
  return apiClient.get<ApiResponse<Material[]>>("/sculpture_shop.api.get_materials");
};

// Add new material (Admin)
export const addMaterial = async (material: Partial<Material>) => {
  return apiClient.post<ApiResponse<{ id: number }>>("/sculpture_shop.api.add_material", material);
};
