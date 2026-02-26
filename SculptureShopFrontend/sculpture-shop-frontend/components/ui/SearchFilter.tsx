"use client";

// ============================================
// Search Filter Component
// ============================================

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";
import { Category, Material, SculptureFilters } from "@/types";
import { PRICE_RANGES } from "@/utils/constants";

interface SearchFilterProps {
  categories: Category[];
  materials: Material[];
  filters?: SculptureFilters;
  onFilterChange: (filters: SculptureFilters) => void;
  onSearch: (searchTerm: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  categories,
  materials,
  filters: filtersProp,
  onFilterChange,
  onSearch,
}) => {
  // Ensure filters is never undefined
  const filters = filtersProp ?? {};
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search - properly cleanup on unmount
  useEffect(() => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleCategoryChange = (categoryId: number | undefined) => {
    onFilterChange({ ...filters, category_id: categoryId });
  };

  const handleMaterialChange = (materialId: number | undefined) => {
    onFilterChange({ ...filters, material_id: materialId });
  };

  const handlePriceRangeChange = (index: number) => {
    const range = PRICE_RANGES[index];
    onFilterChange({
      ...filters,
      min_price: range.min,
      max_price: range.max,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    onFilterChange({});
    onSearch("");
  };

  const hasActiveFilters =
    filters?.category_id ||
    filters?.material_id ||
    filters?.min_price !== undefined ||
    filters?.max_price !== undefined ||
    searchTerm;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-6 border border-gray-100">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search sculptures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-gray-50 text-gray-900"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" size={20} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 transition-all duration-300 ${
            isFilterOpen || hasActiveFilters
              ? "bg-gradient-to-r from-rose-500 to-orange-500 border-transparent text-white shadow-lg shadow-rose-500/30"
              : "border-gray-200 text-gray-700 hover:border-rose-300 hover:text-rose-600"
          }`}
        >
          <FiFilter size={18} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && !isFilterOpen && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
        </button>
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={filters?.category_id || ""}
              onChange={(e) => handleCategoryChange(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-gray-50 text-gray-900"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
            <select
              value={filters?.material_id || ""}
              onChange={(e) => handleMaterialChange(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-gray-50 text-gray-900"
            >
              <option value="">All Materials</option>
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
            <select
              value={PRICE_RANGES.findIndex((r) => r.min === filters?.min_price && r.max === filters?.max_price)}
              onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-gray-50 text-gray-900"
            >
              {PRICE_RANGES.map((range, index) => (
                <option key={index} value={index}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full px-4 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
