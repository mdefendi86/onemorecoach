import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { SectionTag } from '@/components/ui/SectionTag'
import { PricingTier } from '@/components/PricingTier'
import { ApplyCtaLink } from '@/components/ApplyCtaLink'
import { programs } from '@/data/programs'
import { business } from '@/data/business'
import { copy } from '@/data/copy'

export const metadata: Metadata = {
  title: 'In-Person Training',
  description:
    'Face-to-face coaching with Coach Josh — real-time feedback, hands-on cueing, and custom programming.',
}

/*
  In-Person page.

  Pulls the in-person program from programs.ts and renders its content.
  Location section only renders if business.inPersonVenue is populated —
  no gym name, city, or address is invented (REBUILD_PLAN.md §15 #3 open).

  Pricing tiers ship with needsClientInput: true, so PricingTier
  renders "Contact for pricing" for each row — that's by design, not
  a bug. The tiers still link to /apply?program=in-person&term=... so
  someone clicking a tier still gets the program pre-filled on the
  apply form.
*/
export default function InPersonPage() {
  const inPerson = programs.find((p) => p.slug === 'in-person')

  if (!inPerson) {
    // Defensive: programs.ts should always include the in-person slug.
    return null
  }

  const venue = business.inPersonVenue

  return (
    <>
      <section className="px-5 pt-16 md:px-10 md:pt-20">
        <Container>
          <SectionHead
            as={1}
            tag={copy.inPersonPage.eyebrow}
            title={copy.inPersonPage.title}
            sub={copy.inPersonPage.sub}
          />
        </Container>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16">
        <Container>
          <div className="mb-7 max-w-2xl">
            <SectionTag>Program 01</SectionTag>
            <h2 className="font-display mt-2 text-[2.4rem] leading-[1.05] md:text-[2.8rem]">
              {inPerson.name}
            </h2>
            <p className="text-muted mt-3 max-w-[560px] text-[0.93rem] leading-[1.7]">
              {inPerson.description}
            </p>
          </div>

          {/* Location & Availability — renders only if venue exists */}
          {venue ? (
            <div className="mb-6 rounded-[var(--radius)] border border-border border-l-[3px] border-l-accent bg-bg-card px-5 py-4">
              <h3 className="font-display text-accent text-[1rem] tracking-[0.05em]">
                {copy.inPersonPage.locationLabel}
              </h3>
              <p className="text-muted mt-1.5 text-[0.88rem] leading-[1.65]">
                {venue.gymName} — {venue.address}, {venue.city}, {venue.state}
                {venue.availabilityNote ? `. ${venue.availabilityNote}` : null}
              </p>
            </div>
          ) : null}

          {/* Who it's for */}
          <div className="mb-6 rounded-[var(--radius)] border border-border border-l-[3px] border-l-accent bg-bg-card px-5 py-4">
            <h3 className="font-display text-accent text-[1rem] tracking-[0.05em]">
              {copy.programsPage.whoItsForLabel}
            </h3>
            <p className="text-muted mt-1.5 text-[0.88rem] leading-[1.65]">{inPerson.whoItsFor}</p>
          </div>

          {/* Included */}
          <div className="mb-8">
            <h3 className="font-display text-accent text-[1.15rem] tracking-[0.04em]">
              {copy.programsPage.whatsIncludedLabel}
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {inPerson.whatsIncluded.map((item) => (
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
            {inPerson.tiers.map((tier) => (
              <PricingTier key={tier.termSlug} tier={tier} programSlug={inPerson.slug} />
            ))}
          </div>

          <ApplyCtaLink
            location="in_person_page"
            href={`/apply?program=${inPerson.slug}`}
            className="bg-accent inline-flex items-center justify-center rounded-[var(--radius)] px-[30px] py-[14px] font-display text-[1.1rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 active:scale-[0.97]"
          >
            {inPerson.ctaLabel}
          </ApplyCtaLink>
        </Container>
      </section>

      <section className="border-y border-border bg-bg-card px-5 py-12 text-center md:px-10 md:py-16">
        <Container>
          <SectionHead
            tag={copy.inPersonPage.onlineCta.eyebrow}
            title={copy.inPersonPage.onlineCta.title}
            sub={copy.inPersonPage.onlineCta.sub}
          />
          <div className="mt-2 flex justify-center">
            <Link
              href="/programs"
              className="bg-accent inline-flex items-center justify-center rounded-[var(--radius)] px-[30px] py-[14px] font-display text-[1.1rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 active:scale-[0.97]"
            >
              {copy.inPersonPage.onlineCta.ctaLabel}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
