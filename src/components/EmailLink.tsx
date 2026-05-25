'use client'

import { business } from '@/data/business'
import { trackEvent } from '@/lib/analytics'

/*
  EmailLink — analytics-aware mailto wrapper.
  Fires `email_click` with a `location` parameter on every click.
  REBUILD_PLAN.md §8 + §11.

  Email value comes from business.ts → email (never hard-coded).
*/

interface EmailLinkProps {
  /** Override the default business email. Defaults to business.email. */
  to?: string
  /** Required: where on the site the link was clicked (e.g. 'footer'). */
  location: string
  className?: string
  children?: React.ReactNode
}

export function EmailLink({ to, location, className, children }: EmailLinkProps) {
  const address = to ?? business.email
  return (
    <a
      href={`mailto:${address}`}
      className={className}
      onClick={() => trackEvent('email_click', { location, email_type: 'business' })}
    >
      {children ?? address}
    </a>
  )
}
