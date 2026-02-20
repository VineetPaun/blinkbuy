import { Product, CartItem } from "@/lib/types";
import { products } from "@/data/products";

// Tool definitions for OpenAI-compatible function calling
export const aiTools = [
    {
        type: "function" as const,
        function: {
            name: "search_products",
            description:
                "Search for products in the store by name, category, or keywords. Use this when the user wants to find products or mentions any grocery items.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description:
                            "The search query - product name, category, or keywords",
                    },
                    limit: {
                        type: "number",
                        description:
                            "Maximum number of products to return (default: 6)",
                    },
                },
                required: ["query"],
            },
        },
    },
    {
        type: "function" as const,
        function: {
            name: "add_to_cart",
            description:
                "Add one or more products to the shopping cart. Use this when the user wants to add, buy, get, or put items in their cart.",
            parameters: {
                type: "object",
                properties: {
                    product_names: {
                        type: "array",
                        items: { type: "string" },
                        description:
                            "List of product names or keywords to add to cart",
                    },
                    quantities: {
                        type: "array",
                        items: { type: "number" },
                        description:
                            "Quantities for each product (optional, defaults to 1 for each)",
                    },
                },
                required: ["product_names"],
            },
        },
    },
    {
        type: "function" as const,
        function: {
            name: "remove_from_cart",
            description:
                "Remove products from the shopping cart. Use this when the user wants to remove, delete, or take out items from their cart.",
            parameters: {
                type: "object",
                properties: {
                    product_names: {
                        type: "array",
                        items: { type: "string" },
                        description:
                            "List of product names or keywords to remove from cart",
                    },
                },
                required: ["product_names"],
            },
        },
    },
    {
        type: "function" as const,
        function: {
            name: "get_cart_contents",
            description:
                "Get the current contents of the shopping cart. Use this when the user asks to see, show, or list their cart.",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    },
    {
        type: "function" as const,
        function: {
            name: "clear_cart",
            description:
                "Remove all items from the shopping cart. Use this when the user wants to clear, empty, or reset their cart.",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    },

    {
        type: "function" as const,
        function: {
            name: "suggest_products_for_cart",
            description:
                "Suggest products to add to cart without actually adding them. Returns products with an option for the user to add them. Use this for recipe ingredients or product recommendations.",
            parameters: {
                type: "object",
                properties: {
                    product_names: {
                        type: "array",
                        items: { type: "string" },
                        description:
                            "List of product names or keywords to suggest",
                    },
                    reason: {
                        type: "string",
                        description:
                            "Why these products are being suggested (e.g., 'for making pasta')",
                    },
                },
                required: ["product_names"],
            },
        },
    },
];

// Tool execution functions
export function searchProducts(query: string, limit: number = 6): Product[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    const matches = products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(lowerQuery);
        const descMatch = product.description
            .toLowerCase()
            .includes(lowerQuery);
        const categoryMatch = product.category
            .toLowerCase()
            .includes(lowerQuery);
        const tagMatch = product.tags?.some((t) =>
            t.toLowerCase().includes(lowerQuery)
        );
        return nameMatch || descMatch || categoryMatch || tagMatch;
    });

    // Sort by relevance - name matches first
    matches.sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().startsWith(lowerQuery);
        const bNameMatch = b.name.toLowerCase().startsWith(lowerQuery);
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
    });

    return matches.slice(0, limit);
}

export function findProductsByNames(names: string[]): Product[] {
    const found: Product[] = [];
    const seen = new Set<string>();

    for (const name of names) {
        const lowerName = name.toLowerCase().trim();
        if (!lowerName) continue;

        for (const product of products) {
            if (seen.has(product.id)) continue;

            const nameMatch = product.name.toLowerCase().includes(lowerName);
            const tagMatch = product.tags?.some((t) =>
                t.toLowerCase().includes(lowerName)
            );

            if (nameMatch || tagMatch) {
                found.push(product);
                seen.add(product.id);
                break; // Only find first match per search term
            }
        }
    }

    return found;
}

export function formatCartContents(items: CartItem[]): string {
    if (items.length === 0) {
        return "Your cart is empty.";
    }

    const itemList = items
        .map(
            (item) =>
                `• ${item.product.name} × ${item.quantity} — ₹${
                    item.product.price * item.quantity
                }`
        )
        .join("\n");

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return `Your cart:\n${itemList}\n\nTotal: ₹${total}`;
}

export function formatProductList(productList: Product[]): string {
    if (productList.length === 0) {
        return "No products found.";
    }

    return productList
        .map((p) => `• ${p.name} - ₹${p.price}/${p.unit}`)
        .join("\n");
}
