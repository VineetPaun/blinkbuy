"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { products, categories } from "@/data/products";
import { Product, Category } from "@/lib/types";
import { useSearch } from "@/lib/search-context";
import { Search01Icon, Clock04Icon, ArrowRight01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface SearchResult {
    type: "product" | "category" | "recent";
    item: Product | Category | string;
}

const MAX_SUGGESTIONS = 8;
const RECENT_SEARCHES_KEY = "blinkbuy_recent_searches";

function getRecentSearches(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function saveRecentSearch(query: string) {
    if (typeof window === "undefined" || !query.trim()) return;
    try {
        const recent = getRecentSearches();
        const updated = [query, ...recent.filter((s) => s.toLowerCase() !== query.toLowerCase())].slice(0, 5);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
        // Ignore localStorage errors
    }
}

function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    return products
        .filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(lowerQuery);
            const descMatch = product.description.toLowerCase().includes(lowerQuery);
            const categoryMatch = product.category.toLowerCase().includes(lowerQuery);
            const tagMatch = product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
            return nameMatch || descMatch || categoryMatch || tagMatch;
        })
        .sort((a, b) => {
            // Prioritize name matches that start with the query
            const aNameMatch = a.name.toLowerCase().startsWith(lowerQuery);
            const bNameMatch = b.name.toLowerCase().startsWith(lowerQuery);
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            return 0;
        })
        .slice(0, MAX_SUGGESTIONS);
}

function searchCategories(query: string): Category[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    return categories
        .filter((cat) => cat.name.toLowerCase().includes(lowerQuery))
        .slice(0, 3);
}

export function SearchBar() {
    const { performSearch, selectCategory, clearSearch, isSearching } = useSearch();
    const [internalQuery, setInternalQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track selected index - will reset based on query matching
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Derive query from isSearching state - clear when not searching
    const query = isSearching ? internalQuery : "";
    const setQuery = useCallback((value: string) => {
        setInternalQuery(value);
        // Reset selection when query changes
        setSelectedIndex(-1);
    }, []);

    // State for recent searches - initialized empty to avoid hydration mismatch
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    // Load recent searches on client-side only
    useEffect(() => {
        setRecentSearches(getRecentSearches());

        const handleStorage = () => {
            setRecentSearches(getRecentSearches());
        };

        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    // Derive results from query and recentSearches using useMemo
    const results = useMemo<SearchResult[]>(() => {
        if (!query.trim()) {
            // Show recent searches when query is empty
            return recentSearches.slice(0, 5).map((s) => ({
                type: "recent",
                item: s,
            }));
        }

        // Search products and categories
        const matchedProducts = searchProducts(query);
        const matchedCategories = searchCategories(query);

        const productResults: SearchResult[] = matchedProducts.map((p) => ({
            type: "product",
            item: p,
        }));

        const categoryResults: SearchResult[] = matchedCategories.map((c) => ({
            type: "category",
            item: c,
        }));

        return [...categoryResults, ...productResults];
    }, [query, recentSearches]);

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectResult = useCallback((result: SearchResult) => {
        if (result.type === "product") {
            const product = result.item as Product;
            setQuery(product.name);
            saveRecentSearch(product.name);
            performSearch(product.name);
        } else if (result.type === "category") {
            const category = result.item as Category;
            setQuery(category.name);
            saveRecentSearch(category.name);
            selectCategory(category);
        } else if (result.type === "recent") {
            const searchTerm = result.item as string;
            setQuery(searchTerm);
            performSearch(searchTerm);
        }
        setIsFocused(false);
        // Trigger storage event to update recent searches
        window.dispatchEvent(new Event("storage"));
    }, [performSearch, selectCategory, setQuery]);

    const handleSearch = useCallback((searchTerm: string) => {
        if (searchTerm.trim()) {
            saveRecentSearch(searchTerm);
            performSearch(searchTerm);
            // Trigger storage event to update recent searches
            window.dispatchEvent(new Event("storage"));
        }
        setIsFocused(false);
    }, [performSearch]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!isFocused || results.length === 0) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (selectedIndex >= 0 && selectedIndex < results.length) {
                        handleSelectResult(results[selectedIndex]);
                    } else if (query.trim()) {
                        handleSearch(query);
                    }
                    break;
                case "Escape":
                    setIsFocused(false);
                    inputRef.current?.blur();
                    break;
            }
        },
        [isFocused, results, selectedIndex, query, handleSelectResult, handleSearch, setSelectedIndex]
    );

    const handleClearSearch = () => {
        setQuery("");
        clearSearch();
        inputRef.current?.focus();
    };

    const showDropdown = isFocused && results.length > 0;

    return (
        <div ref={containerRef} className="relative flex-1 max-w-2xl mx-4">
            <div className="relative">
                <HugeiconsIcon
                    icon={Search01Icon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground z-10"
                />
                <Input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                    placeholder='Search for "milk"'
                    className="pl-10 pr-10 h-10 bg-muted/50 border-transparent focus:border-primary"
                    autoComplete="off"
                />
                {/* Clear button */}
                {query && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground hover:text-foreground transition-colors z-10"
                    >
                        <HugeiconsIcon icon={Cancel01Icon} className="size-5" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-2xl shadow-lg overflow-hidden z-50">
                    <div className="max-h-96 overflow-y-auto">
                        {!query.trim() && results.length > 0 && (
                            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Recent Searches
                            </div>
                        )}

                        {results.map((result, index) => (
                            <button
                                key={`${result.type}-${index}`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${index === selectedIndex
                                    ? "bg-primary/10"
                                    : "hover:bg-muted/50"
                                    }`}
                                onClick={() => handleSelectResult(result)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                {result.type === "product" && (
                                    <ProductSuggestion
                                        product={result.item as Product}
                                        query={query}
                                    />
                                )}
                                {result.type === "category" && (
                                    <CategorySuggestion
                                        category={result.item as Category}
                                        query={query}
                                    />
                                )}
                                {result.type === "recent" && (
                                    <RecentSuggestion search={result.item as string} />
                                )}
                            </button>
                        ))}
                    </div>

                    {query.trim() && (
                        <button
                            className="w-full flex items-center justify-between px-3 py-3 border-t border-border text-sm text-primary font-medium hover:bg-muted/50 transition-colors"
                            onClick={() => handleSearch(query)}
                        >
                            <span>Search for &quot;{query}&quot;</span>
                            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

function ProductSuggestion({ product, query }: { product: Product; query: string }) {
    return (
        <>
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
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
                <p className="text-sm font-medium text-foreground truncate">
                    <HighlightMatch text={product.name} query={query} />
                </p>
                <p className="text-xs text-muted-foreground">
                    ₹{product.price} • {product.unit}
                </p>
            </div>
            {product.badge && (
                <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    {product.badge}
                </span>
            )}
        </>
    );
}

function CategorySuggestion({ category, query }: { category: Category; query: string }) {
    return (
        <>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl">{category.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                    <HighlightMatch text={category.name} query={query} />
                </p>
                <p className="text-xs text-muted-foreground">Category</p>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 text-muted-foreground" />
        </>
    );
}

function RecentSuggestion({ search }: { search: string }) {
    return (
        <>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Clock04Icon} className="size-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{search}</p>
            </div>
        </>
    );
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <>{text}</>;

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return <>{text}</>;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
        <>
            {before}
            <span className="text-primary font-semibold">{match}</span>
            {after}
        </>
    );
}
