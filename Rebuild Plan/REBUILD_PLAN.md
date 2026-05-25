# One More Coach — Rebuild Plan

**Created:** 2026-05-23
**Status:** Pre-implementation (no code written yet)
**Companion doc:** [CURRENT_SITE_AUDIT.md](CURRENT_SITE_AUDIT.md) — the historical snapshot of the legacy static-HTML site that this plan replaces.

This is the working plan for rebuilding the One More Coach website on Next.js + Tailwind. It is forward-looking: it describes what the new project should be, not what the old one is. The audit explains the why; this plan is the how.

This plan should be updated as decisions are made and phases ship. When the rebuild reaches production, this document gets archived to `/reference/` alongside `CURRENT_SITE_AUDIT.md`.

---

## 1. Project goal

Ship a fast, maintainable, conversion-focused marketing + lead-capture site for One More Coach (Coach Josh Horton) that:

- Renders in <1.5s on a cold load over 4G
- Captures coaching applications via a single trustworthy form
- Routes the right program/term to the application via URL-prefill (parity with the current `?program=&term=` UX)
- Makes content edits a 10-second job in a single typed data file, not a 30-minute hunt across five HTML files
- Reaches ≥95 in all four Lighthouse categories
- Is set up cleanly enough on day one that adding a blog, an FAQ, or a new program is a small change, not a rewrite

Out of scope for v1: a CMS, a blog, member portals, e-commerce, scheduling/booking integration. These are explicit non-goals — flag them in the roadmap doc later if they become real.

---

## 2. Rebuild principles

These are the rules every decision in this plan answers to. If a future change conflicts with one of these, the principle wins by default.

1. **Single source of truth for everything that can change.** No hex code, no email address, no phone number, no price, no headline, no client name, and no nav link appears as a string literal inside a React component. If it can change, it lives in a data file or a design token.
2. **Data-driven content layer.** Programs, pricing, testimonials, results, included-bullets, "why online" bullets, "what happens next" steps — all of these are TypeScript data arrays. JSX maps over them; it does not duplicate them.
3. **Static-first.** Every public route prerenders at build time. Only `/api/*` runs at request time. No SSR on marketing pages.
4. **Graceful degradation when secrets are missing.** Form returns a clear 503; analytics no-ops. Nothing silently posts to a placeholder endpoint.
5. **One canonical doc per topic.** The README summarizes; `/docs/*.md` files own the detail. No duplicate content between README and docs.
6. **Honest about what is not done.** "Needs client input" placeholders are flagged in the data files themselves so the launch checklist can be generated from them.
7. **No inline `style=` attributes anywhere.** Tailwind utility classes only.
8. **One accent color.** Tailwind theme is the only place an accent hex appears. No `rgba(…)` drift like the legacy site.
9. **Don't ship placeholder UI.** Replace placeholder pieces (avatar initials, "📸 Coach photo here") with real assets before launch — don't ship the placeholder pattern.
10. **Don't build infrastructure for events that don't fire.** No `phone_click` instrumentation if there's no phone link. Add only what's used.

---

## 3. Final recommended stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15+ (App Router, React Server Components)** | Match Abide's pattern. If 16 is current at scaffold time, use 16 — confirm `params`-as-Promise convention applies. |
| Language | **TypeScript (strict)** | `strict: true` in `tsconfig.json`. No `any` without comment. |
| Styling | **Tailwind CSS v4** | Theme tokens defined in `app/globals.css → @theme`. Single accent color. |
| Icons | **Lucide React** | Replaces every emoji in the current site. |
| Fonts | **`next/font/google`** | Bebas Neue (display) + Inter (body). Self-hosted, no external request, automatic preload. |
| Images | **`next/image`** | Auto WebP/AVIF, responsive `srcset`, lazy-load by default. |
| Forms | **Server Action + Resend** | One form (application). Server Action validates with Zod, posts via Resend. Honeypot + simple rate-limit. |
| Analytics | **Google Analytics 4** | Match Abide's instrumentation pattern. `gtag` mounted once in root layout, deduped via `useRef`. |
| Hosting | **Vercel** | Push to `main` deploys. Preview deploys per branch. |
| Version control | **GitHub** | Single `main` branch. Feature branches for non-trivial work. |
| Package manager | **pnpm** | Faster, deterministic. (npm also fine; pnpm preferred.) |
| Linting | **ESLint + Prettier** | Default Next.js config + Prettier on save. |
| Schema validation | **Zod** | For the form server action. |

Explicitly **not** in v1:
- No headless CMS (Sanity / Payload / Contentlayer). Move to one only when Josh wants to self-edit copy.
- No CSS-in-JS, no styled-components, no CSS modules. Tailwind only.
- No animation library (Framer Motion, etc.) until there's a real animation need.
- No state management library. React state is enough for one form.
- No second analytics provider (Plausible/PostHog) on top of GA4.
- **No Instagram embeds, no Instagram Graph API, no third-party feed widgets, no social-media scripts.** Instagram presence in v1 is a simple outbound CTA only — see §15 Resolved decision #16.

---

## 4. Proposed folder structure

