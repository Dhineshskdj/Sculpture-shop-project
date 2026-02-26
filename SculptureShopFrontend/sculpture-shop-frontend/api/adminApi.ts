// ============================================
// Admin & Settings API Functions
// ============================================

import apiClient from "./client";
import { PaymentInfo, SiteSetting, DashboardStats, ApiResponse } from "@/types";

// ============================================
// Admin APIs
// ============================================

// Admin login
export const adminLogin = async (username: string, password: string) => {
  return apiClient.post<ApiResponse<{ id: number; username: string; full_name: string; success: boolean }>>(
    "/sculpture_shop.api.admin_login",
    { username, password },
  );
};

// Get dashboard stats
export const getDashboardStats = async () => {
  return apiClient.get<ApiResponse<DashboardStats>>("/sculpture_shop.api.get_dashboard_stats");
};

// ============================================
// Site Settings APIs
// ============================================

// Get all site settings
export const getSiteSettings = async () => {
  return apiClient.get<ApiResponse<SiteSetting[]>>("/sculpture_shop.api.get_site_settings");
};

// Update site setting
export const updateSiteSetting = async (key: string, value: string) => {
  return apiClient.post<ApiResponse<{ message: string }>>("/sculpture_shop.api.update_site_setting", {
    setting_key: key,
    setting_value: value,
  });
};

// ============================================
// Payment Info APIs
// ============================================

// Get payment info (Public)
export const getPaymentInfo = async () => {
  return apiClient.get<ApiResponse<PaymentInfo[]>>("/sculpture_shop.api.get_payment_info");
};

// ============================================
// File Upload APIs
// ============================================

// Upload image
export const uploadImage = async (file: File, folder: string = "sculptures") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  return apiClient.post<ApiResponse<{ file_url: string }>>("/sculpture_shop.api.upload_image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
