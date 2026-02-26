// ============================================
// API Client Configuration (Apisauce)
// ============================================

import { create } from "apisauce";

// API Base URL - change this for production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/method";

// Create the API client instance
const apiClient = create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding auth token
apiClient.addRequestTransform((request) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  if (token) {
    request.headers = request.headers || {};
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});

// Response interceptor for handling errors
apiClient.addResponseTransform((response) => {
  if (!response.ok) {
    // Handle specific error cases
    if (response.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        // Optionally redirect to login
      }
    }
    console.error("API Error:", response.problem, response.data);
  }
});

export default apiClient;
