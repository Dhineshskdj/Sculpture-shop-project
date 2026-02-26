"use client";

// ============================================
// Admin Sculptures List Page
// ============================================

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sculpture } from "@/types";
import { Button, Modal, Spinner } from "@/components";
import { formatPrice } from "@/utils/helpers";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye, FiStar, FiFilter, FiMoreVertical } from "react-icons/fi";
import toast from "react-hot-toast";

// Dummy data
const DUMMY_SCULPTURES: Sculpture[] = [
  {
    id: 1,
    name: "Lord Ganesha",
    slug: "lord-ganesha",
    description: "Beautiful handcrafted Lord Ganesha statue",
    category_id: 1,
    category_name: "Hindu Gods",
    material_id: 1,
    material_name: "Granite",
    height: 36,
    width: 24,
    depth: 18,
    weight: 150,
    price: 45000,
    is_featured: true,
    is_available: true,
    primary_image: "/images/sculptures/ganesha.jpg",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name: "Buddha Meditation",
    slug: "buddha-meditation",
    description: "Serene Buddha in meditation pose",
    category_id: 2,
    category_name: "Buddha Statues",
    material_id: 2,
    material_name: "Marble",
    height: 48,
    width: 30,
    depth: 24,
    weight: 200,
    price: 75000,
    is_featured: true,
    is_available: true,
    primary_image: "/images/sculptures/buddha.jpg",
    created_at: "2024-02-10",
  },
  {
    id: 3,
    name: "Dancing Nataraja",
    slug: "dancing-nataraja",
    description: "Lord Shiva in cosmic dance form",
    category_id: 1,
    category_name: "Hindu Gods",
    material_id: 3,
    material_name: "Black Stone",
    height: 60,
    width: 48,
    depth: 18,
    weight: 300,
    price: 125000,
    is_featured: true,
    is_available: true,
    primary_image: "/images/sculptures/nataraja.jpg",
    created_at: "2024-01-20",
  },
  {
    id: 4,
    name: "Temple Nandi",
    slug: "temple-nandi",
    description: "Traditional Nandi bull sculpture",
    category_id: 4,
    category_name: "Temple Sculptures",
    material_id: 1,
    material_name: "Granite",
    height: 42,
    width: 60,
    depth: 30,
    weight: 400,
    price: 85000,
    is_featured: false,
    is_available: true,
    primary_image: "/images/sculptures/nandi.jpg",
    created_at: "2024-03-01",
  },
  {
    id: 5,
    name: "Garden Angel",
    slug: "garden-angel",
    description: "Elegant angel sculpture for gardens",
    category_id: 3,
    category_name: "Garden Sculptures",
    material_id: 2,
    material_name: "Marble",
    height: 72,
    width: 36,
    depth: 24,
    weight: 250,
    price: 95000,
    is_featured: false,
    is_available: false,
    primary_image: "/images/sculptures/angel.jpg",
    created_at: "2024-02-15",
  },
];

export default function AdminSculpturesPage() {
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; sculpture: Sculpture | null }>({
    open: false,
    sculpture: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchSculptures = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSculptures(DUMMY_SCULPTURES);
      setLoading(false);
    };

    fetchSculptures();
  }, []);

  const filteredSculptures = sculptures.filter((sculpture) => {
    const matchesSearch =
      sculpture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sculpture.category_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || sculpture.category_name === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async () => {
    if (!deleteModal.sculpture) return;

    setDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSculptures((prev) => prev.filter((s) => s.id !== deleteModal.sculpture!.id));
    toast.success("Sculpture deleted successfully");
    setDeleteModal({ open: false, sculpture: null });
    setDeleting(false);
  };

  const toggleFeatured = async (id: number) => {
    setSculptures((prev) => prev.map((s) => (s.id === id ? { ...s, is_featured: !s.is_featured } : s)));
    toast.success("Featured status updated");
  };

  const toggleAvailable = async (id: number) => {
    setSculptures((prev) => prev.map((s) => (s.id === id ? { ...s, is_available: !s.is_available } : s)));
    toast.success("Availability status updated");
  };

  const categories = Array.from(new Set(sculptures.map((s) => s.category_name)));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sculptures</h1>
          <p className="text-gray-500">Manage your sculpture inventory</p>
        </div>
        <Link href="/admin/sculptures/new">
          <Button variant="primary" leftIcon={<FiPlus />}>
            Add Sculpture
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search sculptures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : filteredSculptures.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No sculptures found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sculpture</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 hidden lg:table-cell">
                    Material
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 hidden sm:table-cell">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSculptures.map((sculpture) => (
                  <tr key={sculpture.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FiEye />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{sculpture.name}</p>
                          <p className="text-sm text-gray-500 md:hidden">{sculpture.category_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {sculpture.category_name}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{sculpture.material_name}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{formatPrice(sculpture.price)}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleFeatured(sculpture.id)}
                          className={`p-1 rounded ${
                            sculpture.is_featured ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-amber-500"
                          }`}
                          title={sculpture.is_featured ? "Remove from featured" : "Mark as featured"}
                        >
                          <FiStar className={sculpture.is_featured ? "fill-current" : ""} />
                        </button>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            sculpture.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {sculpture.is_available ? "Available" : "Sold"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/sculptures/${sculpture.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                          title="View"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          href={`/admin/sculptures/${sculpture.id}/edit`}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ open: true, sculpture })}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredSculptures.length} of {sculptures.length} sculptures
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, sculpture: null })}
        title="Delete Sculpture"
      >
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete <strong>{deleteModal.sculpture?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteModal({ open: false, sculpture: null })}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDelete} loading={deleting} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
