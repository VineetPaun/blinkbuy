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

### 🔐 Authentication

-   **Email/password auth** - Secure signup and login with bcrypt hashing
-   **Phone OTP auth** - Login with phone number and Twilio Verify OTP
-   **Session security** - Signed httpOnly JWT cookies with 7-day expiry
-   **Route protection** - Middleware protects app pages and non-auth APIs

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
    GROQ_API_KEY=your_groq_api_key_here
    DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
    AUTH_JWT_SECRET=replace_with_a_long_random_secret
    AUTH_COOKIE_NAME=bb_session
    TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    TWILIO_AUTH_TOKEN=replace_with_twilio_auth_token
    TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

    You can copy `.env.example` and fill in your real values.

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

6. **Generate and apply database migrations**

    ```bash
    npm run db:generate
    npm run db:migrate
    ```

7. **Run test suite**

    ```bash
    npm run test
    ```

## 🔧 Twilio Verify Setup

1. Create a Twilio account and open the [Verify services dashboard](https://www.twilio.com/console/verify/services).
2. Create a Verify service with SMS channel enabled.
3. Copy the service SID to `TWILIO_VERIFY_SERVICE_SID`.
4. Add your account SID and auth token to the environment variables.
5. For trial accounts, verify destination numbers before requesting OTP.

## 🧱 Auth API Endpoints

-   `POST /api/auth/signup`
-   `POST /api/auth/login/password`
-   `POST /api/auth/login/otp/request`
-   `POST /api/auth/login/otp/verify`
-   `POST /api/auth/logout`
-   `GET /api/auth/me`

## 🔐 Security Notes

-   Never commit real secrets into git-tracked files.
-   Rotate any previously exposed credentials before production use.
-   Keep `AUTH_JWT_SECRET` long and random in every environment.

## 📁 Project Structure

```
blinkbuy/
├── app/                    # Next.js App Router
│   ├── api/ai/chat/        # AI chat API endpoint
│   ├── api/auth/           # Authentication route handlers
│   ├── auth/               # Login and signup pages
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/
│   ├── ai/                 # AI chat components
│   ├── auth/               # Login, signup and OTP forms
│   ├── cart/               # Shopping cart components
│   ├── layout/             # Header, search bar
│   ├── product/            # Product cards, grid, navigation
│   └── ui/                 # Reusable UI components
├── data/
│   └── products.ts         # Product catalog data
├── lib/
│   ├── auth/               # Auth service and security helpers
│   ├── db/                 # Neon client and Drizzle schema
│   ├── ai-chat-context.tsx # AI chat state management
│   ├── ai-tools.ts         # AI function calling tools
│   ├── cart-context.tsx    # Cart state management
│   ├── search-context.tsx  # Search state management
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── drizzle/                # SQL migrations generated by Drizzle Kit
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
| **AI**         | [Groq API](https://console.groq.com/docs/quickstart)      |
| **Database**   | [Neon Postgres](https://neon.tech/)                       |
| **ORM**        | [Drizzle ORM](https://orm.drizzle.team/)                  |
| **OTP**        | [Twilio Verify](https://www.twilio.com/docs/verify)       |

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm run test`  | Run Vitest suite         |
| `npm run db:generate` | Generate DB migrations |
| `npm run db:migrate` | Apply DB migrations |
| `npm run db:studio` | Open Drizzle Studio |

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
-   [Groq](https://groq.com/) for AI capabilities

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/VineetPaun">Vineet Paun</a>
</p>
