"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { getCartPricing } from "@/lib/cart-pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type DeliverySlot = "10min" | "30min" | "scheduled";

const quickSlots: Array<{ id: Exclude<DeliverySlot, "scheduled">; label: string }> = [
    { id: "10min", label: "Deliver in 10 minutes" },
    { id: "30min", label: "Deliver in 30 minutes" },
];

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalItems, totalPrice } = useCart();
    const [selectedSlot, setSelectedSlot] = useState<DeliverySlot>("10min");
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const { deliveryFee, handlingFee, grandTotal, amountForFreeDelivery } =
        getCartPricing(totalPrice);

    const selectedDeliveryLabel =
        selectedSlot === "10min"
            ? "Deliver in 10 minutes"
            : selectedSlot === "30min"
                ? "Deliver in 30 minutes"
                : scheduledDate && scheduledTime
                    ? `Scheduled: ${scheduledDate} at ${scheduledTime}`
                    : "Scheduled delivery";

    if (totalItems === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-4">
                    <Card className="w-full border-border/60">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Your cart is empty</CardTitle>
                            <CardDescription>
                                Add a few items from BlinkBuy to continue checkout.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" onClick={() => router.push("/")}>
                                Continue Shopping
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
                <div className="relative mb-6 overflow-hidden rounded-3xl border border-border/70 bg-linear-to-r from-primary/10 via-primary/5 to-background p-6">
                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
                    <div className="absolute -bottom-10 left-1/3 h-20 w-20 rounded-full bg-pink-300/30 blur-2xl dark:bg-pink-600/20" />
                    <p className="relative text-sm font-semibold uppercase tracking-wide text-primary">
                        Checkout
                    </p>
                    <h1 className="relative mt-1 text-3xl font-black">Confirm your order</h1>
                    <p className="relative mt-1 text-sm text-muted-foreground">
                        Review your address, delivery preference, and cart before payment.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle>Delivery details</CardTitle>
                                <CardDescription>
                                    Fill your contact and address information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input id="firstName" placeholder="Aarav" defaultValue="Aarav" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input id="lastName" placeholder="Sharma" defaultValue="Sharma" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input id="phone" type="tel" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        placeholder="House no., street, landmark"
                                        defaultValue="221B Green Avenue, Indiranagar"
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" defaultValue="Bengaluru" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pinCode">PIN code</Label>
                                        <Input id="pinCode" defaultValue="560038" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Delivery notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Add any delivery notes for your rider"
                                        defaultValue="Ring the bell once. Leave at door if unavailable."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/60">
                            <CardHeader>
                                <CardTitle>Choose delivery slot</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-3xl border border-[#1f2f53] bg-linear-to-b from-[#08142b] to-[#0d1e3f] p-5 shadow-xl">
                                    <div className="space-y-3">
                                        {quickSlots.map((slot) => (
                                            <label key={slot.id} className="block cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="delivery-slot"
                                                    className="peer sr-only"
                                                    checked={selectedSlot === slot.id}
                                                    onChange={() => setSelectedSlot(slot.id)}
                                                />
                                                <div className="rounded-2xl border border-[#243a68] bg-[#010a1d] p-3 text-white transition-colors peer-checked:border-primary peer-checked:bg-[#2c1e44]">
                                                    <p className="font-medium">{slot.label}</p>
                                                </div>
                                            </label>
                                        ))}

                                        <label className="block cursor-pointer">
                                            <input
                                                type="radio"
                                                name="delivery-slot"
                                                className="peer sr-only"
                                                checked={selectedSlot === "scheduled"}
                                                onChange={() => setSelectedSlot("scheduled")}
                                            />
                                            <div className="rounded-2xl border border-[#243a68] bg-[#010a1d] p-3 text-white transition-colors peer-checked:border-primary peer-checked:bg-[#2c1e44]">
                                                <p className="font-medium">Schedule for another time</p>
                                                <p className="text-xs text-slate-300">Choose any date and any time</p>
                                            </div>
                                        </label>

                                        {selectedSlot === "scheduled" && (
                                            <div className="grid gap-3 pt-1 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="deliveryDate" className="text-slate-200">
                                                        Delivery date
                                                    </Label>
                                                    <Input
                                                        id="deliveryDate"
                                                        type="date"
                                                        value={scheduledDate}
                                                        onChange={(event) => setScheduledDate(event.target.value)}
                                                        className="border-[#2a3f6c] bg-[#0a1630] text-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="deliveryTime" className="text-slate-200">
                                                        Delivery time
                                                    </Label>
                                                    <Input
                                                        id="deliveryTime"
                                                        type="time"
                                                        value={scheduledTime}
                                                        onChange={(event) => setScheduledTime(event.target.value)}
                                                        className="border-[#2a3f6c] bg-[#0a1630] text-white"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="h-fit border-border/60">
                        <CardHeader>
                            <CardTitle>Order summary</CardTitle>
                            <CardDescription>{totalItems} items in your cart</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="max-h-72 space-y-3 overflow-auto pr-1">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/20 p-3"
                                    >
                                        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white dark:bg-card">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                sizes="56px"
                                                className="object-contain p-1"
                                                unoptimized={item.product.image.includes("placehold.co")}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{item.product.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Qty {item.quantity} • ₹{item.product.price} each
                                            </p>
                                        </div>
                                        <p className="text-sm font-semibold">
                                            ₹{item.product.price * item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Delivery Slot</span>
                                    <span className="max-w-[60%] truncate text-right">{selectedDeliveryLabel}</span>
                                </div>
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
                                {amountForFreeDelivery > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Add ₹{amountForFreeDelivery} more for free delivery.
                                    </p>
                                )}
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between text-base font-semibold">
                                <span>Grand Total</span>
                                <span>₹{grandTotal}</span>
                            </div>

                            <Button size="lg" className="w-full text-base" onClick={() => router.push("/payment")}>
                                Continue to Payment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
