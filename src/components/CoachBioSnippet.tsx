import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { coach } from '@/data/coach'
import { copy } from '@/data/copy'

/*
  Home page coach bio snippet — small avatar + name + credentials + short bio.
  Falls back to a Bebas-Neue initials disk if no headshot is set.
*/
export function CoachBioSnippet() {
  const initials = coach.name
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <section id="coach-bio" className="px-5 py-12 md:px-10 md:py-16">
      <Container>
        <div className="mx-auto flex max-w-[600px] flex-col items-center gap-5 text-center md:flex-row md:items-start md:text-left">
          {coach.headshotSrc ? (
            <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-full border-2 border-accent">
              <Image
                src={coach.headshotSrc}
                alt={coach.headshotAlt ?? `${coach.name} — coach headshot`}
                fill
                sizes="90px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div
              className="font-display text-accent flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-bg-card text-[2rem]"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}

          <div className="md:flex-1">
            <h2 className="font-display text-[2.2rem]">{coach.name}</h2>
            <p className="text-muted mt-1.5 text-[0.8rem] tracking-[0.04em]">
              {coach.credentials.join(' · ')}
            </p>
            <p className="text-muted mt-3 text-[0.93rem] leading-[1.75]">{coach.bioShort}</p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center justify-center rounded-[var(--radius)] border-2 border-white/35 px-[22px] py-[11px] font-display text-[0.95rem] tracking-[0.06em] text-text transition-colors hover:border-accent hover:text-accent"
            >
              {copy.bioSnippet.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
