"use client";

// ============================================
// Selected Sculptures Page
// ============================================

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiTrash2, FiArrowRight, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components";
import { useSelectedSculpturesStore } from "@/store";
import { formatPrice, getWhatsAppUrl, generateSculptureInquiryMessage, getPlaceholderImage } from "@/utils/helpers";
import { SHOP_INFO } from "@/utils/constants";

export default function SelectedSculpturesPage() {
  const { selectedSculptures, removeSculpture, clearSculptures } = useSelectedSculpturesStore();

  const totalPrice = selectedSculptures.reduce((sum, s) => sum + s.price, 0);

  const whatsappMessage = generateSculptureInquiryMessage(
    "Customer Name",
    "Mobile Number",
    selectedSculptures.map((s) => ({ id: s.id, name: s.name, price: s.price })),
  );
  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, whatsappMessage);

  if (selectedSculptures.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="text-gray-400 text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">No Sculptures Selected</h1>
            <p className="text-gray-600 mb-8">
              Browse our collection and add sculptures to your selection to enquire about them.
            </p>
            <Button href="/sculptures" size="lg" leftIcon={<FiArrowLeft />}>
              Browse Sculptures
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Selected Sculptures</h1>
            <p className="text-gray-600">{selectedSculptures.length} item(s) selected</p>
          </div>
          <Button onClick={clearSculptures} variant="outline" leftIcon={<FiTrash2 />}>
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sculpture List */}
          <div className="lg:col-span-2 space-y-4">
            {selectedSculptures.map((sculpture) => (
              <div key={sculpture.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                {/* Image */}
                <Link href={`/sculptures/${sculpture.slug}`} className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={sculpture.primary_image || getPlaceholderImage(96, 96)}
                    alt={sculpture.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1">
                  <Link
                    href={`/sculptures/${sculpture.slug}`}
                    className="font-semibold text-gray-800 hover:text-amber-600"
                  >
                    {sculpture.name}
                  </Link>
                  <p className="text-sm text-gray-500">{sculpture.category_name}</p>
                  <p className="text-sm text-gray-500">{sculpture.material_name}</p>
                  <p className="font-bold text-amber-600 mt-1">{formatPrice(sculpture.price)}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeSculpture(sculpture.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors self-start"
                  aria-label="Remove from selection"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>

              {/* Items */}
              <div className="space-y-2 mb-4 pb-4 border-b">
                {selectedSculptures.map((sculpture) => (
                  <div key={sculpture.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate max-w-[180px]">{sculpture.name}</span>
                    <span className="text-gray-800 font-medium">{formatPrice(sculpture.price)}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-800">Total Value</span>
                <span className="text-2xl font-bold text-amber-600">{formatPrice(totalPrice)}</span>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                * Prices are indicative. Final price may vary based on customization and delivery location.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button href={whatsappUrl} external variant="whatsapp" size="lg" fullWidth leftIcon={<FaWhatsapp />}>
                  Enquire on WhatsApp
                </Button>
                <Button href="/contact" variant="primary" size="lg" fullWidth rightIcon={<FiArrowRight />}>
                  Contact Form
                </Button>
                <Button href="/payment" variant="outline" size="lg" fullWidth>
                  View Payment Options
                </Button>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 text-center">
                <Link
                  href="/sculptures"
                  className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1"
                >
                  <FiArrowLeft size={16} />
                  Continue Browsing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
