// ============================================
// Sculpture API Functions
// ============================================

import apiClient from "./client";
import { Sculpture, SculptureFilters, SculptureImage, ApiResponse } from "@/types";

// Get all sculptures with filters
export const getSculptures = async (filters: SculptureFilters = {}) => {
  return apiClient.get<ApiResponse<Sculpture[]>>("/sculpture_shop.api.get_sculptures", {
    category_id: filters.category_id,
    material_id: filters.material_id,
    min_price: filters.min_price,
    max_price: filters.max_price,
    search_term: filters.search,
    is_featured: filters.is_featured ? 1 : undefined,
    limit: filters.limit || 50,
    offset: filters.offset || 0,
  });
};

// Get sculpture count with filters
export const getSculpturesCount = async (filters: SculptureFilters = {}) => {
  return apiClient.get<ApiResponse<{ total_count: number }>>("/sculpture_shop.api.get_sculptures_count", {
    category_id: filters.category_id,
    material_id: filters.material_id,
    min_price: filters.min_price,
    max_price: filters.max_price,
    search_term: filters.search,
    is_featured: filters.is_featured ? 1 : undefined,
  });
};

// Get sculpture by ID
export const getSculptureById = async (id: number) => {
  return apiClient.get<ApiResponse<Sculpture>>("/sculpture_shop.api.get_sculpture_by_id", { id });
};

// Get sculpture by slug
export const getSculptureBySlug = async (slug: string) => {
  return apiClient.get<ApiResponse<Sculpture>>("/sculpture_shop.api.get_sculpture_by_slug", { slug });
};

// Get sculpture images
export const getSculptureImages = async (sculptureId: number) => {
  return apiClient.get<ApiResponse<SculptureImage[]>>("/sculpture_shop.api.get_sculpture_images", {
    sculpture_id: sculptureId,
  });
};

// Get featured sculptures
export const getFeaturedSculptures = async (limit: number = 10) => {
  return apiClient.get<ApiResponse<Sculpture[]>>("/sculpture_shop.api.get_featured_sculptures", { limit });
};

// Get related sculptures
export const getRelatedSculptures = async (sculptureId: number, limit: number = 4) => {
  return apiClient.get<ApiResponse<Sculpture[]>>("/sculpture_shop.api.get_related_sculptures", {
    sculpture_id: sculptureId,
    limit,
  });
};

// ============================================
// Admin Sculpture Functions
// ============================================

// Add new sculpture (Admin)
export const addSculpture = async (sculpture: Partial<Sculpture>) => {
  return apiClient.post<ApiResponse<{ id: number; slug: string }>>("/sculpture_shop.api.add_sculpture", sculpture);
};

// Update sculpture (Admin)
export const updateSculpture = async (id: number, sculpture: Partial<Sculpture>) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.update_sculpture", {
    id,
    ...sculpture,
  });
};

// Delete sculpture (Admin)
export const deleteSculpture = async (id: number) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.delete_sculpture", { id });
};

// Add sculpture image (Admin)
export const addSculptureImage = async (
  sculptureId: number,
  imageUrl: string,
  altText?: string,
  isPrimary: boolean = false,
  displayOrder: number = 0,
) => {
  return apiClient.post<ApiResponse<{ id: number }>>("/sculpture_shop.api.add_sculpture_image", {
    sculpture_id: sculptureId,
    image_url: imageUrl,
    alt_text: altText,
    is_primary: isPrimary ? 1 : 0,
    display_order: displayOrder,
  });
};

// Delete sculpture image (Admin)
export const deleteSculptureImage = async (id: number) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.delete_sculpture_image", { id });
};
