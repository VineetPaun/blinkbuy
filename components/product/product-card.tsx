"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { QuantitySelector } from "@/components/cart/quantity-selector";
import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ProductCardProps {
    product: Product;
}

function formatReviews(reviews: number): string {
    if (reviews >= 1000) {
        return `(${(reviews / 1000).toFixed(1)}k)`;
    }
    return `(${reviews})`;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart, getItemQuantity, updateQuantity } = useCart();
    const quantity = getItemQuantity(product.id);

    const savings = product.originalPrice
        ? product.originalPrice - product.price
        : null;

    return (
        <div className="group relative bg-white dark:bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* ADD button - right side of image */}
                <div className="absolute bottom-4 right-2 z-10">
                    {quantity === 0 ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="h-8 px-4 rounded-lg bg-[#c026d3] hover:bg-[#a21caf] text-white font-bold text-sm shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            ADD
                        </button>
                    ) : (
                        <QuantitySelector
                            quantity={quantity}
                            size="sm"
                            onIncrease={() => updateQuantity(product.id, quantity + 1)}
                            onDecrease={() => updateQuantity(product.id, quantity - 1)}
                        />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 pt-3">
                {/* Price Section */}
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-lg text-green-600">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Savings Badge */}
                {savings && savings > 0 && (
                    <div className="mt-1">
                        <span className="inline-block text-[11px] font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">
                            ₹{savings} OFF
                        </span>
                    </div>
                )}

                {/* Product Name */}
                <h3 className="font-medium text-sm text-gray-800 dark:text-foreground line-clamp-2 mt-2 leading-tight">
                    {product.name}
                </h3>

                {/* Unit */}
                <p className="text-xs text-blue-500 mt-1">{product.unit}</p>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.tags.slice(0, 1).map((tag, index) => (
                            <span
                                key={index}
                                className="text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-transparent px-2.5 py-0.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center gap-1 mt-2">
                        <HugeiconsIcon
                            icon={StarIcon}
                            className="size-3.5 text-amber-400"
                            style={{ fill: '#fbbf24' }}
                        />
                        <span className="text-xs font-medium text-gray-700 dark:text-foreground">
                            {product.rating}
                        </span>
                        {product.reviews && (
                            <span className="text-xs text-gray-500 dark:text-muted-foreground">
                                {formatReviews(product.reviews)}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
