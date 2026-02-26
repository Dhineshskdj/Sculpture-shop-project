"use client";

// ============================================
// Sculptures Listing Page
// ============================================

import React, { useState, useEffect, useCallback } from "react";
import { Sculpture, Category, Material, SculptureFilters } from "@/types";
import { SculptureCard, SearchFilter, PageLoader, SculptureCardSkeleton } from "@/components";
import { FiGrid, FiList, FiFilter, FiX } from "react-icons/fi";

// Dummy data for development
const DUMMY_CATEGORIES: Category[] = [
  { id: 1, name: "Hindu Gods", slug: "hindu-gods", description: "", sculpture_count: 5, is_active: true },
  { id: 2, name: "Buddha Statues", slug: "buddha-statues", description: "", sculpture_count: 3, is_active: true },
  { id: 3, name: "Garden Sculptures", slug: "garden-sculptures", description: "", sculpture_count: 4, is_active: true },
  { id: 4, name: "Temple Sculptures", slug: "temple-sculptures", description: "", sculpture_count: 6, is_active: true },
  { id: 5, name: "Abstract Art", slug: "abstract-art", description: "", sculpture_count: 2, is_active: true },
];

const DUMMY_MATERIALS: Material[] = [
  { id: 1, name: "Granite", description: "", is_active: true },
  { id: 2, name: "Marble", description: "", is_active: true },
  { id: 3, name: "Black Stone", description: "", is_active: true },
  { id: 4, name: "Sandstone", description: "", is_active: true },
];

const DUMMY_SCULPTURES: Sculpture[] = [
  {
    id: 1,
    name: "Lord Ganesha",
    slug: "lord-ganesha",
    description: "Beautiful handcrafted Lord Ganesha statue in granite stone. Perfect for home temples and gardens.",
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
    primary_image: "https://placehold.co/400x500/d4a373/fff?text=Ganesha",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name: "Buddha Meditation",
    slug: "buddha-meditation",
    description: "Serene Buddha in meditation pose, carved from white marble.",
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
    primary_image: "https://placehold.co/400x500/e9ecef/333?text=Buddha",
    created_at: "2024-02-10",
  },
  {
    id: 3,
    name: "Dancing Nataraja",
    slug: "dancing-nataraja",
    description: "Lord Shiva in cosmic dance form. Intricate details carved in black stone.",
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
    primary_image: "https://placehold.co/400x500/2d3436/fff?text=Nataraja",
    created_at: "2024-01-20",
  },
  {
    id: 4,
    name: "Temple Nandi",
    slug: "temple-nandi",
    description: "Traditional Nandi bull sculpture for temple entrances.",
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
    primary_image: "https://placehold.co/400x500/636e72/fff?text=Nandi",
    created_at: "2024-03-01",
  },
  {
    id: 5,
    name: "Garden Angel",
    slug: "garden-angel",
    description: "Elegant angel sculpture perfect for garden decoration.",
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
    is_available: true,
    primary_image: "https://placehold.co/400x500/dfe6e9/333?text=Angel",
    created_at: "2024-02-15",
  },
  {
    id: 6,
    name: "Goddess Lakshmi",
    slug: "goddess-lakshmi",
    description: "Beautiful Goddess Lakshmi with lotus flower details.",
    category_id: 1,
    category_name: "Hindu Gods",
    material_id: 1,
    material_name: "Granite",
    height: 36,
    width: 20,
    depth: 16,
    weight: 120,
    price: 55000,
    is_featured: true,
    is_available: true,
    primary_image: "https://placehold.co/400x500/d4a373/fff?text=Lakshmi",
    created_at: "2024-01-25",
  },
  {
    id: 7,
    name: "Zen Garden Buddha",
    slug: "zen-garden-buddha",
    description: "Small Buddha perfect for zen gardens and meditation spaces.",
    category_id: 2,
    category_name: "Buddha Statues",
    material_id: 4,
    material_name: "Sandstone",
    height: 24,
    width: 16,
    depth: 12,
    weight: 50,
    price: 25000,
    is_featured: false,
    is_available: true,
    primary_image: "https://placehold.co/400x500/f9ca24/333?text=Zen+Buddha",
    created_at: "2024-02-20",
  },
  {
    id: 8,
    name: "Temple Pillar",
    slug: "temple-pillar",
    description: "Ornate temple pillar with traditional carvings.",
    category_id: 4,
    category_name: "Temple Sculptures",
    material_id: 1,
    material_name: "Granite",
    height: 96,
    width: 12,
    depth: 12,
    weight: 500,
    price: 150000,
    is_featured: false,
    is_available: true,
    primary_image: "https://placehold.co/400x500/636e72/fff?text=Pillar",
    created_at: "2024-03-05",
  },
  {
    id: 9,
    name: "Lord Vishnu",
    slug: "lord-vishnu",
    description: "Majestic Lord Vishnu in standing pose with all four arms.",
    category_id: 1,
    category_name: "Hindu Gods",
    material_id: 3,
    material_name: "Black Stone",
    height: 48,
    width: 24,
    depth: 18,
    weight: 180,
    price: 68000,
    is_featured: true,
    is_available: true,
    primary_image: "https://placehold.co/400x500/2d3436/fff?text=Vishnu",
    created_at: "2024-02-01",
  },
  {
    id: 10,
    name: "Abstract Wave",
    slug: "abstract-wave",
    description: "Modern abstract sculpture representing ocean waves.",
    category_id: 5,
    category_name: "Abstract Art",
    material_id: 2,
    material_name: "Marble",
    height: 36,
    width: 48,
    depth: 12,
    weight: 100,
    price: 45000,
    is_featured: false,
    is_available: true,
    primary_image: "https://placehold.co/400x500/74b9ff/333?text=Wave",
    created_at: "2024-03-10",
  },
  {
    id: 11,
    name: "Garden Lion Pair",
    slug: "garden-lion-pair",
    description: "Pair of majestic lions for garden entrance or gates.",
    category_id: 3,
    category_name: "Garden Sculptures",
    material_id: 1,
    material_name: "Granite",
    height: 48,
    width: 60,
    depth: 30,
    weight: 350,
    price: 120000,
    is_featured: false,
    is_available: true,
    primary_image: "https://placehold.co/400x500/636e72/fff?text=Lions",
    created_at: "2024-02-25",
  },
  {
    id: 12,
    name: "Laughing Buddha",
    slug: "laughing-buddha",
    description: "Happy laughing Buddha bringing prosperity and good luck.",
    category_id: 2,
    category_name: "Buddha Statues",
    material_id: 4,
    material_name: "Sandstone",
    height: 18,
    width: 14,
    depth: 12,
    weight: 35,
    price: 18000,
    is_featured: false,
    is_available: true,
    primary_image: "https://placehold.co/400x500/f9ca24/333?text=Laughing+Buddha",
    created_at: "2024-03-15",
  },
];

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "price_low" | "price_high" | "name";

