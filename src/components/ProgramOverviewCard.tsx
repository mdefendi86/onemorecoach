import Link from 'next/link'
import type { Program } from '@/types/content'

/*
  Compact program card used on the home page programs-overview hub.
  Three of these render in a row for the online programs.
  In-person uses a separate component (InPersonOverviewCard) because
  it has a different layout (bullets sidebar).
*/

interface ProgramOverviewCardProps {
  program: Program
  /** Optional badge text — e.g. "Most Popular" on the Lifestyle card. */
  badge?: string
}

export function ProgramOverviewCard({ program, badge }: ProgramOverviewCardProps) {
  // Show the cheapest non-needsClientInput tier price as the headline price.
  const headlineTier = program.tiers.find((t) => !t.needsClientInput) ?? program.tiers[0]

  return (
    <div className="flex flex-1 flex-col rounded-[var(--radius)] border border-border bg-bg-card p-6">
      {badge ? (
        <span className="font-display text-accent mb-3 inline-block self-start rounded bg-accent/10 px-2.5 py-[3px] text-[0.7rem] tracking-[0.14em]">
          {badge}
        </span>
      ) : null}
      <h3 className="font-display text-[1.6rem]">{program.name}</h3>
      <p className="text-muted mt-2 text-[0.9rem] leading-[1.6]">{program.tagline}</p>
      <div className="font-display text-accent mt-4 text-[1.5rem]">
        {headlineTier.needsClientInput ? (
          <span className="text-muted text-[1rem]">Contact for pricing</span>
        ) : (
          <>
            {headlineTier.priceLabel}{' '}
            <span className="font-sans text-[0.82rem] text-muted">
              {headlineTier.priceUnit}
            </span>
          </>
        )}
      </div>
      <Link
        href={`/programs#${program.slug}`}
        className="text-accent mt-4 inline-block text-[0.88rem] underline underline-offset-[3px] transition-opacity hover:opacity-75"
      >
        See full program →
      </Link>
    </div>
  )
}
