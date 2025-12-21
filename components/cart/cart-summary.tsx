"use client";

import { useCart } from "@/lib/cart-context";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  const deliveryFee = totalPrice >= 499 ? 0 : 25;
  const handlingFee = 4;
  const grandTotal = totalPrice + deliveryFee + handlingFee;

  return (
    <div className="bg-background border-t border-border p-4 space-y-3">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Item Total</span>
          <span className="font-medium">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Handling Fee</span>
          <span>₹{handlingFee}</span>
        </div>
        {totalPrice < 499 && (
          <p className="text-xs text-muted-foreground">
            Add ₹{499 - totalPrice} more for free delivery
          </p>
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-base font-semibold">
        <span>Grand Total</span>
        <span>₹{grandTotal}</span>
      </div>

      <Button className="w-full h-12 text-base font-semibold" size="lg">
        Proceed to Checkout ({totalItems} items)
      </Button>
    </div>
  );
}
