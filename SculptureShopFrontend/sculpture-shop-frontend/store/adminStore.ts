// ============================================
// Zustand Store for Admin Authentication
// ============================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  isAuthenticated: boolean;
  adminId: number | null;
  username: string | null;
  fullName: string | null;
  login: (id: number, username: string, fullName: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminId: null,
      username: null,
      fullName: null,

      login: (id: number, username: string, fullName: string) => {
        set({
          isAuthenticated: true,
          adminId: id,
          username,
          fullName,
        });
      },

      logout: () => {
        localStorage.removeItem("admin_token");
        set({
          isAuthenticated: false,
          adminId: null,
          username: null,
          fullName: null,
        });
      },
    }),
    {
      name: "admin-auth-storage",
    },
  ),
);
