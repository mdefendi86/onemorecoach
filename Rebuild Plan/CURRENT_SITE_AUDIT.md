# One More Coach — Current Site Audit

**Audit date:** 2026-05-23
**Repo root:** `e:/onemorecoach`
**Branch:** `master`
**Purpose:** Establish a clear, factual baseline of the existing site so a future rebuild (Next.js + Tailwind) can be planned against it.

---

## 1. Current tech stack

| Layer | What's used |
|---|---|
| Markup | Hand-written HTML5 (5 pages, no templating) |
| Styling | One global stylesheet — [styles.css](../styles.css) (~1,360 lines, CSS custom properties, mobile-first media queries) |
| Scripting | Vanilla JavaScript, inline `<script>` block at the bottom of each page |
| Fonts | Google Fonts — Bebas Neue (headings) + Inter (body), loaded via `<link>` per page |
| Forms | Placeholder Formspree action URL (`https://formspree.io/f/YOUR_FORM_ID`) — not yet wired |
| Analytics | None |
| Build / bundler | None — files served as-is |
| Package manager | None — no `package.json`, no `node_modules` |
| Hosting | Unknown (no `vercel.json`, `netlify.toml`, CI configs, or deploy scripts present) |
| Version control | Git, single `master` branch |

There is no framework, no JSX, no TypeScript, no CSS preprocessor, no PostCSS, no design system library.

---

## 2. Current file structure

```
e:/onemorecoach/
├── .git/
├── CURRENT_SITE_AUDIT.md          ← this file
├── index.html                     (24 KB) — home
├── about.html                     (13 KB) — coach bio
├── contact.html                   (16 KB) — application form
├── inperson.html                  (9 KB)  — in-person training detail
├── programs.html                  (19 KB) — all programs + pricing
├── styles.css                     (29 KB) — single global stylesheet
├── images/
│   └── logo.png                   (4.6 MB)  ← oversized
└── results/
    ├── IMG_9420.jpg               (1.8 MB)  ← unused/unreferenced
    ├── result-1.JPG               (314 KB)
    ├── result-2.JPG               (820 KB)
    ├── result-3.JPG               (89 KB)
    ├── result-4.JPG               (87 KB)
    └── result-5.JPG               (447 KB)  ← unused/unreferenced (only 1–4 are rendered)
```

Notes:
- HTML markup references `results/result-1.jpg` (lowercase) but the files on disk are `.JPG` (uppercase). On case-sensitive hosts (Linux/Vercel/Netlify) the images **will 404**. On Windows local dev they happen to resolve.
- `results/IMG_9420.jpg` and `results/result-5.JPG` exist on disk but are not referenced anywhere in HTML.
- No `favicon.ico`, no `robots.txt`, no `sitemap.xml`, no `og:*` social images.

---

## 3. Current pages and purpose

### `index.html` — Home
The main marketing page. Sections, in order:
1. Sticky nav
2. Hero (headline "One more rep. One more % better.", two CTAs: Apply / See Results)
3. Stats strip (`50+ Clients · 100% Online · 24/7 Coach Access`)
4. Programs overview hub — splits **In-Person** (single card with bullets) from **Online Coaching** (3 cards: Lifestyle $125, Nutrition $75, Training $75)
5. What's Included — 8-icon grid
6. Client Results — 4 result cards (images)
7. Testimonials — 2 placeholder cards (real client quotes still TODO)
8. Google Reviews badge — placeholder Place ID, JS fetches Places API when filled in
9. Coach bio snippet — placeholder "JH" avatar
10. Lead capture form — placeholder Formspree
11. Footer

### `programs.html` — Programs & Pricing
Long-form pricing page. Four `prog-section` blocks:
1. In-Person Training (pricing all `$[XX]` placeholders)
2. Lifestyle ($125 / $325 / $700 / $1,450 — real prices)
3. Nutrition & Supplementation ($75 / $175 / $400 / $850 — real)
4. Training Guidance ($75 / $175 / $400 / $850 — real)

Each tier is an `<a>` linking to `contact.html?program=…&term=…` which is read by JS on the contact page and pre-fills the form dropdowns.

### `inperson.html` — In-Person Training detail
Nearly identical to the In-Person section on `programs.html`. Same four pricing tiers (`$[XX]`), same "Who It's For" / "What's Included" structure. This page is largely **redundant** — it duplicates content already on programs.html with a slightly different intro paragraph.

### `about.html` — About Coach Josh
1. Hero with photo placeholder + name + 3 cert badge placeholders (`[Cert 1]` etc.)
2. Four bio paragraphs (real, written copy — strongest narrative content on the site)
3. Pull quote
4. "How I Help You Win" — 4-item grid
5. "Why Online Coaching Works" — 6-item grid
6. Instagram CTA
7. Bottom CTA → contact.html
8. Footer

### `contact.html` — Apply for Coaching
1. Hero
2. Two-column body: left = contact info + 4-step "What Happens Next", right = application form (name, email, phone, goal, program, commitment length, about, heard-from)
3. Instagram CTA strip
4. Footer
5. JS reads `?program=` and `?term=` from URL and pre-fills dropdowns + shows a confirmation banner

---

## 4. Current styling approach

- **CSS variables** defined on `:root` for color, radius, spacing, max-width:
  - `--bg: #111111` · `--bg-card: #1a1a1a` · `--border: #2a2a2a`
  - `--accent: #FFE000` (bright yellow)
  - `--text: #ffffff` · `--muted: #888888`
