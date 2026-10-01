# The HR Blueprint

A paid career platform that walks people into HR, recruiting, and talent acquisition.
Migrated from the single-file prototype `hr-blueprint-platform.html`, which is the source of truth for content, copy, and design.

## Stack

Next.js 16 (App Router, TypeScript) · Supabase (Postgres, Auth) · Stripe Checkout · Resend · Vercel · PWA

**Going live:** follow [`SETUP.md`](SETUP.md).

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in keys
npm run dev      # http://localhost:3000
npm run build    # production build (uses webpack; see note below)
npm run lint
npx tsc --noEmit
```

Builds use `--webpack` because the Turbopack font loader fails behind some proxies. Output is identical.

## Where things live

| Path | What it is |
|---|---|
| `src/config/site.ts` | Prices, Calendly link, contact details, ad slots. Change prices here only. |
| `src/lib/journey.ts` | The 21 steps, the 5 acts, the badges |
| `src/lib/content.ts` | Quiz, games, interview questions, 90 day plan data (word for word from the prototype) |
| `src/lib/state.ts` | The progress blob (the prototype's `S`), streak, badge rules |
| `src/components/views/` | One component per screen, grouped by act |
| `src/app/globals.css` | The prototype's CSS, unchanged apart from font variables |
| `supabase/migrations/` | Database tables and row level security |
| `src/lib/member.ts` | Server side paywall for every member page |
| `src/lib/billing.ts` | Stripe fulfillment, entitlements, access codes |
| `src/app/api/` | Checkout, Stripe webhook, sign up, codes, messages |
| `src/app/admin/` | Admin panel (numbers, members, messages, ads, codes) |
| `src/app/preview/` | Free beta preview. Imports only Act 1, so paid lessons never ship to it |
| `public/sw.js` | Service worker for offline reading |

## Build status

- [x] Phase 0: inventory
- [x] Phase 1: scaffold and design tokens
- [x] Phase 2: full journey and every interaction as React (localStorage, like the prototype)
- [x] Phase 3: Supabase auth (email and Google) and cross device sync
- [x] Phase 4: Stripe, entitlements, server side access, one time access codes
- [x] Phase 5: coaching hub, messaging, email, ads, admin
- [x] Phase 6: PWA (installable, offline reading, offline edits sync later)
