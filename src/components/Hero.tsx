import { Container } from '@/components/ui/Container'
import { ApplyCtaLink } from '@/components/ApplyCtaLink'
import { copy } from '@/data/copy'

/*
  Home page hero.
  Headline is split into two lines in copy.ts so the accent line can render
  in <em> without baking layout into the data.
*/
export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#1d1d1d] to-bg px-5 py-20 text-center md:px-10 md:pt-28 md:pb-24"
    >
      <Container>
        <p className="font-display text-accent text-[0.82rem] uppercase tracking-[0.22em]">
          {copy.hero.eyebrow}
        </p>
        <h1 className="font-display mt-4 text-[3.2rem] leading-[1.05] md:text-[4.8rem] xl:text-[6rem]">
          {copy.hero.headlineLine1}
          <br />
          <em className="text-accent not-italic">{copy.hero.headlineLine2}</em>
        </h1>
        <p className="text-muted mx-auto mt-5 max-w-[460px] text-[1.05rem] leading-[1.7]">
          {copy.hero.sub}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ApplyCtaLink
            location="hero"
            className="bg-accent inline-flex items-center justify-center rounded-[var(--radius)] px-[30px] py-[14px] font-display text-[1.1rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 active:scale-[0.97]"
          >
            {copy.hero.primaryCtaLabel}
          </ApplyCtaLink>
          <a
            href="#results"
            className="inline-flex items-center justify-center rounded-[var(--radius)] border-2 border-white/35 px-[30px] py-[14px] font-display text-[1.1rem] tracking-[0.06em] text-text transition-colors hover:border-accent hover:text-accent"
          >
            {copy.hero.secondaryCtaLabel}
          </a>
        </div>
      </Container>
    </section>
  )
}
