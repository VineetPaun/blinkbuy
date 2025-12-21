"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

interface ProductGridProps {
    products: Product[];
    title?: string;
    showSeeAll?: boolean;
    onSeeAll?: () => void;
    variant?: "grid" | "scroll";
}

export function ProductGrid({
    products,
    title,
    showSeeAll = true,
    onSeeAll,
    variant = "grid"
}: ProductGridProps) {
    if (products.length === 0) return null;

    return (
        <section className="mb-8">
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">{title}</h2>
                    {showSeeAll && (
                        <button
                            onClick={onSeeAll}
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            See All &gt;
                        </button>
                    )}
                </div>
            )}

            {variant === "scroll" ? (
                <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
                    {products.map((product) => (
                        <div key={product.id} className="w-[160px] shrink-0">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}
