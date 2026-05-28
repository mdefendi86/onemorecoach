import { Container } from '@/components/ui/Container'
import { SectionTag } from '@/components/ui/SectionTag'
import { PricingTier } from '@/components/PricingTier'
import { ApplyCtaLink } from '@/components/ApplyCtaLink'
import type { Program } from '@/types/content'
import { copy } from '@/data/copy'

/*
  Full program section used on the Programs page.
  One per program — renders description, "Who It's For", "What's Included",
  pricing tier grid, and a primary CTA to /apply?program=<slug>.
*/

interface ProgramSectionProps {
  program: Program
  /** Position in the list — used for the "Program 01" eyebrow. */
  index: number
  /** Alternates section background subtly between programs. */
  alt?: boolean
}

export function ProgramSection({ program, index, alt }: ProgramSectionProps) {
  const eyebrow = `Program 0${index + 1}`
  return (
    <section
      id={program.slug}
      className={`px-5 py-14 md:px-10 md:py-16 ${alt ? 'bg-bg-card' : ''} border-t border-border`}
    >
      <Container>
        <div className="mb-7 max-w-2xl">
          <SectionTag>{eyebrow}</SectionTag>
          <h2 className="font-display mt-2 text-[2.4rem] leading-[1.05] md:text-[2.8rem]">
            {program.name}
          </h2>
          <p className="text-muted mt-3 max-w-[560px] text-[0.93rem] leading-[1.7]">
            {program.description}
          </p>
        </div>

        {/* Who it's for */}
        <div className="mb-6 rounded-[var(--radius)] border border-border border-l-[3px] border-l-accent bg-bg-card px-5 py-4">
          <h3 className="font-display text-accent text-[1rem] tracking-[0.05em]">
            {copy.programsPage.whoItsForLabel}
          </h3>
          <p className="text-muted mt-1.5 text-[0.88rem] leading-[1.65]">{program.whoItsFor}</p>
        </div>

        {/* Included */}
        <div className="mb-8">
          <h3 className="font-display text-accent text-[1.15rem] tracking-[0.04em]">
            {copy.programsPage.whatsIncludedLabel}
          </h3>
          <ul className="mt-3.5 space-y-2.5">
            {program.whatsIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[0.92rem] leading-[1.5] text-muted"
              >
                <span className="text-accent shrink-0 font-bold" aria-hidden="true">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <h3 className="font-display text-accent text-[1.15rem] tracking-[0.04em]">
          {copy.programsPage.pricingLabel}
        </h3>
        <div className="mt-3.5 mb-8 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-4">
          {program.tiers.map((tier) => (
            <PricingTier key={tier.termSlug} tier={tier} programSlug={program.slug} />
          ))}
        </div>

        <ApplyCtaLink
          location={`programs_page_${program.slug}`}
          href={`/apply?program=${program.slug}`}
          className="bg-accent inline-flex items-center justify-center rounded-[var(--radius)] px-[30px] py-[14px] font-display text-[1.1rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 active:scale-[0.97]"
        >
          {program.ctaLabel}
        </ApplyCtaLink>
      </Container>
    </section>
  )
}
