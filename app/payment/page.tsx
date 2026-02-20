"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getCartPricing } from "@/lib/cart-pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type PaymentMethod = "upi" | "card" | "cod";

const methodMeta: Record<PaymentMethod, { title: string; subtitle: string; icon: string }> = {
    upi: {
        title: "UPI",
        subtitle: "Pay with UPI ID or app",
        icon: "📱",
    },
    card: {
        title: "Card",
        subtitle: "Credit or debit card",
        icon: "💳",
    },
    cod: {
        title: "Cash on Delivery",
        subtitle: "Pay when order arrives",
        icon: "💵",
    },
};

export default function PaymentPage() {
    const router = useRouter();
    const { totalItems, totalPrice, clearCart } = useCart();
    const [method, setMethod] = useState<PaymentMethod>("upi");
    const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success">("idle");
    const [orderId] = useState(() => `BB${Math.floor(100000 + Math.random() * 900000)}`);
    const { deliveryFee, handlingFee, grandTotal } = getCartPricing(totalPrice);

    const handlePay = () => {
        setPaymentState("processing");
        setTimeout(() => {
            setPaymentState("success");
            clearCart();
        }, 1200);
    };

    if (paymentState === "success") {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto flex min-h-[82vh] w-full max-w-3xl items-center justify-center px-4 py-10">
                    <Card className="w-full border-border/70">
                        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
                            <div className="relative mb-8 flex h-56 w-56 items-center justify-center">
                                <div className="payment-ring payment-ring-1 absolute h-56 w-56 rounded-full bg-primary/10" />
                                <div className="payment-ring payment-ring-2 absolute h-44 w-44 rounded-full bg-primary/15" />
                                <div className="payment-ring payment-ring-3 absolute h-32 w-32 rounded-full bg-primary/20" />
                                <div className="payment-check-pop relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12"
                                    >
                                        <path
                                            d="M5 13L10 18L19 7"
                                            stroke="currentColor"
                                            strokeWidth="2.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="payment-text-rise text-3xl font-black text-primary sm:text-4xl">
                                Yay! Order Confirmed
                            </h1>
                            <p className="payment-text-rise mt-2 text-base text-muted-foreground">
                                Your payment was successful and your order is now being prepared.
                            </p>
                            <p className="payment-text-rise mt-1 text-sm text-muted-foreground">
                                Order ID: <span className="font-semibold text-foreground">{orderId}</span>
                            </p>

                            <div className="payment-text-rise mt-6 rounded-2xl bg-primary/10 px-6 py-3 text-sm font-medium text-primary">
                                Delivery partner will be assigned shortly.
                            </div>

                            <div className="payment-text-rise mt-7 grid w-full gap-3 sm:grid-cols-2">
                                <Button size="lg" onClick={() => router.push("/")}>
                                    Track Order
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => router.push("/")}>
                                    Back to Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (totalItems === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4">
                    <Card className="w-full border-border/60">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">No payment due</CardTitle>
                            <CardDescription>
                                Your cart is empty, so there is nothing to pay yet.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" onClick={() => router.push("/")}>
                                Go to Home
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            <div className="mx-auto w-full max-w-6xl px-4 py-8">
                <div className="mb-6 rounded-3xl border border-border/70 bg-linear-to-r from-background via-primary/5 to-primary/10 p-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">Payment</p>
                    <h1 className="mt-1 text-3xl font-black">Choose payment method</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Select a payment option to place your order.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle>Payment options</CardTitle>
                            <CardDescription>Select your preferred payment option.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {(Object.keys(methodMeta) as PaymentMethod[]).map((id) => (
                                <label key={id} className="block cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment-method"
                                        className="peer sr-only"
                                        checked={method === id}
                                        onChange={() => setMethod(id)}
                                    />
                                    <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 transition-colors peer-checked:border-primary peer-checked:bg-primary/5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{methodMeta[id].icon}</span>
                                            <div>
                                                <p className="font-medium">{methodMeta[id].title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {methodMeta[id].subtitle}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Secure</span>
                                    </div>
                                </label>
                            ))}

                            {method === "upi" && (
                                <div className="space-y-2 rounded-2xl border border-border/70 bg-muted/30 p-4">
                                    <Label htmlFor="upi">UPI ID</Label>
                                    <Input id="upi" placeholder="name@upi" defaultValue="blinkbuy@upi" />
                                </div>
                            )}

                            {method === "card" && (
                                <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/30 p-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cardNumber">Card number</Label>
                                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry</Label>
                                            <Input id="expiry" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input id="cvv" type="password" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {method === "cod" && (
                                <div className="rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground">
                                    Cash will be collected at your doorstep during delivery.
                                </div>
                            )}

                            <Button
                                size="lg"
                                className="w-full text-base"
                                onClick={handlePay}
                                disabled={paymentState === "processing"}
                            >
                                {paymentState === "processing" ? "Processing Payment..." : `Pay ₹${grandTotal}`}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="h-fit border-border/60">
                        <CardHeader>
                            <CardTitle>Bill details</CardTitle>
                            <CardDescription>{totalItems} items</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Item Total</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Delivery Fee</span>
                                <span className={deliveryFee === 0 ? "font-semibold text-green-600" : ""}>
                                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Handling Fee</span>
                                <span>₹{handlingFee}</span>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex items-center justify-between text-base font-semibold">
                                <span>Total payable</span>
                                <span>₹{grandTotal}</span>
                            </div>

                            <Button variant="outline" className="mt-3 w-full" onClick={() => router.push("/checkout")}>
                                Back to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
