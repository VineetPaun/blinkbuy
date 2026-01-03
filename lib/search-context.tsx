"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product, Category } from "@/lib/types";
import { products } from "@/data/products";

interface SearchContextType {
    searchQuery: string;
    searchResults: Product[];
    searchedCategory: Category | null;
    isSearching: boolean;
    performSearch: (query: string) => void;
    clearSearch: () => void;
    selectCategory: (category: Category) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [searchedCategory, setSearchedCategory] = useState<Category | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const performSearch = useCallback((query: string) => {
        const trimmedQuery = query.trim();
        setSearchQuery(trimmedQuery);
        setSearchedCategory(null);

        if (!trimmedQuery) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const lowerQuery = trimmedQuery.toLowerCase();

        const results = products.filter((product) => {
            const nameMatch = product.name.toLowerCase().includes(lowerQuery);
            const descMatch = product.description.toLowerCase().includes(lowerQuery);
            const categoryMatch = product.category.toLowerCase().includes(lowerQuery);
            const tagMatch = product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
            return nameMatch || descMatch || categoryMatch || tagMatch;
        });

        // Sort results - prioritize name matches
        results.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().startsWith(lowerQuery);
            const bNameMatch = b.name.toLowerCase().startsWith(lowerQuery);
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            return 0;
        });

        setSearchResults(results);
    }, []);

    const selectCategory = useCallback((category: Category) => {
        setSearchQuery(category.name);
        setSearchedCategory(category);
        setIsSearching(true);

        // Get products for this category
        const results = products.filter((p) => p.category === category.id);
        setSearchResults(results);
    }, []);

    const clearSearch = useCallback(() => {
        setSearchQuery("");
        setSearchResults([]);
        setSearchedCategory(null);
        setIsSearching(false);
    }, []);

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                searchResults,
                searchedCategory,
                isSearching,
                performSearch,
                clearSearch,
                selectCategory,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
