"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
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
        <div className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Image Container */}
            <div className="relative aspect-square bg-muted overflow-hidden">
                {/* Badge - top right */}
                {product.badge && (
                    <div className="absolute top-2 right-2 z-10">
                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                            {product.badge}
                        </span>
                    </div>
                )}

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Circular ADD button - overlapping bottom right */}
                <div className="absolute -bottom-4 right-3 z-10">
                    {quantity === 0 ? (
                        <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="h-10 px-5 rounded-full bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white font-bold shadow-lg"
                        >
                            ADD
                        </Button>
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
            <div className="p-3 pt-5">
                {/* Price Section */}
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-lg text-green-600">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice}
                        </span>
                    )}
                </div>

                {/* Savings */}
                {savings && savings > 0 && (
                    <p className="text-xs text-green-600 font-medium mb-2">
                        ₹{savings} OFF
                    </p>
                )}

                {/* Product Name */}
                <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-10 mb-1">
                    {product.name}
                </h3>

                {/* Unit */}
                <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Rating */}
                {product.rating && (
                    <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={StarIcon} className="size-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium text-foreground">{product.rating}</span>
                        {product.reviews && (
                            <span className="text-xs text-muted-foreground">
                                {formatReviews(product.reviews)}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
