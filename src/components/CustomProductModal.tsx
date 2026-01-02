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

interface CustomProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomProductModal = ({ isOpen, onClose }: CustomProductModalProps) => {
  const { addCustomProduct } = useSpendingStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceValue = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (name && priceValue > 0) {
      addCustomProduct(name, priceValue);
      setName("");
      setPrice("");
      onClose();
    }
  };

  const formatPriceInput = (value: string) => {
    // Remove non-numeric characters except decimal
    const numeric = value.replace(/[^0-9]/g, "");
    if (!numeric) return "";

    // Format with commas
    const number = parseInt(numeric, 10);
    return number.toLocaleString("en-US");
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
              placeholder="1,000,000"
              value={price}
              onChange={(e) => setPrice(formatPriceInput(e.target.value))}
            />
            <p className="text-xs text-surface-500">
              Enter any price - from a coffee to a country&apos;s GDP!
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !price}>
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomProductModal;
