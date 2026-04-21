import { create } from "zustand";
import { Billionaire, Product } from "@/types";
import { initialProducts } from "@/data/products";

interface SpendingState {
  selectedBillionaire: Billionaire | null;
  products: Product[];
  customProducts: Product[];
  receiptDate: string;
  receiptTransactionId: string;

  // Actions
  selectBillionaire: (billionaire: Billionaire) => void;
  updateProductCount: (productId: string, count: number) => void;
  addCustomProduct: (name: string, price: number) => void;
  removeCustomProduct: (productId: string) => void;
  reset: () => void;
}

const generateReceiptId = (length: number = 6): string =>
  Math.random().toString(36).substring(2, 2 + length).toUpperCase();

const createReceiptMetadata = () => ({
  receiptDate: new Date().toLocaleDateString("en-US"),
  receiptTransactionId: generateReceiptId(),
});

const resetProductCount = (product: Product): Product => ({
  ...product,
  count: 0,
});

const createInitialProducts = (): Product[] => initialProducts.map(resetProductCount);

export const useSpendingStore = create<SpendingState>((set, get) => ({
  selectedBillionaire: null,
  products: createInitialProducts(),
  customProducts: [],
  ...createReceiptMetadata(),

  selectBillionaire: (billionaire) => {
    const { customProducts } = get();
    set({
      selectedBillionaire: billionaire,
      // Reset counts but keep custom products
      products: createInitialProducts(),
      customProducts: customProducts.map(resetProductCount),
      ...createReceiptMetadata(),
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
          return { ...p, count: newCount };
        }
        return p;
      });

      const newSpent = [...products, ...newCustomProducts].reduce(
        (acc, p) => acc + p.price * p.count,
        0
      );

      if (newSpent <= selectedBillionaire.netWorth) {
        set({ customProducts: newCustomProducts });
      }
    } else {
      const newProducts = products.map((p) => {
        if (p.id === productId) {
          const newCount = Math.max(0, count);
          return { ...p, count: newCount };
        }
        return p;
      });

      const newSpent = [...newProducts, ...customProducts].reduce(
        (acc, p) => acc + p.price * p.count,
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
      products: createInitialProducts(),
      customProducts: [],
      ...createReceiptMetadata(),
    });
  },
}));

export const selectAllProducts = (state: SpendingState) => [
  ...state.products,
  ...state.customProducts,
];

export const selectPurchasedProducts = (state: SpendingState) =>
  selectAllProducts(state).filter((product) => product.count > 0);

export const selectSpent = (state: SpendingState) =>
  selectAllProducts(state).reduce(
    (total, product) => total + product.price * product.count,
    0
  );

export const selectBalance = (state: SpendingState) =>
  state.selectedBillionaire ? state.selectedBillionaire.netWorth - selectSpent(state) : 0;

export const selectItemCount = (state: SpendingState) =>
  selectPurchasedProducts(state).length;

export const selectProductById =
  (productId: string) => (state: SpendingState) =>
    state.products.find((product) => product.id === productId) ??
    state.customProducts.find((product) => product.id === productId);
