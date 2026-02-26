"use client";

// ============================================
// Footer Component
// ============================================

import React from "react";
import Link from "next/link";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { SHOP_INFO, NAV_LINKS } from "@/utils/constants";
import { getWhatsAppUrl } from "@/utils/helpers";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(SHOP_INFO.whatsappNumber, `Hello! I'm interested in your sculptures.`);

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-pink-500"></div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent mb-4">
              {SHOP_INFO.name}
            </h3>
            <p className="text-gray-400 mb-4">
              Specializing in handcrafted sculptures including God statues, custom sculptures, and memorial pieces.
              Quality craftsmanship with years of experience.
            </p>
            <div className="flex gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110"
              >
                <FaWhatsapp size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-400 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sculptures?category=1"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all"></span>
                  God Statues
                </Link>
              </li>
              <li>
                <Link
                  href="/sculptures?category=2"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all"></span>
                  Custom Work
                </Link>
              </li>
              <li>
                <Link
                  href="/sculptures?category=3"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all"></span>
                  Stone Sculptures
                </Link>
              </li>
              <li>
                <Link
                  href="/sculptures?category=5"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all"></span>
                  Garden Sculptures
                </Link>
              </li>
              <li>
                <Link
                  href="/sculptures?category=6"
                  className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all"></span>
                  Temple Sculptures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="text-rose-400 mt-1 flex-shrink-0" />
                <div>
                  <a href={`tel:${SHOP_INFO.phone1}`} className="text-gray-400 hover:text-white block">
                    {SHOP_INFO.phone1}
                  </a>
                  <a href={`tel:${SHOP_INFO.phone2}`} className="text-gray-400 hover:text-white block">
                    {SHOP_INFO.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-orange-400 mt-1 flex-shrink-0" />
                <a href={`mailto:${SHOP_INFO.email}`} className="text-gray-400 hover:text-white">
                  {SHOP_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-pink-400 mt-1 flex-shrink-0" />
                <a
                  href={SHOP_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  {SHOP_INFO.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="text-teal-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{SHOP_INFO.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-500 text-sm">
              © {currentYear} {SHOP_INFO.name}. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Crafted with <span className="text-rose-500">❤️</span> in Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
