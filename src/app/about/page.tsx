import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ApplyCtaLink } from '@/components/ApplyCtaLink'
import { HowIHelpGrid } from '@/components/HowIHelpGrid'
import { WhyOnlineGrid } from '@/components/WhyOnlineGrid'
import { InstagramCtaSection } from '@/components/InstagramCtaSection'
import { ApplyCtaSection } from '@/components/ApplyCtaSection'
import { coach } from '@/data/coach'
import { copy } from '@/data/copy'

export const metadata: Metadata = {
  title: 'About Coach Josh',
  description: coach.bioShort,
}

/*
  About page.
  - Hero: full-length coach photo + name + credentials + Work With Josh CTA
  - Story: four bio paragraphs from coach.bioFull (ported verbatim from legacy)
  - Pull quote
  - "How I Help You Win" grid
  - "Why Online Coaching Works" grid
  - Instagram CTA
  - Bottom apply CTA

  Cert badges section is intentionally hidden when coach.certs is empty
  — fake certs are explicitly out of scope (no [Cert 1] placeholders).
*/
export default function AboutPage() {
  return (
    <>
      <section className="px-5 pt-16 pb-10 text-center md:px-10 md:pt-20 md:pb-12">
        <Container>
          {coach.fullLengthSrc ? (
            <div className="relative mx-auto mb-7 h-[260px] w-[200px] overflow-hidden rounded-[var(--radius)]">
              <Image
                src={coach.fullLengthSrc}
                alt={coach.fullLengthAlt ?? `${coach.name} — coach photo`}
                fill
                sizes="200px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <h1 className="font-display text-[3.2rem] leading-[1.05] md:text-[4rem]">{coach.name}</h1>

          {coach.certs.length > 0 ? (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {coach.certs.map((cert) => (
                <span
                  key={cert}
                  className="text-accent inline-block rounded-full border border-border bg-bg-card px-3.5 py-1 text-[0.78rem]"
                >
                  {cert}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex justify-center">
            <ApplyCtaLink
              location="about_hero"
              className="bg-accent inline-flex items-center justify-center rounded-[var(--radius)] px-[30px] py-[14px] font-display text-[1.1rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 active:scale-[0.97]"
            >
              {copy.about.workWithCtaLabel}
            </ApplyCtaLink>
          </div>
        </Container>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-12">
        <Container>
          <div className="mx-auto max-w-[680px]">
            <h2 className="font-display text-[2.2rem] leading-[1.05] mb-6">
              {copy.about.storyTitle}
            </h2>
            {coach.bioFull.map((para, i) => (
              <p
                key={i}
                className="text-muted mb-5 text-[0.95rem] leading-[1.85] last:mb-0"
              >
                {para}
              </p>
            ))}

            {coach.pullQuote ? (
              <blockquote className="my-8 border-l-[3px] border-accent py-4 pl-6 text-[1.05rem] italic leading-[1.75] text-text">
                {coach.pullQuote}
                <cite className="font-display text-accent mt-2.5 block text-[0.82rem] not-italic tracking-[0.05em]">
                  — {coach.name}
                </cite>
              </blockquote>
            ) : null}
          </div>
        </Container>
      </section>

      {coach.actionShotSrc ? (
        <section className="px-5 py-6 md:px-10 md:py-10">
          <Container>
            <div className="relative mx-auto aspect-[4/5] max-w-[600px] overflow-hidden rounded-[var(--radius)] md:aspect-[16/9]">
              <Image
                src={coach.actionShotSrc}
                alt={coach.actionShotAlt ?? `${coach.name} coaching a client`}
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </section>
      ) : null}

      <HowIHelpGrid />
      <WhyOnlineGrid />
      <InstagramCtaSection location="about" />
      <ApplyCtaSection
        location="about_bottom"
        eyebrow={copy.about.bottomCta.eyebrow}
        title={copy.about.bottomCta.title}
        sub={copy.about.bottomCta.sub}
        ctaLabel={copy.about.bottomCta.ctaLabel}
      />
    </>
  )
}
