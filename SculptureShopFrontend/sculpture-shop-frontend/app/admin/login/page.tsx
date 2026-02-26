"use client";

// ============================================
// Admin Login Page
// ============================================

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { TextInput } from "@/components/ui/FormInputs";
import { Button } from "@/components";
import { adminLoginSchema } from "@/utils/validations";
import { useAdminStore } from "@/store/adminStore";
import { SHOP_INFO } from "@/utils/constants";
import { FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

interface LoginFormValues {
  username: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAdminStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For development, use hardcoded credentials
      // In production, this should call the actual API
      if (values.username === "admin" && values.password === "admin123") {
        login({
          id: 1,
          username: "admin",
          email: "admin@dhineshsculpture.com",
          role: "admin",
        });
        toast.success("Login successful!");
        router.push("/admin");
      } else {
        setError("Invalid username or password");
        toast.error("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-2xl mb-4">
            <span className="text-white font-bold text-3xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{SHOP_INFO.name}</h1>
          <p className="text-gray-400">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>
          )}

          <Formik initialValues={initialValues} validationSchema={adminLoginSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="relative">
                  <TextInput
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    leftIcon={<FiUser className="text-gray-400" />}
                  />
                </div>

                <div className="relative">
                  <TextInput
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    leftIcon={<FiLock className="text-gray-400" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    }
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-sm text-amber-700">
              Username: <code className="bg-amber-100 px-1 rounded">admin</code>
            </p>
            <p className="text-sm text-amber-700">
              Password: <code className="bg-amber-100 px-1 rounded">admin123</code>
            </p>
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
