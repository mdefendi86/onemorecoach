# One More Coach — Image Inventory

**Inventory date:** 2026-05-25
**Source folder:** [../images/owner-images/](../images/owner-images/)
**Total files:** 17 WebP images, all already converted from originals
**Total weight:** ~2.4 MB across all 17 files (61 KB–209 KB each — all already under the 250 KB ceiling set in [REBUILD_PLAN.md §12](REBUILD_PLAN.md#12-image-and-asset-plan))
**Purpose:** Catalog the supplied images so the rebuild can route each to the right page, with clean filenames, real alt text, and any concerns flagged before anything gets imported into `/public/`.

> **No images are moved, renamed, optimized, or deleted by this document.** This is a planning artifact only.

---

## Two cross-cutting findings before the per-file table

These came out of the visual review and affect downstream decisions, so calling them out up top:

### 1. Filename mismatches — two files describe the wrong exercise
The filenames were treated as rough alt text, which mostly works — but two are inaccurate and the alt text recommendations below describe what the image actually shows, not what the filename says.

| Filename | Filename says | Image actually shows |
|---|---|---|
| `Josh doing ez bar curl side view zoomed out.webp` | EZ bar curl | Single-dumbbell biceps curl, side view |
| `Josh in black tank doing a ez bar curl side view.webp` | EZ bar curl | Two-dumbbell hammer curls (50 lb dumbbells), side view |

Not a problem to fix at the file level (filenames will all be renamed anyway during import) — just flagging that alt text should describe the image truthfully.

### 2. The "JUST LIFT GYM" sign answers an open question
The chest-supported-row coaching photo (`Syd on chest supported row, josh spotting_.webp`) clearly shows a wall sign reading **"JUST LIFT GYM"**. That is very likely the gym name for the in-person training side of the business, which would resolve [REBUILD_PLAN.md §15](REBUILD_PLAN.md#15-open-questions--blockers) open question #3 (Real city / gym name / address for in-person training) — at least the gym-name half. **Confirm with Josh** before treating it as resolved and writing it into `business.ts` / `programs.ts`.

### 3. Brand consistency — the "Josh Horton" water jug
The water jug in `Josh and syd standing in gym. Josh pointing to team one more water jug_.webp` is labeled **"JOSH HORTON"**, not "One More Coach". If "Josh Horton" is a separate personal brand (apparel, coaching, content) and "One More Coach" is the business brand, using this photo on the One More Coach site invites brand confusion. **Decide with Josh** whether to use this photo at all, crop the jug out, or save it for a different surface (Instagram, personal site).

---

## Inventory — per-image breakdown

Listed in the same order as `ls` returns them, but grouped first by who's in the photo (Josh solo → Josh + Syd → Syd solo → transformation) to make decisions easier.

### Josh solo — coach poses, training, and headshot (10 files)

---

#### 1. `Selfie of josh wearing black shirt(2).webp`
- **Current filename:** `Selfie of josh wearing black shirt(2).webp` (72 KB)
- **Suggested clean filename:** `coach-josh-headshot-casual.webp`
- **Category:** owner/coach/about
- **Suggested alt text:** "Coach Josh Horton, smiling, arms crossed, wearing a black t-shirt against a neutral wall."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Phone-selfie quality — shadow from side lighting on the wall behind him, slightly washed-out colors, plain interior wall rather than gym/branded backdrop
  - The `(2)` in the filename suggests other versions exist — confirm this is the best of the set before committing
  - Acceptable as a fallback headshot but a proper studio shot or gym-context portrait would be a meaningful upgrade for the About page hero

---

#### 2. `Josh doing a ez bar curl front view zoomed out.webp`
- **Current filename:** `Josh doing a ez bar curl front view zoomed out.webp` (209 KB — largest in the set)
- **Suggested clean filename:** `coach-josh-ez-bar-curl-wide.webp`
- **Category:** owner/coach/about *or* training/action
- **Suggested alt text:** "Coach Josh Horton holding an EZ-curl bar in a commercial gym, full-body view facing camera."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Clean, well-lit, neutral-camera composition — strong candidate for an About-page secondary image
  - The mountain wall art + American flag in the background give it a slightly stock-gym feel; this is a chain-style commercial gym, not the "JUST LIFT GYM" warehouse-style space in other photos (Josh trains at multiple gyms apparently)

---

#### 3. `Josh doing a quarter turn pose_.webp`
- **Current filename:** `Josh doing a quarter turn pose_.webp` (168 KB)
- **Suggested clean filename:** `coach-josh-quarter-turn-pose.webp`
- **Category:** owner/coach/about *or* hero
- **Suggested alt text:** "Coach Josh Horton in a quarter-turn bodybuilding pose, shirtless, in a sunlit gym."
- **Destination:** `public/images/coach/` (with cross-use as hero candidate)
- **Concerns:**
  - Bright window light gives a strong, athletic silhouette — works as a hero or about-page image
  - Shirtless physique-focused shot — fits the bodybuilding/coach narrative but may not be the right register for every visitor (e.g. a hesitant first-time client). Pair with a more approachable shot like #1 or #2.

---

#### 4. `Josh doing an ez bar curl front view.webp`
- **Current filename:** `Josh doing an ez bar curl front view.webp` (175 KB)
- **Suggested clean filename:** `coach-josh-ez-bar-curl-front.webp`
- **Category:** training/action
- **Suggested alt text:** "Coach Josh Horton mid-rep on an EZ-bar biceps curl, wearing a black tank, looking off-camera."
- **Destination:** `public/images/coach/` *or* `public/images/programs/` (illustrating training-page content)
- **Concerns:**
  - Same setting as #2 (commercial gym, flag in background) — partial duplicate of the wider shot
  - Choose either #2 or #4 for any given page; using both side-by-side would look redundant

---

#### 5. `Josh doing back double bicep.webp`
- **Current filename:** `Josh doing back double bicep.webp` (201 KB)
- **Suggested clean filename:** `coach-josh-back-double-bicep.webp`
- **Category:** owner/coach/about *or* hero
- **Suggested alt text:** "Coach Josh Horton performing a back double-biceps pose, showing a developed back and shoulders, in a sunlit gym."
- **Destination:** `public/images/coach/` (strong hero candidate)
- **Concerns:**
  - Strongest physique shot in the set; best showcase of the "competitive bodybuilder" credential in the bio copy
  - Back-facing pose, so face isn't visible — works better as a supporting/hero image than as the About page primary

---

#### 6. `Josh doing ez bar curl side view zoomed out.webp`
- **Current filename:** `Josh doing ez bar curl side view zoomed out.webp` (177 KB)
- **Suggested clean filename:** `coach-josh-dumbbell-curl-side.webp`
- **Category:** training/action
- **Suggested alt text:** "Coach Josh Horton performing a single-arm dumbbell biceps curl, side profile, in a commercial gym."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - **Filename mismatch** — describes an EZ bar curl, but the image shows a single dumbbell. Alt text corrected above.
  - Smaller pixel dimensions than the other curl shots — likely cropped or lower-res original. Verify it's web-usable at the target render size before committing.
  - The narrowest/tallest image in the set — would crop well as a vertical sidebar image but awkward for landscape contexts

---

#### 7. `Josh in a pose.webp`
- **Current filename:** `Josh in a pose.webp` (203 KB)
- **Suggested clean filename:** `coach-josh-front-pose-relaxed.webp`
- **Category:** owner/coach/about *or* hero
- **Suggested alt text:** "Coach Josh Horton in a relaxed front pose, shirtless, hands at his sides, standing in a sunlit gym."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Same setting as #3 and #9 — three very similar quarter-turn / front-pose shots from the same shoot. Pick one for the About page; archive the others or use them sparingly.

---

#### 8. `Josh in black tank doing a ez bar curl side view.webp`
- **Current filename:** `Josh in black tank doing a ez bar curl side view.webp` (142 KB)
- **Suggested clean filename:** `coach-josh-dumbbell-curl-tank-side.webp`
- **Category:** training/action *or* hero
- **Suggested alt text:** "Coach Josh Horton performing dumbbell biceps curls with 50-pound dumbbells, side profile, wearing a black tank."
- **Destination:** `public/images/coach/` (strong hero candidate)
- **Concerns:**
  - **Filename mismatch** — describes an EZ bar curl, but the image shows two 50 lb dumbbells. Alt text corrected above.
  - Best photo composition in the entire set: natural light, sharp focus on Josh's face and arm, clean negative space on the left (great for hero overlay text), clear depth from the gym in the background
  - The image is portrait-oriented (taller than wide) — works for mobile hero, would need careful crop for desktop hero

---

#### 9. `Josh transitions into a pose.webp`
- **Current filename:** `Josh transitions into a pose.webp` (197 KB)
- **Suggested clean filename:** `coach-josh-transition-pose.webp`
- **Category:** owner/coach/about
- **Suggested alt text:** "Coach Josh Horton transitioning between bodybuilding poses, shirtless, in a sunlit gym."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Same setting and similar pose to #3 and #7 — third near-duplicate of the bodybuilding-pose shoot. Pick one of the three (#3, #7, or #9) for any given page rather than using all three.

---

#### 10. `Transformation of josh from bodybuilding to hybrid.webp`
- **Current filename:** `Transformation of josh from bodybuilding to hybrid.webp` (152 KB)
- **Suggested clean filename:** `coach-josh-transformation-bodybuilding-to-hybrid.webp`
- **Category:** client result/transformation (Josh's *own* transformation, not a client's — but the result/transformation page is the right home)
- **Suggested alt text:** "Side-by-side transformation photo of Coach Josh Horton — left side from his competitive bodybuilding phase, right side as a leaner hybrid athlete."
- **Destination:** `public/images/results/` (with cross-use on the About page as a personal-story element)
- **Concerns:**
  - Powerful storytelling shot — shows Josh has personally lived the kind of transformation he coaches. Strong fit for the About page's "philosophy" narrative *and* for the Results section as social proof that he applies his own methods
  - Two photos are stitched into one file at slightly different aspect ratios and exposures (left is indoor with vertical blinds, right is in a brighter gym); a clean side-by-side reshoot or a redone composite would look more polished, but the existing one is usable as-is
  - **Not** a client result — clearly label as "Coach Josh's own transformation" in surrounding copy so visitors don't mistake it for a client testimonial

---

### Josh + Sydney — coaching in action (3 files)

These illustrate what working with Josh looks like — the strongest social-proof asset in the set after the transformation photo. Sydney appears to be a regular client / training partner; **client photo consent must be on file** (verbal or written) before any of these go on the public site.

---

#### 11. `Josh and syd on seated hamstring curl.webp`
- **Current filename:** `Josh and syd on seated hamstring curl.webp` (104 KB)
- **Suggested clean filename:** `coaching-josh-and-sydney-seated-curl.webp`
- **Category:** program/supporting image *or* do not use
- **Suggested alt text:** "Coach Josh standing next to a client on a seated hamstring curl machine in a warehouse-style gym."
- **Destination:** `public/images/programs/` *or* skip
- **Concerns:**
  - **Sydney's shirt has loud third-party branding** ("WORLDWIDE BULLIES" — a streetwear brand). On a marketing page that should communicate the One More Coach brand, this is visual noise that pulls the eye away from the coaching moment
  - Composition isn't great — Sydney's back is to the camera, her arm is the largest element in the frame, Josh is mid-distance and slightly out of focus
  - **Recommend: skip this one for the website.** Better for Instagram than for the marketing site. Other coaching shots (#13, #14) tell the story more clearly.
  - Privacy/consent: confirm Sydney has consented to website use

---

#### 12. `Josh and syd standing in gym. Josh pointing to team one more water jug_.webp`
- **Current filename:** `Josh and syd standing in gym. Josh pointing to team one more water jug_.webp` (131 KB)
- **Suggested clean filename:** `coaching-josh-and-sydney-water-jug-discussion.webp`
- **Category:** program/supporting image *or* do not use (brand-conflict reason)
- **Suggested alt text:** "Coach Josh discussing supplementation with a client in a warehouse-style gym."
- **Destination:** `public/images/programs/` *or* skip
- **Concerns:**
  - **Brand conflict (see top-of-doc finding #3):** the water jug is labeled "JOSH HORTON," not "One More Coach." Using this photo on the One More Coach site may suggest two competing brands. Either skip, crop the jug out, or get a re-shoot with a One-More-Coach-branded jug
  - Otherwise compositionally fine — both subjects in good light, clear coaching narrative
  - Privacy/consent: confirm Sydney has consented to website use
  - Note for the inventory: a "WON'T BE OUTWORKED" patch on a backpack in this shot is another personal-brand element worth noting if the photo gets used

---

#### 13. `Syd on chest supported row, josh spotting_.webp`
- **Current filename:** `Syd on chest supported row, josh spotting_.webp` (80 KB)
- **Suggested clean filename:** `coaching-sydney-chest-supported-row.webp`
- **Category:** program/supporting image
- **Suggested alt text:** "Coach Josh spotting a client through a chest-supported row machine at Just Lift Gym."
- **Destination:** `public/images/programs/` (specifically illustrates the in-person program)
- **Concerns:**
  - **"JUST LIFT GYM" sign visible on the wall** — this likely answers the gym-name question for in-person training (see top-of-doc finding #2). If "Just Lift Gym" is intentional brand exposure (Josh's home gym), keep it. If not, crop it out.
  - Composition is darker than most of the set — workable, but a slight exposure lift in post would help
  - Strong fit for the In-Person Training program page hero or supporting image
  - Privacy/consent: confirm Sydney has consented to website use

---

#### 14. `Sydney doing a barbell RDL. Josh checking form_.webp`
- **Current filename:** `Sydney doing a barbell RDL. Josh checking form_.webp` (132 KB)
- **Suggested clean filename:** `coaching-sydney-barbell-rdl-form-check.webp`
- **Category:** program/supporting image *or* hero
- **Suggested alt text:** "Coach Josh observing a client's form as she performs a barbell Romanian deadlift in a warehouse-style gym."
- **Destination:** `public/images/programs/` (strong candidate for the in-person program page hero)
- **Concerns:**
  - **Best coaching-in-action shot in the set.** Wide composition, both subjects in frame, real moment captured (mid-rep form check, not posed), warm wood-truss gym ceiling gives the photo character
  - This is the photo that most clearly answers "what does in-person coaching with Josh look like?" — should be the lead in-person image
  - Privacy/consent: confirm Sydney has consented to website use

---

### Sydney solo — client training shots (2 files)

---

#### 15. `Syd holding a barbell.webp`
- **Current filename:** `Syd holding a barbell.webp` (63 KB)
- **Suggested clean filename:** `client-sydney-holding-barbell.webp`
- **Category:** client result/transformation *or* training/action
- **Suggested alt text:** "A client standing with a barbell at her hips, ready to deadlift, in a busy gym."
- **Destination:** `public/images/results/` (if framed as a client showcase) *or* `public/images/programs/` (if framed as generic training content)
- **Concerns:**
  - **Underexposed** — the whole image is darker than the rest of the set; Sydney's face is in shadow. Workable but not a hero candidate
  - **Other people visible in the background** (man in yellow shirt at left, other gym-goer at right) — they're not the focus but they're in frame. If any non-client appears identifiable, photographers' general practice is "implied consent in a public space" but it's still worth flagging
  - Not a before/after — by itself this doesn't tell a transformation story, so calling it a "result" image overstates it. Probably better routed to `programs/` as generic training imagery, or skipped in favor of stronger shots
  - Privacy/consent: confirm Sydney has consented to website use

---

#### 16. `syds back doing chest supported row, josh spotting_.webp`
- **Current filename:** `syds back doing chest supported row, josh spotting_.webp` (62 KB)
- **Suggested clean filename:** `client-sydney-back-row-development.webp`
- **Category:** client result/transformation
- **Suggested alt text:** "Close-up of a client's developed back muscles during a chest-supported row exercise, coach standing nearby."
- **Destination:** `public/images/results/`
- **Concerns:**
  - **Subject framing is anatomically focused** — close-up of the back/shoulders of a woman in a sports bra, from behind. The image is showing physical development (which is exactly the point on a fitness-results page) but the framing is intimate and could read differently depending on context
  - **Strong consent confirmation required** before website use. If consented, it's a legitimate "look at the development my client has built" shot; if not, do not use
  - Background TV with a news talking-head is visible at upper left — minor visual noise but not disqualifying
  - Slightly underexposed — could benefit from a small exposure lift in post

---

### Sydney + Josh — second coaching shot (1 file, separated for clarity)

---

#### 17. `Syd doing a single leg hamstring curl, josh spotting_.webp`
- **Current filename:** `Syd doing a single leg hamstring curl, josh spotting_.webp` (177 KB)
- **Suggested clean filename:** `coaching-sydney-single-leg-hamstring-curl.webp`
- **Category:** program/supporting image
- **Suggested alt text:** "Coach Josh assisting a client through a single-leg hamstring curl in a warehouse-style gym."
- **Destination:** `public/images/programs/`
- **Concerns:**
  - Darker exposure — atmospheric but borders on too dim for a hero shot. Better as a secondary/supporting image
  - Good coaching-moment composition (hands-on cueing visible)
  - Sydney's face is angled away — preserves some anonymity if she'd prefer that, but also means it can't carry a "client testimonial face match" use case
  - Privacy/consent: confirm Sydney has consented to website use

---

## Category summary

| Category | Count | Files |
|---|---|---|
| owner / coach / about | 7 (some overlap with hero) | #1, #2, #3, #4, #5, #7, #9 |
| training / action | 3 | #4 (also coach), #6, #8 (also hero) |
| client result / transformation | 3 | #10 (Josh's own), #15, #16 |
| program / supporting image | 4 | #13, #14, #17, (#11, #12 conditional) |
| social proof / testimonial | 0 dedicated (#10 doubles up) | — |
| hero (potential, not exclusive) | 4 strong candidates | #5, #8, #14, #3 |
| background / texture | 0 | — |
| do not use (recommend skip) | 1 firm + 1 conditional | #11 (firm — branding noise + composition), #12 (conditional — brand conflict) |

---

## Destination summary

Routing recommendations against the destination list in [REBUILD_PLAN.md §12](REBUILD_PLAN.md#12-image-and-asset-plan) and the user-provided list in this task:

| Destination | Files |
|---|---|
| `public/images/coach/` | #1, #2, #3, #4, #5, #6, #7, #8, #9 (the 9 Josh-solo shots) |
| `public/images/results/` | #10 (Josh's own transformation), #16 (client back development — pending consent), and optionally #15 |
| `public/images/programs/` | #13, #14, #17 (coaching-in-action shots), and conditionally #11 / #12 |
| `public/images/hero/` | Should be a *symlink-style reuse* of the best 1–2 coach shots (recommend #8 primary, #5 secondary) rather than copying — `next/image` can render the same source file at different sizes for different surfaces |
| `public/images/backgrounds/` | (none in this set — would need to be sourced separately) |

**Suggested addition to the §12 destination list:** `public/images/clients/` for client-only shots (#15, #16), keeping `public/images/results/` reserved for actual before/after transformation composites like #10. Not blocking — flag it for the data-layer discussion.

---

## Cross-cutting concerns (one row per concern type)

| Concern | Applies to | Action before launch |
|---|---|---|
| **Client photo consent** | #11, #12, #13, #14, #15, #16, #17 (every Sydney photo) | Confirm with Josh that Sydney has consented (verbal or written) to website use. Recommend a simple signed photo release for every client whose image goes on the site. |
| **Third-party brand visible in frame** | #11 (WORLDWIDE BULLIES shirt) | Skip the photo, or crop the shirt out of frame |
| **Personal vs business brand conflict** | #12 (JOSH HORTON water jug) | Decide whether "Josh Horton" is a sub-brand of "One More Coach"; if not, skip or crop |
| **Gym name visible in frame** | #13 (JUST LIFT GYM sign) | If Just Lift Gym is the intentional in-person location, keep and confirm in `business.ts`. Otherwise crop. |
| **Filename describes the wrong exercise** | #6, #8 | None — files will be renamed during import; alt text reflects what's in the image |
| **Underexposed / dark** | #11, #13, #15, #16, #17 | Slight exposure lift in post (Photoshop / Lightroom) would help — not blocking |
| **Duplicate / near-duplicate compositions** | #3 ≈ #7 ≈ #9 (three pose shots), #2 ≈ #4 (two EZ-bar curl shots) | Pick one per surface; archive the rest. Don't ship the full series — it dilutes impact. |
| **Phone-selfie quality vs studio** | #1 | Acceptable as fallback. A proper headshot session would be a meaningful About-page upgrade. |
| **No client before/after pairs in the set** | (whole inventory) | All "result" photos in this set are single-state. Real before/after composites of paying clients are still a gap — they were already flagged in [CURRENT_SITE_AUDIT.md §8](CURRENT_SITE_AUDIT.md#8-current-content-gaps) |
| **File size** | None | Every file is already 61–209 KB. No optimization needed beyond the WebP conversion the user has already done. |

---

## What this inventory does NOT include

Out of scope by the user's instructions and the current state of the project:
- No actual file moves, renames, optimizations, or deletions
- No edits to any HTML, CSS, or JS in the legacy site
- No Next.js scaffolding
- No new image acquisition recommendations beyond flagging gaps (those belong in `docs/launch-checklist.md` once Phase 0 begins)
- No `next/image` `width` / `height` / `priority` recommendations — those are component-level decisions for Phase 2/4 of the rebuild

---

## How this feeds the rebuild plan

When Phase 4 (images + assets) of [REBUILD_PLAN.md §14](REBUILD_PLAN.md#14-phase-by-phase-rebuild-checklist) begins, use this document as the source of truth for:
- Which files copy from `images/owner-images/` into `public/images/*/`
- What each file's new lowercase, kebab-case filename should be
- What goes into `src/data/coach.ts → headshotSrc` (recommend #1 as starter, with a planned upgrade) and `coach.ts → galleryShots` (recommend #5, #8 as supporting images)
- What goes into `src/data/programs.ts → inPerson.heroImage` (recommend #14) and `programs.ts → inPerson.supportingImages` (recommend #13, #17)
- What goes into `src/data/results.ts` (recommend #10 framed as Josh's own; #15 / #16 only after explicit client consent confirmation and after deciding whether "Sydney" appears by name or anonymously)

When new images arrive (proper headshot, real client before/afters, hero candidates), add them as new sections to this file rather than starting a fresh inventory. This file is the running register of every photo asset considered for the site.
