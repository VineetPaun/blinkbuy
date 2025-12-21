import { NextRequest, NextResponse } from "next/server";
import { aiTools } from "@/lib/ai-tools";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are BlinkBuy AI, a helpful shopping assistant for a quick commerce grocery app. You help users:
- Add and remove products from their cart
- Find products they're looking for
- Suggest ingredients for recipes they want to cook
- Manage their shopping cart

Be friendly, concise, and helpful. Use emojis sparingly to be friendly.

When users mention cooking or making a dish, use the get_recipe_ingredients tool first, then use suggest_products_for_cart to show them the ingredients they can add.

When users want to add items, use the add_to_cart tool.
When users want to remove items, use the remove_from_cart tool.
When users ask about their cart, use get_cart_contents.
When users want to search or find products, use search_products.

Always confirm what actions you've taken. If a tool returns products, mention them by name.`;

export async function POST(request: NextRequest) {
    try {
        if (!OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "OpenRouter API key not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { messages, cartContext } = body;

        // Add cart context to system prompt
        const systemWithContext = `${SYSTEM_PROMPT}

Current cart state:
${cartContext || "Cart is empty."}

Available product categories: Dairy, Fruits, Vegetables, Bakery, Snacks, Beverages, Meat, Breakfast, Personal Care, Cleaning, Pantry, Frozen`;

        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer":
                    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                "X-Title": "BlinkBuy AI Shopping Assistant",
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    { role: "system", content: systemWithContext },
                    ...messages,
                ],
                tools: aiTools,
                tool_choice: "auto",
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("OpenRouter error:", error);
            return NextResponse.json(
                { error: "Failed to get AI response" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("AI API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
