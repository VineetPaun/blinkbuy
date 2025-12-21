import { Product, CartItem } from "@/lib/types";
import { products } from "@/data/products";

// Tool definitions for OpenRouter function calling
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
            name: "get_recipe_ingredients",
            description:
                "Get a list of ingredients needed for a recipe and find matching products in the store. Use this when the user mentions cooking, making, or preparing a dish.",
            parameters: {
                type: "object",
                properties: {
                    recipe_name: {
                        type: "string",
                        description:
                            "The name of the recipe or dish (e.g., 'pasta', 'biryani', 'pancakes')",
                    },
                },
                required: ["recipe_name"],
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

// Recipe database
const recipes: Record<
    string,
    { name: string; ingredients: string[]; description: string }
> = {
    pasta: {
        name: "Classic Pasta",
        ingredients: [
            "pasta",
            "tomato",
            "onion",
            "garlic",
            "olive oil",
            "cheese",
            "basil",
        ],
        description: "A delicious Italian pasta with tomato sauce",
    },
    biryani: {
        name: "Chicken Biryani",
        ingredients: [
            "rice",
            "chicken",
            "onion",
            "tomato",
            "yogurt",
            "ginger",
            "garlic",
            "ghee",
        ],
        description: "Aromatic Indian rice dish with spices and chicken",
    },
    omelette: {
        name: "Cheese Omelette",
        ingredients: ["eggs", "cheese", "onion", "butter", "pepper"],
        description: "Fluffy omelette with melted cheese",
    },
    salad: {
        name: "Fresh Garden Salad",
        ingredients: [
            "lettuce",
            "tomato",
            "cucumber",
            "onion",
            "carrot",
            "lemon",
            "olive oil",
        ],
        description: "Healthy fresh vegetable salad",
    },
    sandwich: {
        name: "Club Sandwich",
        ingredients: [
            "bread",
            "cheese",
            "tomato",
            "lettuce",
            "butter",
            "mayonnaise",
        ],
        description: "Classic layered sandwich",
    },
    smoothie: {
        name: "Fruit Smoothie",
        ingredients: ["banana", "milk", "yogurt", "honey", "strawberry"],
        description: "Refreshing blended fruit drink",
    },
    pancakes: {
        name: "Fluffy Pancakes",
        ingredients: ["flour", "milk", "eggs", "butter", "sugar", "honey"],
        description: "Soft and fluffy breakfast pancakes",
    },
    dal: {
        name: "Dal Tadka",
        ingredients: [
            "dal",
            "lentils",
            "onion",
            "tomato",
            "garlic",
            "cumin",
            "ghee",
        ],
        description: "Indian spiced lentil curry",
    },
    curry: {
        name: "Vegetable Curry",
        ingredients: [
            "potato",
            "onion",
            "tomato",
            "garlic",
            "ginger",
            "coconut milk",
        ],
        description: "Rich and creamy vegetable curry",
    },
    "fried rice": {
        name: "Vegetable Fried Rice",
        ingredients: [
            "rice",
            "eggs",
            "onion",
            "carrot",
            "peas",
            "soy sauce",
            "garlic",
        ],
        description: "Quick and tasty fried rice",
    },
    pizza: {
        name: "Homemade Pizza",
        ingredients: [
            "flour",
            "cheese",
            "tomato",
            "onion",
            "capsicum",
            "olive oil",
            "oregano",
        ],
        description: "Delicious homemade pizza with toppings",
    },
    soup: {
        name: "Vegetable Soup",
        ingredients: [
            "tomato",
            "carrot",
            "onion",
            "potato",
            "garlic",
            "butter",
            "cream",
        ],
        description: "Warm and hearty vegetable soup",
    },
    tea: {
        name: "Masala Chai",
        ingredients: ["tea", "milk", "sugar", "ginger", "cardamom"],
        description: "Traditional Indian spiced tea",
    },
    coffee: {
        name: "Coffee",
        ingredients: ["coffee", "milk", "sugar"],
        description: "Hot brewed coffee",
    },
    cake: {
        name: "Chocolate Cake",
        ingredients: [
            "flour",
            "eggs",
            "sugar",
            "butter",
            "chocolate",
            "milk",
            "cocoa",
        ],
        description: "Rich and moist chocolate cake",
    },
    noodles: {
        name: "Stir Fried Noodles",
        ingredients: [
            "noodles",
            "vegetables",
            "onion",
            "garlic",
            "soy sauce",
            "oil",
        ],
        description: "Quick Asian-style stir fried noodles",
    },
};

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

export function getRecipeIngredients(recipeName: string): {
    found: boolean;
    recipe?: { name: string; description: string; ingredients: string[] };
    products: Product[];
} {
    const lowerName = recipeName.toLowerCase().trim();

    // Find matching recipe
    let matchedRecipe:
        | { name: string; description: string; ingredients: string[] }
        | undefined;

    for (const [key, recipe] of Object.entries(recipes)) {
        if (lowerName.includes(key) || key.includes(lowerName)) {
            matchedRecipe = recipe;
            break;
        }
    }

    if (!matchedRecipe) {
        return { found: false, products: [] };
    }

    // Find matching products for ingredients
    const matchedProducts = findProductsByNames(matchedRecipe.ingredients);

    return {
        found: true,
        recipe: matchedRecipe,
        products: matchedProducts,
    };
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

// Available recipes for help text
export function getAvailableRecipes(): string[] {
    return Object.values(recipes).map((r) => r.name);
}
