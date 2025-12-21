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
}
