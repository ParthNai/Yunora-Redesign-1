const BASE = "https://yunora-enterprise-system-1.onrender.com";

let _sessionCookie: string | null = null;
let _loginPromise: Promise<void> | null = null;

async function ensureAuth(): Promise<void> {
  if (_sessionCookie) return;
  if (_loginPromise) return _loginPromise;
  _loginPromise = (async () => {
    try {
      const res = await fetch(`${BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: import.meta.env.VITE_ADMIN_EMAIL || "admin@yunora.in",
          password: import.meta.env.VITE_ADMIN_PASSWORD || "",
        }),
      });
      if (res.ok) {
        _sessionCookie = "set";
      }
    } catch {
      // silently fail — pages show empty states
    } finally {
      _loginPromise = null;
    }
  })();
  return _loginPromise;
}

async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  await ensureAuth();
  return fetch(`${BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    },
  });
}

async function get<T>(path: string): Promise<T> {
  const res = await apiFetch(path);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await apiFetch(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API POST ${path} → ${res.status}`);
  return res.json();
}

async function put<T>(path: string, body: unknown): Promise<T> {
  const res = await apiFetch(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API PUT ${path} → ${res.status}`);
  return res.json();
}

async function del<T>(path: string): Promise<T> {
  const res = await apiFetch(path, { method: "DELETE" });
  if (!res.ok) throw new Error(`API DELETE ${path} → ${res.status}`);
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
  productCount?: number;
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
  id?: number;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
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

export interface ApiOrdersResponse {
  items: ApiOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiLeadsResponse {
  items: ApiLead[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  notes?: string;
  createdAt: string;
}

export const api = {
  products: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiProductsResponse>(`/api/products${q}`);
  },
  product: (id: number) => get<ApiProduct>(`/api/products/${id}`),
  categories: () => get<ApiCategory[]>("/api/categories"),
  banners: (type?: string) => get<ApiBanner[]>(`/api/banners${type ? `?type=${type}` : ""}`),
  offers: () => get<ApiOffer[]>("/api/offers"),
  reviews: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiReviewsResponse>(`/api/reviews${q}`);
  },
  blogs: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiBlogsResponse>(`/api/blogs${q}`);
  },
  blog: (slug: string) => get<ApiBlog>(`/api/blogs/${slug}`),
  siteSettings: () => get<ApiSiteSettings>("/api/site-settings"),
  trackOrder: (orderNumber: string) => get<ApiOrder>(`/api/orders/${orderNumber}`),
  inventory: (productId: number) => get<ApiInventory>(`/api/inventory/${productId}`),
  dealers: (city?: string) => get<ApiDealer[]>(`/api/dealers${city ? `?city=${city}` : ""}`),

  submitLead: (body: { name: string; email: string; phone: string; source: string; notes?: string }) =>
    post<{ ok: boolean; message: string }>("/api/leads", body),
  submitReview: (body: { customerName: string; productName: string; rating: number; comment: string }) =>
    post<{ ok: boolean; message: string }>("/api/reviews", body),
  submitWarranty: (body: { customerName: string; productName: string; orderId?: string; issue: string }) =>
    post<{ ok: boolean; message: string }>("/api/warranty", body),
  submitTicket: (body: { subject: string; customerName: string; customerEmail: string; type: string }) =>
    post<{ ok: boolean; message: string }>("/api/tickets", body),
  applyDealer: (body: { businessName: string; contactName: string; email: string; phone: string; city: string }) =>
    post<{ ok: boolean; id: number }>("/api/dealer-apply", body),
  validateCoupon: (body: { code: string; orderAmount: number }) =>
    post<{ valid: boolean; type?: string; value?: number; minOrderAmount?: number; error?: string }>("/api/coupons/validate", body),
  placeOrder: (body: { customerName: string; customerEmail: string; total: number; items: unknown[]; city: string; phone: string }) =>
    post<{ ok: boolean; orderNumber: string; id: number }>("/api/orders", body),
};

export const adminApi = {
  login: (email: string, password: string) =>
    post<{ id: number; name: string; email: string; role: string }>("/api/auth/login", { email, password }),
  logout: () => apiFetch("/api/auth/logout", { method: "POST" }),
  me: () => get<{ id: number; name: string; email: string; role: string }>("/api/auth/me"),

  products: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiProductsResponse>(`/api/products${q}`);
  },
  createProduct: (body: Partial<ApiProduct> & { name: string; sku: string; price: number; stock: number }) =>
    post<ApiProduct>("/api/products", body),
  updateProduct: (id: number, body: Partial<ApiProduct>) =>
    put<ApiProduct>(`/api/products/${id}`, body),
  deleteProduct: (id: number) => del<{ ok: boolean }>(`/api/products/${id}`),

  categories: () => get<ApiCategory[]>("/api/categories"),
  createCategory: (body: { name: string; slug: string; imageUrl?: string }) =>
    post<ApiCategory>("/api/categories", body),
  updateCategory: (id: number, body: Partial<ApiCategory>) =>
    put<ApiCategory>(`/api/categories/${id}`, body),
  deleteCategory: (id: number) => del<{ ok: boolean }>(`/api/categories/${id}`),

  orders: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiOrdersResponse>(`/api/orders${q}`);
  },
  updateOrderStatus: (id: number, status: string) =>
    put<ApiOrder>(`/api/orders/${id}`, { status }),

  leads: (params?: Record<string, string | number>) => {
    const q = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    return get<ApiLeadsResponse>(`/api/leads${q}`);
  },
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
