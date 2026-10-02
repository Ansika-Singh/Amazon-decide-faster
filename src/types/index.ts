export type Category = 
  | 'Electronics'
  | 'Audio'
  | 'Mobiles'
  | 'Home & Kitchen'
  | 'Fashion'
  | 'Books'
  | 'Fitness'
  | 'Beauty';

export interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number;
}

export interface ReviewSentiment {
  positive: number;
  neutral: number;
  negative: number;
}

export interface ReviewSummary {
  pros: string[];
  cons: string[];
  verdict: string;
  sentiment: ReviewSentiment;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: Category;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  images: string[];
  bullets: string[];
  description: string;
  stock: number;
  deliveryDays: number;
  priceHistory: PricePoint[];
  reviewSummary: ReviewSummary;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'upi' | 'card' | 'cod';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  estimatedDelivery: string;
  status: 'confirmed' | 'dispatched' | 'delivered';
}

export interface AssistPick {
  productId: string;
  rank: 1 | 2 | 3;
  label: 'Best overall' | 'Best value' | 'Best premium/alt' | string;
  reason: string;
}

export interface AssistResponse {
  picks: AssistPick[];
  interpretedAs: {
    budget?: number;
    useCase?: string;
    category?: string;
  };
  source: 'ai' | 'fallback';
}
