import { business } from '@/data/business'

/*
  Typed env access for server-side code.

  REBUILD_PLAN.md §11 + §9: missing values are not fatal — they degrade
  gracefully (analytics no-ops; the application Server Action returns a
  503-shaped error). The caller decides how to respond; this module
  never throws on missing keys.

  Defaults for CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL are derived from
  business.ts so the canonical email never gets hard-coded twice.
*/

function deriveNoReplyEmail(canonicalUrl: string): string {
  const domain = canonicalUrl
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
    .replace(/^www\./, '')
  return `no-reply@${domain}`
}

export const env = {
  /** Required for the application Server Action to actually send. Undefined → 503. */
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  /** Required for analytics. Undefined → trackEvent no-ops (already handled in lib/analytics.ts). */
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,

  /** Where application emails are delivered. Defaults to the canonical business email. */
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || business.email,

  /** Verified Resend sender. Must match a domain you've completed SPF/DKIM on. */
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || deriveNoReplyEmail(business.canonicalUrl),
} as const

export type Env = typeof env
