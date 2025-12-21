"use client";

import { Button } from "@/components/ui/button";
import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    size?: "sm" | "default";
}

export function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease,
    size = "default",
}: QuantitySelectorProps) {
    const isSmall = size === "sm";

    return (
        <div
            className={`inline-flex items-center gap-0 rounded-lg bg-[#c026d3] ${isSmall ? "h-7" : "h-9"
                }`}
        >
            <Button
                variant="ghost"
                size={isSmall ? "icon-xs" : "icon-sm"}
                onClick={onDecrease}
                className="text-white hover:bg-[#a21caf] rounded-l-lg rounded-r-none"
            >
                <HugeiconsIcon icon={MinusSignIcon} className="size-4" />
            </Button>
            <span
                className={`min-w-[28px] text-center font-semibold text-white ${isSmall ? "text-sm" : "text-base"
                    }`}
            >
                {quantity}
            </span>
            <Button
                variant="ghost"
                size={isSmall ? "icon-xs" : "icon-sm"}
                onClick={onIncrease}
                className="text-white hover:bg-[#a21caf] rounded-r-lg rounded-l-none"
            >
                <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
            </Button>
        </div>
    );
}
