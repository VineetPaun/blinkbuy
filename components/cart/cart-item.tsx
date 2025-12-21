"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { QuantitySelector } from "./quantity-selector";
import { Button } from "@/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const { product, quantity } = item;

    return (
        <div className="flex gap-3 py-3 border-b border-border last:border-b-0">
            {/* Product Image */}
            <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate">
                    {product.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{product.unit}</p>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                ₹{product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end justify-between">
                <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeFromCart(product.id)}
                    className="text-muted-foreground hover:text-destructive"
                >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                </Button>
                <QuantitySelector
                    quantity={quantity}
                    size="sm"
                    onIncrease={() => updateQuantity(product.id, quantity + 1)}
                    onDecrease={() => updateQuantity(product.id, quantity - 1)}
                />
            </div>
        </div>
    );
}
