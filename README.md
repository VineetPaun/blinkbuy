# 🛒 BlinkBuy

A modern, AI-powered grocery and shopping e-commerce application built with Next.js 16, React 19, and Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🤖 AI Shopping Assistant

-   **Conversational shopping** - Chat naturally to find products and add them to your cart
-   **Smart product search** - AI understands natural language queries
-   **Cart management via chat** - Add, remove, or modify cart items through conversation
-   **Product recommendations** - Get personalized suggestions based on your needs

### 🛍️ Product Browsing

-   **Multi-category navigation** - Browse through Cafe, Home, Toys, Fresh, Electronics, Mobiles, Beauty, and Fashion
-   **Smart search** - Real-time product search with instant results
-   **Category filtering** - Filter products by specific categories within each tab
-   **Responsive product grid** - Beautiful card-based product display

### 🛒 Shopping Cart

-   **Slide-out cart drawer** - Seamless cart experience without leaving the page
-   **Quantity management** - Easy increment/decrement controls
-   **Real-time totals** - Instant price calculations with delivery estimates
-   **Persistent state** - Cart maintains state across sessions

### 🎨 User Experience

-   **Dark/Light mode** - Full theme support with smooth transitions
-   **Responsive design** - Works flawlessly on desktop, tablet, and mobile
-   **Modern UI components** - Built with Base UI and custom shadcn-style components
-   **Smooth animations** - Polished transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.17 or later
-   npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/VineetPaun/blinkbuy.git
    cd blinkbuy
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```env
    OPENROUTER_API_KEY=your_openrouter_api_key_here
    ```

4. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
blinkbuy/
├── app/                    # Next.js App Router
│   ├── api/ai/chat/        # AI chat API endpoint
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/
│   ├── ai/                 # AI chat components
│   ├── cart/               # Shopping cart components
│   ├── layout/             # Header, search bar
│   ├── product/            # Product cards, grid, navigation
│   └── ui/                 # Reusable UI components
├── data/
│   └── products.ts         # Product catalog data
├── lib/
│   ├── ai-chat-context.tsx # AI chat state management
│   ├── ai-tools.ts         # AI function calling tools
│   ├── cart-context.tsx    # Cart state management
│   ├── search-context.tsx  # Search state management
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🛠️ Tech Stack

| Category       | Technology                                                |
| -------------- | --------------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/)                         |
| **UI Library** | [React 19](https://react.dev/)                            |
| **Language**   | [TypeScript 5](https://www.typescriptlang.org/)           |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com/)                |
| **Components** | [Base UI](https://base-ui.com/)                           |
| **Icons**      | [Hugeicons](https://hugeicons.com/)                       |
| **Theme**      | [next-themes](https://github.com/pacocoursey/next-themes) |
| **AI**         | [OpenRouter API](https://openrouter.ai/)                  |

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

-   [Next.js](https://nextjs.org/) for the amazing React framework
-   [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
-   [Hugeicons](https://hugeicons.com/) for beautiful icons
-   [OpenRouter](https://openrouter.ai/) for AI capabilities

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/VineetPaun">Vineet Paun</a>
</p>
