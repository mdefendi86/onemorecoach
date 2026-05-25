import type { Coach } from '@/types/content'

/*
  Coach Josh Horton — Phase 0 minimum-viable shape per REBUILD_PLAN.md §6.
  The legacy about.html bio paragraphs are strong and should be ported
  verbatim during Phase 2; for Phase 0 they are intentionally empty so
  the placeholder flag accurately reflects "no real bio rendering yet."
*/
export const coach: Coach = {
  name: 'Josh Horton',
  slug: 'josh-horton',
  role: 'Coach & Founder',
  bioShort: '', // Phase 2 — port from legacy about.html
  bioFull: [], // Phase 2 — port the four-paragraph narrative verbatim
  certs: [], // §15 open question #6 — real certification names TBD
  pullQuote: '', // Phase 2 — port from legacy about.html
  headshotSrc: null, // Phase 4 — use images/owner-images/ "Selfie of josh wearing black shirt(2).webp" as starter; studio shoot is the upgrade
  fullLengthSrc: null, // Phase 4 — see IMAGE_INVENTORY.md
  transformationSrc: null, // Phase 4 — Josh's own transformation goes here, NOT in results.ts
  isPlaceholder: true,
}
