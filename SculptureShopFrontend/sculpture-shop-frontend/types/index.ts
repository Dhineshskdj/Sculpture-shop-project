// ============================================
// TypeScript Type Definitions
// ============================================

export interface Category {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  display_order?: number;
  sculpture_count?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface Material {
  id: number;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface SculptureImage {
  id: number;
  sculpture_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
}

export interface Sculpture {
  id: number;
  name: string;
  slug: string;
  description?: string;
  dimensions?: string;
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
  height_cm?: number;
  width_cm?: number;
  depth_cm?: number;
  weight_kg?: number;
  price: number;
  is_featured: boolean;
  is_available: boolean;
  view_count?: number;
  category_id?: number;
  category_name?: string;
  material_id?: number;
  material_name?: string;
  primary_image?: string;
  images?: SculptureImage[];
  created_at?: string;
  updated_at?: string;
}

export interface ContactRequest {
  id?: number;
  customer_name: string;
  mobile_number: string;
  email?: string;
  message?: string;
  selected_sculpture_ids?: number[];
  request_type?: "general" | "inquiry" | "quotation";
  status?: "pending" | "contacted" | "completed" | "cancelled";
  admin_notes?: string;
  created_at?: string;
}

export interface CustomRequest {
  id?: number;
  customer_name: string;
  mobile_number: string;
  email?: string;
  reference_image_url?: string;
  sculpture_type?: string;
  preferred_material?: string;
  expected_height?: string;
  expected_width?: string;
  expected_depth?: string;
  expected_price?: number;
  description?: string;
  special_requirements?: string;
  status?: "pending" | "reviewed" | "quoted" | "accepted" | "in_progress" | "completed" | "cancelled";
  quoted_price?: number;
  estimated_days?: number;
  admin_notes?: string;
  created_at?: string;
}

export interface PaymentInfo {
  id: number;
  payment_type: "upi" | "bank" | "gpay" | "phonepe" | "paytm";
  display_name: string;
  upi_id?: string;
  qr_code_url?: string;
  mobile_number?: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  account_holder_name?: string;
  display_order: number;
}

export interface SiteSetting {
  setting_key: string;
  setting_value: string;
  setting_type: "text" | "number" | "boolean" | "json" | "image";
  description?: string;
}

export interface DashboardStats {
  total_sculptures: number;
  featured_sculptures: number;
  total_categories: number;
  pending_inquiries: number;
  pending_custom_requests: number;
  total_views: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SculptureFilters {
  category_id?: number;
  material_id?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  is_featured?: boolean;
  limit?: number;
  offset?: number;
}
