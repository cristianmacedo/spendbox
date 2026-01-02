import { create } from "zustand";
import { Billionaire, Product } from "@/types";
import { initialProducts } from "@/data/products";

interface SpendingState {
  selectedBillionaire: Billionaire | null;
  products: Product[];
  customProducts: Product[];

  // Computed values (derived in selectors)
  getSpent: () => number;
  getBalance: () => number;
  getAllProducts: () => Product[];

  // Actions
  selectBillionaire: (billionaire: Billionaire) => void;
  updateProductCount: (productId: string, count: number) => void;
  addCustomProduct: (name: string, price: number) => void;
  removeCustomProduct: (productId: string) => void;
  reset: () => void;
}

export const useSpendingStore = create<SpendingState>((set, get) => ({
  selectedBillionaire: null,
  products: initialProducts.map((p) => ({ ...p, count: 0, total: 0 })),
  customProducts: [],

  getSpent: () => {
    const { products, customProducts } = get();
    const allProducts = [...products, ...customProducts];
    return allProducts.reduce((acc, p) => acc + p.price * p.count, 0);
  },

  getBalance: () => {
    const { selectedBillionaire, products, customProducts } = get();
    if (!selectedBillionaire) return 0;
    const allProducts = [...products, ...customProducts];
    const spent = allProducts.reduce((acc, p) => acc + p.price * p.count, 0);
    return selectedBillionaire.netWorth - spent;
  },

  getAllProducts: () => {
    const { products, customProducts } = get();
    return [...products, ...customProducts];
  },

  selectBillionaire: (billionaire) => {
    const { customProducts } = get();
    set({
      selectedBillionaire: billionaire,
      // Reset counts but keep custom products
      products: initialProducts.map((p) => ({ ...p, count: 0, total: 0 })),
      customProducts: customProducts.map((p) => ({ ...p, count: 0, total: 0 })),
    });
  },

  updateProductCount: (productId, count) => {
    if (count < 0) return;

    const { products, customProducts, selectedBillionaire } = get();
    if (!selectedBillionaire) return;

    // Check if it's a custom product
    const isCustom = customProducts.some((p) => p.id === productId);

    if (isCustom) {
      const newCustomProducts = customProducts.map((p) => {
        if (p.id === productId) {
          const newCount = Math.max(0, count);
          return { ...p, count: newCount, total: p.price * newCount };
        }
        return p;
      });

      const newSpent = [...products, ...newCustomProducts].reduce(
        (acc, p) => acc + p.total,
        0
      );

      if (newSpent <= selectedBillionaire.netWorth) {
        set({ customProducts: newCustomProducts });
      }
    } else {
      const newProducts = products.map((p) => {
        if (p.id === productId) {
          const newCount = Math.max(0, count);
          return { ...p, count: newCount, total: p.price * newCount };
        }
        return p;
      });

      const newSpent = [...newProducts, ...customProducts].reduce(
        (acc, p) => acc + p.total,
        0
      );

      if (newSpent <= selectedBillionaire.netWorth) {
        set({ products: newProducts });
      }
    }
  },

  addCustomProduct: (name, price) => {
    const { customProducts } = get();
    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name,
      type: "Custom",
      image: "", // Empty string for custom products
      price,
      count: 0,
      total: 0,
      isCustom: true,
    };
    set({ customProducts: [...customProducts, newProduct] });
  },

  removeCustomProduct: (productId) => {
    const { customProducts } = get();
    set({ customProducts: customProducts.filter((p) => p.id !== productId) });
  },

  reset: () => {
    set({
      selectedBillionaire: null,
      products: initialProducts.map((p) => ({ ...p, count: 0, total: 0 })),
      customProducts: [],
    });
  },
}));

// Selectors for computed values
export const useSpent = () => useSpendingStore((state) => state.getSpent());
export const useBalance = () => useSpendingStore((state) => state.getBalance());
export const useSelectedBillionaire = () =>
  useSpendingStore((state) => state.selectedBillionaire);
export const useProducts = () => useSpendingStore((state) => state.products);
