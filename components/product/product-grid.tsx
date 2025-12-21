"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showSeeAll?: boolean;
}

export function ProductGrid({ products, title, showSeeAll = true }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className="mb-8">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          {showSeeAll && (
            <button className="text-sm font-semibold text-primary hover:underline">
              See All &gt;
            </button>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
