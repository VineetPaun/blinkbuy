// Root layout wires global providers and preloads the authenticated user for the header.
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { SearchProvider } from "@/lib/search-context";
import { AIChatProvider } from "@/lib/ai-chat-context";
import { Header } from "@/components/layout/header";
import { AIChat } from "@/components/ai/ai-chat";
import { ThemeProvider } from "@/components/theme-provider";
import { getCurrentUserFromServerCookies } from "@/lib/auth/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUserFromServerCookies();

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
                <Header initialUser={currentUser} />
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
