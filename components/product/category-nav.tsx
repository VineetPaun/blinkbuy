"use client";

import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string | undefined) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {/* All Category */}
        <button
          onClick={() => onSelectCategory?.(undefined)}
          className={cn(
            "flex flex-col items-center min-w-[80px] p-2 rounded-xl transition-colors",
            !selectedCategory
              ? "bg-primary/10 text-primary"
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-1">
            <span className="text-2xl">🛒</span>
          </div>
          <span className="text-xs font-medium text-center">All</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory?.(category.id)}
            className={cn(
              "flex flex-col items-center min-w-[80px] p-2 rounded-xl transition-colors",
              selectedCategory === category.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-1 overflow-hidden">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-xs font-medium text-center line-clamp-2 max-w-[80px]">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
