"use client";

import { useState } from "react";
import { categories, getProductsByCategory, getProductsByTab, getCategoriesByTab, tabs } from "@/data/products";
import { CategoryNav } from "@/components/product/category-nav";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const filteredCategories = getCategoriesByTab(selectedTab);
  
  const displayedProducts = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : getProductsByTab(selectedTab);

  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name
    : selectedTab === "All" ? "All Products" : `${selectedTab} Products`;

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedCategory(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Tabs - Like Zepto */}
      <div className="bg-background border-b border-border sticky top-16 md:top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedTab === tab
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Category Navigation */}
        <section className="mb-8">
          <CategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={filteredCategories}
          />
        </section>

        {/* Promotional Banners - Only show on All tab */}
        {selectedTab === "All" && !selectedCategory && (
          <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Banner 1 */}
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-red-500 p-6 min-h-45">
              <div className="relative z-10">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Get Groceries
                </h3>
                <p className="text-white/90 text-lg mb-1">
                  at <span className="bg-white text-orange-600 px-2 py-0.5 rounded font-bold">₹0</span> Convenience Fee
                </p>
                <p className="text-white/80 text-sm mb-4">
                  Fresh vegetables, fruits & more
                </p>
                <Button className="bg-black text-white hover:bg-black/80">
                  Order now
                </Button>
              </div>
              <div className="absolute right-4 bottom-4 text-6xl opacity-20">
                🥬
              </div>
            </div>

            {/* Banner 2 */}
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 p-6 min-h-45 border border-purple-200 dark:border-purple-800">
              <div className="relative z-10">
                <p className="text-primary font-semibold mb-2">
                  ALL NEW <span className="text-purple-600 dark:text-purple-400">BLINKBUY</span> EXPERIENCE
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-2 shadow-sm">
                    <span className="text-2xl font-bold text-primary">₹0 FEES</span>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl px-4 py-2 shadow-sm">
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      EVERYDAY<br />LOWEST PRICES
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> ₹0 Handling Fee
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> ₹0 Delivery Fee*
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Products Section */}
        {selectedCategory ? (
          <ProductGrid
            products={displayedProducts}
            title={selectedCategoryName}
            showSeeAll={false}
          />
        ) : (
          <>
            {/* Featured Products by Category */}
            {filteredCategories.map((category) => {
              const categoryProducts = getProductsByCategory(category.id);
              if (categoryProducts.length === 0) return null;
              return (
                <ProductGrid
                  key={category.id}
                  products={categoryProducts.slice(0, 6)}
                  title={category.name}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-black text-primary">blink</span>
                <span className="text-xl font-black text-foreground">buy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Groceries delivered in 10 minutes
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Help</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">FAQs</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Download App</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  📱 App Store
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  🤖 Play Store
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2025 BlinkBuy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}