```
e:/onemorecoach/
├── Rebuild Plan/
│   ├── CURRENT_SITE_AUDIT.md           # historical, frozen at Phase 0 kickoff
│   └── REBUILD_PLAN.md                 # this file
├── reference/                          # NEW — created during Phase 0 cutover
│   ├── index.html                      # legacy site moved here for visual QA
│   ├── about.html
│   ├── contact.html
│   ├── inperson.html
│   ├── programs.html
│   ├── styles.css
│   └── images/, results/               # legacy assets
├── docs/                               # NEW — canonical docs per topic
│   ├── launch-checklist.md             # Phase 0
│   ├── content-guide.md                # Phase 2
│   ├── forms-email.md                  # Phase 3
│   ├── performance.md                  # Phase 4
│   ├── seo-standards.md                # Phase 5
│   ├── analytics.md                    # Phase 5
│   ├── accessibility.md                # Phase 5
│   └── deployment.md                   # Phase 6
├── public/                             # NEW — Next.js static assets
│   ├── logo.svg                        # re-exported from 4.6MB legacy PNG
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.jpg                    # 1200×630 social card
│   ├── results/                        # optimized, lowercase, WebP
│   │   ├── result-1.webp
│   │   ├── result-2.webp
│   │   ├── result-3.webp
│   │   └── result-4.webp
│   └── coach/
│       ├── josh-headshot.webp
│       └── josh-full.webp
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # root layout: <html>, fonts, <SiteNav>, <SiteFooter>, GA4
│   │   ├── page.tsx                    # home (was index.html)
│   │   ├── programs/page.tsx           # was programs.html
│   │   ├── in-person/page.tsx          # was inperson.html (or redirect to /programs#inperson)
│   │   ├── about/page.tsx              # was about.html
│   │   ├── apply/
│   │   │   ├── page.tsx                # was contact.html
│   │   │   └── actions.ts              # Server Action: validate + send via Resend
│   │   ├── api/
│   │   │   └── reviews/route.ts        # server-side Google Places fetch (cached) — only if/when wired
│   │   ├── globals.css                 # Tailwind directives + @theme tokens
│   │   ├── sitemap.ts                  # auto-generated from data files
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx         # optional dynamic OG
│   ├── components/
│   │   ├── SiteNav.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── Hero.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── ProgramCard.tsx             # used on home overview + programs hub
│   │   ├── PricingTier.tsx             # clickable <a> tier with ?program=&term=
│   │   ├── ResultCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── CoachBioSnippet.tsx
│   │   ├── ApplicationForm.tsx         # client component wrapping the Server Action
│   │   ├── HowItWorksSteps.tsx         # 4-step "What Happens Next"
│   │   ├── IncludedGrid.tsx
│   │   ├── WhyOnlineGrid.tsx
│   │   ├── GoogleReviewsBadge.tsx      # only mounted when env is configured
│   │   ├── GoogleAnalytics.tsx         # gtag script + dedup logic
│   │   ├── PhoneLink.tsx               # wrapper that fires phone_click (only if a phone exists)
│   │   ├── EmailLink.tsx               # wrapper that fires email_click
│   │   ├── InstagramLink.tsx           # wrapper that fires instagram_click
│   │   └── ui/
│   │       ├── Button.tsx              # variants: primary, ghost, nav-cta
│   │       ├── Container.tsx
│   │       ├── SectionHead.tsx
│   │       ├── SectionTag.tsx
│   │       └── Icon.tsx                # Lucide wrapper with consistent sizing
│   ├── data/                           # single source of truth, see §6
│   │   ├── business.ts
│   │   ├── coach.ts
│   │   ├── programs.ts
│   │   ├── testimonials.ts
│   │   ├── results.ts
│   │   ├── included.ts
│   │   ├── whyOnline.ts
│   │   ├── howItWorks.ts
│   │   ├── nav.ts
│   │   ├── ctas.ts
│   │   └── copy.ts
│   ├── lib/
│   │   ├── analytics.ts                # trackEvent() helper, no-ops when GA unset
│   │   ├── schema.ts                   # JSON-LD builders (LocalBusiness, Person, Service)
│   │   └── env.ts                      # typed env access
│   └── types/
│       └── content.ts                  # shared types: Program, Tier, Testimonial, Result, etc.
├── .env.local                          # git-ignored — local secrets
├── .env.example                        # committed — documents every env var
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts                  # if needed alongside @theme — usually not in Tailwind v4
├── tsconfig.json
└── README.md                           # living project doc
```

---

## 5. Single-source-of-truth rules

