// ============================================
// Form Validation Schemas (Yup)
// ============================================

import * as Yup from "yup";

// Contact form validation
export const contactFormSchema = Yup.object({
  customer_name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: Yup.string().email("Please enter a valid email address").max(100, "Email must be less than 100 characters"),
  message: Yup.string().max(1000, "Message must be less than 1000 characters"),
});

// Custom sculpture request validation
export const customRequestSchema = Yup.object({
  customer_name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: Yup.string().email("Please enter a valid email address"),
  sculpture_type: Yup.string()
    .required("Sculpture type is required")
    .max(100, "Sculpture type must be less than 100 characters"),
  preferred_material: Yup.string().max(100, "Material must be less than 100 characters"),
  expected_height: Yup.string().max(50, "Height must be less than 50 characters"),
  expected_width: Yup.string().max(50, "Width must be less than 50 characters"),
  expected_depth: Yup.string().max(50, "Depth must be less than 50 characters"),
  expected_price: Yup.number().positive("Price must be a positive number").max(99999999, "Price is too high"),
  description: Yup.string()
    .required("Please describe your requirements")
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters"),
  special_requirements: Yup.string().max(1000, "Special requirements must be less than 1000 characters"),
});

// Sculpture form validation (Admin)
export const sculptureFormSchema = Yup.object({
  name: Yup.string()
    .required("Sculpture name is required")
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters"),
  category_id: Yup.number().required("Category is required").positive("Please select a category"),
  material_id: Yup.number().positive("Please select a material"),
  description: Yup.string().max(5000, "Description must be less than 5000 characters"),
  dimensions: Yup.string().max(100, "Dimensions must be less than 100 characters"),
  height_cm: Yup.number().positive("Height must be a positive number").max(10000, "Height is too large"),
  width_cm: Yup.number().positive("Width must be a positive number").max(10000, "Width is too large"),
  depth_cm: Yup.number().positive("Depth must be a positive number").max(10000, "Depth is too large"),
  weight_kg: Yup.number().positive("Weight must be a positive number").max(100000, "Weight is too large"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative")
    .max(99999999, "Price is too high"),
  is_featured: Yup.boolean(),
  is_available: Yup.boolean(),
});

// Category form validation (Admin)
export const categoryFormSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  description: Yup.string().max(500, "Description must be less than 500 characters"),
  display_order: Yup.number().min(0, "Display order must be 0 or greater").max(999, "Display order is too high"),
});

// Admin login validation
export const adminLoginSchema = Yup.object({
  username: Yup.string().required("Username is required").max(50, "Username must be less than 50 characters"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});
