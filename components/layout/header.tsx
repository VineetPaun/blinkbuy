"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart01Icon,
  Search01Icon,
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
              <span className="text-2xl font-black text-primary">blink</span>
              <span className="text-2xl font-black text-foreground">buy</span>
            </div>

            {/* Delivery Time & Location */}
            <button className="hidden md:flex flex-col items-start ml-4">
              <div className="flex items-center gap-1 text-primary">
                <HugeiconsIcon icon={FlashIcon} className="size-4" />
                <span className="text-sm font-bold">10 minutes</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HugeiconsIcon icon={Location01Icon} className="size-3" />
                <span className="max-w-[150px] truncate">Select delivery location</span>
                <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
              </div>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
                />
                <Input
                  type="search"
                  placeholder='Search for "milk"'
                  className="pl-10 h-10 bg-muted/50 border-transparent focus:border-primary"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button variant="ghost" className="hidden md:flex gap-2">
              <HugeiconsIcon icon={UserIcon} className="size-5" />
              Login
            </Button>

            {/* Cart Button */}
            <Button
              variant="default"
              className="relative gap-2 min-w-[100px]"
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

        {/* Mobile Location Bar */}
        <div className="md:hidden border-t border-border px-4 py-2">
          <button className="flex items-center gap-2 text-sm">
            <HugeiconsIcon icon={FlashIcon} className="size-4 text-primary" />
            <span className="font-bold text-primary">10 minutes</span>
            <span className="text-muted-foreground">•</span>
            <HugeiconsIcon icon={Location01Icon} className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate max-w-[200px]">
              Select delivery location
            </span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="size-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
