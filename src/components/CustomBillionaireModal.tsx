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
import { formatCurrency, parseHumanNumber } from "@/lib/format";

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
  const parsedAmount = parseHumanNumber(amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && parsedAmount && parsedAmount > 0) {
      onSubmit(createCustomBillionaire(name.trim(), parsedAmount));
      setName("");
      setAmount("");
    }
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
              placeholder="e.g. 750000000, 2.5b, 1 billion"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
            />
            <p className="text-xs text-surface-500">
              Supports plain numbers and suffixes like `k`, `m`, `b`, or words
              like &quot;million&quot; and &quot;billion&quot;.
            </p>
            {amount && (
              <p className="text-xs text-surface-500">
                {parsedAmount
                  ? `Parsed amount: ${formatCurrency(parsedAmount)}`
                  : "Enter a valid amount such as 2.5m or 1 billion."}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || !parsedAmount}>
              Start Spending
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomBillionaireModal;
