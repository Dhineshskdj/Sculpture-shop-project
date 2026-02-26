"use client";

// ============================================
// Sculpture Details Page
// ============================================

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiPlus, FiCheck, FiShare2, FiArrowLeft, FiTag, FiBox, FiLayers } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Sculpture, SculptureImage } from "@/types";
import { ImageGallery, Button, SculptureCard, DetailPageSkeleton } from "@/components";
import { useSelectedSculpturesStore } from "@/store";
import {
  formatPrice,
  formatDimensions,
  formatWeight,
  getWhatsAppUrl,
  generateSculptureInquiryMessage,
} from "@/utils/helpers";
import { SHOP_INFO } from "@/utils/constants";

// Dummy sculpture data
const DUMMY_SCULPTURE: Sculpture = {
  id: 1,
  name: "Lord Ganesha - Classic",
  slug: "lord-ganesha-classic",
  description: `This beautiful granite statue of Lord Ganesha is hand-carved by our master sculptors with intricate details and traditional craftsmanship. 

The statue depicts Lord Ganesha in the classic sitting posture (Lalitasana), with his trunk gracefully curved to the left, symbolizing wisdom and success.

**Key Features:**
- Hand-carved from premium quality granite
- Traditional South Indian style
- Intricate detailing on ornaments and clothing
- Weather-resistant, suitable for both indoor and outdoor placement
- Polished finish for enhanced beauty

**Symbolism:**
Lord Ganesha is revered as the remover of obstacles and the god of beginnings. This statue is perfect for homes, offices, temples, and gardens.`,
  dimensions: "60cm x 40cm x 30cm",
  height_cm: 60,
  width_cm: 40,
  depth_cm: 30,
  weight_kg: 45,
  price: 25000,
  is_featured: true,
  is_available: true,
  view_count: 150,
  category_id: 1,
  category_name: "God Statues",
  material_id: 1,
  material_name: "Granite",
  created_at: "2024-01-15",
};

const DUMMY_IMAGES: SculptureImage[] = [
  {
    id: 1,
    sculpture_id: 1,
    image_url: "https://placehold.co/800x800/e2e8f0/64748b?text=Ganesha+Front",
    alt_text: "Front view",
    is_primary: true,
    display_order: 1,
  },
  {
    id: 2,
    sculpture_id: 1,
    image_url: "https://placehold.co/800x800/e2e8f0/64748b?text=Ganesha+Side",
    alt_text: "Side view",
    is_primary: false,
    display_order: 2,
  },
  {
    id: 3,
    sculpture_id: 1,
    image_url: "https://placehold.co/800x800/e2e8f0/64748b?text=Ganesha+Back",
    alt_text: "Back view",
    is_primary: false,
    display_order: 3,
  },
  {
    id: 4,
    sculpture_id: 1,
    image_url: "https://placehold.co/800x800/e2e8f0/64748b?text=Ganesha+Detail",
    alt_text: "Detail",
    is_primary: false,
    display_order: 4,
  },
];

const RELATED_SCULPTURES: Sculpture[] = [
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
    id: 8,
    name: "Lakshmi Devi",
    slug: "lakshmi-devi",
    price: 65000,
    is_featured: false,
    is_available: true,
    view_count: 85,
    category_name: "God Statues",
    material_name: "Bronze",
    primary_image: "https://placehold.co/400x300/e2e8f0/64748b?text=Lakshmi",
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

export default function SculptureDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [sculpture, setSculpture] = useState<Sculpture | null>(null);
  const [images, setImages] = useState<SculptureImage[]>([]);
  const [relatedSculptures, setRelatedSculptures] = useState<Sculpture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { addSculpture, removeSculpture, isSculptureSelected } = useSelectedSculpturesStore();
  const isSelected = sculpture ? isSculptureSelected(sculpture.id) : false;

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSculpture(DUMMY_SCULPTURE);
      setImages(DUMMY_IMAGES);
      setRelatedSculptures(RELATED_SCULPTURES);
      setIsLoading(false);
    };

    fetchData();
  }, [slug]);

  const handleToggleSelect = () => {
    if (!sculpture) return;
    if (isSelected) {
      removeSculpture(sculpture.id);
    } else {
      addSculpture(sculpture);
    }
  };

  const handleShare = async () => {
    if (navigator.share && sculpture) {
      try {
        await navigator.share({
          title: sculpture.name,
          text: `Check out this beautiful sculpture: ${sculpture.name}`,
          url: window.location.href,
        });
      } catch (error) {
        // Copy to clipboard fallback
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (!sculpture) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sculpture Not Found</h1>
        <p className="text-gray-600 mb-8">The sculpture you&apos;re looking for doesn&apos;t exist.</p>
        <Button href="/sculptures">Browse All Sculptures</Button>
      </div>
    );
  }

  const whatsappMessage = generateSculptureInquiryMessage("Customer", "Mobile", [
    { id: sculpture.id, name: sculpture.name, price: sculpture.price },
  ]);
  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, whatsappMessage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-amber-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/sculptures" className="hover:text-amber-600">
                Sculptures
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{sculpture.name}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <Button href="/sculptures" variant="outline" size="sm" leftIcon={<FiArrowLeft />} className="mb-6">
          Back to Sculptures
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={images} sculptureNam={sculpture.name} />
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg p-6 shadow-md h-fit">
            {/* Category */}
            {sculpture.category_name && (
              <Link
                href={`/sculptures?category=${sculpture.category_id}`}
                className="inline-block text-sm text-amber-600 font-medium mb-2 hover:underline"
              >
                {sculpture.category_name}
              </Link>
            )}

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{sculpture.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-amber-600">{formatPrice(sculpture.price)}</span>
              {sculpture.is_available ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Available
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Sold Out</span>
              )}
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FiTag className="text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500">Material</p>
                  <p className="font-medium text-gray-800">{sculpture.material_name || "Not specified"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiBox className="text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500">Dimensions</p>
                  <p className="font-medium text-gray-800">
                    {sculpture.dimensions ||
                      formatDimensions(sculpture.height_cm, sculpture.width_cm, sculpture.depth_cm)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiLayers className="text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="font-medium text-gray-800">{formatWeight(sculpture.weight_kg)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FiLayers className="text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500">Views</p>
                  <p className="font-medium text-gray-800">{sculpture.view_count}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {sculpture.is_available && (
                <Button
                  onClick={handleToggleSelect}
                  variant={isSelected ? "success" : "primary"}
                  size="lg"
                  fullWidth
                  leftIcon={isSelected ? <FiCheck /> : <FiPlus />}
                >
                  {isSelected ? "Added to Selection" : "Add to Selection"}
                </Button>
              )}
              <Button href={whatsappUrl} external variant="whatsapp" size="lg" fullWidth leftIcon={<FaWhatsapp />}>
                Enquire on WhatsApp
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              <Button onClick={handleShare} variant="outline" size="sm" leftIcon={<FiShare2 />}>
                Share
              </Button>
              <Button href="/contact" variant="outline" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
          <div className="prose prose-amber max-w-none text-gray-600 whitespace-pre-line">{sculpture.description}</div>
        </div>

        {/* Related Sculptures */}
        {relatedSculptures.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Sculptures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSculptures.map((item) => (
                <SculptureCard key={item.id} sculpture={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
