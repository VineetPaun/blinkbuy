"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAIChat, ChatMessage } from "@/lib/ai-chat-context";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AiChat02Icon,
    Cancel01Icon,
    SentIcon,
    Delete02Icon,
    Add01Icon,
    CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function ProductCard({ product, onAdd, isAdded }: { product: Product; onAdd: () => void; isAdded: boolean }) {
    return (
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                    unoptimized={product.image.includes("placehold.co")}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">₹{product.price}</p>
            </div>
            <button
                onClick={onAdd}
                disabled={isAdded}
                className={`size-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isAdded
                    ? "bg-green-500 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
            >
                <HugeiconsIcon icon={isAdded ? CheckmarkCircle02Icon : Add01Icon} className="size-4" />
            </button>
        </div>
    );
}

function MessageBubble({
    message,
    onAddProduct,
    onAddAll,
    addedProductIds
}: {
    message: ChatMessage;
    onAddProduct: (product: Product) => void;
    onAddAll: (products: Product[]) => void;
    addedProductIds: Set<string>;
}) {
    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%]`}>
                <div
                    className={`px-3 py-2 rounded-2xl ${isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                        }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Suggested Products */}
                {message.suggestedProducts && message.suggestedProducts.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                        {message.suggestedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={() => onAddProduct(product)}
                                isAdded={addedProductIds.has(product.id)}
                            />
                        ))}
                        {message.isRecipeSuggestion && (
                            <Button
                                size="sm"
                                className="w-full mt-2"
                                onClick={() => {
                                    const productsToAdd = message.suggestedProducts?.filter(
                                        p => !addedProductIds.has(p.id)
                                    ) || [];
                                    if (productsToAdd.length > 0) {
                                        onAddAll(productsToAdd);
                                    }
                                }}
                                disabled={message.suggestedProducts?.every(p => addedProductIds.has(p.id))}
                            >
                                {message.suggestedProducts?.every(p => addedProductIds.has(p.id))
                                    ? "All Added ✓"
                                    : "Add All to Cart"}
                            </Button>
                        )}
                    </div>
                )}

                {/* Added Products Confirmation */}
                {message.addedProducts && message.addedProducts.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {message.addedProducts.map((p) => (
                            <span
                                key={p.id}
                                className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full"
                            >
                                ✓ {p.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Removed Products Confirmation */}
                {message.removedProducts && message.removedProducts.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {message.removedProducts.map((p) => (
                            <span
                                key={p.id}
                                className="text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-0.5 rounded-full"
                            >
                                ✗ {p.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function AIChat() {
    const { messages, isOpen, isTyping, toggleChat, closeChat, sendMessage, clearChat } = useAIChat();
    const { addToCart, items } = useCart();
    const [input, setInput] = useState("");
    // Derive addedProductIds from cart items using useMemo instead of useEffect+setState
    const addedProductIds = useMemo(() => {
        return new Set(items.map(item => item.product.id));
    }, [items]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    const handleAddProduct = (product: Product) => {
        addToCart(product);
    };

    const handleAddAll = (productsToAdd: Product[]) => {
        productsToAdd.forEach(p => {
            addToCart(p);
        });
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen
                    ? "bg-muted text-muted-foreground rotate-0"
                    : "bg-primary text-primary-foreground hover:scale-110"
                    }`}
                aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
            >
                <HugeiconsIcon icon={isOpen ? Cancel01Icon : AiChat02Icon} className="size-6" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-90 max-w-[calc(100vw-48px)] h-125 max-h-[calc(100vh-120px)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                                <HugeiconsIcon icon={AiChat02Icon} className="size-4 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">BlinkBuy AI</h3>
                                <p className="text-xs text-muted-foreground">Your shopping assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearChat}
                                className="size-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                                title="Clear chat"
                            >
                                <HugeiconsIcon icon={Delete02Icon} className="size-4 text-muted-foreground" />
                            </button>
                            <button
                                onClick={closeChat}
                                className="size-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                            >
                                <HugeiconsIcon icon={Cancel01Icon} className="size-4 text-muted-foreground" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                                onAddProduct={handleAddProduct}
                                onAddAll={handleAddAll}
                                addedProductIds={addedProductIds}
                            />
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm">
                                    <div className="flex gap-1">
                                        <span className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="size-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-border">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={!input.trim()}>
                                <HugeiconsIcon icon={SentIcon} className="size-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
