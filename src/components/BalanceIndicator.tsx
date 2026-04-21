"use client";

import { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  selectBalance,
  selectSpent,
  useSpendingStore,
} from "@/store/spending-store";
import { formatCurrencyWithCents, formatPercent } from "@/lib/format";
import { Separator } from "./ui/separator";

const BalanceIndicator = () => {
  const selectedBillionaire = useSpendingStore((state) => state.selectedBillionaire);
  const balance = useSpendingStore(selectBalance);
  const spent = useSpendingStore(selectSpent);
  const startingBalance = selectedBillionaire?.netWorth ?? 0;
  const percentage = startingBalance > 0 ? spent / startingBalance : 0;

  const prevBalanceRef = useRef(balance);
  const prevPercentageRef = useRef(percentage);

  const [prevBalance, setPrevBalance] = useState(balance);
  const [prevPercentage, setPrevPercentage] = useState(percentage);

  useEffect(() => {
    setPrevBalance(prevBalanceRef.current);
    setPrevPercentage(prevPercentageRef.current);
    prevBalanceRef.current = balance;
    prevPercentageRef.current = percentage;
  }, [balance, percentage]);

  return (
    <div className="h-16 px-4 sm:px-8 lg:px-16 py-2 bg-accent-400 dark:bg-accent-600 flex items-center justify-center gap-4 sticky top-0 z-10">
      <div>
        <p className="text-xs font-bold text-accent-100 dark:text-accent-200 uppercase">
          Your balance
        </p>
        <p className="font-mono text-xl sm:text-2xl font-bold text-accent-50 dark:text-white leading-none">
          <CountUp
            start={prevBalance}
            end={balance}
            duration={1.5}
            formattingFn={(n: number) => formatCurrencyWithCents(n)}
            decimals={2}
          />
        </p>
      </div>
      <Separator
        orientation="vertical"
        className="h-10 w-0.5 bg-accent-50 dark:bg-accent-300"
      />
      <div>
        <p className="text-xs font-bold text-accent-100 dark:text-accent-200 uppercase">
          Spent
        </p>
        <p className="font-mono text-xl sm:text-2xl font-bold text-accent-50 dark:text-white leading-none">
          <CountUp
            start={prevPercentage}
            end={percentage}
            duration={1.5}
            formattingFn={(n: number) => formatPercent(n)}
            decimals={6}
          />
        </p>
      </div>
    </div>
  );
};

export default BalanceIndicator;
