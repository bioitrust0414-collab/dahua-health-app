# Health App

UI/technical base copied from `dhl1688-vercel` (TanStack Start + React 19 + Tailwind v4 + shadcn/Radix UI).

Carried over:
- Full `src/components/ui` (shadcn component library)
- Router/server setup (`router.tsx`, `server.ts`, `start.ts`, `__root.tsx`)
- Build/lint/format config (Vite, ESLint, Prettier, Tailwind, tsconfig, vercel.json)
- Shared lib/hooks (`utils.ts`, error capture/reporting, `use-mobile`)

Intentionally NOT carried over (brand-specific to existing sites, not part of the generic base):
- `dahua`, `mal1688`, `heychew1688` page components and routes
- Brand-specific styles (`dahua.css`, `mal1688.css`) and images/assets

Next steps: define page structure for Phase 1 (health data tracking, e-commerce, member/education content), then wire up Supabase.
