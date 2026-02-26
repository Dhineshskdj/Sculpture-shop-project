"use client";

// ============================================
// Header Component
// ============================================

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiShoppingBag, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS, SHOP_INFO } from "@/utils/constants";
import { useSelectedSculpturesStore } from "@/store";
import { getWhatsAppUrl } from "@/utils/helpers";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selectedCount = useSelectedSculpturesStore((state) => state.selectedSculptures.length);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, `Hello! I'm visiting your website and have a question.`);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${SHOP_INFO.phone1}`}
              className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
            >
              <FiPhone size={14} />
              <span>{SHOP_INFO.phone1}</span>
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href={`tel:${SHOP_INFO.phone2}`}
              className="hidden sm:flex items-center gap-1 hover:text-yellow-200 transition-colors"
            >
              <FiPhone size={14} />
              <span>{SHOP_INFO.phone2}</span>
            </a>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-200 transition-colors"
          >
            <FaWhatsapp size={16} />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
              {SHOP_INFO.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Selected Sculptures Badge */}
            <Link href="/selected" className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors">
              <FiShoppingBag size={24} />
              {selectedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-600 to-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {selectedCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-rose-600"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-rose-100">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium py-2 px-2 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
