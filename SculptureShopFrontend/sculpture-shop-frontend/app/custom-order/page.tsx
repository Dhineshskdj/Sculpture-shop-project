"use client";

// ============================================
// Custom Order Request Page
// ============================================

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FiUpload, FiCheck, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { TextInput, TextArea, SelectInput, NumberInput, Button } from "@/components";
import { customRequestSchema } from "@/utils/validations";
import { SHOP_INFO } from "@/utils/constants";
import { getWhatsAppUrl, generateCustomRequestMessage } from "@/utils/helpers";
import toast from "react-hot-toast";

interface CustomRequestValues {
  customer_name: string;
  mobile_number: string;
  email: string;
  sculpture_type: string;
  preferred_material: string;
  expected_height: string;
  expected_width: string;
  expected_depth: string;
  expected_price: number | "";
  description: string;
  special_requirements: string;
}

const SCULPTURE_TYPES = [
  { value: "god_statue", label: "God Statue / Deity" },
  { value: "memorial", label: "Memorial / Bust" },
  { value: "portrait", label: "Portrait Sculpture" },
  { value: "garden", label: "Garden Sculpture" },
  { value: "temple", label: "Temple Sculpture" },
  { value: "decorative", label: "Decorative Art" },
  { value: "other", label: "Other" },
];

const MATERIAL_OPTIONS = [
  { value: "granite", label: "Granite" },
  { value: "marble", label: "Marble" },
  { value: "sandstone", label: "Sandstone" },
  { value: "bronze", label: "Bronze" },
  { value: "fiber", label: "Fiber" },
  { value: "cement", label: "Cement" },
  { value: "wood", label: "Wood" },
  { value: "not_sure", label: "Not Sure - Need Suggestion" },
];

export default function CustomOrderPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  const initialValues: CustomRequestValues = {
    customer_name: "",
    mobile_number: "",
    email: "",
    sculpture_type: "",
    preferred_material: "",
    expected_height: "",
    expected_width: "",
    expected_depth: "",
    expected_price: "",
    description: "",
    special_requirements: "",
  };

  const handleSubmit = async (
    values: CustomRequestValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, call the API
      // const imageUrl = referenceImage ? await uploadImage(referenceImage) : null;
      // await submitCustomRequest({ ...values, reference_image_url: imageUrl });

      setIsSubmitted(true);
      toast.success("Your custom order request has been submitted!");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReferenceImage(e.target.files[0]);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    SHOP_INFO.whatsappNumber,
    "Hello! I would like to request a custom sculpture. Can you please help me?",
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Request Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your custom sculpture request. Our team will review your requirements and contact you within
              24-48 hours with a quote.
            </p>
            <p className="text-gray-600 mb-8">
              For faster response or to share reference images, connect with us on WhatsApp.
            </p>
            <div className="space-y-3">
              <Button href={whatsappUrl} external variant="whatsapp" fullWidth leftIcon={<FaWhatsapp />}>
                Share Images on WhatsApp
              </Button>
              <Button href="/" variant="outline" fullWidth>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Request a Custom Sculpture</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a specific sculpture in mind? Share your requirements and we&apos;ll create a unique piece just for
            you. From god statues to memorial busts, we craft it all.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-3">
            <FiInfo className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">How Custom Orders Work:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Fill out the form below with your requirements</li>
                <li>Our team will review and contact you</li>
                <li>We&apos;ll provide a detailed quote and timeline</li>
                <li>Upon approval, we begin crafting your sculpture</li>
              </ol>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Formik initialValues={initialValues} validationSchema={customRequestSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, values }) => (
                <Form>
                  {/* Personal Details */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <TextInput
                      label="Your Name"
                      name="customer_name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                    <TextInput
                      label="Mobile Number"
                      name="mobile_number"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      required
                    />
                  </div>
                  <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email (optional)"
                  />

                  {/* Sculpture Details */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-8">Sculpture Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectInput
                      label="Type of Sculpture"
                      name="sculpture_type"
                      options={SCULPTURE_TYPES}
                      placeholder="Select sculpture type"
                      required
                    />
                    <SelectInput
                      label="Preferred Material"
                      name="preferred_material"
                      options={MATERIAL_OPTIONS}
                      placeholder="Select material"
                    />
                  </div>

                  {/* Dimensions */}
                  <h4 className="text-md font-medium text-gray-700 mb-3 mt-4">Expected Dimensions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextInput label="Height" name="expected_height" type="text" placeholder="e.g., 60cm or 2ft" />
                    <TextInput label="Width" name="expected_width" type="text" placeholder="e.g., 40cm or 1.5ft" />
                    <TextInput label="Depth" name="expected_depth" type="text" placeholder="e.g., 30cm or 1ft" />
                  </div>

                  {/* Budget */}
                  <NumberInput
                    label="Expected Budget (₹)"
                    name="expected_price"
                    placeholder="Enter your budget"
                    prefix="₹"
                    helpText="Provide an approximate budget range"
                  />

                  {/* Description */}
                  <TextArea
                    label="Description"
                    name="description"
                    placeholder="Describe the sculpture you want in detail. Include pose, style, specific features, etc."
                    rows={5}
                    required
                  />

                  {/* Special Requirements */}
                  <TextArea
                    label="Special Requirements (Optional)"
                    name="special_requirements"
                    placeholder="Any special instructions, deadline requirements, or additional details"
                    rows={3}
                  />

                  {/* Reference Image Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="reference-image"
                      />
                      <label htmlFor="reference-image" className="cursor-pointer">
                        <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                        {referenceImage ? (
                          <p className="text-gray-800 font-medium">{referenceImage.name}</p>
                        ) : (
                          <>
                            <p className="text-gray-600">Click to upload reference image</p>
                            <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                          </>
                        )}
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      💡 Tip: For sharing multiple images, use WhatsApp after submitting this form.
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} fullWidth>
                      Submit Request
                    </Button>
                    <Button
                      href={getWhatsAppUrl(
                        SHOP_INFO.whatsappNumber,
                        generateCustomRequestMessage(
                          values.customer_name || "Customer",
                          values.mobile_number || "Mobile",
                          SCULPTURE_TYPES.find((t) => t.value === values.sculpture_type)?.label ||
                            values.sculpture_type,
                          MATERIAL_OPTIONS.find((m) => m.value === values.preferred_material)?.label ||
                            values.preferred_material,
                          `H: ${values.expected_height}, W: ${values.expected_width}, D: ${values.expected_depth}`,
                          values.expected_price ? `₹${values.expected_price}` : "Not specified",
                          values.description || "No description provided",
                        ),
                      )}
                      external
                      variant="whatsapp"
                      size="lg"
                      fullWidth
                      leftIcon={<FaWhatsapp />}
                    >
                      Send via WhatsApp
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
