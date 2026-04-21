"use client";

import Image from "next/image";
import { Minus, Plus, Package, X } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import {
  selectBalance,
  selectProductById,
  useSpendingStore,
} from "@/store/spending-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ProductCardProps {
  productId: string;
}

const ProductCard = ({ productId }: ProductCardProps) => {
  const product = useSpendingStore(selectProductById(productId));
  const updateProductCount = useSpendingStore((state) => state.updateProductCount);
  const removeCustomProduct = useSpendingStore((state) => state.removeCustomProduct);
  const selectedBillionaire = useSpendingStore((state) => state.selectedBillionaire);
  const balance = useSpendingStore(selectBalance);

  if (!product) {
    return null;
  }

  const canBuy = Boolean(selectedBillionaire && balance >= product.price);

  const handleBuy = () => {
    updateProductCount(product.id, product.count + 1);
  };

  const handleSell = () => {
    if (product.count > 0) {
      updateProductCount(product.id, product.count - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      updateProductCount(product.id, value);
    } else if (e.target.value === "") {
      updateProductCount(product.id, 0);
    }
  };

  const handleRemoveCustom = () => {
    removeCustomProduct(product.id);
  };

  return (
    <div className="bg-primary-100 dark:bg-primary-950 p-3 rounded-xl flex flex-col w-full justify-between shadow-sm hover:shadow-md transition-shadow relative">
      {/* Remove button for custom products */}
      {product.isCustom && (
        <button
          onClick={handleRemoveCustom}
          className="absolute top-2 right-2 p-1 rounded-full bg-surface-200 dark:bg-primary-800 hover:bg-red-100 dark:hover:bg-red-900/50 text-surface-500 hover:text-red-500 dark:text-primary-400 dark:hover:text-red-400 transition-colors"
          title="Remove custom product"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wide text-xs uppercase opacity-80">
          {product.type}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-accent-500 text-accent-50 text-xs font-bold">
          {formatCurrency(product.price)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-primary-800 dark:text-primary-100 mb-2 pr-6">
        {product.name}
      </h3>

      <div className="flex items-center justify-center p-4">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            height={80}
            width={80}
            className="object-contain"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary-200 dark:bg-primary-800 flex items-center justify-center">
            <Package className="w-10 h-10 text-primary-500 dark:text-primary-400" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <Button
          variant="outline"
          onClick={handleSell}
          disabled={!selectedBillionaire || product.count === 0}
          className="min-w-[50px] h-10 border-primary-600 dark:border-primary-600 text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-900"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          type="number"
          min={0}
          value={product.count}
          onChange={handleInputChange}
          disabled={!selectedBillionaire}
          className="text-center bg-primary-50 dark:bg-primary-900 border-none text-primary-700 dark:text-primary-100 font-medium"
        />
        <Button
          onClick={handleBuy}
          disabled={!canBuy}
          className="min-w-[50px] h-10 bg-primary-600 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-500 text-white"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
