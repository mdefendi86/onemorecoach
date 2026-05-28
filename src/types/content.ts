/*
  Shared content types for the data layer.

  Every src/data/*.ts file imports from here so the shape lives in one place.
  See REBUILD_PLAN.md §6 (data files) and §5 (single-source-of-truth rules).

  Convention: every entry that could need real client/business input supports
  an optional `needsClientInput` and/or `isPlaceholder` flag. The launch
  checklist is generated from these flags — never hunted for in JSX.
*/

// ============================================================
// BUSINESS
// ============================================================

export interface BusinessSocials {
  instagram: string // handle with @ prefix, e.g. '@onemorecoach'
  instagramUrl: string // full URL
}

export interface BusinessVenue {
  gymName: string
  address: string
  city: string
  state: string
  postalCode?: string
  // Optional schedule descriptors (used for in-person availability copy)
  availabilityNote?: string
}

export interface Business {
  name: string
  tagline: string
  email: string
  phone?: string
  canonicalUrl: string
  socials: BusinessSocials
  inPersonVenue: BusinessVenue | null
  responseTimePromise: string // e.g. "within 24 hours"
}

// ============================================================
// COACH
// ============================================================

export interface Coach {
  name: string
  slug: string
  role: string
  bioShort: string
  bioFull: string[] // paragraphs
  /** Formal certifications (e.g. "NASM-CPT") — TBD until Josh confirms. */
  certs: string[]
  /** Informal credentials usable today (e.g. "12 Years Training", "Competitive Bodybuilder"). */
  credentials: string[]
  pullQuote?: string
  headshotSrc: string | null
  /** Alt text for the headshot — required when headshotSrc is set. */
  headshotAlt?: string
  fullLengthSrc: string | null
  fullLengthAlt?: string
  /** Coaching-in-action shot used as an image break on the About page. See REBUILD_PLAN.md §15 #18. */
  actionShotSrc: string | null
  actionShotAlt?: string
  transformationSrc: string | null
  transformationAlt?: string
  isPlaceholder: boolean
}

// ============================================================
// PROGRAMS & PRICING
// ============================================================

export type ProgramSlug = 'lifestyle' | 'nutrition' | 'training' | 'in-person'

export type TermSlug = 'monthly' | '3month' | '6month' | '12month' | 'single' | '4-sessions' | '8-sessions' | '12-sessions'

export interface PricingTier {
  termSlug: TermSlug
  label: string // e.g. "Month-to-Month", "8 Sessions"
  sublabel?: string // e.g. "Cancel any time", "~2x per week"
  priceLabel: string // e.g. "$125", "$[XX]"
  priceUnit: string // e.g. "per month", "total", "per session"
  saveLabel?: string // e.g. "SAVE $50", "BEST VALUE"
  featured?: boolean
  needsClientInput?: boolean
}

export interface Program {
  slug: ProgramSlug
  name: string
  tagline: string
  description: string
  whoItsFor: string
  whatsIncluded: string[]
  tiers: PricingTier[]
  ctaLabel: string
  heroImageSrc?: string | null
  heroImageAlt?: string
  supportingImageSrcs?: string[]
  needsClientInput?: boolean
}

// ============================================================
// TESTIMONIALS
// ============================================================

export interface Testimonial {
  clientName: string
  programSlug: ProgramSlug | null
  programLabel: string // human label, e.g. "Lifestyle Program · Weight Loss"
  quote: string
  isPlaceholder?: boolean
}

// ============================================================
// CLIENT RESULTS (before/after)
// ============================================================

export interface ClientResult {
  imageSrc: string
  alt: string
  category: 'Weight Loss' | 'Muscle Building' | 'Body Recomp'
  metric?: string // e.g. "Lost 32 lbs in 16 weeks"
  clientName?: string
  isPlaceholder?: boolean
}

// ============================================================
// "WHAT'S INCLUDED" GRID (home)
// ============================================================

export interface IncludedItem {
  iconName: string // Lucide icon name — wired in Phase 1
  title: string
  description: string
}

// ============================================================
// "WHY ONLINE COACHING WORKS" GRID (about)
// ============================================================

export interface WhyOnlineItem {
  iconName: string
  title: string
  description: string
}

// ============================================================
// "WHAT HAPPENS NEXT" STEPS (apply)
// ============================================================

export interface HowItWorksStep {
  number: string // e.g. "01", "02"
  title: string
  description: string
}
