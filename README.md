# One More Coach Website

## Overview

Marketing + lead-capture site for One More Coach (Coach Josh Horton).
**Status:** Phase 0 scaffold complete — page rendering not yet built.

**Live:** https://onemorecoach.com (not yet deployed)
**Rebuild plan:** [Rebuild Plan/REBUILD_PLAN.md](Rebuild%20Plan/REBUILD_PLAN.md)
**Audit (historical):** [Rebuild Plan/CURRENT_SITE_AUDIT.md](Rebuild%20Plan/CURRENT_SITE_AUDIT.md)
**Image inventory:** [Rebuild Plan/IMAGE_INVENTORY.md](Rebuild%20Plan/IMAGE_INVENTORY.md)

The legacy static HTML site (`index.html`, `about.html`, etc.) is still in the repo root for reference during the rebuild. It will be moved to `/reference/` once Phase 1 begins. The Next.js scaffold does not serve those files.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with `@theme` tokens |
| Fonts | `next/font/google` — Bebas Neue + Inter |
| Hosting | Vercel (not yet wired) |
| Package manager | npm (pnpm preferred per plan but not installed on this machine) |

---

## Quick Start

**Prerequisites:** Node.js 18.18+ (tested on Node 22).

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site is available at `http://localhost:3000`. Phase 0 renders a placeholder page that smoke-tests the data layer.

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript without emitting
npm run build       # Production build
```

---

## Environment Variables

Copy [.env.example](.env.example) to `.env.local` for local development. Set production values in Vercel.

| Variable | Required | Phase wired | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No (graceful no-op) | Phase 5 | Google Analytics 4 Measurement ID. If unset, no gtag script ships. |
| `RESEND_API_KEY` | Yes (Phase 3+) | Phase 3 | Resend API key. Application form returns 503 without it. |
| `CONTACT_TO_EMAIL` | No (defaults to `business.email`) | Phase 3 | Application destination address. |
| `CONTACT_FROM_EMAIL` | No (defaults to `no-reply@onemorecoach.com`) | Phase 3 | Verified Resend sender address. |

---

## Business configuration

[`src/data/business.ts`](src/data/business.ts) is the single source of truth for the business name, email, social handles, canonical URL, and (eventually) JSON-LD schema input. Update it once; the change propagates everywhere on the site.

**Resolved Phase 0 values:**

| Field | Value | Decision |
|---|---|---|
| Name | One More Coach | — |
| Email | josh@onemorecoach.com | REBUILD_PLAN.md §15 #2 |
| Canonical URL | https://onemorecoach.com | REBUILD_PLAN.md §15 #11 |
| Instagram | @onemorecoach | REBUILD_PLAN.md §15 #15 |
| Instagram URL | https://www.instagram.com/onemorecoach/ | REBUILD_PLAN.md §15 #15 |
| Accent color | `#F5E342` (visual estimate, pending pixel-pick from logo) | REBUILD_PLAN.md §15 #1 |

---

## Data-driven content layer

`src/data/*.ts` is the editing surface for repeated content. Touching a data file updates every page that uses it.

| File | Phase 0 state |
|---|---|
| [src/data/business.ts](src/data/business.ts) | ✅ Resolved brand values; `inPersonVenue: null` pending §15 #3 |
| [src/data/coach.ts](src/data/coach.ts) | 🟡 Empty-but-typed (`isPlaceholder: true`); bio paragraphs to port in Phase 2 |
| [src/data/programs.ts](src/data/programs.ts) | ✅ Four programs with real online prices; in-person tiers `needsClientInput: true` |
| [src/data/testimonials.ts](src/data/testimonials.ts) | 🟡 Empty array — real quotes pending (§15 #8) |
| [src/data/results.ts](src/data/results.ts) | 🟡 Placeholder entries pointing at future `public/results/result-*.webp`; sourced exclusively from legacy `results/` folder |
| [src/data/included.ts](src/data/included.ts) | ✅ 8 items, ported verbatim from legacy index.html |
| [src/data/whyOnline.ts](src/data/whyOnline.ts) | ✅ 6 items, ported verbatim from legacy about.html |
| [src/data/howItWorks.ts](src/data/howItWorks.ts) | ✅ 4 steps, ported verbatim from legacy contact.html |

Every shape is defined in [src/types/content.ts](src/types/content.ts).

---

## What's NOT in v1

Per REBUILD_PLAN.md §3:
- No headless CMS, no CSS-in-JS, no animation library, no state management library, no second analytics provider.
- **No Instagram embeds, no Instagram Graph API, no third-party feed widgets, no social-media scripts.** Instagram presence is a simple outbound CTA only (REBUILD_PLAN.md §15 #16).

---

## Reference

The legacy static HTML site (`index.html`, `about.html`, `contact.html`, `inperson.html`, `programs.html`, `styles.css`) is preserved at the repo root for visual QA during the rebuild. It will be moved to `/reference/` once Phase 1 begins. Image folders `images/` and `results/` are also preserved in place.
