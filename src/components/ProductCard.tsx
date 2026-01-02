"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useSpendingStore } from "@/store/spending-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { updateProductCount, selectedBillionaire, getBalance } =
    useSpendingStore();

  const canBuy = selectedBillionaire && getBalance() >= product.price;

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

  return (
    <div className="bg-primary-100 dark:bg-primary-950 p-3 rounded-xl flex flex-col w-full justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wide text-xs uppercase opacity-80">
          {product.type}
        </span>
        <span className="px-2 py-0.5 rounded-md bg-accent-500 text-accent-50 text-xs font-bold">
          {formatCurrency(product.price)}
        </span>
      </div>

      <h3 className="text-lg font-bold text-primary-800 dark:text-primary-100 mb-2">
        {product.name}
      </h3>

      <div className="flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          height={80}
          width={80}
          className="object-contain"
        />
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
