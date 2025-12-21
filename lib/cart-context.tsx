"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product, CartItem } from "@/lib/types";

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "blinkbuy-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch {
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const addToCart = (product: Product, quantity: number = 1) => {
        setItems((current) => {
            const existingItem = current.find((item) => item.product.id === product.id);
            if (existingItem) {
                return current.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...current, { product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems((current) => current.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((current) =>
            current.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getItemQuantity = (productId: string) => {
        const item = items.find((item) => item.product.id === productId);
        return item?.quantity || 0;
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getItemQuantity,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