| Single source of truth | Lives in | Consumed by |
|---|---|---|
| **Business info** (name, email, Instagram handle, canonical URL, hours if any) | `src/data/business.ts` | Footer, nav, contact page, JSON-LD schema, root `metadata`, server-action `from`/`to` addresses |
| **Coach info** (Josh's name, bio, certs, headshot, quote) | `src/data/coach.ts` | About page, home bio snippet, `Person` JSON-LD |
| **Programs & pricing** | `src/data/programs.ts` | Programs page, home overview cards, in-person section, `?program=` pre-fill on the apply form, `Service` JSON-LD per program, sitemap |
| **Testimonials** | `src/data/testimonials.ts` | Home testimonials section, future per-program social proof |
| **Results / before-and-afters** | `src/data/results.ts` | Home results grid, future per-program results galleries |
| **CTAs** (button labels, target hrefs for "Apply", "See Results", "Follow on IG") | `src/data/ctas.ts` *or* `<Button>` named variants | Hero, footer, every bottom-of-page section |
| **Social links** | `src/data/business.ts → socials` | Footer, about page, contact page, `sameAs` in schema |
| **Form destination** (email to send applications to) | `CONTACT_TO_EMAIL` env var, defaulted in `business.ts` | Server action handler |
| **Brand tokens** (accent color, neutrals, font families, radius, spacing) | `app/globals.css → @theme` | Every component (no inline hex, no `rgba` drift) |
| **Site-wide copy constants** (tagline, year, "24-hour response" promise) | `src/data/copy.ts` *or* `business.ts` | Hero, footer, apply page, social card |
| **Nav links** | `src/data/nav.ts` | Header (desktop + mobile) and footer — never duplicated |
| **Placeholder flags** | `needsClientInput: true` on data entries | `docs/launch-checklist.md` generation, optional "draft" badge in dev |

**The rule:** every value in the right column must trace back to exactly one source on the left. If a screen renders a value, that value came from a data file, an env var, or a design token — never from a JSX string literal.

---

## 6. Data files to create first

These are created in **Phase 0**, before any page is built. Empty-but-typed counts as created — the shape exists, even if values are TBD.

| File | Minimum Phase 0 contents | Becomes complete by |
|---|---|---|
| `src/data/business.ts` | `name`, `email` (one chosen — not both), `socials.instagram`, `canonicalUrl` | Phase 2 |
| `src/data/coach.ts` | `name`, `slug`, empty `bioShort`, empty `bioFull`, empty `certs[]`, `headshotSrc: null`, `isPlaceholder: true` | Phase 2 (content), Phase 4 (headshot) |
| `src/data/programs.ts` | Four programs (lifestyle / nutrition / training / in-person) with slug, name, tagline. Tiers can start empty with `needsClientInput: true` for in-person pricing. | Phase 2 |
| `src/data/testimonials.ts` | Empty array with type defined | Phase 2 (placeholder), pre-launch (real) |
| `src/data/results.ts` | Four entries pointing at lowercase `.webp` paths under `/public/results/` | Phase 4 |
| `src/data/included.ts` | The 8 items from the current home grid (copy verbatim from legacy site) | Phase 2 |
| `src/data/whyOnline.ts` | The 6 items from the current about page (copy verbatim) | Phase 2 |
| `src/data/howItWorks.ts` | The 4 steps from the current contact page (copy verbatim) | Phase 2 |
| `src/data/nav.ts` | Header + footer link arrays | Phase 1 |
| `src/data/ctas.ts` | Named CTA constants (apply, seeResults, instagram) | Phase 1 |
| `src/data/copy.ts` | Tagline, hero headline, hero sub, response-time promise | Phase 1 |

`src/types/content.ts` defines the shared shapes (`Program`, `Tier`, `Testimonial`, `Result`, `NavLink`, etc.) and is imported by every data file. The type forces the data shape, not the JSX.

**Convention:** every data entry that could conceivably need to change supports an optional `needsClientInput?: boolean` and/or `isPlaceholder?: boolean` flag. The launch checklist is generated from these flags.

---

## 7. Page plan

Five static routes plus the asset routes Next.js generates for free.

| Route | Source file | Replaces | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | index.html | Hero · StatsStrip · ProgramsOverview · IncludedGrid · ResultsGrid · TestimonialsGrid · GoogleReviewsBadge (conditional) · **InstagramCtaSection** (placed near the results / social-proof area per §15 #16) · CoachBioSnippet · ApplyCTA · Footer |
| `/programs` | `app/programs/page.tsx` | programs.html | Renders all four programs from `programs.ts`. Each tier links to `/apply?program=…&term=…`. |
| `/in-person` | `app/in-person/page.tsx` | inperson.html | **Decision pending** (open question §15). Either a real page that pulls only the `in-person` slug from `programs.ts`, or a 301 redirect to `/programs#in-person`. |
| `/about` | `app/about/page.tsx` | about.html | Hero with real headshot + cert badges from `coach.ts` · Bio paragraphs from `coach.ts` · Pull quote · HowIHelpYouWin grid · WhyOnlineGrid · Instagram CTA · Bottom CTA |
| `/apply` | `app/apply/page.tsx` | contact.html | Two-column: contact info + 4-step "What Happens Next" (from `howItWorks.ts`) / Application form (client component) with Server Action submission. URL-param prefill (`?program=&term=`) preserved exactly. |
| `/sitemap.xml` | `app/sitemap.ts` | — | Auto-generated, lists all five routes. |
| `/robots.txt` | `app/robots.ts` | — | Allow all, point at sitemap. |

**Navigation:** header surfaces the 4 top-level routes (Programs, About, Apply Now). "Results" remains as a same-page anchor on `/`, links to `/#results` from every other page. Footer mirrors header + Instagram + email + Google review link (when GMB live). All driven from `nav.ts`.

**Metadata pattern (per page):** every page exports a `metadata` object with `title`, `description`, `openGraph`, `twitter`, and `alternates.canonical`. Defaults inherit from `app/layout.tsx`. Specifics live in `docs/seo-standards.md` (Phase 5).

---

## 8. Component plan

Built in dependency order. Phase 1 covers primitives + chrome; Phase 2 covers content components.

### UI primitives (Phase 1)

| Component | Variants | Notes |
|---|---|---|
| `Button` | `primary`, `ghost`, `nav-cta` | Replaces `.btn-primary`, `.btn-ghost`, `.btn-nav-cta`. All sizing handled via props or Tailwind utilities — no inline padding overrides. |
| `Container` | (none) | `max-w-[1200px] mx-auto px-5 md:px-10`. Replaces `.container`. |
| `SectionHead` | (none) | Renders `SectionTag` + `<h2>` + optional `<p>` subhead. Replaces `.section-head`. |
| `SectionTag` | (none) | The small accent-colored eyebrow label. |
| `Icon` | Lucide wrapper | One place to enforce sizing, stroke-width, accessible labels. Replaces every emoji. |

### Chrome (Phase 1)

| Component | Notes |
|---|---|
| `SiteNav` | Client component (hamburger state). Reads from `nav.ts`. Sticky, centered logo, accent active state. Replaces the duplicated `<header>` in all 5 legacy HTML files. |
| `SiteFooter` | Server component. Reads from `nav.ts` + `business.ts`. Replaces the duplicated `<footer>`. |
| `GoogleAnalytics` | Mounts gtag once. No-ops if `NEXT_PUBLIC_GA_MEASUREMENT_ID` unset. `useRef` dedup for SPA navigations. |

### Content components (Phase 2)

| Component | Driven by | Used on |
|---|---|---|
| `Hero` | `copy.ts` | `/` |
| `StatsStrip` | `copy.ts` (or `business.ts → stats`) | `/` |
| `ProgramCard` | `programs.ts` entry | `/`, `/programs` |
| `PricingTier` | `Tier` from `programs.ts` | `/programs`, `/in-person` |
| `ResultCard` | `results.ts` entry | `/`, future galleries |
| `TestimonialCard` | `testimonials.ts` entry | `/` |
| `CoachBioSnippet` | `coach.ts` | `/` |
| `HowItWorksSteps` | `howItWorks.ts` | `/apply` |
| `IncludedGrid` | `included.ts` | `/` |
| `WhyOnlineGrid` | `whyOnline.ts` | `/about` |
| `GoogleReviewsBadge` | `/api/reviews` route + env vars | `/` (conditional render) |
| `InstagramCtaSection` | `business.ts → socials.instagram` + `socials.instagramUrl` | `/` (near results / social-proof), `/about` (optional). A static section: heading ("Follow on Instagram"), one line of copy, a single `InstagramLink` button labeled "Follow @onemorecoach". No feed, no embeds, no API. |

### Interaction wrappers (Phase 1)

| Component | Fires |
|---|---|
| `PhoneLink` | `phone_click` (skip building until a phone exists) |
| `EmailLink` | `email_click` with `location` and `email_type` params |
| `InstagramLink` | `instagram_click` with `location` param |
| `ApplyCtaLink` | `apply_cta_click` with `location` param |

### Forms (Phase 3)

| Component | Notes |
|---|---|
| `ApplicationForm` | Client component. Renders form. Calls Server Action on submit. Shows inline success/error. Fires `application_submit` on 200. URL-param prefill on mount. |

---

## 9. Forms plan

**Single form: application.** No separate careers form, no separate contact form. One Server Action, one Resend template, one analytics event.

### Form fields (port verbatim from contact.html)

| Field | Required | Type | Pre-fillable via URL? |
|---|---|---|---|
| Full Name | ✅ | text | — |
| Email | ✅ | email | — |
| Phone | optional | tel | — |
| Primary Goal | ✅ | select (weight-loss / build-muscle / hybrid / not-sure) | `?goal=` (optional new) |
| Program Interest | optional | select (lifestyle / nutrition / training / inperson / not-sure) | `?program=` |
| Commitment Length | optional | select (monthly / 3month / 6month / 12month / not-sure) | `?term=` |
| About Yourself | optional | textarea | — |
| Heard About Us | optional | text | — |
| Honeypot | hidden | text (must stay empty) | — |

### Behavior

1. Page mount: read `?program=` and `?term=` from URL, pre-select dropdowns, show "Your selected plan is pre-filled below" banner. Parity with current site.
2. Submit: client calls Server Action with validated payload.
3. Server Action: Zod-validates input; if honeypot filled, return fake 200; otherwise call Resend with `from: CONTACT_FROM_EMAIL`, `to: CONTACT_TO_EMAIL`, formatted body.
4. Success: inline success state, fire `application_submit` GA4 event with `form_location` param.
5. Failure: inline error with retry-able message. Server logs the actual error.
6. Missing `RESEND_API_KEY`: Server Action returns 503 with friendly error. No silent fail.

### Spam protection

- Honeypot field (hidden, real users don't fill it; bots do; fake 200 returned).
- Per-IP rate limit (Vercel KV or in-memory with caveat that serverless cold-starts reset state).
- No CAPTCHA in v1.

Full details — Resend domain verification steps, env vars, mail-routing — live in `docs/forms-email.md` (created in Phase 3).

---

## 10. SEO and metadata plan

### Per-page metadata
Every page exports `metadata`:
- `title` — page-specific, ends with " | One More Coach"
- `description` — page-specific, ≤155 chars
- `openGraph` — `title`, `description`, `images: [og-image.jpg]`, `url`
- `twitter` — `card: summary_large_image`
- `alternates.canonical` — absolute URL using `business.canonicalUrl`

Root layout sets defaults; pages override what they need.

### Structured data (JSON-LD)
Server-rendered into the static HTML via `<script type="application/ld+json">`. Three schemas, all from `src/lib/schema.ts`:

| Schema | Mounted on | Sources from |
|---|---|---|
| `LocalBusiness` | `/`, `/apply`, `/in-person` | `business.ts` (NAP, hours) + `coach.ts` |
| `Person` | `/about`, `/` | `coach.ts` |
| `Service` (one per program) | `/programs`, `/` | `programs.ts` |

**Do not invent values.** Omit `geo`, `sameAs`, `aggregateRating` if not truthfully populated. **Never fabricate ratings or reviews.**

### Sitemap and robots
- `app/sitemap.ts` auto-generates from the route list; lists all 5 pages with `lastModified` from file mtime.
- `app/robots.ts` allows all, points at sitemap.
- Submit to Google Search Console at launch.

### Off-platform
- Verify in Google Search Console (DNS TXT or HTML file method).
- Claim Google Business Profile for the in-person side. Place ID → `business.ts → googlePlaceId` once live.

Full details + new-page SEO checklist live in `docs/seo-standards.md`.

---

## 11. Analytics plan

GA4 only. Match Abide's pattern: gtag mounted once in root layout, deduped via `useRef`, no-ops when env unset.

### Required env var
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Measurement ID. If unset, no gtag script ships, no events fire. Site otherwise works normally.

### Tracked events

All events use snake_case names. Custom params must be registered as **Custom Dimensions** in GA4 Admin to appear in reports.

| Event | Fires when | Parameters | Where instrumented |
|---|---|---|---|
| `page_view` | Initial load + every SPA route change | (GA4 defaults) | `GoogleAnalytics.tsx` |
| `apply_cta_click` | Any "Apply"/"Apply Now"/"Apply for Coaching" button is clicked | `location` (`hero`, `nav`, `home_bottom`, `programs_page`, `about_bottom`, `program_card`) | `ApplyCtaLink` wrapper |
| `program_tier_click` | Any pricing tier is clicked | `program` (`lifestyle`/`nutrition`/`training`/`inperson`), `term` (`monthly`/`3month`/`6month`/`12month`/`single`) | `PricingTier` component |
| `instagram_click` | Any link to `instagram.com/onemorecoach` is clicked | `location` (`home_social_proof`, `about`, `footer`, `contact`) — covers the three primary CTA placements from §15 #16 plus any contact-page reference | `InstagramLink` wrapper |
| `email_click` | Any `mailto:` link is clicked | `location` | `EmailLink` wrapper |
| `application_submit` | Application form returns 200 from Server Action | `form_location` (`home`, `apply`) | `ApplicationForm` success branch |

`phone_click` is **not** instrumented in v1 because there is no phone link in the current site. Add only when a phone CTA exists.

### Key events
At launch, mark these as Key Events in GA4 Admin → Events:
- `application_submit` — **primary conversion**
- `program_tier_click` — secondary, signals pricing-page intent

### Honeypot caveat
Honeypot submissions return a fake 200, so `application_submit` will fire for them. This is intentional — the client mirrors what a real submission feels like, and the bot can't tell. If honeypot events become noise in GA4, filter them server-side rather than weakening the client-side deception.

Full event docs + how to register Custom Dimensions live in `docs/analytics.md`.

---

## 12. Image and asset plan

| Asset | Current state | Target |
|---|---|---|
| Logo | `images/logo.png` — 4.6 MB | `public/logo.svg` (or 144px-tall WebP <30 KB if SVG infeasible). Render via `next/image` or inline SVG. |
| Coach headshot | `images/owner-images/Selfie of josh wearing black shirt(2).webp` (phone selfie, neutral wall) | `public/coach/josh-headshot.webp` — square crop, 800×800, <120 KB. `next/image` with `priority` when above the fold. Treated as the starter headshot; a studio shoot is an Optional Upgrade item in `docs/launch-checklist.md`. |
| Coach full-length | Several candidates in `images/owner-images/` (e.g. "Josh in black tank doing a ez bar curl side view.webp", "Josh doing back double bicep.webp") | `public/coach/josh-full.webp` — portrait, ~1200×1600, <250 KB. Final selection captured in [IMAGE_INVENTORY.md](IMAGE_INVENTORY.md). |
| Coaching-in-action photos (Josh + Sydney) | 4 files in `images/owner-images/` (RDL form-check, chest-supported row, hamstring curls) | `public/programs/coaching-*.webp`. Used on the In-Person Training page and supporting program imagery. See [IMAGE_INVENTORY.md](IMAGE_INVENTORY.md) for per-file routing. |
| Coach's own transformation | `images/owner-images/Transformation of josh from bodybuilding to hybrid.webp` | `public/coach/josh-transformation.webp`. Displayed on the About page as part of Josh's personal-story narrative — **not** in `public/results/`, which is reserved for client transformations. |
| Client result photos | `results/result-1..5.JPG` + `results/IMG_9420.jpg` (existing folder is the canonical source for client results) | `public/results/result-*.webp` (lowercase, WebP, <200 KB each, square 1:1 crop). The selection of which of the 6 source files actually ships is a content decision for Josh during Phase 2/4. |
| Future client result image folder | `public/images/clients/` is **not** added in v1 — `public/results/` is the canonical location for client result images. Revisit only if/when a meaningfully different category of client image arrives that doesn't fit the before/after results pattern. | — |
| Favicon | None | `public/favicon.ico` + `public/apple-touch-icon.png` (180×180). |
| OG social card | None | `public/og-image.jpg` — 1200×630, brand-colored, includes tagline. |

**Rules:**
- All filenames lowercase, kebab-case. (Fixes the case-sensitivity 404 risk from the legacy site.)
- All non-logo images: WebP primary, JPG fallback if needed. `next/image` handles format negotiation automatically.
- Hero image (if added later) gets `priority` to prevent LCP regression.
- No image >250 KB after optimization.

Performance baselines + image inventory live in `docs/performance.md`.

---

## 13. Accessibility and performance standards

### Accessibility (WCAG 2.1 AA target)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` per page.
- Heading hierarchy: one `<h1>` per page; no skipped levels.
- `aria-current="page"` on the active nav link.
- `aria-expanded` + `aria-controls` on the mobile hamburger.
- `aria-label` on every icon-only link (Instagram, Google review).
- Focus states visible on every interactive element. Tailwind `focus-visible:` ring utilities, not browser defaults.
- Touch targets ≥44×44 px on mobile.
- `alt` text on every `<Image>`. Decorative images get `alt=""`.
- Form: every input has a `<label>`, `required` attributes, `autocomplete` attributes (`name`, `email`, `tel`).
- Color contrast: accent-on-bg and text-on-bg must hit AA. Verify with a real contrast checker before shipping the Tailwind theme.

### Performance (Lighthouse ≥95 in all four categories)
- All routes statically prerendered.
- `next/font` for Bebas Neue + Inter (no external Google Fonts request).
- `next/image` for every photo (auto WebP/AVIF, responsive, lazy by default).
- LCP < 1.5s on 4G. Hero is text + small accent glow; no heavy image unless intentional.
- CLS = 0. Every image has explicit width/height (or `fill` with a sized parent).
- JS bundle: ship as little as possible. Server components by default; mark `'use client'` only when needed (`SiteNav`, `ApplicationForm`).
- No render-blocking third-party scripts above the fold.
- GA4 loaded with `next/script` `afterInteractive`.

Full standards + the Lighthouse baseline live in `docs/performance.md` and `docs/accessibility.md`.

---

## 14. Phase-by-phase rebuild checklist

Tick boxes as work ships. Each phase ends with a concrete deliverable that can be reviewed before moving to the next.

### Phase 0 — scaffolding & decision freeze (~1–2 hrs)
- [x] **Accent color resolved** (logo-matched, currently `#F2E11F` in `globals.css` — Phase 1 second-pass estimate, still pending exact pixel-pick verification). See §15 Resolved decisions #1.
- [x] **Primary email resolved** (`josh@onemorecoach.com`). See §15 Resolved decisions #2.
- [x] **Canonical domain resolved** (`onemorecoach.com`). See §15 Resolved decisions #11.
- [x] **Instagram handle resolved** (`@onemorecoach`, no underscore — differs from legacy). See §15 Resolved decisions #15.
- [x] All Phase 0 hard blockers cleared — Next.js scaffold + data layer landed.
- [ ] Color-pick the exact accent hex from `images/logo.png` in design tooling and commit it to `globals.css` (replace the current `#F2E11F` estimate).
- [ ] Verify the `@onemorecoach` Instagram handle is owned by Josh or available to claim.
- [ ] `pnpm create next-app` — TypeScript, App Router, Tailwind, ESLint, src directory.
- [ ] Add Prettier config.
- [ ] Set up `next/font/google` for Bebas Neue + Inter in `app/layout.tsx`.
- [ ] Configure Tailwind theme in `app/globals.css → @theme` — accent, bg, bg-card, border, text, muted, radius, font families.
- [ ] Install Lucide React.
- [ ] Create `.env.example` with every env var documented.
- [ ] Create `.env.local`, add to `.gitignore`.
- [ ] Create empty-but-typed data files (`src/data/business.ts`, `coach.ts`, `programs.ts`, etc.) with `src/types/content.ts` shapes.
- [ ] Create `docs/launch-checklist.md` seeded from the §8 placeholder table and §15 open questions of the audit.
- [ ] Create `README.md` from the skeleton in §17 below.
- [ ] Move legacy HTML/CSS/images into `/reference/` (preserve for visual QA — not served).
- [ ] First commit; push to GitHub.
- [ ] Connect repo to Vercel; verify a hello-world deploy.

**Phase 0 deliverable:** an empty deployed Next.js site at a Vercel preview URL, with the data layer scaffolded and zero hardcoded business values.

### Phase 1 — primitives + shared chrome (~2–3 hrs)
- [ ] Build `Button`, `Container`, `SectionHead`, `SectionTag`, `Icon` primitives.
- [ ] Build `SiteNav` (client component, hamburger state, reads `nav.ts`).
- [ ] Build `SiteFooter` (server component, reads `nav.ts` + `business.ts`).
- [ ] Build interaction wrappers: `EmailLink`, `InstagramLink`, `ApplyCtaLink` (analytics-aware, no-op if GA unset).
- [ ] Wire all five empty page routes (`/`, `/programs`, `/in-person`, `/about`, `/apply`) so the nav works end to end.
- [ ] Verify: no inline `style=` attribute anywhere; one accent color in the theme; nav/footer drift impossible (single `nav.ts` source).

**Phase 1 deliverable:** a navigable five-page site with branded chrome and zero real content yet.

### Phase 2 — content pages (~4–6 hrs)
- [ ] Port `included.ts`, `whyOnline.ts`, `howItWorks.ts`, `programs.ts`, `testimonials.ts` content from the legacy HTML (verbatim where copy is good).
- [ ] Build `Hero`, `StatsStrip`, `ProgramCard`, `PricingTier`, `ResultCard`, `TestimonialCard`, `CoachBioSnippet`, `IncludedGrid`, `WhyOnlineGrid`, `HowItWorksSteps`.
- [ ] Assemble `/` page from components.
- [ ] Assemble `/programs` page — pricing tiers link to `/apply?program=…&term=…`.
- [ ] Assemble `/about` page using `coach.ts` bio paragraphs.
- [ ] Assemble `/apply` page layout (form itself is Phase 3).
- [ ] Decide and implement `/in-person` (real page or redirect — see §15).
- [ ] Write `docs/content-guide.md` showing how to edit `src/data/*.ts` files (non-engineer-friendly).

**Phase 2 deliverable:** every page renders real content from data files. The site reads like One More Coach, minus the form backend.

### Phase 3 — form backend (~2 hrs)
- [ ] Build `ApplicationForm` client component with URL-prefill behavior.
- [ ] Implement Server Action in `app/apply/actions.ts` with Zod validation.
- [ ] Wire Resend; create `docs/forms-email.md` with verification steps.
- [ ] Add honeypot field; add per-IP rate limit.
- [ ] Inline success / error states (no third-party redirect).
- [ ] End-to-end test: submit application from preview deploy → email lands in inbox.

**Phase 3 deliverable:** Josh can receive a real application from the preview URL.

### Phase 4 — images + assets (~1–2 hrs)
- [ ] Re-export logo (SVG preferred; otherwise <30 KB WebP).
- [ ] Optimize 4 result photos to lowercase WebP, <200 KB each.
- [ ] Delete unused `IMG_9420.jpg` and `result-5.JPG` (after confirming with Josh).
- [ ] Add favicon + `apple-touch-icon`.
- [ ] Create 1200×630 OG social card.
- [ ] Add coach headshot + full-length photo when supplied (until then, ship without the placeholder UI — see §16).
- [ ] Write `docs/performance.md` with Lighthouse baseline.

**Phase 4 deliverable:** every asset is optimized, named correctly, and rendered via `next/image`. No 4.6 MB logos.

### Phase 5 — SEO + analytics + polish (~2 hrs)
- [ ] Per-page `metadata` exports (title, description, OG, Twitter, canonical).
- [ ] Build `src/lib/schema.ts` with `LocalBusiness`, `Person`, `Service` builders.
- [ ] Mount JSON-LD on the right pages (see §10).
- [ ] Implement `app/sitemap.ts`, `app/robots.ts`.
- [ ] Wire GA4: `GoogleAnalytics.tsx` in root layout, `lib/analytics.ts` helper, all instrumented links/forms.
- [ ] Write `docs/seo-standards.md`, `docs/analytics.md`, `docs/accessibility.md`.
- [ ] Run Lighthouse on every page — fix anything <95.
- [ ] Verify accessibility with axe DevTools.

**Phase 5 deliverable:** site is search-discoverable, conversion-measurable, and AA-accessible.

### Phase 6 — launch (~1 hr + DNS wait)
- [ ] Run `docs/launch-checklist.md` end to end. Every `needsClientInput` flag must be `false`.
- [ ] Set env vars in Vercel Production (GA, Resend, contact emails).
- [ ] Verify Resend domain (SPF/DKIM).
- [ ] Connect custom domain `onemorecoaching.com` (or chosen final domain).
- [ ] Verify SSL.
- [ ] Submit sitemap to Google Search Console.
- [ ] Verify GA4 receiving live events.
- [ ] End-to-end smoke test: visit every page on mobile + desktop, submit a real application, click an Instagram link, click a pricing tier.
- [ ] Write `docs/deployment.md` with the rollback procedure.
- [ ] Archive `CURRENT_SITE_AUDIT.md` and `REBUILD_PLAN.md` into `/reference/` (or rename with `-archived-YYYY-MM-DD` suffix).

**Phase 6 deliverable:** live site at the custom domain, receiving real traffic and real applications.

**Total:** ~12–18 hours focused work, plus content/asset gathering from Josh and DNS propagation wait.

---

## 15. Open questions / blockers

These don't block scaffolding (Phase 0) but most block launch (Phase 6). Resolve before the relevant phase starts.

### Resolved decisions

| # | Decided | Decision | Date |
|---|---|---|---|
| 1 | Accent color | **Use the logo-matched accent color as the primary brand accent.** Current value in Tailwind theme: `#F2E11F` (Phase 1 second-pass visual estimate — a vivid electric/lemon yellow matching the lightning bolt and wordmark in `images/logo.png`; more saturated than the original `#F5E342` first-pass estimate). The legacy `#FFE000` is close but slightly too pure/warm; the leftover `#C8F55A` is too green and was never on-brand. **Final exact hex must still be color-picked from `images/logo.png` in design tooling (Figma / Photoshop / online picker)** — `#F2E11F` is an eyeball estimate, not a measured value. Once measured, this hex is the *only* place an accent color is declared (see §2 principle 8 and §5 Brand tokens row). Lives in `src/app/globals.css → @theme → --color-accent`. | 2026-05-23 (revised 2026-05-25 Phase 1) |
| 2 | Primary business email | **`josh@onemorecoach.com`** — sole canonical email. `josh@onemorecoaching.com` is **not** used in the rebuild unless we deliberately add it later as a redirect/alias. Lives in `src/data/business.ts → email`; consumed by footer, contact page, `mailto:` links, JSON-LD `LocalBusiness`, Resend `CONTACT_TO_EMAIL` default, and Resend `from`/`to` headers. | 2026-05-23 |
| 11 | Canonical domain | **`onemorecoach.com`** — sole canonical domain. `onemorecoaching.com` is not used in the rebuild unless we deliberately add it later as a redirect to `onemorecoach.com`. Lives in `src/data/business.ts → canonicalUrl = 'https://onemorecoach.com'`; consumed by every page's `metadata.alternates.canonical`, `sitemap.ts`, `robots.ts`, JSON-LD `url` fields, and the README/launch-checklist references. DNS cutover targets this domain in Phase 6. | 2026-05-23 |
| 15 (new) | Instagram handle | **`@onemorecoach`** (no underscore). **Differs from the legacy site's `@onemore_coaching`** — the rebuild drops the underscore. Lives in `src/data/business.ts → socials.instagram = '@onemorecoach'` and `socials.instagramUrl = 'https://instagram.com/onemorecoach'`; consumed by `InstagramLink` wrappers in footer/about/contact, Instagram CTA buttons, and JSON-LD `sameAs`. **Action item before launch:** verify the `@onemorecoach` handle is actually owned by Josh (or available to claim) on Instagram — if it's not, this decision needs to be revisited. | 2026-05-23 |
| 16 (new) | V1 social-media scope | **Simple outbound Instagram CTA only — no feed, no embeds, no API integration in v1.** The website does not pull, render, mirror, or cache any Instagram content; users click an outbound link and complete the follow on Instagram itself. Copy: "Follow @onemorecoach". Canonical URL: `https://www.instagram.com/onemorecoach/` (sourced from `business.ts → socials.instagramUrl`, never hard-coded). Placements in v1: (a) homepage near the results / social-proof area, rendered as `InstagramCtaSection`; (b) site-wide footer social link via `SiteFooter`; (c) optional `InstagramCtaSection` on the About page. Explicitly excluded from v1: Instagram Graph API, oEmbed embeds, third-party feed widgets (Curator, EmbedSocial, Tagembed, SnapWidget, etc.), any client-side `instgrm.Embeds.process()` or Meta SDK script. Instagram is **not** a launch-critical content source — the site must be complete and shippable without any Instagram content rendering inside it. Revisit only when there's a concrete reason (e.g. proven traffic from an "as seen on Instagram" angle, or a campaign that needs in-page social proof). See also §3 ("Not in v1") and §16 (anti-patterns). | 2026-05-25 |

### Open

| # | Question | Blocks | Owner |
|---|---|---|---|
| 1 | ~~Final accent color — `#FFE000` (yellow), the leftover `#C8F55A` (lime), or something new?~~ **RESOLVED 2026-05-23** — see "Resolved decisions" below. | — | — |
| 3 | Real city / gym name / address for in-person training? **New context:** the image inventory shows a "JUST LIFT GYM" sign in one of the coaching photos — likely the in-person training venue. Confirm the gym name + city + address, **and** decide whether to credit "Just Lift Gym" by name in copy and/or leave the sign visible in photos (Josh's standing rule is "no brands other than One More Coach," which would imply cropping the sign — but the venue may be a legitimate exception). See [IMAGE_INVENTORY.md](IMAGE_INVENTORY.md). | Phase 2 (programs + in-person copy), Phase 5 (`LocalBusiness` schema) | Josh |
| 4 | In-person pricing — real numbers for single session / 4 / 8 / 12 sessions? | Phase 2 | Josh |
| 5 | In-person availability — days/times? | Phase 2 | Josh |
| 6 | Coach certifications — real names? | Phase 2 (`coach.ts`) | Josh |
| 7 | Headshot + full-length photo of Josh — when available? | Phase 4 | Josh |
| 8 | Real client testimonials + result captions — collected yet? | Phase 2 (placeholder OK), pre-launch (real) | Josh |
| 9 | Google Business Profile — claimed? Place ID? | Phase 5 (schema + reviews) | Josh |
| 10 | Should `/in-person` survive as its own URL, or 301 to `/programs#in-person`? | Phase 2 | Mario (recommend: keep `/in-person` once city/gym are real — better for local SEO) |
| 12 | Form receiving address — same as `business.email` (`josh@onemorecoach.com`, resolved #2), or a dedicated `applications@…` alias? | Phase 3 | Josh |
| 13 | Phone number — does Josh want a phone CTA at all, or is form + DM enough? | Phase 1 (whether to build `PhoneLink`) | Josh |
| 14 | Privacy policy / terms — needed for v1, or post-launch? | Phase 5 (link in footer) | Mario (recommend: ship a basic privacy policy since form collects PII) |

Each question should be answered in this doc as decided, then deleted from this table once acted on.

---

## 16. What not to do

Anti-patterns to actively avoid during the rebuild — these would either re-introduce the legacy site's problems or import complexity that doesn't fit a one-coach business.

**From the legacy site, do not:**
- Inline `style="…"` attributes. Tailwind only.
- Inline `<style>` blocks in JSX. Use globals or component-scoped Tailwind.
- Hardcoded hex colors in components — always Tailwind theme tokens.
- Duplicated nav/footer markup across pages. One `SiteNav`, one `SiteFooter`, full stop.
- Placeholder UI shipped to production (the `[City]`, `$[XX]`, `JH` avatar, "Coach photo goes here" patterns). Either real or absent.
- Mixed-case file extensions (`.JPG` vs `.jpg`).
- API keys hardcoded in client JS.
- Forms posting to literal `YOUR_FORM_ID` strings.
- Emoji-as-icons.
- The 4.6 MB logo.
- `inperson.html` style content duplication (the same in-person section copy living in two pages).

**From Abide, do not import:**
- HIPAA / PHI warnings on the form. Standard "we don't share your info" is enough — One More Coach handles fitness intake, not health records.
- Dual-schema mounting (`Organization` + `LocalBusiness` with distinct `@id`s). One `LocalBusiness` + `Person` + per-program `Service` is enough for a 5-page coaching site.
- Dynamic `[slug]` routes for programs or for the coach. Five static pages. Add `[slug]` only when there's a real reason (blog, multi-location, multiple coaches).
- `InitialsAvatar` placeholder component. Ship real headshots before launch; don't institutionalize the placeholder pattern.
- A second form, a second Resend route, a second analytics event. One form, one route, one event.
- Industry-specific FAQ topics (veteran care, dementia care, VA programs).
- Six-location `phone_click` instrumentation. Only build event tracking for events that actually fire.
- A GoDaddy/HTML reference structure with DNS snapshots, pagespeed baselines, rebuild-rationale memos. Keep the legacy HTML for visual QA only.

**Social-media anti-patterns** (per §15 Resolved decision #16):
- Do not add an Instagram feed, embed, or `<blockquote class="instagram-media">` block anywhere.
- Do not load the Meta SDK (`//www.instagram.com/embed.js`) or call `window.instgrm.Embeds.process()`.
- Do not integrate the Instagram Graph API, the oEmbed endpoint, or any third-party social-feed widget (Curator, EmbedSocial, Tagembed, SnapWidget, Juicer, etc.).
- Do not auto-follow, auto-DM, or attempt any client-side Instagram action. The user must complete the follow on Instagram itself.
- Do not treat Instagram as a launch-critical content source. The site must ship complete and look finished without any Instagram content rendering inside it.
- Do not hard-code the Instagram URL anywhere — read from `business.ts → socials.instagramUrl`.

**Process anti-patterns:**
- All four Phase 0 hard blockers (accent color, primary email, canonical domain, Instagram handle) were resolved 2026-05-23 — see §15 Resolved decisions. The remaining open questions are content/asset blockers for later phases, not coding blockers for Phase 0.
- Do not add a CMS, blog, or scheduling integration in v1. Ship first; complexity later.
- Do not add analytics infrastructure for events you don't plan to fire.
- Do not skip the launch checklist in Phase 6 to ship a day early. Every `needsClientInput` flag flips to `false` first.
- Do not edit `CURRENT_SITE_AUDIT.md` after Phase 0 begins. It's frozen; new findings go in this file or `docs/launch-checklist.md`.

---

## 17. Future README skeleton (created in Phase 0)

Drop this into `README.md` at the repo root when scaffolding begins. Fill in tables as features ship.

```markdown
# One More Coach Website

## Overview
Marketing + lead-capture site for One More Coach (Coach Josh Horton).
Live: https://onemorecoach.com
Launch checklist: docs/launch-checklist.md
Rebuild plan: Rebuild Plan/REBUILD_PLAN.md

## Tech Stack
[table — Next.js 15+ App Router, TS, Tailwind v4, Vercel, GA4, Resend]

## Quick Start
[install / dev / build / deploy commands]

## Environment Variables
[table — NEXT_PUBLIC_GA_MEASUREMENT_ID, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL]

## Business configuration
src/data/business.ts is the single source of truth for name, email, social handles,
canonical URL, and the JSON-LD schemas. Update it once; the change propagates everywhere.

## Pages
[table — / | /programs | /in-person | /about | /apply]

## Data-driven content layer
[table — src/data/*.ts files and what they drive]

## Documentation
[table linking to docs/*.md]

## Reference
/reference/ contains the original static HTML site preserved during the cutover.
Not served, not built.
```

Sections to add as they become real:
- **Analytics & event tracking** (Phase 5)
- **Global navigation** (Phase 1)
- **Reusable card components** (Phase 2)
- **Content that still needs client input** (driven from data-file flags)
- **Structured data** (Phase 5)

---

**End of plan.** Edit this document as decisions are made and phases ship. When the rebuild reaches production, archive it alongside `CURRENT_SITE_AUDIT.md`.
