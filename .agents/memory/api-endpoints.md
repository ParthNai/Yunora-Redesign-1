---
name: API endpoint structure
description: Actual working URL patterns for the Yunora backend
---

Backend: `https://yunora-enterprise-system-1.onrender.com`

**Working routes (require session auth):**
- `POST /api/auth/login` — `{ email, password }` → `{ id, name, email, role }`
- `GET  /api/auth/me` — returns current user
- `POST /api/auth/logout`
- `GET  /api/products?limit=N&page=N`
- `POST /api/products` — requires `{ name, sku, price, stock }` (sku and stock are required by Zod)
- `PUT  /api/products/:id`
- `DELETE /api/products/:id`
- `GET  /api/categories`
- `POST /api/categories` — `{ name, slug, imageUrl? }`
- `PUT  /api/categories/:id`
- `DELETE /api/categories/:id`
- `GET  /api/orders?limit=N&page=N`
- `PUT  /api/orders/:id` — `{ status }` to update order status
- `GET  /api/leads?limit=N&page=N`
- `POST /api/leads`

**Known quirk — empty DB bug:** When the database has no real records, the API returns the admin user record as the first (and only) item in paginated responses (products, categories, orders, leads). Always filter results: `items.filter(p => p.name && p.price)` for products, `items.filter(c => c.name && c.slug)` for categories, `items.filter(o => o.orderNumber)` for orders.

**Why:** Backend bug — likely a JOIN or fallback query that returns the authenticated user when no data exists.

**Cold start:** Backend is on Render free tier — 8-10s cold start. First request may time out; retry: 1 in React Query handles this.
