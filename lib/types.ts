// Shared application types used by UI state, auth APIs, and server-side session logic.
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    unit: string;
    inStock: boolean;
    badge?: string;
    rating?: number;
    reviews?: number;
    tags?: string[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
    image?: string;
    tab?: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string | null;
    phoneE164: string | null;
    phoneVerifiedAt: string | null;
}

export interface SessionPayload {
    sub: string;
    email: string | null;
    phone: string | null;
    iat: number;
    exp: number;
}

export interface SignupInput {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export interface PasswordLoginInput {
    email: string;
    password: string;
}

export interface OtpRequestInput {
    phone: string;
    country?: string;
}

export interface OtpVerifyInput {
    phone: string;
    country?: string;
    code: string;
}
