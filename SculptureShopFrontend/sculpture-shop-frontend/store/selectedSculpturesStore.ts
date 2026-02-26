// ============================================
// Zustand Store for Selected Sculptures
// ============================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Sculpture } from "@/types";

interface SelectedSculpturesState {
  selectedSculptures: Sculpture[];
  addSculpture: (sculpture: Sculpture) => void;
  removeSculpture: (sculptureId: number) => void;
  clearSculptures: () => void;
  isSculptureSelected: (sculptureId: number) => boolean;
  getSelectedCount: () => number;
}

export const useSelectedSculpturesStore = create<SelectedSculpturesState>()(
  persist(
    (set, get) => ({
      selectedSculptures: [],

      addSculpture: (sculpture: Sculpture) => {
        const exists = get().selectedSculptures.some((s) => s.id === sculpture.id);
        if (!exists) {
          set((state) => ({
            selectedSculptures: [...state.selectedSculptures, sculpture],
          }));
        }
      },

      removeSculpture: (sculptureId: number) => {
        set((state) => ({
          selectedSculptures: state.selectedSculptures.filter((s) => s.id !== sculptureId),
        }));
      },

      clearSculptures: () => {
        set({ selectedSculptures: [] });
      },

      isSculptureSelected: (sculptureId: number) => {
        return get().selectedSculptures.some((s) => s.id === sculptureId);
      },

      getSelectedCount: () => {
        return get().selectedSculptures.length;
      },
    }),
    {
      name: "selected-sculptures-storage",
    },
  ),
);
