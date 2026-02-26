"use client";

// ============================================
// Categories Page
// ============================================

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { PageLoader, SculptureCardSkeleton } from "@/components";
import { FiArrowRight, FiGrid } from "react-icons/fi";

// Dummy data for development
const DUMMY_CATEGORIES: (Category & { image?: string })[] = [
  {
    id: 1,
    name: "Hindu Gods",
    slug: "hindu-gods",
    description:
      "Sacred sculptures of Hindu deities including Lord Ganesha, Lord Shiva, Lord Vishnu, Goddess Lakshmi, and more. Perfect for temples and home shrines.",
    sculpture_count: 5,
    is_active: true,
    image: "/images/categories/hindu-gods.jpg",
  },
  {
    id: 2,
    name: "Buddha Statues",
    slug: "buddha-statues",
    description:
      "Serene Buddha statues in various poses - meditation, teaching, and blessing. Crafted for zen gardens, meditation spaces, and peaceful environments.",
    sculpture_count: 3,
    is_active: true,
    image: "/images/categories/buddha.jpg",
  },
  {
    id: 3,
    name: "Garden Sculptures",
    slug: "garden-sculptures",
    description:
      "Beautiful outdoor sculptures to enhance your garden, entrance, and landscape. Weather-resistant stone carvings that last generations.",
    sculpture_count: 4,
    is_active: true,
    image: "/images/categories/garden.jpg",
  },
  {
    id: 4,
    name: "Temple Sculptures",
    slug: "temple-sculptures",
    description:
      "Traditional temple architecture elements including pillars, Nandi bulls, dwarapalakas, and ornate carvings following ancient sculptural traditions.",
    sculpture_count: 6,
    is_active: true,
    image: "/images/categories/temple.jpg",
  },
  {
    id: 5,
    name: "Abstract Art",
    slug: "abstract-art",
    description:
      "Modern abstract stone sculptures for contemporary spaces. Unique artistic expressions that blend traditional craftsmanship with modern design.",
    sculpture_count: 2,
    is_active: true,
    image: "/images/categories/abstract.jpg",
  },
  {
    id: 6,
    name: "Memorial Sculptures",
    slug: "memorial-sculptures",
    description:
      "Dignified memorial and commemorative sculptures. Custom designs to honor and remember loved ones with lasting stone tributes.",
    sculpture_count: 3,
    is_active: true,
    image: "/images/categories/memorial.jpg",
  },
  {
    id: 7,
    name: "Architectural Elements",
    slug: "architectural-elements",
    description:
      "Decorative stone elements for architecture including columns, arches, fountains, and facade decorations in various traditional styles.",
    sculpture_count: 4,
    is_active: true,
    image: "/images/categories/architecture.jpg",
  },
  {
    id: 8,
    name: "Animal Sculptures",
    slug: "animal-sculptures",
    description:
      "Lifelike animal sculptures including elephants, lions, horses, peacocks, and more. Perfect for entrances, gardens, and decorative purposes.",
    sculpture_count: 5,
    is_active: true,
    image: "/images/categories/animals.jpg",
  },
];

function CategoryCard({ category }: { category: Category & { image?: string } }) {
  return (
    <Link
      href={`/sculptures?category=${category.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Category Image */}
      <div className="aspect-[4/3] relative bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
        {/* Placeholder with icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-amber-600/30 transform group-hover:scale-110 transition-transform duration-300">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.84L18 11v8h-2v-6H8v6H6v-8l6-5.16z" />
            </svg>
          </div>
        </div>

        {/* Sculpture count badge */}
        <div className="absolute bottom-3 right-3 bg-amber-600 text-white text-sm px-3 py-1 rounded-full">
          {category.sculpture_count} {category.sculpture_count === 1 ? "sculpture" : "sculptures"}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/10 transition-colors duration-300" />
      </div>

      {/* Category Info */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors mb-2">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{category.description}</p>
        <div className="flex items-center text-amber-600 font-medium text-sm group-hover:gap-2 transition-all">
          <span>View Sculptures</span>
          <FiArrowRight className="ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<(Category & { image?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      setCategories(DUMMY_CATEGORIES);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Sculpture Categories</h1>
          <p className="text-center text-amber-100">Browse our sculptures by category</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 rounded-full">
              <FiGrid className="text-amber-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Categories</p>
              <p className="text-2xl font-bold text-gray-800">{loading ? "..." : categories.length}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Sculptures</p>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? "..." : categories.reduce((sum, cat) => sum + cat.sculpture_count, 0)}
            </p>
          </div>
          <Link
            href="/sculptures"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            View All Sculptures
          </Link>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Custom Order CTA */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We specialize in custom sculptures. Share your vision with us, and our master craftsmen will bring it to
            life in stone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/custom-order"
              className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Request Custom Sculpture
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* About Categories Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Traditional Craftsmanship</h3>
            <p className="text-gray-600 mb-4">
              Each sculpture in our collection is handcrafted by skilled artisans following centuries-old traditions
              passed down through generations. We use time-tested techniques combined with quality stone materials.
            </p>
            <p className="text-gray-600">
              From sacred Hindu deities to serene Buddha statues, our sculptures capture the essence of spiritual art
              with meticulous attention to detail.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quality Materials</h3>
            <p className="text-gray-600 mb-4">
              We work with premium quality stone materials including granite, marble, black stone, and sandstone. Each
              material is carefully selected for its durability and aesthetic appeal.
            </p>
            <p className="text-gray-600">
              Our sculptures are designed to withstand the test of time, whether placed indoors in your home temple or
              outdoors in your garden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
