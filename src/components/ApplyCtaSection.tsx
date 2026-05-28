import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { ApplyCtaLink } from '@/components/ApplyCtaLink'
import { copy } from '@/data/copy'

/*
  Bottom-of-page apply CTA section. Rendered on multiple pages with
  different `location` values so analytics can tell where the click
  came from.
*/

interface ApplyCtaSectionProps {
  /** Analytics location for the apply_cta_click event. */
  location: string
  /** Optional override for the section heading. */
  title?: string
  /** Optional override for the sub copy. */
  sub?: string
  /** Optional override for the eyebrow tag. */
  eyebrow?: string
  /** Optional override for the button label. Defaults to "Apply for Coaching". */
  ctaLabel?: string
}

export function ApplyCtaSection({
  location,
  title = copy.applyCta.title,
  sub = copy.applyCta.sub,
  eyebrow = copy.applyCta.eyebrow,
  ctaLabel = 'Apply for Coaching',
}: ApplyCtaSectionProps) {
  return (
    <section className="border-y border-border bg-bg-card px-5 py-12 md:px-10 md:py-16">
      <Container>
        <SectionHead tag={eyebrow} title={title} sub={sub} />
        <div className="mt-2 flex justify-center">
          <ApplyCtaLink
            location={location}
            className="bg-accent inline-flex items-center justify-center rounded-[var(--radius)] px-9 py-4 font-display text-[1.15rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 active:scale-[0.97]"
          >
            {ctaLabel}
          </ApplyCtaLink>
        </div>
      </Container>
    </section>
  )
}
