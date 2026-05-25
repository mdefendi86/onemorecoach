/*
  Single source of truth for header + footer navigation.

  REBUILD_PLAN.md §8: SiteNav reads from nav.ts; SiteFooter reads from
  nav.ts + business.ts. Never duplicate the link list between the two
  components — both pull from this file so they cannot drift.

  Social/email links (Instagram, mailto, Google review) are NOT in these
  arrays — they're rendered by the dedicated interaction wrappers
  (InstagramLink, EmailLink) using values from business.ts.
*/

export interface NavLink {
  label: string
  href: string
  /** Renders this link as the styled "Apply Now" CTA button in the header. */
  isApplyCta?: boolean
  /** Marks active for aria-current="page" when on this route. */
  matchExact?: boolean
}

/**
 * Header nav — primary page links shown in the top nav.
 * "Results" jumps to a same-page anchor on the home page; on other pages
 * it resolves to /#results so the link works everywhere.
 */
export const headerNav: NavLink[] = [
  { label: 'Programs', href: '/programs' },
  { label: 'Results', href: '/#results' },
  { label: 'About', href: '/about' },
  { label: 'Apply Now', href: '/apply', isApplyCta: true },
]

/**
 * Footer nav — page links shown in the footer.
 * Social/email/review links live alongside but are rendered separately
 * (see SiteFooter — uses InstagramLink, EmailLink, etc.).
 */
export const footerNav: NavLink[] = [
  { label: 'Programs', href: '/programs' },
  { label: 'About', href: '/about' },
  { label: 'Apply', href: '/apply' },
]
