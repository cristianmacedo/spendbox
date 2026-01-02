import { create } from "zustand";
import { Billionaire, Product } from "@/types";
import { initialProducts } from "@/data/products";

interface SpendingState {
  selectedBillionaire: Billionaire | null;
  products: Product[];

  // Computed values (derived in selectors)
  getSpent: () => number;
  getBalance: () => number;

  // Actions
  selectBillionaire: (billionaire: Billionaire) => void;
  updateProductCount: (productId: string, count: number) => void;
  reset: () => void;
}

export const useSpendingStore = create<SpendingState>((set, get) => ({
  selectedBillionaire: null,
  products: initialProducts.map((p) => ({ ...p, count: 0, total: 0 })),

  getSpent: () => {
    const { products } = get();
    return products.reduce((acc, p) => acc + p.price * p.count, 0);
  },

  getBalance: () => {
    const { selectedBillionaire, products } = get();
    if (!selectedBillionaire) return 0;
    const spent = products.reduce((acc, p) => acc + p.price * p.count, 0);
    return selectedBillionaire.netWorth - spent;
  },

  selectBillionaire: (billionaire) => {
    set({
      selectedBillionaire: billionaire,
      // Reset products when selecting new billionaire
      products: initialProducts.map((p) => ({ ...p, count: 0, total: 0 })),
    });
  },

  updateProductCount: (productId, count) => {
    if (count < 0) return;

    const { products, selectedBillionaire } = get();
    if (!selectedBillionaire) return;

    // Calculate what the new spent would be
    const newProducts = products.map((p) => {
      if (p.id === productId) {
        const newCount = Math.max(0, count);
        return {
          ...p,
          count: newCount,
          total: p.price * newCount,
        };
      }
      return p;
    });

    const newSpent = newProducts.reduce((acc, p) => acc + p.total, 0);

    // Only allow if we have enough balance
    if (newSpent <= selectedBillionaire.netWorth) {
      set({ products: newProducts });
    }
  },

  reset: () => {
    set({
      selectedBillionaire: null,
      products: initialProducts.map((p) => ({ ...p, count: 0, total: 0 })),
    });
  },
}));

// Selectors for computed values
export const useSpent = () => useSpendingStore((state) => state.getSpent());
export const useBalance = () => useSpendingStore((state) => state.getBalance());
export const useSelectedBillionaire = () =>
  useSpendingStore((state) => state.selectedBillionaire);
export const useProducts = () => useSpendingStore((state) => state.products);
