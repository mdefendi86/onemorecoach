'use client'

import { business } from '@/data/business'
import { trackEvent } from '@/lib/analytics'

/*
  InstagramLink — analytics-aware outbound link to the Instagram profile.
  Fires `instagram_click` with a `location` parameter on every click.

  REBUILD_PLAN.md §8 + §11 + §15 #16:
  v1 social scope is an outbound CTA only. No embeds, no API, no feed,
  no auto-follow. This wrapper opens the Instagram profile in a new tab;
  the user completes the follow on Instagram itself.

  URL value comes from business.ts → socials.instagramUrl (never hard-coded).
*/

interface InstagramLinkProps {
  /** Required: where on the site the link was clicked (e.g. 'footer'). */
  location: string
  className?: string
  /** Defaults to the handle string from business.ts. */
  children?: React.ReactNode
  'aria-label'?: string
}

export function InstagramLink({
  location,
  className,
  children,
  'aria-label': ariaLabel,
}: InstagramLinkProps) {
  return (
    <a
      href={business.socials.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ?? `Follow ${business.socials.instagram} on Instagram`}
      onClick={() => trackEvent('instagram_click', { location })}
    >
      {children ?? business.socials.instagram}
    </a>
  )
}
