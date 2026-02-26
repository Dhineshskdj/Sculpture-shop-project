"use client";

// ============================================
// Admin Layout
// ============================================

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";
import { SHOP_INFO, ADMIN_NAV_LINKS } from "@/utils/constants";
import {
  FiHome,
  FiBox,
  FiGrid,
  FiMessageSquare,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiDollarSign,
} from "react-icons/fi";

const ICON_MAP: { [key: string]: React.ReactNode } = {
  "/admin": <FiHome />,
  "/admin/sculptures": <FiBox />,
  "/admin/categories": <FiGrid />,
  "/admin/inquiries": <FiMessageSquare />,
  "/admin/custom-requests": <FiFileText />,
  "/admin/payment-info": <FiDollarSign />,
  "/admin/settings": <FiSettings />,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, admin, logout } = useAdminStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  // Don't show layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show nothing while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">{SHOP_INFO.name}</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {ADMIN_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-lg">{ICON_MAP[link.href]}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{admin?.username || "Admin"}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>

            {/* Page Title */}
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">
                {ADMIN_NAV_LINKS.find(
                  (link) => pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href)),
                )?.label || "Dashboard"}
              </h2>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-sm text-amber-600 hover:text-amber-700">
                View Website →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
