const BASE = "https://yunora-enterprise-system-1.onrender.com";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API POST ${path} → ${res.status}`);
  return res.json();
}

export interface ApiProduct {
  id: number;
  name: string;
  sku?: string;
  brand?: string;
  price: number;
  salePrice?: number | null;
  stock?: number;
  color?: string;
  material?: string;
  description?: string;
  imageUrl?: string | null;
  categoryId?: number | null;
  createdAt?: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null;
  imageUrl?: string | null;
}

export interface ApiBanner {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  type: string;
  priority?: number;
  startsAt?: string;
  expiresAt?: string;
}

export interface ApiOffer {
  id: number;
  text: string;
  priority?: number;
  startsAt?: string;
  expiresAt?: string;
}

export interface ApiReview {
  id: number;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiBlog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string | null;
  category?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
}

export interface ApiSiteSettings {
  siteName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  pinterest?: string;
  googleMapsEmbed?: string;
}

export interface ApiOrderTimeline {
  status: string;
  label: string;
  completed: boolean;
  active: boolean;
}

export interface ApiOrder {
  orderNumber: string;
  customerName: string;
  status: string;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  timeline: ApiOrderTimeline[];
}

export interface ApiDealer {
  id: number;
  businessName: string;
  contactName?: string;
  phone?: string;
  city: string;
}

export interface ApiInventory {
  productId: number;
  totalStock: number;
  warehouses: { warehouseId: number; stock: number; lowStockThreshold: number }[];
}

export interface ApiProductsResponse {
  items: ApiProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiReviewsResponse {
  items: ApiReview[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiBlogsResponse {
  items: ApiBlog[];
  total: number;
  page: number;
  totalPages: number;
}

export const api = {
  products: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiProductsResponse>(`/api/public/products${q}`);
  },
  product: (id: number) => get<ApiProduct>(`/api/public/products/${id}`),
  categories: () => get<ApiCategory[]>("/api/public/categories"),
  banners: (type?: string) => get<ApiBanner[]>(`/api/public/banners${type ? `?type=${type}` : ""}`),
  offers: () => get<ApiOffer[]>("/api/public/offers"),
  reviews: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiReviewsResponse>(`/api/public/reviews${q}`);
  },
  blogs: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiBlogsResponse>(`/api/public/blogs${q}`);
  },
  blog: (slug: string) => get<ApiBlog>(`/api/public/blogs/${slug}`),
  siteSettings: () => get<ApiSiteSettings>("/api/public/site-settings"),
  trackOrder: (orderNumber: string) => get<ApiOrder>(`/api/public/orders/${orderNumber}`),
  inventory: (productId: number) => get<ApiInventory>(`/api/public/inventory/${productId}`),
  dealers: (city?: string) => get<ApiDealer[]>(`/api/public/dealers${city ? `?city=${city}` : ""}`),

  submitLead: (body: { name: string; email: string; phone: string; source: string; notes?: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/leads", body),
  submitReview: (body: { customerName: string; productName: string; rating: number; comment: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/reviews", body),
  submitWarranty: (body: { customerName: string; productName: string; orderId?: string; issue: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/warranty", body),
  submitTicket: (body: { subject: string; customerName: string; customerEmail: string; type: string }) =>
    post<{ ok: boolean; message: string }>("/api/public/tickets", body),
  applyDealer: (body: { businessName: string; contactName: string; email: string; phone: string; city: string }) =>
    post<{ ok: boolean; id: number }>("/api/public/dealer-apply", body),
  validateCoupon: (body: { code: string; orderAmount: number }) =>
    post<{ valid: boolean; type?: string; value?: number; minOrderAmount?: number; error?: string }>("/api/public/coupons/validate", body),
  placeOrder: (body: { customerName: string; customerEmail: string; total: number; items: unknown[]; city: string; phone: string }) =>
    post<{ ok: boolean; orderNumber: string; id: number }>("/api/public/orders", body),
};

export function toProductCard(p: ApiProduct, fallbackImage: string) {
  return {
    id: p.id,
    name: p.name,
    price: p.salePrice ?? p.price,
    originalPrice: p.salePrice ? p.price : undefined,
    badge: p.salePrice ? `${Math.round((1 - p.salePrice / p.price) * 100)}% OFF` : undefined,
    rating: 4.5,
    reviews: 0,
    category: String(p.categoryId ?? ""),
    image: p.imageUrl || fallbackImage,
  };
}
