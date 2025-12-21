"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchBar } from "@/components/layout/search-bar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
    ShoppingCart01Icon,
    Location01Icon,
    UserIcon,
    ArrowDown01Icon,
    FlashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Header() {
    const { totalItems, totalPrice } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-30 bg-background border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-1">
                            <span className="text-4xl font-black text-primary">blink</span>
                            <span className="text-4xl font-black text-foreground">buy</span>
                        </div>

                        {/* Delivery Time */}
                        <div className="hidden md:flex items-center justify-center ml-4">
                            <div className="flex items-center gap-1 text-primary">
                                <HugeiconsIcon icon={FlashIcon} className="size-8" />
                                <span className="text-2xl font-black">10 MINS</span>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <SearchBar />

                        {/* Mode Toggle */}
                        <ModeToggle />

                        {/* Cart Button */}
                        <Button
                            variant="default"
                            className="relative gap-2 min-w-25 bg-[#c026d3] hover:bg-[#a21caf] text-white"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <HugeiconsIcon icon={ShoppingCart01Icon} className="size-5" />
                            {totalItems > 0 ? (
                                <span className="flex flex-col items-start leading-tight">
                                    <span className="text-xs">{totalItems} items</span>
                                    <span className="text-xs font-bold">₹{totalPrice}</span>
                                </span>
                            ) : (
                                <span>Cart</span>
                            )}
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems > 9 ? "9+" : totalItems}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Location Bar */}
            <div className="md:hidden border-b border-border px-4 py-2 flex justify-center bg-primary/5">
                <div className="flex items-center gap-2 text-primary">
                    <HugeiconsIcon icon={FlashIcon} className="size-5" />
                    <span className="font-black text-lg">10 MINS DELIVERY</span>
                </div>
            </div>

            {/* Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
