"use client";

// ============================================
// Sculpture Card Component
// ============================================

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiPlus, FiCheck, FiEye } from "react-icons/fi";
import { Sculpture } from "@/types";
import { formatPrice, getPlaceholderImage } from "@/utils/helpers";
import { useSelectedSculpturesStore } from "@/store";

interface SculptureCardProps {
  sculpture: Sculpture;
  showAddButton?: boolean;
  variant?: "default" | "horizontal";
}

const SculptureCard: React.FC<SculptureCardProps> = ({ sculpture, showAddButton = true, variant = "default" }) => {
  const { addSculpture, removeSculpture, isSculptureSelected } = useSelectedSculpturesStore();
  const isSelected = isSculptureSelected(sculpture.id);

  const handleToggleSelect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelected) {
      removeSculpture(sculpture.id);
    } else {
      addSculpture(sculpture);
    }
  };

  const imageUrl = sculpture.primary_image || getPlaceholderImage(400, 300);

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 card-hover">
      {/* Image Container */}
      <Link href={`/sculptures/${sculpture.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={sculpture.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Featured Badge */}
        {sculpture.is_featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            ✨ Featured
          </span>
        )}

        {/* Availability Badge */}
        {!sculpture.is_available && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Sold Out
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="flex items-center gap-2 text-white bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <FiEye />
            View Details
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {sculpture.category_name && (
          <p className="text-xs text-rose-600 font-semibold mb-1 uppercase tracking-wider">{sculpture.category_name}</p>
        )}

        {/* Name */}
        <Link href={`/sculptures/${sculpture.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-rose-600 transition-colors line-clamp-1">
            {sculpture.name}
          </h3>
        </Link>

        {/* Material */}
        {sculpture.material_name && <p className="text-sm text-gray-500 mt-1">{sculpture.material_name}</p>}

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            {formatPrice(sculpture.price)}
          </span>

          {showAddButton && sculpture.is_available && (
            <button
              onClick={handleToggleSelect}
              className={`p-2 rounded-full transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                  : "bg-rose-100 text-rose-600 hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-500 hover:text-white hover:shadow-lg"
              }`}
              title={isSelected ? "Remove from selection" : "Add to selection"}
            >
              {isSelected ? <FiCheck size={18} /> : <FiPlus size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SculptureCard;
