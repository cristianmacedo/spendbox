"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, User } from "lucide-react";
import { billionaires } from "@/data/billionaires";
import { useSpendingStore } from "@/store/spending-store";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Billionaire } from "@/types";
import CustomBillionaireModal from "./CustomBillionaireModal";

const BillionairePicker = () => {
  const { selectedBillionaire, selectBillionaire } = useSpendingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (billionaire: Billionaire) => {
    selectBillionaire(billionaire);
  };

  return (
    <div className="max-w-md w-full">
      <p className="text-sm font-bold text-primary-100 mb-2">
        Choose a billionaire
      </p>

      <div className="space-y-2">
        {billionaires.map((billionaire, index) => (
          <motion.div
            key={billionaire.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <BillionaireCard
              billionaire={billionaire}
              isSelected={selectedBillionaire?.id === billionaire.id}
              onSelect={() => handleSelect(billionaire)}
            />
          </motion.div>
        ))}

        {/* Custom billionaire option */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: billionaires.length * 0.05 }}
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "w-full h-14 rounded-lg border-l-4 p-2 transition-all cursor-pointer flex items-center gap-3",
            "bg-surface-50 dark:bg-primary-950 border-l-surface-300 dark:border-l-primary-700",
            "opacity-70 hover:opacity-100",
            selectedBillionaire?.isCustom &&
              "opacity-100 bg-primary-50 dark:bg-primary-800 border-l-primary-400"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-primary-800 flex items-center justify-center">
            <Plus className="w-4 h-4 text-surface-500 dark:text-primary-300" />
          </div>
          <span className="text-sm font-semibold text-surface-600 dark:text-primary-300">
            Add custom amount...
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {selectedBillionaire && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium italic text-primary-200 mt-5"
          >
            &quot;{selectedBillionaire.bio}&quot;
          </motion.p>
        )}
      </AnimatePresence>

      <CustomBillionaireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(billionaire) => {
          handleSelect(billionaire);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

interface BillionaireCardProps {
  billionaire: Billionaire;
  isSelected: boolean;
  onSelect: () => void;
}

const BillionaireCard = ({
  billionaire,
  isSelected,
  onSelect,
}: BillionaireCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full h-14 rounded-lg border-l-4 p-2 transition-all cursor-pointer flex items-center gap-3",
        "bg-surface-50 dark:bg-primary-950 border-l-surface-300 dark:border-l-primary-700",
        "opacity-60 hover:opacity-100",
        isSelected &&
          "opacity-100 bg-primary-50 dark:bg-primary-800 border-l-primary-400 dark:border-l-primary-400"
      )}
    >
      {billionaire.image ? (
        <Image
          src={billionaire.image}
          alt={billionaire.name}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
          unoptimized
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-primary-200 dark:bg-primary-800 flex items-center justify-center">
          <User className="w-4 h-4 text-primary-600 dark:text-primary-300" />
        </div>
      )}
      <div className="flex-1 overflow-hidden text-left">
        <p
          className={cn(
            "text-sm font-bold truncate",
            isSelected
              ? "text-primary-800 dark:text-primary-200"
              : "text-surface-800 dark:text-primary-100"
          )}
        >
          {billionaire.name}
        </p>
        <p
          className={cn(
            "text-xs truncate",
            isSelected
              ? "text-primary-600 dark:text-primary-400"
              : "text-surface-600 dark:text-primary-300"
          )}
        >
          {billionaire.source}
        </p>
      </div>
      <span
        className={cn(
          "text-sm font-bold uppercase",
          isSelected
            ? "text-primary-800 dark:text-primary-200"
            : "text-surface-800 dark:text-primary-100"
        )}
      >
        {formatCompact(billionaire.netWorth)}
      </span>
    </button>
  );
};

export default BillionairePicker;