export default function SculpturesPage() {
  const [sculptures, setSculptures] = useState<Sculpture[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<SculptureFilters>({
    search: "",
    category_id: undefined,
    material_id: undefined,
    min_price: undefined,
    max_price: undefined,
  });

  // Simulate API call
  useEffect(() => {
    const fetchSculptures = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSculptures(DUMMY_SCULPTURES);
      setLoading(false);
    };

    fetchSculptures();
  }, []);

  // Filter and sort sculptures
  const filteredSculptures = React.useMemo(() => {
    let result = [...sculptures];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.description?.toLowerCase().includes(searchLower) ||
          s.category_name?.toLowerCase().includes(searchLower) ||
          s.material_name?.toLowerCase().includes(searchLower),
      );
    }

    // Apply category filter
    if (filters.category_id) {
      result = result.filter((s) => s.category_id === filters.category_id);
    }

    // Apply material filter
    if (filters.material_id) {
      result = result.filter((s) => s.material_id === filters.material_id);
    }

    // Apply price range filter
    if (filters.min_price !== undefined) {
      result = result.filter((s) => s.price >= (filters.min_price || 0));
    }
    if (filters.max_price !== undefined) {
      result = result.filter((s) => s.price <= (filters.max_price || Infinity));
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
        break;
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [sculptures, filters, sortBy]);

  const handleFilterChange = useCallback((newFilters: SculptureFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  }, []);

  const clearFilters = () => {
    setFilters({
      search: "",
      category_id: undefined,
      material_id: undefined,
      min_price: undefined,
      max_price: undefined,
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category_id !== undefined ||
    filters.material_id !== undefined ||
    filters.min_price !== undefined ||
    filters.max_price !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-rose-300 mb-4 border border-rose-500/30">
            🎨 Our Collection
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
            Our Sculptures
          </h1>
          <p className="text-gray-300 text-lg">Explore our collection of handcrafted stone sculptures</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-rose-300 transition-colors"
          >
            <FiFilter className="text-rose-500" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-72 flex-shrink-0 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <FiX />
                    Clear All
                  </button>
                )}
              </div>

              <SearchFilter
                categories={DUMMY_CATEGORIES}
                materials={DUMMY_MATERIALS}
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
              />

              {/* Close button for mobile */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden w-full mt-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Results count */}
              <p className="text-gray-600">
                {loading ? "Loading..." : `${filteredSculptures.length} sculptures found`}
              </p>

              <div className="flex items-center gap-4">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600 hidden sm:block">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {/* View mode toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid" ? "bg-amber-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Grid view"
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list" ? "bg-amber-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                    title="List view"
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                {[...Array(6)].map((_, i) => (
                  <SculptureCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredSculptures.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No sculptures found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearFilters} className="text-amber-600 hover:text-amber-700 font-medium">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Sculptures Grid/List */}
            {!loading && filteredSculptures.length > 0 && (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredSculptures.map((sculpture) => (
                  <SculptureCard
                    key={sculpture.id}
                    sculpture={sculpture}
                    variant={viewMode === "list" ? "horizontal" : "default"}
                  />
                ))}
              </div>
            )}

            {/* Load More Button (for future pagination) */}
            {!loading && filteredSculptures.length >= 12 && (
              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Load More Sculptures
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
