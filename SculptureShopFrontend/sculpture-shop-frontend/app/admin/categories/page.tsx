"use client";

// ============================================
// Admin Categories Page
// ============================================

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Category } from "@/types";
import { TextInput, TextArea } from "@/components/ui/FormInputs";
import { Button, Modal, Spinner } from "@/components";
import { categoryFormSchema } from "@/utils/validations";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiGrid, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";

// Dummy data
const DUMMY_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Hindu Gods",
    slug: "hindu-gods",
    description: "Sacred sculptures of Hindu deities",
    sculpture_count: 5,
    is_active: true,
  },
  {
    id: 2,
    name: "Buddha Statues",
    slug: "buddha-statues",
    description: "Serene Buddha statues in various poses",
    sculpture_count: 3,
    is_active: true,
  },
  {
    id: 3,
    name: "Garden Sculptures",
    slug: "garden-sculptures",
    description: "Beautiful outdoor sculptures for gardens",
    sculpture_count: 4,
    is_active: true,
  },
  {
    id: 4,
    name: "Temple Sculptures",
    slug: "temple-sculptures",
    description: "Traditional temple architecture elements",
    sculpture_count: 6,
    is_active: true,
  },
  {
    id: 5,
    name: "Abstract Art",
    slug: "abstract-art",
    description: "Modern abstract stone sculptures",
    sculpture_count: 2,
    is_active: true,
  },
  {
    id: 6,
    name: "Memorial Sculptures",
    slug: "memorial-sculptures",
    description: "Commemorative sculptures",
    sculpture_count: 3,
    is_active: false,
  },
];

interface CategoryFormValues {
  name: string;
  description: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formModal, setFormModal] = useState<{ open: boolean; category: Category | null }>({
    open: false,
    category: null,
  });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; category: Category | null }>({
    open: false,
    category: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategories(DUMMY_CATEGORIES);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmit = async (
    values: CategoryFormValues,
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void },
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (formModal.category) {
        // Update existing category
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === formModal.category!.id
              ? { ...cat, ...values, slug: values.name.toLowerCase().replace(/\s+/g, "-") }
              : cat,
          ),
        );
        toast.success("Category updated successfully");
      } else {
        // Add new category
        const newCategory: Category = {
          id: Date.now(),
          name: values.name,
          slug: values.name.toLowerCase().replace(/\s+/g, "-"),
          description: values.description,
          sculpture_count: 0,
          is_active: true,
        };
        setCategories((prev) => [...prev, newCategory]);
        toast.success("Category added successfully");
      }

      resetForm();
      setFormModal({ open: false, category: null });
    } catch (error) {
      toast.error("Failed to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.category) return;

    setDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCategories((prev) => prev.filter((c) => c.id !== deleteModal.category!.id));
    toast.success("Category deleted successfully");
    setDeleteModal({ open: false, category: null });
    setDeleting(false);
  };

  const toggleActive = async (id: number) => {
    setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, is_active: !cat.is_active } : cat)));
    toast.success("Category status updated");
  };

  const openAddModal = () => {
    setFormModal({ open: true, category: null });
  };

  const openEditModal = (category: Category) => {
    setFormModal({ open: true, category });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500">Manage sculpture categories</p>
        </div>
        <Button variant="primary" leftIcon={<FiPlus />} onClick={openAddModal}>
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FiGrid className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="text-gray-500">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={`bg-white rounded-lg shadow-md p-5 border-l-4 ${
                category.is_active ? "border-amber-500" : "border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.slug}</p>
                </div>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    category.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description || "No description"}</p>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm text-gray-500">{category.sculpture_count} sculptures</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(category.id)}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded"
                    title={category.is_active ? "Deactivate" : "Activate"}
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => setDeleteModal({ open: true, category })}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                    disabled={category.sculpture_count > 0}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <div className="mt-4 text-sm text-gray-500">
          {filteredCategories.length} categories • {filteredCategories.filter((c) => c.is_active).length} active
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={formModal.open}
        onClose={() => setFormModal({ open: false, category: null })}
        title={formModal.category ? "Edit Category" : "Add Category"}
      >
        <div className="p-6">
          <Formik
            initialValues={{
              name: formModal.category?.name || "",
              description: formModal.category?.description || "",
            }}
            validationSchema={categoryFormSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <TextInput name="name" label="Category Name" placeholder="Enter category name" required />
                <TextArea
                  name="description"
                  label="Description"
                  placeholder="Brief description of this category"
                  rows={3}
                />
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setFormModal({ open: false, category: null })}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" loading={isSubmitting}>
                    {formModal.category ? "Update" : "Add"} Category
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, category: null })}
        title="Delete Category"
      >
        <div className="p-6">
          {deleteModal.category && deleteModal.category.sculpture_count > 0 ? (
            <>
              <p className="text-gray-600 mb-4">
                Cannot delete <strong>{deleteModal.category.name}</strong> because it has{" "}
                {deleteModal.category.sculpture_count} sculptures assigned to it.
              </p>
              <p className="text-sm text-gray-500 mb-4">Please reassign or delete those sculptures first.</p>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, category: null })}>
                  Close
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete <strong>{deleteModal.category?.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDeleteModal({ open: false, category: null })}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleDelete}
                  loading={deleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
