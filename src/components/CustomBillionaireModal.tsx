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
import { createCustomBillionaire } from "@/data/billionaires";
import { Billionaire } from "@/types";

interface CustomBillionaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (billionaire: Billionaire) => void;
}

const CustomBillionaireModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CustomBillionaireModalProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const netWorth = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (name && netWorth > 0) {
      onSubmit(createCustomBillionaire(name, netWorth));
      setName("");
      setAmount("");
    }
  };

  const formatAmountInput = (value: string) => {
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
          <DialogTitle>Create Custom Fortune</DialogTitle>
          <DialogDescription>
            Enter a name and amount to create your own spending scenario.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-surface-700 dark:text-primary-200"
            >
              Name
            </label>
            <Input
              id="name"
              placeholder="Your name or any name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-surface-700 dark:text-primary-200"
            >
              Net Worth ($)
            </label>
            <Input
              id="amount"
              placeholder="1,000,000,000"
              value={amount}
              onChange={(e) => setAmount(formatAmountInput(e.target.value))}
            />
            <p className="text-xs text-surface-500">
              Try entering amounts like 1 billion, 100 million, etc.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || !amount}>
              Start Spending
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomBillionaireModal;
