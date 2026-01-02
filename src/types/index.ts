export interface Billionaire {
  id: string;
  name: string;
  image: string;
  netWorth: number;
  source: string;
  bio: string;
  isCustom?: boolean;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  count: number;
  total: number;
}

export interface SpendingState {
  selectedBillionaire: Billionaire | null;
  products: Product[];
  spent: number;
  balance: number;

  // Actions
  selectBillionaire: (billionaire: Billionaire) => void;
  updateProductCount: (productId: string, count: number) => void;
  reset: () => void;
}
