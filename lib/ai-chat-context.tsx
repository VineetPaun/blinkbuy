"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import {
    searchProducts,
    findProductsByNames,
    formatCartContents,
} from "@/lib/ai-tools";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    suggestedProducts?: Product[];
    addedProducts?: Product[];
    removedProducts?: Product[];
    isRecipeSuggestion?: boolean;
}

interface OpenRouterMessage {
    role: "user" | "assistant" | "system" | "tool";
    content: string | null;
    tool_calls?: Array<{
        id: string;
        type: "function";
        function: {
            name: string;
            arguments: string;
        };
    }>;
    tool_call_id?: string;
}

interface AIChatContextType {
    messages: ChatMessage[];
    isOpen: boolean;
    isTyping: boolean;
    openChat: () => void;
    closeChat: () => void;
    toggleChat: () => void;
    sendMessage: (message: string) => void;
    addSuggestedToCart: (products: Product[]) => void;
    clearChat: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export function AIChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm your BlinkBuy AI assistant 🛒\n\nI can help you:\n• Add or remove products from your cart\n• Suggest ingredients for recipes\n• Find products you need\n\nTry saying \"I want to make pasta\" or \"Add milk and eggs\"!"
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { addToCart, removeFromCart, items, clearCart } = useCart();

    // Keep track of conversation history for OpenRouter
    const conversationHistory = useRef<OpenRouterMessage[]>([]);

    // Execute tool calls and return results
    const executeToolCall = useCallback((
        toolName: string,
        args: Record<string, unknown>
    ): { result: string; products?: Product[]; addedProducts?: Product[]; removedProducts?: Product[]; isRecipeSuggestion?: boolean } => {
        switch (toolName) {
            case "search_products": {
                const query = args.query as string;
                const limit = (args.limit as number) || 6;
                const found = searchProducts(query, limit);
                return {
                    result: found.length > 0
                        ? `Found ${found.length} products: ${found.map(p => p.name).join(", ")}`
                        : `No products found for "${query}"`,
                    products: found
                };
            }

            case "add_to_cart": {
                const productNames = args.product_names as string[];
                const quantities = args.quantities as number[] | undefined;
                const added: Product[] = [];

                productNames.forEach((name, index) => {
                    const found = findProductsByNames([name]);
                    if (found.length > 0) {
                        const product = found[0];
                        const quantity = quantities && quantities[index] ? quantities[index] : 1;
                        addToCart(product, quantity);
                        added.push(product);
                    }
                });

                if (added.length > 0) {
                    return {
                        result: `Added ${added.length} item(s) to cart: ${added.map(p => p.name).join(", ")}`,
                        addedProducts: added
                    };
                }
                return { result: "Could not find those products to add." };
            }

            case "remove_from_cart": {
                const productNames = args.product_names as string[];
                const found = findProductsByNames(productNames);
                const removed: Product[] = [];

                for (const product of found) {
                    const inCart = items.find(item => item.product.id === product.id);
                    if (inCart) {
                        removeFromCart(product.id);
                        removed.push(product);
                    }
                }

                return {
                    result: removed.length > 0
                        ? `Removed ${removed.length} item(s) from cart: ${removed.map(p => p.name).join(", ")}`
                        : "Those items are not in the cart.",
                    removedProducts: removed
                };
            }

            case "get_cart_contents": {
                return { result: formatCartContents(items) };
            }

            case "clear_cart": {
                const count = items.length;
                if (count > 0) {
                    clearCart();
                    return { result: `Cleared ${count} item(s) from the cart.` };
                }
                return { result: "The cart is already empty." };
            }



            case "suggest_products_for_cart": {
                const productNames = args.product_names as string[];
                const found = findProductsByNames(productNames);
                return {
                    result: found.length > 0
                        ? `Suggesting ${found.length} products: ${found.map(p => `${p.name} (₹${p.price})`).join(", ")}`
                        : "Could not find matching products to suggest.",
                    products: found,
                    isRecipeSuggestion: true
                };
            }

            default:
                return { result: `Unknown tool: ${toolName}` };
        }
    }, [addToCart, removeFromCart, items, clearCart]);

