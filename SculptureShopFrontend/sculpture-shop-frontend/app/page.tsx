"use client";

// ============================================
// Home Page
// ============================================

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiArrowRight, FiStar, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Sculpture, Category, Material, SculptureFilters } from "@/types";
import { SculptureCard, SearchFilter, Button, SculptureGridSkeleton } from "@/components";
import { SHOP_INFO } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";

// Dummy data for initial display (will be replaced by API data)
const DUMMY_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "God Statues",
    description: "Beautiful statues of Hindu deities",
    display_order: 1,
    sculpture_count: 8,
  },
  { id: 2, name: "Custom Work", description: "Personalized sculptures", display_order: 2, sculpture_count: 5 },
  { id: 3, name: "Stone Sculptures", description: "Traditional stone carvings", display_order: 3, sculpture_count: 6 },
  { id: 5, name: "Garden Sculptures", description: "Outdoor sculptures", display_order: 5, sculpture_count: 4 },
];

const DUMMY_MATERIALS: Material[] = [
  { id: 1, name: "Granite" },
  { id: 2, name: "Marble" },
  { id: 3, name: "Sandstone" },
  { id: 5, name: "Bronze" },
];

const DUMMY_SCULPTURES: Sculpture[] = [
  {
    id: 1,
    name: "Lord Ganesha - Classic",
    slug: "lord-ganesha-classic",
    price: 25000,
    is_featured: true,
    is_available: true,
    view_count: 150,
    category_name: "God Statues",
    material_name: "Granite",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Ganesha",
  },
  {
    id: 2,
    name: "Lord Shiva Nataraja",
    slug: "lord-shiva-nataraja",
    price: 75000,
    is_featured: true,
    is_available: true,
    view_count: 120,
    category_name: "God Statues",
    material_name: "Bronze",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Nataraja",
  },
  {
    id: 3,
    name: "Buddha Meditation",
    slug: "buddha-meditation",
    price: 35000,
    is_featured: true,
    is_available: true,
    view_count: 100,
    category_name: "God Statues",
    material_name: "Marble",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Buddha",
  },
  {
    id: 5,
    name: "Garden Lion Pair",
    slug: "garden-lion-pair",
    price: 45000,
    is_featured: true,
    is_available: true,
    view_count: 80,
    category_name: "Garden Sculptures",
    material_name: "Cement",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Lions",
  },
  {
    id: 7,
    name: "Saraswati Devi",
    slug: "saraswati-devi",
    price: 45000,
    is_featured: true,
    is_available: true,
    view_count: 95,
    category_name: "God Statues",
    material_name: "Granite",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Saraswati",
  },
  {
    id: 10,
    name: "Hanuman Flying",
    slug: "hanuman-flying",
    price: 55000,
    is_featured: true,
    is_available: true,
    view_count: 110,
    category_name: "God Statues",
    material_name: "Fiber",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Hanuman",
  },
  {
    id: 11,
    name: "Krishna with Flute",
    slug: "krishna-with-flute",
    price: 48000,
    is_featured: true,
    is_available: true,
    view_count: 130,
    category_name: "God Statues",
    material_name: "Marble",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Krishna",
  },
  {
    id: 12,
    name: "Murugan with Vel",
    slug: "murugan-with-vel",
    price: 58000,
    is_featured: false,
    is_available: true,
    view_count: 75,
    category_name: "God Statues",
    material_name: "Granite",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Murugan",
  },
];

