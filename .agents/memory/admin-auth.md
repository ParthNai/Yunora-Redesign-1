---
name: Admin auth architecture
description: How the Yunora frontend authenticates with the backend API
---

The backend at `https://yunora-enterprise-system-1.onrender.com` uses session-based auth with `SameSite=None; Secure; HttpOnly` cookies.

**Pattern:** `ensureAuth()` in `api.ts` — called before every request, logs in once and caches `_sessionCookie = "set"` flag. All `apiFetch()` calls pass `credentials: "include"`.

**Why:** The browser cannot read the HttpOnly cookie, so we track auth state with a simple module-level flag rather than inspecting the cookie value.

**Admin panel:** `/admin` route has its own login screen (LoginScreen component). It calls `adminApi.me()` on mount to check if already authenticated (session cookie may persist from earlier). If that fails, shows the login form.

**Credentials:** Stored as Replit secrets `YUNORA_ADMIN_EMAIL` / `YUNORA_ADMIN_PASSWORD`. The `ensureAuth()` function reads from `import.meta.env.VITE_ADMIN_EMAIL` — these are NOT exposed via Vite env (secrets aren't VITE_ prefixed), so the auto-login falls back to hardcoded email only. The admin login form is the real auth path.

**How to apply:** When adding new API calls, always use `get()`, `post()`, `put()`, or `del()` from `api.ts` — never `fetch()` directly. These all call `apiFetch()` which handles auth automatically.