    // Call OpenRouter API
    const callOpenRouter = useCallback(async (
        userMessage: string
    ): Promise<ChatMessage> => {
        const messageId = `msg-${Date.now()}`;

        // Add user message to conversation history
        conversationHistory.current.push({
            role: "user",
            content: userMessage
        });

        try {
            // Get current cart context
            const cartContext = formatCartContents(items);

            // Call our API route
            const response = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: conversationHistory.current,
                    cartContext
                })
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();
            const choice = data.choices?.[0];

            if (!choice) {
                throw new Error("No response from AI");
            }

            let assistantMessage = choice.message;
            let finalContent = assistantMessage.content || "";
            let suggestedProducts: Product[] | undefined;
            let addedProducts: Product[] | undefined;
            let removedProducts: Product[] | undefined;
            let isRecipeSuggestion = false;

            // Handle tool calls
            while (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
                // Add assistant message with tool calls to history
                conversationHistory.current.push({
                    role: "assistant",
                    content: assistantMessage.content,
                    tool_calls: assistantMessage.tool_calls
                });

                // Execute each tool call
                for (const toolCall of assistantMessage.tool_calls) {
                    const toolName = toolCall.function.name;
                    const toolArgs = JSON.parse(toolCall.function.arguments);

                    const toolResult = executeToolCall(toolName, toolArgs);

                    // Collect products from tool results
                    if (toolResult.products) {
                        suggestedProducts = [...(suggestedProducts || []), ...toolResult.products];
                    }
                    if (toolResult.addedProducts) {
                        addedProducts = [...(addedProducts || []), ...toolResult.addedProducts];
                    }
                    if (toolResult.removedProducts) {
                        removedProducts = [...(removedProducts || []), ...toolResult.removedProducts];
                    }
                    if (toolResult.isRecipeSuggestion) {
                        isRecipeSuggestion = true;
                    }

                    // Add tool result to history
                    conversationHistory.current.push({
                        role: "tool",
                        content: toolResult.result,
                        tool_call_id: toolCall.id
                    });
                }

                // Call API again with tool results
                const followUpResponse = await fetch("/api/ai/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: conversationHistory.current,
                        cartContext: formatCartContents(items)
                    })
                });

                if (!followUpResponse.ok) {
                    throw new Error("Follow-up API request failed");
                }

                const followUpData = await followUpResponse.json();
                assistantMessage = followUpData.choices?.[0]?.message;

                if (assistantMessage?.content) {
                    finalContent = assistantMessage.content;
                }
            }

            // Add final assistant response to history
            conversationHistory.current.push({
                role: "assistant",
                content: finalContent
            });

            // Deduplicate products
            if (suggestedProducts) {
                const seen = new Set<string>();
                suggestedProducts = suggestedProducts.filter(p => {
                    if (seen.has(p.id)) return false;
                    seen.add(p.id);
                    return true;
                });
            }

            return {
                id: messageId,
                role: "assistant",
                content: finalContent || "I processed your request.",
                suggestedProducts: suggestedProducts?.length ? suggestedProducts : undefined,
                addedProducts: addedProducts?.length ? addedProducts : undefined,
                removedProducts: removedProducts?.length ? removedProducts : undefined,
                isRecipeSuggestion
            };

        } catch (error) {
            console.error("AI Chat error:", error);

            // Remove the failed message from history
            conversationHistory.current.pop();

            return {
                id: messageId,
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again. Make sure the OpenRouter API key is configured."
            };
        }
    }, [executeToolCall, items]);

    const sendMessage = useCallback(async (message: string) => {
        if (!message.trim()) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: "user",
            content: message
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await callOpenRouter(message);
            setMessages(prev => [...prev, response]);
        } catch (error) {
            console.error("Send message error:", error);
            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: "Sorry, something went wrong. Please try again."
            }]);
        } finally {
            setIsTyping(false);
        }
    }, [callOpenRouter]);

    const addSuggestedToCart = useCallback((productsToAdd: Product[]) => {
        productsToAdd.forEach(p => addToCart(p));

        const confirmMessage: ChatMessage = {
            id: `confirm-${Date.now()}`,
            role: "assistant",
            content: `Added ${productsToAdd.length} item${productsToAdd.length > 1 ? "s" : ""} to your cart! 🎉`,
            addedProducts: productsToAdd
        };

        setMessages(prev => [...prev, confirmMessage]);
    }, [addToCart]);

    const clearChat = useCallback(() => {
        conversationHistory.current = [];
        setMessages([{
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm your BlinkBuy AI assistant 🛒\n\nI can help you:\n• Add or remove products from your cart\n• Suggest ingredients for recipes\n• Find products you need\n\nTry saying \"I want to make pasta\" or \"Add milk and eggs\"!"
        }]);
    }, []);

    const openChat = useCallback(() => setIsOpen(true), []);
    const closeChat = useCallback(() => setIsOpen(false), []);
    const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

    return (
        <AIChatContext.Provider
            value={{
                messages,
                isOpen,
                isTyping,
                openChat,
                closeChat,
                toggleChat,
                sendMessage,
                addSuggestedToCart,
                clearChat
            }}
        >
            {children}
        </AIChatContext.Provider>
    );
}

export function useAIChat() {
    const context = useContext(AIChatContext);
    if (!context) {
        throw new Error("useAIChat must be used within an AIChatProvider");
    }
    return context;
}
