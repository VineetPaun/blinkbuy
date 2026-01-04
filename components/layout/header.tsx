"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchBar } from "@/components/layout/search-bar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
    ShoppingCart01Icon,
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

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/VineetPaun/blinkbuy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="View source on GitHub"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                            >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>

                        {/* Mode Toggle */}
                        <ModeToggle />

                        {/* Cart Button */}
                        <Button
                            variant="default"
                            className="relative gap-2 w-32 bg-[#c026d3] hover:bg-[#a21caf] text-white"
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
