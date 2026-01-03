"use client";

import { useCart } from "@/lib/cart-context";
import { CartItem } from "./cart-item";
import { CartSummary } from "./cart-summary";
import { Button } from "@/components/ui/button";
import { Cancel01Icon, ShoppingCart01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useSyncExternalStore } from "react";

const emptySubscribe = () => () => { };

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, totalItems } = useCart();
    // Use useSyncExternalStore to track mounting state without triggering re-renders
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={ShoppingCart01Icon} className="size-5 text-primary" />
                        <h2 className="text-lg font-semibold">Your Cart</h2>
                        {totalItems > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                                {totalItems} items
                            </span>
                        )}
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={onClose}>
                        <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
                    </Button>
                </div>

                {/* Cart Content */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                                <HugeiconsIcon icon={ShoppingCart01Icon} className="size-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Looks like you haven&apos;t added anything to your cart yet
                            </p>
                            <Button onClick={onClose}>Start Shopping</Button>
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-3 mb-4">
                                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                                    ⚡ Delivery in 10 minutes
                                </p>
                            </div>
                            {items.map((item) => (
                                <CartItem key={item.product.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer with Summary */}
                {items.length > 0 && <CartSummary />}
            </div>
        </>
    );
}
