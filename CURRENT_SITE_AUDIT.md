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
| Styling | One global stylesheet — [styles.css](styles.css) (~1,360 lines, CSS custom properties, mobile-first media queries) |
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
- [styles.css:297-298](styles.css#L297-L298) hero glow
- [styles.css:392-393](styles.css#L392-L393) `.prog-tag` background
- [styles.css:884-889](styles.css#L884-L889) `.price-tier:hover` / `.featured`
- [styles.css:1245-1247](styles.css#L1245-L1247) `.response-box`
- [contact.html:421-426](contact.html#L421-L426) JS-injected pre-fill banner

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
