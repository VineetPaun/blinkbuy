"use client";

import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { getCartPricing } from "@/lib/cart-pricing";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
    onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
    const router = useRouter();
    const { totalItems, totalPrice } = useCart();
    const { deliveryFee, handlingFee, grandTotal, amountForFreeDelivery } =
        getCartPricing(totalPrice);

    const handleCheckout = () => {
        onCheckout?.();
        router.push("/checkout");
    };

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
                        Add ₹{amountForFreeDelivery} more for free delivery
                    </p>
                )}
            </div>

            <Separator />

            <div className="flex justify-between text-base font-semibold">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
            </div>

            <Button
                className="w-full h-12 text-base font-semibold"
                size="lg"
                onClick={handleCheckout}
            >
                Proceed to Checkout ({totalItems} items)
            </Button>
        </div>
    );
}
