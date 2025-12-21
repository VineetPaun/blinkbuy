import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { SearchProvider } from "@/lib/search-context";
import { AIChatProvider } from "@/lib/ai-chat-context";
import { Header } from "@/components/layout/header";
import { AIChat } from "@/components/ai/ai-chat";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlinkBuy - Quick Commerce | Groceries in 10 Minutes",
  description: "Get groceries, daily essentials & more delivered in just 10 minutes. Shop now for the fastest delivery experience!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <AIChatProvider>
              <SearchProvider>
                <Header />
                <main>{children}</main>
                <AIChat />
              </SearchProvider>
            </AIChatProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
