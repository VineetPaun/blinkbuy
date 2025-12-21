"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/cart/quantity-selector";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart, getItemQuantity, updateQuantity } = useCart();
    const quantity = getItemQuantity(product.id);

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <div className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-2 left-2 z-10">
                    <Badge variant="default" className="bg-primary text-primary-foreground text-xs font-semibold">
                        {product.badge}
                    </Badge>
                </div>
            )}

            {/* Image */}
            <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
            </div>

            {/* Content */}
            <div className="p-3">
                {/* Timer badge - like Zepto */}
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        ⚡ 10 MINS
                    </span>
                </div>

                {/* Product Name */}
                <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-10 mb-1">
                    {product.name}
                </h3>

                {/* Unit */}
                <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="font-bold text-base text-foreground">₹{product.price}</span>
                        {product.originalPrice && (
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground line-through">
                                    ₹{product.originalPrice}
                                </span>
                                {discount && (
                                    <span className="text-xs text-green-600 font-medium">
                                        {discount}% OFF
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Add to Cart / Quantity Selector */}
                    {quantity === 0 ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(product)}
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                        >
                            <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" className="size-4" />
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
        </div>
    );
}
