import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        const exists = get().items.some((i) => i.id === product.id);
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== product.id) });
        } else {
          if (get().items.length >= 4) return;
          set({ items: [...get().items, product] });
        }
      },

      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      isCompared: (id) => get().items.some((i) => i.id === id),

      clearCompare: () => set({ items: [] }),
    }),
    { name: 'appleon-compare' }
  )
);
