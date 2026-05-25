'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

/*
  ApplyCtaLink — every "Apply" / "Apply Now" / "Apply for Coaching" CTA
  on the site routes through here so a single `apply_cta_click` event
  fires with a `location` parameter identifying where it was clicked.

  REBUILD_PLAN.md §8 + §11.

  This wraps a Link (or a styled Button via className) — keep the
  rendering surface flexible so the caller controls the visual variant.
*/

interface ApplyCtaLinkProps {
  /** Where on the site the CTA was clicked (e.g. 'hero', 'nav', 'home_bottom'). */
  location: string
  /** Optional query string passthrough — supports the ?program=&term= prefill. */
  href?: string
  className?: string
  children: React.ReactNode
  'aria-label'?: string
}

export function ApplyCtaLink({
  location,
  href = '/apply',
  className,
  children,
  'aria-label': ariaLabel,
}: ApplyCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackEvent('apply_cta_click', { location })}
    >
      {children}
    </Link>
  )
}
