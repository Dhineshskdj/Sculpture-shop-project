"use client";

// ============================================
// Image Gallery Component
// ============================================

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from "react-icons/fi";
import { SculptureImage } from "@/types";
import { getPlaceholderImage } from "@/utils/helpers";

interface ImageGalleryProps {
  images: SculptureImage[];
  sculptureNam: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, sculptureNam: sculptureName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Use placeholder if no images
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: 0,
            sculpture_id: 0,
            image_url: getPlaceholderImage(800, 600),
            alt_text: "No image",
            is_primary: true,
            display_order: 0,
          },
        ];

  const currentImage = displayImages[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={currentImage.image_url}
          alt={currentImage.alt_text || sculptureName}
          fill
          className="object-contain cursor-pointer"
          sizes="(max-width: 768px) 100vw, 50vw"
          onClick={openLightbox}
          priority
        />

        {/* Zoom Icon */}
        <button
          onClick={openLightbox}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <FiZoomIn size={20} />
        </button>

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                index === selectedIndex ? "border-amber-500" : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={image.image_url}
                alt={image.alt_text || `${sculptureName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <FiX size={32} />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                <FiChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                <FiChevronRight size={32} />
              </button>
            </>
          )}

          <div className="relative w-full h-full max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage.image_url}
              alt={currentImage.alt_text || sculptureName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Image Counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {selectedIndex + 1} / {displayImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