- **Mobile-first** — base styles target ~375px, then `@media (min-width: 768px)` and `@media (min-width: 1200px)` upgrade layout.
- **Typography pairing** — Bebas Neue (display, all caps feel) + Inter (body).
- **Layout primitives** — `.container` (max-width 1200), `.section-pad`, `.section-alt`, `.section-head`.
- **Component classes** — `.btn-primary`, `.btn-ghost`, `.prog-card`, `.price-tier`, `.inc-item`, `.testi-card`, etc. — BEM-ish but inconsistent (some use `kebab-case` modifiers, some use `.featured`).
- **Inline styles + inline `<style>` blocks** are scattered throughout the HTML (e.g. `style="margin-top:40px;"`, `style="background:var(--bg-card)…"`, the `<style>` block at the top of `about.html`). These break the "single source of truth" intent of the stylesheet.

**Color inconsistency to flag:** the variable `--accent` is set to `#FFE000` (bright yellow), but multiple places in CSS and JS reference `rgba(200, 245, 90, …)` — that's `#C8F55A` (lime green). This is leftover from a color change and means hover states, glow effects, and the URL-param-prefill banner render in a *different* accent color than the rest of the brand. See:
- [styles.css:297-298](../styles.css#L297-L298) hero glow
- [styles.css:392-393](../styles.css#L392-L393) `.prog-tag` background
- [styles.css:884-889](../styles.css#L884-L889) `.price-tier:hover` / `.featured`
- [styles.css:1245-1247](../styles.css#L1245-L1247) `.response-box`
- [contact.html:421-426](../contact.html#L421-L426) JS-injected pre-fill banner

---

## 5. Current design strengths

- **Cohesive dark + accent visual language** — black/charcoal background with a single bright accent reads "premium gym" / fitness-coach territory cleanly.
- **Strong typographic hierarchy** — Bebas Neue display + Inter body is a well-worn but effective pairing for this category.
- **Clear hero** — "One more rep. One more % better." is short, on-brand, ownable.
- **Sticky nav with center logo + hamburger** is well-executed and reasonably accessible (`aria-expanded`, `aria-label`, focus management on outside-click).
- **Mobile-first CSS** is genuinely mobile-first, not desktop-shrunk.
- **Pricing tiers as `<a>` tags** with descriptive `aria-label` is a nice UX touch — the whole card is clickable, which routes a goal-aware query to the contact form.
- **URL-param pre-fill on the contact form** (with a confirmation banner) is a thoughtful conversion detail.
- **Reasonable a11y baseline** — semantic landmarks (`<header>`, `<nav>`, `<section>`, `<footer>`), `aria-current="page"`, descriptive `alt` text on most images, `aria-label` on icon-only links.

---

## 6. Current design weaknesses

- **Color drift** — accent yellow `#FFE000` vs leftover lime `#C8F55A` rgba values produce off-brand highlights (see §4).
- **No visual rhythm between sections** — everything is the same dark card on dark background; section dividers rely entirely on a 1px border. No imagery breaks, no parallax, no scroll choreography.
- **Hero is text-only** — no hero image, no video, no movement. For a coach selling a physical transformation, that's a missed opportunity.
- **Result cards are very plain** — just an image and a small "Muscle Building" tag. No client name, no length-of-program, no quote, no metric ("Lost 32 lbs in 16 weeks"). The strongest social proof asset is the weakest treatment.
- **Stats strip is generic** ("50+ Clients · 100% Online · 24/7 Coach Access") — looks like every other fitness landing page.
- **Coach bio avatar is a CSS placeholder** ("JH" in a circle). Real headshot would dramatically lift trust.
- **Google Reviews badge shows em-dashes** until the placeholder API key is filled in — currently it displays a half-finished widget to every visitor.
- **Inconsistent button affordances** — some elements have hover states, comments explicitly remove them ("prog-card is not a button — no hover highlight"), but adjacent clickable `<a>` cards (`.price-tier`) *do* have hover. The clickability rules are not visually consistent to a user.
- **Inline emoji used as icons** (💪 🥗 💊 📊 💬 📹 📈 🎯 📍 ⏱ 🤝 …) — render inconsistently across OS/browser, look like placeholder UI.
- **Image-only logo at 72px** with `mix-blend-mode: screen` is a clever hack to drop the black background, but it means the logo only works on backgrounds that match `var(--bg)`. Any future image hero or alt background will break it.
- **No favicon** — browser tab is empty.

---

## 7. Current content strengths

- **About page bio copy is strong** — four paragraphs of real, voice-y, written prose about Josh's journey, philosophy, and approach. This is the only page with real long-form content.
- **Program descriptions are clear** — each tier on `programs.html` has a "Who It's For" + "What's Included" block that's specific and useful (not lorem-ipsum).
- **Lifestyle / Nutrition / Training tier pricing is real** ($125, $75, $75 monthly) with actual savings math on multi-month plans.
- **The 4-step "What Happens Next"** on the contact page does the conversion-anxiety work well.
- **"Why Online Coaching Works" section** on the About page handles the most likely objection (online vs in-person) head-on with 6 specific bullets.

---

## 8. Current content gaps

The site is studded with placeholder strings that must be replaced before launch:

| Placeholder | Where | What's needed |
|---|---|---|
| `[City]`, `[City, State]` | index.html, inperson.html, programs.html | Real city/state for in-person clients |
| `[Gym Name]`, `[Gym / Location]`, `[Address or area]` | index.html, inperson.html, programs.html | Real gym name + address |
| `[days of week]`, `[time range]` | inperson.html | Real availability |
| `$[XX]` (in-person pricing — appears 8 times) | inperson.html, programs.html | Real per-session and per-month prices |
| `[Cert 1 — e.g. NASM-CPT]`, `[Cert 2]`, `[Cert 3]` | about.html | Real certification names |
| `[Certs coming]` | index.html bio snippet | Real certs |
| Coach photo placeholder ("📸 Coach photo goes here") | about.html, index.html bio | Headshot + full-length photo |
| `"Replace this with a real quote…"` × 2 | index.html testimonials | Real client quotes + names |
| `YOUR_FORM_ID` | index.html, contact.html form actions | Real Formspree form ID (or alternate backend) |
| `YOUR_PLACE_ID` | index.html GMB widget + every footer's review link | Real Google Business Place ID |
| `YOUR_API_KEY` | index.html JS | Google Places API key (domain-restricted) |
| `josh@onemorecoach.com` vs `josh@onemorecoaching.com` | contact.html vs `mailto:` links in footer/HTML comments | Domain is inconsistent — pick one |

Content that is **missing entirely**:
- No FAQ page
- No blog / content marketing surface (the kind of thing that ranks for "online personal trainer" long-tail searches)
- No privacy policy / terms (likely required once the form is live and collecting personal info)
- No `og:image`, no Twitter card meta — link previews on Instagram/SMS/iMessage will be bare
- No structured data (`LocalBusiness`, `Person`, `Service` schema) — hurts local SEO for in-person side
- No video — no Instagram embed, no YouTube intro, no client transformation reel

---

## 9. Code / build risks

1. **Case-sensitive image paths will 404 in production.** HTML references `results/result-1.jpg` but files are `result-1.JPG`. Works on Windows, breaks on Linux hosts (Vercel, Netlify, GitHub Pages, most VPSes).
2. **`logo.png` is 4.6 MB** for a logo displayed at 72px tall. This single file is heavier than the rest of the site combined. Needs to be exported at 2× target size (~144px tall) and ideally moved to SVG or WebP. Same story for `IMG_9420.jpg` at 1.8 MB.
3. **Forms have no real backend.** Action URL is the literal string `YOUR_FORM_ID`. Submitting today would POST to a non-existent Formspree endpoint and silently fail.
4. **Google Reviews widget renders broken state on every page load** until the Place ID + API key are filled in — `—` placeholders are visible to all visitors.
5. **Duplicated navigation, footer, and hamburger JS in all 5 HTML files.** Any nav change must be made in 5 places. High drift risk — already visible: `index.html` has `<a href="#results">Results</a>` (works only on index) while every other page has `<a href="index.html#results">Results</a>`.
6. **Inline `<script>` repeated verbatim in every page** for nav toggle + footer year. Same drift risk as above.
7. **`inperson.html` largely duplicates the In-Person section of `programs.html`.** Two sources of truth for the same pricing and copy.
8. **Color drift between `--accent` and leftover `rgba(200, 245, 90, …)` values** (see §4) — accent yellow in some places, lime green in others.
9. **No favicon, no `<link rel="icon">`** — minor, but visible in every browser tab.
10. **No SEO meta beyond title + description.** No canonical URLs, no `og:*`, no `twitter:*`, no JSON-LD.
11. **Email address typo risk:** `josh@onemorecoach.com` vs `josh@onemorecoaching.com` both appear. Mail to the wrong one bounces.
12. **No analytics / event tracking** — can't measure form starts, scroll depth, CTA clicks, or which pricing tier gets clicked most.
13. **No security headers, no CSP** (these would be set at the host layer, but worth noting).
14. **Email is exposed as plain `mailto:` text** — guaranteed to get scraped for spam.

---

## 10. What is worth keeping

- **Brand foundation** — "One More Coach" name, "One more rep. One more % better." headline, dark + single-accent visual language, Bebas Neue + Inter typography. This is a real brand identity and should carry forward.
- **Information architecture** — the page set (Home, Programs, In-Person, About, Apply) is right. The split between **online programs** and **in-person training** as parallel offerings is a sound business decision and the site reflects it.
- **Pricing model and tier structure** — month / 3-month / 6-month / 12-month with consistent $50 multi-month savings is clean and conversion-friendly. The 4 online programs (Lifestyle / Nutrition / Training / In-Person) and their "Who It's For" + "What's Included" descriptions are good copy.
- **About page bio copy** — the four paragraphs of real Josh Horton narrative are usable as-is.
- **URL-param → form-prefill UX pattern** on contact.html is genuinely good and worth porting.
- **A11y baseline** — `aria-current`, `aria-expanded`, `aria-label` on icon-only links, semantic landmarks. Keep this discipline.
- **"What Happens Next" 4-step on contact page** — converts well, keep the content.
- **Mobile-first responsive approach** — keep the philosophy, replace the implementation.

---

## 11. What should be replaced

- **The build approach.** Move from hand-edited HTML to a component-based framework so nav/footer/forms exist once.
- **The stylesheet.** Replace bespoke CSS with Tailwind utility classes + a small set of component primitives. Carry the color tokens, type ramp, and spacing scale into a `tailwind.config.ts` theme.
- **All placeholder strings** (`[City]`, `$[XX]`, `YOUR_FORM_ID`, `YOUR_PLACE_ID`, `[Cert]`, "Coach photo goes here", etc.) — should not exist in a production build; replace with real values OR move to a CMS/data file so they're maintainable.
- **The 4.6 MB logo.** Re-export to ~30 KB PNG/WebP, or convert to SVG.
- **Case-mismatched result image filenames.** Rename to lowercase, optimize to <200 KB each, serve as WebP/AVIF with `<Image>` (Next.js).
- **The emoji icon set.** Replace with a real icon library (Lucide, Heroicons, or custom SVG sprites) for visual consistency.
- **The Google Reviews fetch.** Either remove until ready, or move to server-side fetch with caching (avoid exposing an API key in client JS, and never render a broken widget).
- **`inperson.html` as a separate page.** Either delete and link to `programs.html#inperson`, or repurpose as a location-specific landing page once city/gym are real.
- **The contact form backend.** Wire to a real endpoint — Formspree, Resend, Sanity Forms, or a Next.js API route.
- **The duplicated bio avatar placeholder** ("JH" circle) and the about photo placeholder — replace with real headshots.
- **The color drift** — pick the accent (yellow `#FFE000` or lime `#C8F55A`), then purge the other.

---

## 12. Recommendation: rebuild in place vs start fresh

**Recommendation: start fresh in a new Next.js + Tailwind project, but port content verbatim.**

Why not rebuild in place:
- There is no `package.json`, no build step, no framework — there's nothing to *migrate*. A "rebuild in place" would mean adding Next.js into a directory that doesn't currently have it, which is functionally the same as starting fresh.
- The current HTML is small enough (~80 KB across 5 files) that copying content into JSX takes hours, not days.
- Starting fresh lets the new project be configured cleanly (TypeScript, ESLint, Prettier, Tailwind theme tokens, deployment target) without inheriting layout decisions or naming conventions from the hand-written CSS.

What "start fresh" means here:
- Create a new `app/` directory with a fresh Next.js (App Router) + Tailwind + TypeScript setup. The existing HTML/CSS files can either be deleted, moved to `legacy/`, or kept until the new build reaches parity, then removed.
- Treat the current site as a **design and content reference**, not as code to migrate. Copy: brand colors, type pairing, headline, bio paragraphs, program descriptions, pricing structure, form fields, "What Happens Next" steps. Re-implement: layout, components, images, forms.

Effort estimate (rough): 1–2 focused days for a single developer to reach feature parity, plus content/image work to fill placeholders.

---

## 13. Suggested Next.js + Tailwind rebuild plan

### Stack
- **Framework:** Next.js 15 (App Router, React Server Components)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 with a custom theme (port `--accent`, `--bg`, etc. into `@theme` tokens)
- **Icons:** Lucide React (replace emoji)
- **Fonts:** `next/font/google` for Bebas Neue + Inter (auto-optimized, self-hosted, no external request)
- **Images:** `next/image` for all photos (auto WebP/AVIF, responsive `srcset`, lazy-load)
- **Forms:** Next.js Server Action posting to Resend (transactional email to Josh) — avoids third-party form vendor and gives full control over the response email. Formspree is a fine fallback.
- **Content:** start with content-in-code (TypeScript data files for programs, pricing, testimonials) — fast to ship. Move to a headless CMS (Sanity / Payload / Contentlayer) only once Josh wants to self-edit copy.
- **Deployment:** Vercel (one-click, free tier, automatic preview deployments)
- **Analytics:** Vercel Analytics or Plausible (privacy-respecting, no cookie banner needed)

### Project structure (proposed)
```
src/
├── app/
│   ├── layout.tsx              # root layout: <html>, fonts, <SiteNav>, <SiteFooter>
│   ├── page.tsx                # home (was index.html)
│   ├── programs/page.tsx       # was programs.html
│   ├── in-person/page.tsx      # was inperson.html (or redirect to /programs#inperson)
│   ├── about/page.tsx          # was about.html
│   ├── apply/page.tsx          # was contact.html
│   ├── apply/actions.ts        # Server Action for form submission
│   ├── api/reviews/route.ts    # server-side Google Places fetch (cached)
│   └── globals.css             # Tailwind directives + theme tokens
├── components/
│   ├── site-nav.tsx
│   ├── site-footer.tsx
│   ├── hero.tsx
│   ├── stats-strip.tsx
│   ├── program-card.tsx
│   ├── pricing-tier.tsx        # the clickable <a> tier
│   ├── result-card.tsx
│   ├── testimonial.tsx
│   ├── google-reviews-badge.tsx
│   ├── application-form.tsx
│   └── ui/                     # button, container, section-head primitives
├── lib/
│   ├── programs.ts             # source of truth for program data + pricing
│   ├── testimonials.ts
│   └── results.ts
└── public/
    ├── logo.svg                # re-exported from 4.6MB PNG
    ├── favicon.ico
    ├── og-image.jpg            # 1200×630 social card
    └── results/
        ├── result-1.webp       # optimized, lowercase, WebP
        └── …
```

### Phased plan
**Phase 0 — scaffolding (1–2 hrs):**
- `pnpm create next-app` with TypeScript + Tailwind + App Router
- Configure `tailwind.config.ts` theme tokens to match current brand
- Set up `next/font` for Bebas Neue + Inter
- Add Lucide, ESLint, Prettier

**Phase 1 — primitives + shared layout (2–3 hrs):**
- Build `SiteNav` (with mobile hamburger as a client component) and `SiteFooter` once, mount in `app/layout.tsx`
- Build `Button`, `Container`, `SectionHead`, `SectionTag` primitives
- Migrate color tokens, type ramp, spacing — verify no color drift (one accent only)
- Pull in the `logo.svg` and a favicon

**Phase 2 — content pages (4–6 hrs):**
- Port `index.html` → `app/page.tsx` (Hero, StatsStrip, ProgramsOverview, WhatsIncluded, Results, Testimonials, GoogleReviewsBadge, BioSnippet, ApplyCTA)
- Port `programs.html` → `app/programs/page.tsx`, with all program data sourced from `lib/programs.ts`
- Port `about.html` → `app/about/page.tsx` (bio paragraphs verbatim, replace placeholder photo + cert badges with real data once available)
- Port `contact.html` → `app/apply/page.tsx`, plus the URL-param prefill behavior

**Phase 3 — form backend (2 hrs):**
- Implement a Server Action in `app/apply/actions.ts` that validates input (Zod) and sends an email via Resend to `josh@onemorecoach.com`
- Add success / error states inline (no third-party redirect)
- Add basic spam protection (Resend's built-in or a hidden honeypot field)

**Phase 4 — images + assets (1–2 hrs):**
- Re-export the logo as SVG (or 144px PNG ~30 KB)
- Optimize all result photos (lowercase filenames, WebP, <200 KB each)
- Add `og:image`, `twitter:card`, `apple-touch-icon`
- Add coach headshot once available

**Phase 5 — SEO + analytics + polish (2 hrs):**
- Per-page `metadata` exports (title, description, OG, Twitter, canonical)
- `robots.txt`, `sitemap.xml` (Next.js generates both)
- JSON-LD `LocalBusiness` + `Person` schema for local SEO
- Vercel Analytics
- Lighthouse pass — aim for ≥95 in all four categories

**Phase 6 — launch (1 hr):**
- Deploy to Vercel
- Wire custom domain
- Verify form delivery end-to-end
- Submit sitemap to Google Search Console

**Total:** ~12–18 hours of focused work to reach + exceed parity with the current site, with a vastly better foundation for iteration.

### Open questions to resolve before rebuild
1. Which accent — yellow `#FFE000` or the lime green leftover `#C8F55A`?
2. Final email address — `josh@onemorecoach.com` or `josh@onemorecoaching.com`?
3. Real city / gym name / pricing for in-person training?
4. Are the certifications confirmed yet, or stay TBD?
5. Headshot + full photo of Josh — available now?
6. Real client testimonials and result captions — collected yet?
7. Google Business Profile — claimed, with a real Place ID?
8. Should `inperson.html` survive as its own URL, or fold into `/programs`?

These questions don't block scaffolding (Phases 0–1) and most don't block layout (Phase 2). They are blockers for **launch**, not for rebuild.

---

## Lessons From Abide Project

A separate project (Abide Home Care) was built from scratch on Next.js + Tailwind and is in a much healthier state — its README is the structural reference for this section. We are not copying any Abide content, brand, routes, copy, or business setup. We are extracting **the practices** that made Abide easy to maintain so One More Coach can be set up the same way from day one rather than retrofitted later.

### 1. What Abide does better — project setup

- **Real toolchain from day one.** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4. Not "we'll add a build step later." This is the gap One More Coach has today — there is no build step at all.
- **Vercel deploy on push to `main`.** Preview deploys per branch. Zero-config rollback. One More Coach currently has no deploy pipeline.
- **Static generation by default.** Every public route is prerendered at build time; the only request-time code paths are `/api/*`. This is the right shape for a marketing site — fast, cheap, and resilient.
- **Environment variables documented in a table** (Required / Status / Purpose), with the explicit rule that secrets live in Vercel and `.env.local` is git-ignored. One More Coach today has `YOUR_API_KEY` checked into JS — the opposite of this discipline.
- **Practical operational notes captured in the README**, not in tribal memory. Example: "the production build runs out of memory; set `NODE_OPTIONS=--max-old-space-size=4096`." Future Mario (or a contractor) hits the wall and the README already has the fix.
- **Graceful degradation when env vars are missing.** Analytics no-ops, forms return a clear 503. One More Coach today silently posts to `YOUR_FORM_ID` and the user sees nothing.
- **Reference assets quarantined.** Old GoDaddy HTML lives in `/reference/` — not served, not built, just kept for visual QA. One More Coach should do the same with the current static HTML once the rebuild starts.

### 2. What Abide does better — documentation

- **README is a map, not the whole atlas.** It summarizes each area and links to a deeper doc in `/docs/`. This keeps the README scannable while still being a useful entry point.
- **Tables over prose** for things that are inherently tabular: env vars, routes, events, navigation breakpoints, data files. Easier to skim, easier to keep accurate.
- **Single canonical location for each topic.** Forms-email is in `docs/forms-email.md`; SEO is in `docs/seo-standards.md`. There's no second copy in the README to drift out of sync. The README explicitly says "each file is the canonical source for its area."
- **Honest about what's not done yet.** "Content that still needs client input" lists every flagged placeholder. "Future analytics work (not blocking launch)" lists what's deferred and why. This kind of explicit incompleteness is healthier than pretending the site is finished.
- **Architectural decisions explained, not just stated.** Examples: *why* `Organization` and `LocalBusiness` schemas have distinct `@id`s, *why* honeypot submissions still fire analytics events, *why* FAQs and Meet the Team are the items that drop on small desktops. Decisions you have to re-derive are decisions that get reversed by accident.
- **A "convention for new X" pattern.** "Convention for new dynamic routes (Next.js 16): `params` is a Promise, must be awaited." A short, copy-paste-ready snippet so the next page is added correctly the first time.

### 3. README sections One More Coach should eventually have

After the rebuild is scaffolded, the One More Coach README should mirror the Abide structure (adapted to a coaching business, not health care):

1. **Overview** — what the site is, live URL, link to the launch checklist doc.
2. **Tech Stack** — table.
3. **Quick Start** — prerequisites, install, dev, build, deploy.
4. **Environment Variables** — table with Required / Status / Purpose.
5. **Business configuration & structured data** — point at `src/data/business.ts` as the single source of truth. Note which JSON-LD schemas are rendered and on which pages.
6. **Analytics & event tracking** — what events fire, where they're instrumented, what to mark as Key Events in GA4.
7. **Pages** — static routes table + (if any) dynamic routes table.
8. **Data-driven content layer** — table of every `src/data/*.ts` file and what it drives.
9. **Global navigation** — what shows up in header vs footer vs mobile vs desktop, and why some items only appear at certain breakpoints.
10. **Reusable card components** — point at the program card, pricing tier, result card, testimonial — what they're used by.
11. **Content that still needs client input** — flagged placeholders, with the launch checklist as the canonical list.
12. **Documentation** — table linking to `/docs/*.md` files.
13. **Reference Files** — `/reference/` (the current static HTML preserved for visual QA during the cutover).

### 4. `/docs/` files One More Coach should eventually have

These should be created as the rebuild progresses, not all at once on day one:

| Doc | What's in it | When to create |
|---|---|---|
| `docs/launch-checklist.md` | The replacement for the open-questions list in §13 above — every placeholder that has to be replaced before going live, plus DNS cutover, GA4 verification, form-delivery smoke test. | Phase 0 |
| `docs/forms-email.md` | Application form behavior, Resend setup, verified sender, `to` address, spam protection (honeypot, rate limit). | Phase 3 |
| `docs/deployment.md` | Vercel deploy workflow, custom domain DNS, env var sync between local and Vercel, rollback steps. | Phase 6 |
| `docs/seo-standards.md` | Canonical domain, metadata pattern, sitemap, robots, JSON-LD (`LocalBusiness` for in-person, `Person` for Josh, `Service` per program), new-page checklist. | Phase 5 |
| `docs/analytics.md` | GA4 events One More Coach tracks — `apply_click`, `program_tier_click`, `phone_click` (if applicable), `instagram_click`, `application_submit` — with `location` parameter conventions. | Phase 5 |
| `docs/performance.md` | Lighthouse baseline, image rules, hero/LCP guidance, font preload strategy. | Phase 4 |
| `docs/accessibility.md` | WCAG AA targets, alt text rules, focus states, touch targets. | Phase 5 |
| `docs/content-guide.md` | How to edit `src/data/*.ts` to change programs, pricing, testimonials, results — written so a non-engineer can do it. | Phase 2 |

`docs/security.md` and a separate `docs/roadmap.md` are nice-to-have but not as urgent for a one-form coaching site as they are for Abide.

### 5. Which One More Coach content should become data-driven

Today every page is a hand-edited HTML file. After the rebuild, the following content should be moved into `src/data/*.ts` files so a single edit propagates everywhere:

| Data file | Drives |
|---|---|
| `src/data/business.ts` | Business name, email, phone (if any), social handles (`@onemore_coaching`), Instagram URL, canonical URL, schema |
| `src/data/coach.ts` | Coach Josh — name, role, bio short, bio full, certifications, headshot path, pull-quote |
| `src/data/programs.ts` | All four programs (Lifestyle / Nutrition / Training / In-Person): slug, name, tagline, "Who It's For", "What's Included" bullets, price tiers, savings labels, `?program=` slug for the contact pre-fill |
| `src/data/pricing.ts` | (Optional — could live inside `programs.ts`) The tier shape: monthly / 3mo / 6mo / 12mo, prices, savings |
| `src/data/testimonials.ts` | Real client quotes — name, program, result, quote |
| `src/data/results.ts` | Before/after photos — image, alt text, category (Weight Loss / Muscle Building / Body Recomp), optional metric ("Lost 32 lbs in 16 weeks"), client first name |
| `src/data/included.ts` | The 8-item "What's Included" grid on home |
| `src/data/whyOnline.ts` | The 6-item "Why Online Coaching Works" grid on about |
| `src/data/howItWorks.ts` | The 4-step "What Happens Next" sequence on the apply page |
| `src/data/faqs.ts` | (When created) Site-wide FAQ accordion |
| `src/data/nav.ts` | (Optional) Header + footer link arrays, with a `mobileOnly` / `lgOnly` flag if the nav ever needs breakpoint-aware filtering |

Each entry should support a `needsClientInput: true` or `isPlaceholder: true` flag so the launch checklist can be generated from the data itself rather than hunted for in HTML.

### 6. Single source of truth — what consolidates where

| Single source of truth | Lives in | Consumed by |
|---|---|---|
| **Business info** (name, email, Instagram handle, canonical URL, hours if any) | `src/data/business.ts` | Footer, nav, contact page, JSON-LD schema, `metadata` in `app/layout.tsx`, server-action `from`/`to` addresses |
| **Coach info** (Josh's name, bio, certs, headshot, quote) | `src/data/coach.ts` | About page, home bio snippet, `Person` JSON-LD |
| **Programs & pricing** | `src/data/programs.ts` | Programs page, home overview cards, in-person section (or page), `?program=` pre-fill on the apply form |
| **Testimonials** | `src/data/testimonials.ts` | Home testimonials section, future per-program social proof |
| **Results / before-and-afters** | `src/data/results.ts` | Home results grid, future per-program results galleries |
| **CTAs** (button labels, target hrefs for "Apply", "See Results", "Follow on IG") | `src/data/ctas.ts` *or* a `CTA` component with named variants | Hero, footer, every bottom-of-page section |
| **Social links** | `src/data/business.ts → socials` | Footer, about page, contact page |
| **Form destination** (email to send applications to) | `CONTACT_TO_EMAIL` env var, defaulted in `business.ts` | Server action handler |
| **Brand tokens** (accent color, neutrals, font families, radius, spacing) | `tailwind.config.ts → theme.extend` + `app/globals.css → @theme` | Every component (no inline hex codes, no `rgba(200,245,90,…)` drift) |
| **Site-wide copy constants** (tagline "One more rep. One more % better.", company year, 24-hour-response promise) | `src/data/copy.ts` *or* `business.ts` | Hero, footer, apply page, social card |

The rule that makes this work: **no hex code, no email address, no phone number, no price, no headline, and no client name should appear as a string literal inside a React component.** If a value can change, it lives in a data file or token.

### 7. Abide patterns to skip

Not every Abide practice maps to a coaching business. Don't reuse:

- **HIPAA / PHI warnings on forms.** Abide handles personal health info; One More Coach handles fitness intake. Standard "we don't share your info" copy is enough.
- **Dual-schema mounting (`Organization` + `LocalBusiness` with distinct `@id`s).** Useful for a multi-page in-home-care brand. For OMC, start with a single `LocalBusiness` (for the in-person side) + `Person` (for Josh) + `Service` per program. Don't over-engineer schema for a 5-page site.
- **8 services × dynamic detail pages + 3 team bios × dynamic detail pages.** OMC has 4 programs and 1 coach. Static pages are fine; don't introduce `[slug]` routing complexity until there's a real reason (e.g. a blog).
- **`InitialsAvatar` placeholder component.** Replace the "JH" avatar with a real headshot before launch; don't ship the placeholder pattern at all.
- **`CareersForm` (separate second form + second Resend route + second analytics event).** OMC has one form (the application). One server action, one Resend template, one `application_submit` event.
- **Veteran-care / dementia-care / VA-program flagged FAQ entries.** Industry-specific — not applicable.
- **Reference/GoDaddy HTML migration plumbing.** OMC isn't migrating from a builder platform. The current static HTML *can* be kept in `/reference/` during the cutover for visual QA, but there's no DNS-records snapshot, no pagespeed baseline from the old host, no rebuild-rationale memo to preserve.
- **Six different `phone_click` instrumentation locations** (hero, footer, home_contact, services_contact, contact_info_block, privacy_policy_address). OMC probably doesn't have a phone CTA at all — Josh's primary channel is the application form and DM. Don't add infrastructure for events that don't fire.

### 8. How these lessons adjust the One More Coach rebuild plan

Update §13 above with the following deltas (do NOT replace §13 — these refine it):

**Phase 0 — scaffolding** *(add)*
- Create `src/data/business.ts`, `coach.ts`, `programs.ts` empty-but-typed before any page is built. Even an empty `business.ts` with `name: 'One More Coach'` and `socials.instagram: '@onemore_coaching'` prevents the first hardcoded string from sneaking into a component.
- Create `/docs/` with an empty `launch-checklist.md` (start populating it from the §13 open questions immediately).
- Pick the accent color *before* the Tailwind theme is written. Color drift cannot start if there's only ever one accent in `tailwind.config.ts`.

**Phase 1 — primitives + shared layout** *(add)*
- Build a `PhoneLink` / `EmailLink` / `InstagramLink` pattern from the start — every external/contactable link goes through a wrapper that can fire an analytics event. Even if GA4 isn't wired yet (Phase 5), the instrumentation points exist.
- Header and footer nav both read from a single `navLinks` array. Use a `mobileOnly` / `lgOnly` flag if needed — never duplicate the link list.
- No inline `style=` attribute is allowed anywhere. (One of the current site's biggest source-of-truth violations.)

**Phase 2 — content pages** *(change)*
- Every program, every price, every testimonial, every result image, every section heading: comes from a data file. The JSX should look like `{programs.map(p => <ProgramCard {...p} />)}`, never four hard-coded cards.
- The "What's Included" 8-item grid, the "Why Online Coaching Works" 6-item grid, and the "What Happens Next" 4-step are all data arrays, not JSX literals.

**Phase 3 — form backend** *(add)*
- Honeypot field on the form (hidden, real submissions leave it empty, bots fill it).
- Server-side rate limit per IP.
- `CONTACT_TO_EMAIL` env var defaulted to whatever `business.email` is. Resend domain verification before launch.
- Form fires `application_submit` with `form_location` parameter (`home` / `apply` / wherever).

**Phase 5 — SEO + analytics + polish** *(change)*
- JSON-LD: start with `LocalBusiness` (Josh's in-person side), `Person` (Josh himself), and one `Service` per program. Skip `Organization` until/unless OMC becomes a multi-coach brand.
- GA4 events: `application_submit`, `program_tier_click` (with `program` and `term` parameters that match the existing `?program=&term=` URL pattern), `instagram_click`, `apply_cta_click` (with `location`). Skip `phone_click` until there's actually a phone link.
- Mark `application_submit` as the only Key Event at launch.

**Phase 6 — launch** *(add)*
- Run the launch checklist from `docs/launch-checklist.md`. Every "needs client input" flag in the data files should be `false` before flipping DNS.
- Move the current static HTML into `/reference/` (or delete) once the rebuild is in production.

### 9. What the future One More Coach README should include after scaffold

Bare-minimum README at the end of Phase 1 (so the project is documented from the start, not retrofitted):

```markdown
# One More Coach Website

## Overview
Marketing + lead-capture site for One More Coach (Coach Josh Horton).
Live: https://onemorecoaching.com
Launch checklist: docs/launch-checklist.md

## Tech Stack
[table — Next.js 15 App Router, TS, Tailwind v4, Vercel, GA4, Resend]

## Quick Start
[install / dev / build / deploy]

## Environment Variables
[table — NEXT_PUBLIC_GA_MEASUREMENT_ID, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL]

## Business configuration
src/data/business.ts is the single source of truth for name, email, social handles, canonical URL, and the JSON-LD schemas. Update it once; the change propagates everywhere.

## Pages
[table — / | /programs | /in-person | /about | /apply]

## Data-driven content layer
[table — src/data/*.ts files and what they drive]

## Documentation
[table linking to docs/*.md]

## Reference
/reference/ contains the original static HTML site preserved during the cutover. Not served, not built.
```

Sections to *add* as they become real: Analytics & event tracking (Phase 5), Global navigation (Phase 1 once nav is built), Reusable card components (Phase 2), Content that still needs client input (driven from data-file flags).

### 10. What stays in `CURRENT_SITE_AUDIT.md` vs moves to future docs

`CURRENT_SITE_AUDIT.md` is a **historical snapshot**. Once the rebuild ships, it should be archived (renamed to `docs/legacy-site-audit-2026-05-23.md` or moved into `/reference/`) and never edited again. It exists to explain "why we rebuilt" and "what the old site was."

| Content | Stays in `CURRENT_SITE_AUDIT.md` (historical) | Moves to `README.md` (living) | Moves to `docs/launch-checklist.md` (working list) | Moves to `REBUILD_PLAN.md` (one-time, archived after launch) |
|---|:---:|:---:|:---:|:---:|
| §1 Current tech stack | ✅ | | | |
| §2 Current file structure | ✅ | | | |
| §3 Current pages and purpose | ✅ | | | |
| §4 Current styling approach | ✅ | | | |
| §5 Current design strengths | ✅ | | | |
| §6 Current design weaknesses | ✅ | | | |
| §7 Current content strengths | ✅ | | | |
| §8 Current content gaps (placeholder table) | ✅ snapshot | | ✅ as actionable checklist | |
| §9 Code/build risks | ✅ | | | |
| §10 What is worth keeping | ✅ | | | ✅ as design brief input |
| §11 What should be replaced | ✅ | | | ✅ as design brief input |
| §12 Rebuild vs start fresh | ✅ | | | ✅ as decision record |
| §13 Suggested rebuild plan + phases | | | | ✅ |
| §13 Open questions | | | ✅ | |
| Lessons From Abide — §3 README sections | | ✅ as living README structure | | |
| Lessons From Abide — §4 `/docs/` files | | ✅ as `docs/` directory | | |
| Lessons From Abide — §5 data-driven content | | ✅ as `src/data/` layer | | |
| Lessons From Abide — §6 single source of truth | | ✅ as architectural rule | | |
| Lessons From Abide — §8 phase deltas | | | | ✅ as the actual rebuild plan |
| Lessons From Abide — §9 future README skeleton | | ✅ verbatim | | |

**Concretely:**

- **Keep editing `CURRENT_SITE_AUDIT.md` only until the rebuild starts.** After Phase 0 begins, this file is frozen. Any new finding goes into `REBUILD_PLAN.md` or `docs/launch-checklist.md`, not back into the audit.
- **Create `REBUILD_PLAN.md` next** (as a separate file, not as more sections in this one). It absorbs §13 and the phase deltas in §8 of this section. Once the rebuild ships, `REBUILD_PLAN.md` is also archived to `/reference/` — it has served its purpose.
- **Create `README.md` during Phase 0** with the skeleton in §9 above. It's a living document forever — edit it as the project changes.
- **Create `docs/launch-checklist.md` during Phase 0** seeded with the placeholder table from §8 of the audit + the open questions from §13. This is the *only* document where "is the site ready to launch" gets answered.

The shape this section is aiming for: three documents own three time horizons. `CURRENT_SITE_AUDIT.md` owns the past, `REBUILD_PLAN.md` owns the transition, `README.md` + `docs/` own the future.
