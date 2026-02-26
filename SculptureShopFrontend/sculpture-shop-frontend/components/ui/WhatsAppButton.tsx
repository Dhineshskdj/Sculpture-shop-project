"use client";

// ============================================
// WhatsApp Button Component
// ============================================

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl } from "@/utils/helpers";
import { SHOP_INFO } from "@/utils/constants";

interface WhatsAppButtonProps {
  message?: string;
  variant?: "fixed" | "inline" | "full";
  className?: string;
  children?: React.ReactNode;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hello! I visited your website and have a question.",
  variant = "inline",
  className = "",
  children,
}) => {
  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, message);

  // Fixed floating button (bottom-right)
  if (variant === "fixed") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-110 transition-all duration-300 animate-bounce ${className}`}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    );
  }

  // Full width button
  if (variant === "full") {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 ${className}`}
      >
        <FaWhatsapp size={22} />
        {children || "Chat on WhatsApp"}
      </a>
    );
  }

  // Inline button (default)
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30 ${className}`}
    >
      <FaWhatsapp size={20} />
      {children || "WhatsApp"}
    </a>
  );
};

export default WhatsAppButton;
