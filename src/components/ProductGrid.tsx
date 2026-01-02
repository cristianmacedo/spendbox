"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useSpendingStore } from "@/store/spending-store";
import ProductCard from "./ProductCard";
import CustomProductModal from "./CustomProductModal";

const ProductGrid = () => {
  const { products, customProducts } = useSpendingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allProducts = [...products, ...customProducts];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {allProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}

        {/* Add custom product button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: allProducts.length * 0.03 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-100/50 dark:bg-primary-950/50 p-3 rounded-xl flex flex-col items-center justify-center min-h-[240px] border-2 border-dashed border-primary-300 dark:border-primary-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-primary-200 dark:bg-primary-800 flex items-center justify-center mb-3 group-hover:bg-primary-300 dark:group-hover:bg-primary-700 transition-colors">
            <Plus className="w-8 h-8 text-primary-600 dark:text-primary-300" />
          </div>
          <p className="text-primary-700 dark:text-primary-300 font-bold">
            Add Custom Product
          </p>
          <p className="text-primary-500 dark:text-primary-500 text-sm mt-1">
            Create your own item
          </p>
        </motion.button>

        <div className="col-span-full flex items-center justify-center py-4">
          <p className="text-primary-500 dark:text-primary-400 font-bold tracking-wide text-xs text-center">
            Icons made by{" "}
            <a
              href="https://www.freepik.com"
              title="Freepik"
              className="underline hover:text-primary-600 dark:hover:text-primary-300"
            >
              Freepik
            </a>{" "}
            from{" "}
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              className="underline hover:text-primary-600 dark:hover:text-primary-300"
            >
              www.flaticon.com
            </a>
          </p>
        </div>
      </div>

      <CustomProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductGrid;
