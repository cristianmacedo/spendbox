"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, DollarSign } from "lucide-react";
import { selectSpent, useSpendingStore } from "@/store/spending-store";
import { formatNumber, formatCurrency } from "@/lib/format";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// US median household income (2024)
const MEDIAN_SALARY = 59_000;

const WealthComparison = () => {
  const selectedBillionaire = useSpendingStore((state) => state.selectedBillionaire);
  const spent = useSpendingStore(selectSpent);

  if (!selectedBillionaire || spent === 0) {
    return null;
  }

  // Calculate comparisons
  const medianIncomes = Math.round(spent / MEDIAN_SALARY);
  const lifetimesOfWork = Math.round(medianIncomes / 45); // 45 year career

  return (
    <TooltipProvider delayDuration={200}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-primary-800 dark:bg-primary-900 border-t border-primary-700 dark:border-primary-800"
        >
          <div className="px-4 sm:px-8 lg:px-16 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm">
            <span className="text-primary-300 dark:text-primary-400 font-medium hidden sm:inline">
              That&apos;s equivalent to:
            </span>

            {medianIncomes >= 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-primary-100 dark:text-primary-200 cursor-help"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-accent-400" />
                    <span className="font-bold">
                      {formatNumber(medianIncomes)}
                    </span>
                    <span className="text-primary-300 dark:text-primary-400 text-xs">
                      years of income
                    </span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="font-semibold mb-1">
                    Years of Household Income
                  </p>
                  <p className="text-surface-300 dark:text-surface-600">
                    The median US household earns{" "}
                    {formatCurrency(MEDIAN_SALARY)}/year.
                  </p>
                  <p className="text-surface-300 dark:text-surface-600 mt-1">
                    Your {formatCurrency(spent)} spending equals{" "}
                    {formatNumber(medianIncomes)} years of average household
                    income.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}

            {lifetimesOfWork >= 2 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center gap-1.5 text-primary-100 dark:text-primary-200 cursor-help"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-accent-400" />
                    <span className="font-bold">
                      {formatNumber(lifetimesOfWork)}
                    </span>
                    <span className="text-primary-300 dark:text-primary-400 text-xs">
                      lifetimes of work
                    </span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="font-semibold mb-1">Lifetimes of Work</p>
                  <p className="text-surface-300 dark:text-surface-600">
                    A typical career spans ~45 years (age 20 to 65).
                  </p>
                  <p className="text-surface-300 dark:text-surface-600 mt-1">
                    {formatNumber(lifetimesOfWork)} people would need to work
                    their entire careers to earn this much.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default WealthComparison;