export default function HomePage() {
  const [sculptures, setSculptures] = useState<Sculpture[]>(DUMMY_SCULPTURES);
  const [filteredSculptures, setFilteredSculptures] = useState<Sculpture[]>(DUMMY_SCULPTURES);
  const [categories] = useState<Category[]>(DUMMY_CATEGORIES);
  const [materials] = useState<Material[]>(DUMMY_MATERIALS);
  const [filters, setFilters] = useState<SculptureFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  // Filter sculptures based on current filters
  const applyFilters = useCallback(() => {
    let filtered = [...sculptures];

    if (filters.category_id) {
      const category = categories.find((c) => c.id === filters.category_id);
      if (category) {
        filtered = filtered.filter((s) => s.category_name === category.name);
      }
    }

    if (filters.material_id) {
      const material = materials.find((m) => m.id === filters.material_id);
      if (material) {
        filtered = filtered.filter((s) => s.material_name === material.name);
      }
    }

    if (filters.min_price !== undefined) {
      filtered = filtered.filter((s) => s.price >= filters.min_price!);
    }

    if (filters.max_price !== undefined) {
      filtered = filtered.filter((s) => s.price <= filters.max_price!);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.category_name?.toLowerCase().includes(searchLower) ||
          s.material_name?.toLowerCase().includes(searchLower),
      );
    }

    setFilteredSculptures(filtered);
  }, [sculptures, filters, categories, materials]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters: SculptureFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  const featuredSculptures = sculptures.filter((s) => s.is_featured).slice(0, 6);
  const whatsappUrl = getWhatsAppUrl(
    SHOP_INFO.whatsappNumber,
    "Hello! I visited your website and am interested in your sculptures.",
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-rose-300 mb-6 border border-rose-500/30">
              ✨ Premium Handcrafted Sculptures
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-rose-100 to-orange-200 bg-clip-text text-transparent">
                Handcrafted Sculptures
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                with Divine Artistry
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Traditional craftsmanship meets timeless beauty. Explore our collection of God statues, custom sculptures,
              and memorial pieces.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/sculptures" size="lg" variant="primary" rightIcon={<FiArrowRight />}>
                Explore Collection
              </Button>
              <Button
                href="/custom-order"
                size="lg"
                variant="outline"
                className="!text-white !border-white/50 hover:!bg-white/10 hover:!border-white"
              >
                Request Custom Sculpture
              </Button>
            </div>
          </div>
        </div>

        {/* Shop Info Bar */}
        <div className="bg-gradient-to-r from-rose-600/90 via-pink-600/90 to-orange-500/90 backdrop-blur-sm py-4 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 text-white">
              <a
                href={SHOP_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                <FiMapPin />
                <span>{SHOP_INFO.address}</span>
              </a>
              <a
                href={`tel:${SHOP_INFO.phone1}`}
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                <FiPhone />
                <span>{SHOP_INFO.phone1}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-yellow-200 transition-colors"
              >
                <FaWhatsapp />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-rose-600 font-semibold text-sm uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-2">Our Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse our diverse collection of handcrafted sculptures</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const gradients = [
                "from-rose-500 to-pink-500",
                "from-orange-500 to-amber-500",
                "from-emerald-500 to-teal-500",
                "from-purple-500 to-indigo-500",
              ];
              return (
                <Link
                  key={category.id}
                  href={`/sculptures?category=${category.id}`}
                  className="group bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 card-hover"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${gradients[index % 4]} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <FiStar className="text-white text-2xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-rose-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.sculpture_count} items</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Sculptures */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">Handpicked</span>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2">Featured Sculptures</h2>
              <p className="text-gray-600">Our most popular and exquisite pieces</p>
            </div>
            <Button href="/sculptures" variant="outline" rightIcon={<FiArrowRight />}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSculptures.map((sculpture) => (
              <SculptureCard key={sculpture.id} sculpture={sculpture} />
            ))}
          </div>
        </div>
      </section>

      {/* All Sculptures with Filter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Collection</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-2">Browse All Sculptures</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search and filter to find the perfect sculpture for your needs
            </p>
          </div>

          <SearchFilter
            categories={categories}
            materials={materials}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />

          {isLoading ? (
            <SculptureGridSkeleton count={8} />
          ) : filteredSculptures.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSculptures.map((sculpture) => (
                <SculptureCard key={sculpture.id} sculpture={sculpture} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg mb-4">No sculptures found matching your criteria</p>
              <Button onClick={() => setFilters({})}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Promise</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-2">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Craftsmanship</h3>
              <p className="text-gray-600">Each sculpture is meticulously handcrafted with attention to every detail</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Years of Experience</h3>
              <p className="text-gray-600">
                Traditional techniques passed down through generations of master sculptors
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Orders Welcome</h3>
              <p className="text-gray-600">We create personalized sculptures based on your specifications and vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-rose-300 mb-6 border border-rose-500/30">
            🎨 Custom Creations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
            Have a Custom Sculpture in Mind?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Share your ideas with us and we&apos;ll bring your vision to life. From god statues to memorial busts, we
            craft it all.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/custom-order" size="lg" variant="primary">
              Request Custom Sculpture
            </Button>
            <Button href={whatsappUrl} external size="lg" variant="whatsapp" leftIcon={<FaWhatsapp />}>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
