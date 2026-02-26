"use client";

// ============================================
// Admin Add/Edit Sculpture Page
// ============================================

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { TextInput, TextArea, SelectInput, Checkbox, NumberInput } from "@/components/ui/FormInputs";
import { Button, Spinner } from "@/components";
import { sculptureFormSchema } from "@/utils/validations";
import { Category, Material } from "@/types";
import { FiSave, FiX, FiUpload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

// Dummy data
const DUMMY_CATEGORIES: Category[] = [
  { id: 1, name: "Hindu Gods", slug: "hindu-gods", is_active: true, sculpture_count: 5 },
  { id: 2, name: "Buddha Statues", slug: "buddha-statues", is_active: true, sculpture_count: 3 },
  { id: 3, name: "Garden Sculptures", slug: "garden-sculptures", is_active: true, sculpture_count: 4 },
  { id: 4, name: "Temple Sculptures", slug: "temple-sculptures", is_active: true, sculpture_count: 6 },
  { id: 5, name: "Abstract Art", slug: "abstract-art", is_active: true, sculpture_count: 2 },
];

const DUMMY_MATERIALS: Material[] = [
  { id: 1, name: "Granite", is_active: true },
  { id: 2, name: "Marble", is_active: true },
  { id: 3, name: "Black Stone", is_active: true },
  { id: 4, name: "Sandstone", is_active: true },
];

interface SculptureFormValues {
  name: string;
  description: string;
  category_id: number | "";
  material_id: number | "";
  height: number | "";
  width: number | "";
  depth: number | "";
  weight: number | "";
  price: number | "";
  is_featured: boolean;
  is_available: boolean;
}

export default function AdminSculptureFormPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCategories(DUMMY_CATEGORIES);
      setMaterials(DUMMY_MATERIALS);
      setLoading(false);
    };

    fetchData();
  }, []);

  const initialValues: SculptureFormValues = {
    name: "",
    description: "",
    category_id: "",
    material_id: "",
    height: "",
    width: "",
    depth: "",
    weight: "",
    price: "",
    is_featured: false,
    is_available: true,
  };

  const handleSubmit = async (
    values: SculptureFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form values:", values);
      console.log("Images:", images);

      toast.success("Sculpture saved successfully!");
      router.push("/admin/sculptures");
    } catch (error) {
      toast.error("Failed to save sculpture");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In production, upload to server and get URLs
      // For now, create object URLs for preview
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
      toast.success(`${files.length} image(s) added`);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Sculpture</h1>
          <p className="text-gray-500">Fill in the details to add a new sculpture</p>
        </div>
        <Button variant="outline" onClick={() => router.back()} leftIcon={<FiX />}>
          Cancel
        </Button>
      </div>

      <Formik initialValues={initialValues} validationSchema={sculptureFormSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, values }) => (
          <Form>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
                  <div className="space-y-4">
                    <TextInput name="name" label="Sculpture Name" placeholder="Enter sculpture name" required />
                    <TextArea name="description" label="Description" placeholder="Describe the sculpture..." rows={4} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SelectInput name="category_id" label="Category" required>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </SelectInput>
                      <SelectInput name="material_id" label="Material" required>
                        <option value="">Select Material</option>
                        {materials.map((mat) => (
                          <option key={mat.id} value={mat.id}>
                            {mat.name}
                          </option>
                        ))}
                      </SelectInput>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Dimensions & Weight</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <NumberInput name="height" label="Height (inches)" placeholder="0" min={0} required />
                    <NumberInput name="width" label="Width (inches)" placeholder="0" min={0} required />
                    <NumberInput name="depth" label="Depth (inches)" placeholder="0" min={0} required />
                    <NumberInput name="weight" label="Weight (kg)" placeholder="0" min={0} required />
                  </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Images</h2>

                  {/* Upload Area */}
                  <div className="mb-4">
                    <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 cursor-pointer transition-colors">
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                      <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload images</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 5MB each</p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square group">
                          <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                            <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiTrash2 size={12} />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-amber-500 text-white text-xs rounded">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price & Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Price & Status</h2>
                  <div className="space-y-4">
                    <NumberInput name="price" label="Price (₹)" placeholder="0" min={0} required />
                    <div className="pt-2 space-y-3">
                      <Checkbox name="is_available" label="Available for sale" />
                      <Checkbox name="is_featured" label="Featured sculpture" />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Name:</dt>
                      <dd className="font-medium text-gray-800">{values.name || "-"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd className="font-medium text-gray-800">
                        {categories.find((c) => c.id === Number(values.category_id))?.name || "-"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Material:</dt>
                      <dd className="font-medium text-gray-800">
                        {materials.find((m) => m.id === Number(values.material_id))?.name || "-"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Price:</dt>
                      <dd className="font-medium text-amber-600">
                        {values.price ? `₹${Number(values.price).toLocaleString("en-IN")}` : "-"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Images:</dt>
                      <dd className="font-medium text-gray-800">{images.length}</dd>
                    </div>
                  </dl>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  leftIcon={<FiSave />}
                >
                  Save Sculpture
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
