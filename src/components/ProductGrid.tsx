"use client";

import { motion } from "framer-motion";
import { useSpendingStore } from "@/store/spending-store";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const { products } = useSpendingStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
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
  );
};

export default ProductGrid;
