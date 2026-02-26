// ============================================
// Contact & Custom Request API Functions
// ============================================

import apiClient from "./client";
import { ContactRequest, CustomRequest, ApiResponse } from "@/types";

// ============================================
// Contact Request APIs
// ============================================

// Submit contact request (Public)
export const submitContactRequest = async (request: ContactRequest) => {
  return apiClient.post<ApiResponse<{ id: number }>>("/sculpture_shop.api.create_contact_request", {
    customer_name: request.customer_name,
    mobile_number: request.mobile_number,
    email: request.email,
    message: request.message,
    selected_sculpture_ids: JSON.stringify(request.selected_sculpture_ids || []),
    request_type: request.request_type || "inquiry",
  });
};

// Get contact requests (Admin)
export const getContactRequests = async (status?: string, limit: number = 50, offset: number = 0) => {
  return apiClient.get<ApiResponse<ContactRequest[]>>("/sculpture_shop.api.get_contact_requests", {
    status,
    limit,
    offset,
  });
};

// Update contact request status (Admin)
export const updateContactRequestStatus = async (id: number, status: string, adminNotes?: string) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.update_contact_request_status", {
    id,
    status,
    admin_notes: adminNotes,
  });
};

// ============================================
// Custom Request APIs
// ============================================

// Submit custom sculpture request (Public)
export const submitCustomRequest = async (request: CustomRequest) => {
  return apiClient.post<ApiResponse<{ id: number }>>("/sculpture_shop.api.create_custom_request", {
    customer_name: request.customer_name,
    mobile_number: request.mobile_number,
    email: request.email,
    reference_image_url: request.reference_image_url,
    sculpture_type: request.sculpture_type,
    preferred_material: request.preferred_material,
    expected_height: request.expected_height,
    expected_width: request.expected_width,
    expected_depth: request.expected_depth,
    expected_price: request.expected_price,
    description: request.description,
    special_requirements: request.special_requirements,
  });
};

// Get custom requests (Admin)
export const getCustomRequests = async (status?: string, limit: number = 50, offset: number = 0) => {
  return apiClient.get<ApiResponse<CustomRequest[]>>("/sculpture_shop.api.get_custom_requests", {
    status,
    limit,
    offset,
  });
};

// Update custom request (Admin)
export const updateCustomRequest = async (
  id: number,
  status?: string,
  quotedPrice?: number,
  estimatedDays?: number,
  adminNotes?: string,
) => {
  return apiClient.post<ApiResponse<{ affected_rows: number }>>("/sculpture_shop.api.update_custom_request", {
    id,
    status,
    quoted_price: quotedPrice,
    estimated_days: estimatedDays,
    admin_notes: adminNotes,
  });
};
