# YUNORA Luxury Furnishing

A premium luxury furnishing brand website for YUNORA — India's answer to Zara Home and Pottery Barn. Sells curtains, bedsheets, cushions, sofa fabrics, comforters, and home decor.

## Run & Operate

- `pnpm --filter @workspace/yunora run dev` — run the YUNORA website (frontend)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `DATABASE_URL` — Postgres connection string (if DB features enabled)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, Framer Motion, wouter routing
- Fonts: Cormorant Garamond (headings), Inter (body)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (available, not yet wired to frontend)
- Build: Vite (frontend), esbuild (API CJS bundle)

## Where things live

- `artifacts/yunora/` — YUNORA luxury furnishing frontend (React + Vite)
- `artifacts/api-server/` — Express API backend
- `attached_assets/` — Logo images and reference mockups
- `lib/api-spec/openapi.yaml` — API contracts
- `lib/db/src/schema/` — Drizzle DB schema

## Architecture decisions

- Frontend-only for initial build: full luxury homepage with static mock data; backend can be wired later
- Color palette: warm ivory (#F8F4EF background), terracotta accent (#C97B5E), deep charcoal foreground
- Typography: Cormorant Garamond for editorial headings; Inter for UI/body text
- Orange used ONLY as accent (YUNORA brand color), never dominant
- All product/category images generated via AI (no external placeholder services)

## Product

YUNORA homepage with: announcement bar, sticky glass header, hero carousel, trust bar, category grid (Curtains/Bedsheets/Cushions/Sofa Fabrics/Comforters/Home Decor), featured products, curated collections, best sellers, manufacturing/craftsmanship section, new arrivals, dealer program, footer. Full routing for shop, product detail, cart, wishlist, login, register, profile.

## User preferences

- Luxury brand aesthetic: warm ivory palette, minimal orange, Cormorant Garamond headings
- Indian market: prices in ₹ (Indian Rupees), Razorpay mentioned
- Reference brands: MyTrident, Zara Home, Pottery Barn, West Elm, Restoration Hardware
- No emojis in UI
- Mobile-first with bottom navigation bar

## Gotchas

- Google Fonts @import must be the FIRST line of index.css before @import "tailwindcss"
- All CSS custom properties must use space-separated HSL values (no hsl() wrapper)
- @assets alias in Vite config points to attached_assets/ — use for logos
- Do not restart yunora workflow until design subagent finishes building

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Logo: attached_assets/02_1781943228013.png (orange on white), 01_1781943231369.png (white on orange)
- Reference mockups: attached_assets/c3e4eb86... (mobile), d92b1de3... (desktop)
