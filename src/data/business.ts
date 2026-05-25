import type { Business } from '@/types/content'

/*
  Single source of truth for business identity.
  REBUILD_PLAN.md §5 (Brand tokens row) and §15 Resolved decisions #2, #11, #15.
*/
export const business: Business = {
  name: 'One More Coach',
  tagline: 'One more rep. One more % better.',
  email: 'josh@onemorecoach.com',
  canonicalUrl: 'https://onemorecoach.com',
  socials: {
    instagram: '@onemorecoach',
    instagramUrl: 'https://www.instagram.com/onemorecoach/',
  },
  // §15 open question #3 — gym name / city / address still unresolved.
  // A "JUST LIFT GYM" sign is visible in one image; pending Josh's
  // confirmation (and a separate decision on whether to credit the venue
  // by name given the "no brands other than One More Coach" rule).
  inPersonVenue: null,
  responseTimePromise: 'within 24 hours',
}
