"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSpendingStore } from "@/store/spending-store";
import { formatCurrency, parseHumanNumber } from "@/lib/format";

interface CustomProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomProductModal = ({ isOpen, onClose }: CustomProductModalProps) => {
  const addCustomProduct = useSpendingStore((state) => state.addCustomProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const parsedPrice = parseHumanNumber(price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && parsedPrice && parsedPrice > 0) {
      addCustomProduct(name.trim(), parsedPrice);
      setName("");
      setPrice("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Custom Product</DialogTitle>
          <DialogDescription>
            Create your own product with a custom name and price.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="product-name"
              className="text-sm font-medium text-surface-700 dark:text-primary-200"
            >
              Product Name
            </label>
            <Input
              id="product-name"
              placeholder="e.g., Private Island, Sports Team..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="product-price"
              className="text-sm font-medium text-surface-700 dark:text-primary-200"
            >
              Price ($)
            </label>
            <Input
              id="product-price"
              placeholder="e.g. 50000, 2.5m, 750 thousand"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
            />
            <p className="text-xs text-surface-500">
              Supports plain numbers and suffixes like `k`, `m`, `b`, or words
              like &quot;million&quot; and &quot;billion&quot;.
            </p>
            {price && (
              <p className="text-xs text-surface-500">
                {parsedPrice
                  ? `Parsed price: ${formatCurrency(parsedPrice)}`
                  : "Enter a valid price such as 500k or 1.25 million."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || !parsedPrice}>
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomProductModal;
