'use client'

import Link from 'next/link'
import type { PricingTier as Tier, ProgramSlug } from '@/types/content'
import { trackEvent } from '@/lib/analytics'

/*
  Pricing tier — clickable card that links to /apply?program=X&term=Y.

  Fires `program_tier_click` with `program` and `term` params so the
  apply page knows what to pre-fill AND analytics knows which tier
  got the click.

  When tier.needsClientInput is true, the price slot renders "Contact
  for pricing" instead of the placeholder string from the data file.
*/

interface PricingTierProps {
  tier: Tier
  programSlug: ProgramSlug
}

export function PricingTier({ tier, programSlug }: PricingTierProps) {
  const href = `/apply?program=${programSlug}&term=${tier.termSlug}`
  const featuredClasses = tier.featured
    ? 'border-accent bg-accent/[0.04]'
    : 'border-border hover:border-accent/40 hover:bg-accent/[0.03]'

  return (
    <Link
      href={href}
      onClick={() =>
        trackEvent('program_tier_click', { program: programSlug, term: tier.termSlug })
      }
      aria-label={`Apply for ${programSlug} — ${tier.label}`}
      className={`flex items-center justify-between gap-3 rounded-[var(--radius)] border bg-bg-card px-5 py-4 transition-colors ${featuredClasses}`}
    >
      <div>
        <div className="font-display text-[1.3rem] leading-[1.1] tracking-[0.04em]">
          {tier.label}
        </div>
        {tier.sublabel ? (
          <span className="text-muted mt-[3px] block text-[0.73rem]">{tier.sublabel}</span>
        ) : null}
      </div>
      <div className="shrink-0 text-right">
        {tier.needsClientInput ? (
          <span className="text-muted font-display text-[1.05rem]">Contact for pricing</span>
        ) : (
          <>
            <div className="font-display text-accent text-[1.8rem] leading-none">
              {tier.priceLabel}
            </div>
            <span className="text-muted mt-[3px] block text-[0.72rem]">{tier.priceUnit}</span>
          </>
        )}
        {tier.saveLabel ? (
          <span className="font-display mt-1.5 inline-block rounded bg-accent px-2 py-[2px] text-[0.68rem] tracking-[0.1em] text-[color:var(--color-bg)]">
            {tier.saveLabel}
          </span>
        ) : null}
      </div>
    </Link>
  )
}
