"use client";

import { useState } from "react";
import { ReceiptText, ArrowUp } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BillionairePicker from "@/components/BillionairePicker";
import BalanceIndicator from "@/components/BalanceIndicator";
import ProductGrid from "@/components/ProductGrid";
import Receipt from "@/components/Receipt";
import WealthComparison from "@/components/WealthComparison";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useSpendingStore } from "@/store/spending-store";
import { formatCurrency } from "@/lib/format";

export default function Home() {
  const { selectedBillionaire, getSpent, products } = useSpendingStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const spent = getSpent();
  const itemCount = products.filter((p) => p.count > 0).length;

  const subtitle = selectedBillionaire
    ? `Spend ${selectedBillionaire.name}'s fortune however you want on the available products below!`
    : "Pick a billionaire and spend their fortune however you want on the available products below!";

  return (
    <>
      <Header />
      <Hero title="Spend billionaires' money!" subtitle={subtitle}>
        <BillionairePicker />
      </Hero>
      <BalanceIndicator />
      <WealthComparison />
      <main className="px-4 sm:px-8 lg:px-16 my-8 pb-24 xl:pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_500px] gap-6">
          <div className="relative">
            {!selectedBillionaire && (
              <div className="absolute inset-0 z-10 flex items-start justify-center pt-20 bg-surface-100/80 dark:bg-primary-975/80 backdrop-blur-sm rounded-xl">
                <div className="text-center p-6">
                  <ArrowUp className="w-8 h-8 mx-auto mb-3 text-primary-500 animate-bounce" />
                  <p className="text-lg font-bold text-primary-700 dark:text-primary-300">
                    Select a billionaire first!
                  </p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                    Choose someone above to start spending
                  </p>
                </div>
              </div>
            )}
            <ProductGrid />
          </div>
          {/* Desktop receipt - hidden on mobile */}
          <div className="hidden xl:block xl:sticky xl:top-20 xl:self-start">
            <Receipt />
          </div>
        </div>
      </main>

      {/* Mobile floating button + drawer */}
      <div className="xl:hidden fixed bottom-4 left-4 right-4 z-40">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button size="lg" className="w-full shadow-lg gap-3">
              <ReceiptText className="w-5 h-5" />
              <span>View Receipt</span>
              {itemCount > 0 && (
                <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {itemCount} items · {formatCurrency(spent)}
                </span>
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent title="Receipt">
            <div className="p-4 pb-8 overflow-y-auto max-h-[80vh]">
              <Receipt />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
