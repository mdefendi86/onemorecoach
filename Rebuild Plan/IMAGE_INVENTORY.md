# One More Coach — Image Inventory

**Inventory date:** 2026-05-25 (revised after content decisions)
**Source folder:** [../images/owner-images/](../images/owner-images/)
**Total files in owner-images/:** 14 WebP images (3 near-duplicates removed since the first inventory pass)
**Total weight:** ~2.0 MB across all 14 files (61 KB–203 KB each — all already under the 250 KB ceiling set in [REBUILD_PLAN.md §12](REBUILD_PLAN.md#12-image-and-asset-plan))
**Purpose:** Catalog the supplied images so the rebuild can route each to the right page, with clean filenames, real alt text, and any concerns flagged before anything gets imported into `/public/`.

> **No images are moved, renamed, optimized, or deleted by this document.** This is a planning artifact only.

---

## Resolved content decisions (2026-05-25)

These decisions came from the user after the first inventory pass and have been applied throughout this revision:

1. **Three near-duplicate files were removed from `images/owner-images/`** — `Josh doing a ez bar curl front view zoomed out.webp` and `Josh doing ez bar curl side view zoomed out.webp` are no longer in the folder. They were the weaker compositions of two near-duplicate pairs flagged in the first pass. **Net effect:** entries renumbered, near-duplicate concerns simplified.
2. **All currently provided images are approved for public website use at the project level** (confirmed 2026-05-25 by the project owner before Phase 1). This covers every Sydney/owner/coach/training/coaching/client photo currently in `images/owner-images/` and `results/`. No per-photo "consent confirmation required" flag anywhere in this inventory. Standard policy going forward: for any *future* clients whose photos are added to the site, get a one-paragraph signed photo release as best practice — but nothing currently in the repo is blocked on this.
3. **"Do not reference any brand other than One More Coach"** is the standing rule. Applies to clothing, signage, branded equipment, and visible third-party logos in frame. The two image-level implications:
   - The "WORLDWIDE BULLIES" shirt on the client in entry #11 is a third-party brand and would need to be cropped out or the photo skipped.
   - The "JUST LIFT GYM" sign in entry #13 is a brand reference too; venue credit is a separate decision (see [REBUILD_PLAN.md §15 open question #3](REBUILD_PLAN.md#15-open-questions--blockers)) — flagged but not auto-skipped.
4. **Josh Horton is the owner/coach**, so "JOSH HORTON" branded items (e.g. the water jug in entry #12) are *not* a brand conflict and do *not* need to be cropped or skipped. Removed from concerns.
5. **`results/` is reserved for current client result images only** — i.e. the existing `results/result-1..5.JPG` and `results/IMG_9420.jpg`. No `owner-images/` file is routed to `public/results/` in this revision, including the Josh personal transformation (now routed to `public/coach/`) and the Sydney solo shots (now routed to `public/programs/`).
6. **For now, `owner-images/` supplies owner/coach/training/action/supporting visuals** — not client results.
7. **`public/images/clients/` is NOT added in v1.** If more genuinely client-focused photography arrives later that doesn't fit the existing pattern, that's the time to revisit folder structure. The earlier suggestion to add it now has been retracted.

---

## Cross-cutting findings from the visual review

Calling these out before the per-file table because they affect downstream decisions:

### 1. Filename mismatches — one file describes the wrong exercise
The filenames were treated as rough alt text, which mostly works. One file is inaccurate, and the alt text recommendation below describes what the image actually shows rather than what the filename says.

| Filename | Filename says | Image actually shows |
|---|---|---|
| `Josh in black tank doing a ez bar curl side view.webp` | EZ bar curl | Two-dumbbell hammer curls (50 lb dumbbells), side view |

(The other filename-mismatched file from the first pass, `Josh doing ez bar curl side view zoomed out.webp`, has been removed from the folder so the issue is moot.)

Not a problem to fix at the file level — filenames will all be renamed during import. Just flagging that alt text should describe what's in the image.

### 2. The "JUST LIFT GYM" sign may identify the in-person training venue
The chest-supported-row coaching photo (`Syd on chest supported row, josh spotting_.webp`) clearly shows a wall sign reading **"JUST LIFT GYM"**. This is very likely the gym for the in-person training side of the business, which partially answers [REBUILD_PLAN.md §15](REBUILD_PLAN.md#15-open-questions--blockers) open question #3 (gym name / city / address). **The user's "no other brands" rule means a follow-up decision is needed:** either (a) credit "Just Lift Gym" as the venue name and keep the sign visible, or (b) crop the sign out of photos and refer to the location by city only. Confirm with Josh before either.

### 3. One photo still has third-party brand exposure (clothing)
Per the standing "no brands other than One More Coach" rule, the client's shirt in entry #11 (`Josh and syd on seated hamstring curl.webp`) shows a "WORLDWIDE BULLIES" streetwear brand graphic. The image needs to be either tightly cropped (excluding the shirt graphic) or skipped. Other personal-brand elements within Josh's own ecosystem (the "Josh Horton" water jug in #12, the "WON'T BE OUTWORKED" backpack patch also in #12) are owner-brand items and are explicitly fine per resolved decision #4 above.

---

## Inventory — per-image breakdown

14 files remaining, grouped first by who's in the photo (Josh solo → Josh + Sydney → Sydney solo → transformation) to make decisions easier. Numbering is fresh — the originals removed since the first pass are not listed.

### Josh solo — coach poses, training, and headshot (8 files)

---

#### 1. `Selfie of josh wearing black shirt(2).webp`
- **Current filename:** `Selfie of josh wearing black shirt(2).webp` (72 KB)
- **Suggested clean filename:** `coach-josh-headshot-casual.webp`
- **Category:** owner/coach/about
- **Suggested alt text:** "Coach Josh Horton, smiling, arms crossed, wearing a black t-shirt against a neutral wall."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Phone-selfie quality — shadow from side lighting on the wall behind him, slightly washed-out colors, plain interior wall rather than gym/branded backdrop
  - The `(2)` in the filename suggests other versions may have existed — confirm this is the best of any related set before committing
  - Acceptable as a fallback headshot but a proper studio shot or gym-context portrait would be a meaningful upgrade for the About page hero (track in `docs/launch-checklist.md` as an Optional Upgrade)

---

#### 2. `Josh doing a quarter turn pose_.webp`
- **Current filename:** `Josh doing a quarter turn pose_.webp` (168 KB)
- **Suggested clean filename:** `coach-josh-quarter-turn-pose.webp`
- **Category:** owner/coach/about *or* hero
- **Suggested alt text:** "Coach Josh Horton in a quarter-turn bodybuilding pose, shirtless, in a sunlit gym."
- **Destination:** `public/images/coach/` (with cross-use as hero candidate)
- **Concerns:**
  - Bright window light gives a strong, athletic silhouette — works as a hero or about-page image
  - Shirtless physique-focused shot — fits the bodybuilding/coach narrative but may not be the right register for every visitor (e.g. a hesitant first-time client). Pair with a more approachable shot like #1 or #3.
  - Near-duplicate of #5 and #7 (three similar pose shots from what looks like the same shoot) — pick one per surface

---

#### 3. `Josh doing an ez bar curl front view.webp`
- **Current filename:** `Josh doing an ez bar curl front view.webp` (175 KB)
- **Suggested clean filename:** `coach-josh-ez-bar-curl-front.webp`
- **Category:** training/action
- **Suggested alt text:** "Coach Josh Horton mid-rep on an EZ-bar biceps curl, wearing a black tank, looking off-camera."
- **Destination:** `public/images/coach/` *or* `public/images/programs/`
- **Concerns:**
  - With the zoomed-out version of this shot removed from the folder, this is now the sole EZ-bar curl in the set — no remaining near-duplicate concern
  - Clean composition, commercial-gym setting (mountain wall art + American flag visible)

---

#### 4. `Josh doing back double bicep.webp`
- **Current filename:** `Josh doing back double bicep.webp` (201 KB)
- **Suggested clean filename:** `coach-josh-back-double-bicep.webp`
- **Category:** owner/coach/about *or* hero
- **Suggested alt text:** "Coach Josh Horton performing a back double-biceps pose, showing a developed back and shoulders, in a sunlit gym."
- **Destination:** `public/images/coach/` (strong hero candidate)
- **Concerns:**
  - Strongest physique shot in the set; best showcase of the "competitive bodybuilder" credential in the bio copy
  - Back-facing pose — face isn't visible, so it works better as a supporting/hero image than as the About page primary headshot

---

#### 5. `Josh in a pose.webp`
- **Current filename:** `Josh in a pose.webp` (203 KB)
- **Suggested clean filename:** `coach-josh-front-pose-relaxed.webp`
- **Category:** owner/coach/about *or* hero
- **Suggested alt text:** "Coach Josh Horton in a relaxed front pose, shirtless, hands at his sides, standing in a sunlit gym."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Same setting and shoot as #2 and #7 — three near-duplicates. Pick one for any given page.

---

#### 6. `Josh in black tank doing a ez bar curl side view.webp`
- **Current filename:** `Josh in black tank doing a ez bar curl side view.webp` (142 KB)
- **Suggested clean filename:** `coach-josh-dumbbell-curl-tank-side.webp`
- **Category:** training/action *or* hero
- **Suggested alt text:** "Coach Josh Horton performing dumbbell biceps curls with 50-pound dumbbells, side profile, wearing a black tank."
- **Destination:** `public/images/coach/` (strong hero candidate)
- **Concerns:**
  - **Filename mismatch** — describes an EZ bar curl, but the image shows two 50 lb dumbbells. Alt text corrected above.
  - Best photo composition in the entire set: natural light, sharp focus on Josh's face and arm, clean negative space on the left (great for hero overlay text), clear depth from the gym in the background
  - Portrait-oriented (taller than wide) — works for mobile hero, would need careful crop or art direction for a desktop hero

---

#### 7. `Josh transitions into a pose.webp`
- **Current filename:** `Josh transitions into a pose.webp` (197 KB)
- **Suggested clean filename:** `coach-josh-transition-pose.webp`
- **Category:** owner/coach/about
- **Suggested alt text:** "Coach Josh Horton transitioning between bodybuilding poses, shirtless, in a sunlit gym."
- **Destination:** `public/images/coach/`
- **Concerns:**
  - Same setting and similar pose to #2 and #5 — third near-duplicate of the bodybuilding-pose shoot. Pick one of the three for any given page.

---

#### 8. `Transformation of josh from bodybuilding to hybrid.webp`
- **Current filename:** `Transformation of josh from bodybuilding to hybrid.webp` (152 KB)
- **Suggested clean filename:** `coach-josh-transformation-bodybuilding-to-hybrid.webp`
- **Category:** owner/coach/about (Josh's *own* transformation — strong fit for the About page personal-story section, NOT for the client results page per resolved decision #5)
- **Suggested alt text:** "Side-by-side transformation photo of Coach Josh Horton — left side from his competitive bodybuilding phase, right side as a leaner hybrid athlete."
- **Destination:** `public/images/coach/` (was previously routed to `public/images/results/` in the first pass; updated per resolved decision #5)
- **Concerns:**
  - Powerful storytelling shot — shows Josh has personally lived the kind of transformation he coaches. Use on the About page only; do not place in the Results section, which is reserved for client transformations
  - Two photos are stitched into one file at slightly different aspect ratios and exposures (left is indoor with vertical blinds, right is in a brighter gym); a clean redo of the composite would look more polished, but the existing one is usable as-is
  - **Always label clearly as "Coach Josh's own transformation"** in surrounding copy so visitors don't mistake it for a client testimonial

---

### Josh + Sydney — coaching in action (4 files)

These illustrate what working with Josh looks like — the strongest social-proof asset in the set after the personal-transformation photo. Sydney inclusion is approved at the project level (resolved decision #2); the prior per-photo "consent" flag has been removed.

---

#### 9. `Josh and syd on seated hamstring curl.webp`
- **Current filename:** `Josh and syd on seated hamstring curl.webp` (104 KB)
- **Suggested clean filename:** `coaching-josh-and-client-seated-curl.webp`
- **Category:** program/supporting image *or* do not use
- **Suggested alt text:** "Coach Josh standing next to a client on a seated hamstring curl machine in a warehouse-style gym."
- **Destination:** `public/images/programs/` *or* skip
- **Concerns:**
  - **Third-party brand on the client's shirt** ("WORLDWIDE BULLIES" streetwear graphic) — per the standing "no brands other than One More Coach" rule, the image needs to be tightly cropped (excluding the graphic) or skipped
  - Composition isn't the strongest in the set either — client's back is to the camera, her arm is the largest element in the frame, Josh is mid-distance and slightly out of focus
  - **Recommend: skip this one** for the website. Other coaching shots (#11, #12) tell the story more clearly without the brand-crop problem.

---

#### 10. `Josh and syd standing in gym. Josh pointing to team one more water jug_.webp`
- **Current filename:** `Josh and syd standing in gym. Josh pointing to team one more water jug_.webp` (131 KB)
- **Suggested clean filename:** `coaching-josh-and-client-water-jug.webp`
- **Category:** program/supporting image
- **Suggested alt text:** "Coach Josh discussing supplementation with a client in a warehouse-style gym."
- **Destination:** `public/images/programs/`
- **Concerns:**
  - The "JOSH HORTON" water jug and "WON'T BE OUTWORKED" backpack patch are owner-brand items (Josh's personal/coaching brand) and are explicitly **not** a brand conflict per resolved decision #4 — both can remain in frame
  - Compositionally fine — both subjects in good light, clear coaching narrative

---

#### 11. `Syd on chest supported row, josh spotting_.webp`
- **Current filename:** `Syd on chest supported row, josh spotting_.webp` (80 KB)
- **Suggested clean filename:** `coaching-client-chest-supported-row.webp`
- **Category:** program/supporting image
- **Suggested alt text:** "Coach Josh spotting a client through a chest-supported row exercise."
- **Destination:** `public/images/programs/` (specifically illustrates the in-person program)
- **Concerns:**
  - **"JUST LIFT GYM" sign visible on the wall** — per the standing "no brands other than One More Coach" rule, either crop the sign or get an explicit decision from Josh that the venue should be credited by name (linked to [REBUILD_PLAN.md §15 open question #3](REBUILD_PLAN.md#15-open-questions--blockers))
  - Composition is darker than most of the set — workable; a slight exposure lift in post would help
  - Strong fit for the In-Person Training program page hero or supporting image (once the sign question is resolved)

---

#### 12. `Sydney doing a barbell RDL. Josh checking form_.webp`
- **Current filename:** `Sydney doing a barbell RDL. Josh checking form_.webp` (132 KB)
- **Suggested clean filename:** `coaching-client-barbell-rdl-form-check.webp`
- **Category:** program/supporting image *or* hero
- **Suggested alt text:** "Coach Josh observing a client's form as she performs a barbell Romanian deadlift in a warehouse-style gym."
- **Destination:** `public/images/programs/` (strong candidate for the in-person program page hero)
- **Concerns:**
  - **Best coaching-in-action shot in the set.** Wide composition, both subjects in frame, real moment captured (mid-rep form check, not posed), warm wood-truss gym ceiling gives the photo character
  - This is the photo that most clearly answers "what does in-person coaching with Josh look like?" — should be the lead in-person image

---

### Sydney solo — client training shots (2 files)

Both are now categorized as training/action (not "client result"), and routed to `public/images/programs/` rather than `public/images/results/`, per resolved decision #5 (`results/` is reserved for the existing `results/result-*.JPG` set).

---

#### 13. `Syd holding a barbell.webp`
- **Current filename:** `Syd holding a barbell.webp` (63 KB)
- **Suggested clean filename:** `client-sydney-holding-barbell.webp`
- **Category:** training/action *or* program/supporting image
- **Suggested alt text:** "A client standing with a barbell at her hips, ready to deadlift, in a busy gym."
- **Destination:** `public/images/programs/`
- **Concerns:**
  - **Underexposed** — whole image is darker than the rest of the set; subject's face is in shadow. Workable but not a hero candidate
  - Other gym-goers visible in the background (man in yellow shirt at left, another patron at right) — fine for use; image was provided as part of the project-approved set. Mentioned only so if a final crop tightens around a third-party face, the option to blur or recrop is on the table.
  - With this file now routed to `programs/` rather than `results/`, framing it as "what training looks like" rather than "a client's outcome" is the right read

---

#### 14. `syds back doing chest supported row, josh spotting_.webp`
- **Current filename:** `syds back doing chest supported row, josh spotting_.webp` (62 KB)
- **Suggested clean filename:** `client-sydney-back-development.webp`
- **Category:** training/action *or* program/supporting image
- **Suggested alt text:** "Close-up of a client's developed back muscles during a chest-supported row exercise."
- **Destination:** `public/images/programs/`
- **Concerns:**
  - Subject framing is anatomically focused — close-up of the back/shoulders during exercise. With Sydney's website inclusion approved (resolved decision #2), this is a legitimate "look at the development my client has built" shot
  - Background TV with a news talking-head visible at upper left — minor visual noise, not disqualifying
  - Slightly underexposed — would benefit from a small exposure lift in post

---

## Category summary

| Category | Count | Files |
|---|---|---|
| owner / coach / about | 7 | #1, #2, #4, #5, #6, #7, #8 |
| training / action | 4 | #3, #6 (also coach/hero), #13, #14 |
| program / supporting image | 4 | #10, #11, #12, with #9 conditional |
| hero (potential, not exclusive) | 4 strong candidates | #6, #4, #12, #2 |
| social proof / testimonial | 0 dedicated (#8 doubles up as personal story) | — |
| background / texture | 0 | — |
| client result / transformation | 0 from `owner-images/` | Existing `results/result-*.JPG` set is the canonical source for client results |
| do not use (recommend skip) | 1 | #9 (third-party shirt brand + weak composition) |

---

## Destination summary

Routing recommendations against the destination list in [REBUILD_PLAN.md §12](REBUILD_PLAN.md#12-image-and-asset-plan) and the user-provided list in the inventory task:

| Destination | Files |
|---|---|
| `public/images/coach/` | #1, #2, #3, #4, #5, #6, #7, #8 (every Josh-solo shot, including the personal transformation) |
| `public/images/programs/` | #10, #11, #12, #13, #14 (every coaching-in-action or client-training shot), and conditionally #9 if cropped |
| `public/images/hero/` | Should be a *symlink-style reuse* of the best 1–2 coach shots (recommend #6 primary, #4 secondary, #12 in-person-specific) rather than copying — `next/image` can render the same source file at different sizes for different surfaces |
| `public/images/results/` | **No files from `owner-images/` go here.** Reserved for the existing `results/result-1..5.JPG` and `results/IMG_9420.jpg` (client transformations). |
| `public/images/backgrounds/` | (none in this set — would need to be sourced separately) |
| `public/images/clients/` | **Not added in v1.** Resolved decision #7 — revisit only if a meaningfully different category of client image arrives later. |

---

## Cross-cutting concerns (current state)

| Concern | Applies to | Action before launch |
|---|---|---|
| **Third-party brand visible in frame** | #9 (WORLDWIDE BULLIES shirt) | Crop the shirt graphic out of frame, or skip the photo. (Per standing rule: no brands other than One More Coach.) |
| **Venue brand sign visible in frame** | #11 (JUST LIFT GYM sign) | Decision required from Josh: either credit "Just Lift Gym" as the in-person venue (and keep the sign visible) or crop the sign. Linked to [REBUILD_PLAN.md §15 open question #3](REBUILD_PLAN.md#15-open-questions--blockers). |
| **Filename describes the wrong exercise** | #6 | None — files will be renamed during import; alt text reflects what's in the image |
| **Underexposed / dark** | #9, #11, #13, #14 | Slight exposure lift in post (Photoshop / Lightroom) would help — not blocking |
| **Near-duplicate compositions** | #2 ≈ #5 ≈ #7 (three pose shots from one shoot) | Pick one per surface; archive the rest. Don't ship the full series — it dilutes impact. |
| **Phone-selfie quality vs studio** | #1 | Acceptable as fallback. A proper headshot session would be a meaningful About-page upgrade — track in `docs/launch-checklist.md`. |
| **No client before/after pairs in `owner-images/`** | n/a (by design) | Client result imagery comes from the existing `results/` folder. The launch checklist should still track whether additional real before/after composites are wanted before launch (already flagged in [CURRENT_SITE_AUDIT.md §8](CURRENT_SITE_AUDIT.md#8-current-content-gaps)). |
| **File size** | None | Every file is already 61–203 KB. No optimization needed beyond the WebP conversion the user has already done. |
| **Client/owner photo consent** | (resolved at project level — see top-of-doc finding) | All currently provided images are approved for public website use (2026-05-25). Standard signed photo release for any *future* client whose image is added to the site is recommended as best practice but not blocking. |
| **"Josh Horton" branded items in frame** | (resolved at inventory level) | Not a brand conflict — Josh Horton is the owner (resolved decision #4). No action required. |

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

- Which files copy from `images/owner-images/` into `public/images/coach/` and `public/images/programs/`
- What each file's new lowercase, kebab-case filename should be
- **`src/data/coach.ts → headshotSrc`** — start with #1 as the placeholder headshot; plan a studio-shot upgrade (track in `docs/launch-checklist.md`)
- **`src/data/coach.ts → galleryShots` / `fullLengthSrc`** — recommend #6 primary, #4 secondary, with one of #2/#5/#7 (pick the best of the three near-dupes) for variety
- **`src/data/coach.ts → transformationSrc`** — #8 (Josh's personal transformation), surfaced on the About page only, *not* in the results component
- **`src/data/programs.ts → inPerson.heroImage`** — recommend #12 (RDL form-check, best coaching-in-action composition)
- **`src/data/programs.ts → inPerson.supportingImages`** — recommend #11 (chest-supported row, pending sign-crop decision), #14 (client back development), #10 (water jug discussion)
- **`src/data/programs.ts → online.supportingImages`** — recommend #3 (Josh on EZ-bar curl) for "training" program imagery
- **`src/data/results.ts`** — sources exclusively from the existing `results/result-*.JPG` and `results/IMG_9420.jpg`. **No owner-images files appear here.** Selection of which of the 6 source files actually ships is a content decision for Josh during Phase 2/4.

When new images arrive (proper studio headshot, real client before/afters, hero candidates), add them as new sections to this file rather than starting a fresh inventory. This file is the running register of every photo asset considered for the site.

## Content gap: package-specific imagery (added 2026-05-27)

Per [REBUILD_PLAN.md §15 #19](REBUILD_PLAN.md#15-open-questions--blockers), the Programs page and program cards intentionally do **not** carry stock gym imagery in v1 — forcing a random gym photo onto a "Nutrition" or "Online Coaching" card would feel mismatched and weaken the page. Each of the five program packages needs its own visually-matching imagery before the Programs page picks up program-specific photos.

| Package | Image needed | Existing inventory cover this? |
|---|---|---|
| Online coaching | Remote check-in moment, app/phone in hand, training video being reviewed, message-thread context | **No.** Owner-images set doesn't cover this. New shoot needed. |
| Nutrition & Supplementation | Portioned meal, meal prep, supplement stack, food + plate visuals | **No.** Owner-images set doesn't cover this. New shoot needed. |
| Training Guidance | Solo training, workout in progress, programming notes, form check on a single lift | **Partially.** Solo Josh training shots in owner-images (e.g. EZ-bar curl, dumbbell curl) could work as stand-ins but would ideally be re-shot to match the brand context. |
| Lifestyle | "Complete program" feel — training + nutrition together, or a client mid-routine across the full workflow | **Partially.** Coaching-in-action shots are close but lean too in-person-specific. |
| In-Person Training | Coaching at the venue, hands-on cueing, form check at the gym | **Yes.** The existing coaching-in-action set (Josh + Sydney, RDL form check / hamstring curl spot / chest-supported row) covers this. Already routed for the In-Person page hero in Phase 2. |

Until the missing imagery arrives, `ProgramOverviewCard` and `ProgramSection` render text-and-icon cards (no images on cards). When images land, they populate `programs.ts → <slug>.heroImageSrc` + `heroImageAlt` (and optionally `supportingImageSrcs`) and the components light up automatically — no JSX changes needed.

---

## Phase 2 implementation path note (added 2026-05-27)

This inventory was originally written assuming destinations like `public/images/coach/` and `public/images/results/`. The Phase 2 implementation uses the **shorter** `public/coach/` and `public/results/` (skipping the `images/` parent directory). Both work in Next.js; the shorter path was chosen for path ergonomics and lower import noise.

Folders that exist on disk after Phase 2 image copy:

| Folder | Contains | Routed by |
|---|---|---|
| `public/coach/` | `josh-headshot.webp`, `josh-full.webp` | `coach.ts → headshotSrc`, `coach.ts → fullLengthSrc` |
| `public/coaching/` | `coach-josh-form-check.webp` (RDL spot), `coach-josh-hamstring-spot.webp` | `programs.ts → in-person → heroImageSrc`, `coach.ts → actionShotSrc` (per §15 #18) |
| `public/results/` | `result-1.jpg` … `result-4.jpg` | `results.ts` |

The §13 destination column still reads `public/images/X/` for legibility — the actual paths on disk are `public/X/`. If the structure ever gets restandardized, this is the divergence to reconcile.

---

## Change log

- **2026-05-25 (initial pass)** — 17 files cataloged with consent flags, brand-conflict flags, and a suggestion to add `public/images/clients/`.
- **2026-05-25 (revision)** — Reduced to 14 files (3 near-duplicates removed by user). Applied 7 resolved content decisions: Sydney inclusion approved, "Josh Horton" branded items are not a conflict, standing "no other brands" rule clarified, `results/` reserved for the existing client-results folder, Josh's personal transformation re-routed from `results/` to `coach/`, Sydney solo shots re-routed from `results/` to `programs/`, `public/images/clients/` suggestion retracted.
- **2026-05-25 (Phase 1 directive)** — All currently provided images approved at the **project level**. Per-photo consent flags removed.
- **2026-05-27 (Phase 2 + 3 cutover)** — Added "Content gap: package-specific imagery" section. Added "Phase 2 implementation path note" reconciling `public/images/X/` (this doc) vs `public/X/` (actual disk). Recorded Phase 2 image-copy routing: 2 coaching-in-action shots into `public/coaching/` for In-Person hero + About mid-page break, per [REBUILD_PLAN.md §15 #18](REBUILD_PLAN.md#15-open-questions--blockers).
