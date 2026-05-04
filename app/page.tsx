"use client";

import { useState } from "react";
import { categories, getProductsByCategory, getProductsByTab, getCategoriesByTab, tabs } from "@/data/products";
import { CategoryNav } from "@/components/product/category-nav";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/lib/search-context";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { SafeIcon } from "@/components/ui/safe-icon";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LandingPage isLoading />;
  }

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return <ProductExperience />;
}

function LandingPage({ isLoading = false }: { isLoading?: boolean }) {
  const highlights = [
    { value: "10 min", label: "Average delivery" },
    { value: "4.8/5", label: "Customer rating" },
    { value: "500+", label: "Daily essentials" },
  ];

  const featureCards = [
    {
      title: "Instant delivery",
      description: "Groceries, snacks, and household needs delivered fast across the neighborhood.",
      icon: "⚡",
    },
    {
      title: "Fresh assortment",
      description: "From produce to dairy, discover quality products curated for everyday shopping.",
      icon: "🥬",
    },
    {
      title: "Simple checkout",
      description: "A streamlined cart, secure checkout, and order tracking all in one place.",
      icon: "🛒",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,38,211,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_30%)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
                <span className="text-base">🚀</span>
                BlinkBuy delivers daily essentials in minutes
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Groceries and essentials, delivered at lightning speed.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                Shop fresh produce, pantry staples, snacks, and home essentials from a fast, modern quick-commerce experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {isLoading ? (
                  <Button size="lg" className="h-12 rounded-full px-6 text-base" disabled>
                    Loading...
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button size="lg" className="h-12 rounded-full px-6 text-base">
                      Start shopping
                    </Button>
                  </SignInButton>
                )}
                <Button size="lg" variant="outline" className="h-12 rounded-full px-6 text-base">
                  Explore benefits
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur">
                {highlights.map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-xl font-black text-foreground sm:text-2xl">{item.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative grid gap-4 rounded-[2rem] border border-border bg-background p-5 shadow-2xl">
                <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery to</p>
                    <p className="font-semibold text-foreground">Bangalore, India</p>
                  </div>
                  <div className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    10 min
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Fresh vegetables", "🥦"],
                    ["Dairy & eggs", "🥚"],
                    ["Snacks & drinks", "🥤"],
                    ["Household care", "🧼"],
                  ].map(([label, emoji]) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl shadow-sm">
                        {emoji}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="text-sm text-muted-foreground">Ready in minutes</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-linear-to-r from-primary to-fuchsia-600 p-5 text-primary-foreground">
                  <p className="text-sm font-medium opacity-90">New user offer</p>
                  <p className="mt-2 text-2xl font-black">Flat ₹0 convenience fee on your first order</p>
                  <p className="mt-1 text-sm opacity-90">Sign in to unlock the full BlinkBuy catalog and checkout experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                {card.icon}
              </div>
              <h2 className="text-xl font-bold text-foreground">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-[2rem] border border-border bg-muted/30 p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why BlinkBuy</p>
              <h2 className="mt-3 text-3xl font-black text-foreground">Everything you need for a fast grocery run.</h2>
              <p className="mt-4 text-muted-foreground">
                Browse curated categories, search instantly, and complete your order with a clean, simple flow designed for everyday shopping.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Live search and category browsing",
                "Easy cart management",
                "Modern checkout flow",
                "Built for mobile and desktop",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductExperience() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { isSearching, searchQuery, searchResults, clearSearch } = useSearch();

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
    clearSearch(); // Clear search when changing tabs
  };

  // If searching, show search results
  if (isSearching) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {/* Search Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <SafeIcon icon={Search01Icon} className="size-6 text-muted-foreground" />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Search results for &quot;{searchQuery}&quot;
                </h1>
                <p className="text-sm text-muted-foreground">
                  {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={clearSearch} className="gap-2">
              <SafeIcon icon={Cancel01Icon} className="size-4" />
              Clear Search
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 ? (
            <ProductGrid
              products={searchResults}
              title=""
              showSeeAll={false}
            />
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn&apos;t find any products matching &quot;{searchQuery}&quot;
              </p>
              <Button onClick={clearSearch}>
                Browse All Products
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                className={`text-sm font-medium whitespace-nowrap transition-colors ${selectedTab === tab
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
                  products={categoryProducts}
                  title={category.name}
                  variant="scroll"
                  onSeeAll={() => setSelectedCategory(category.id)}
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