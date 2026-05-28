import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { ProgramOverviewCard } from '@/components/ProgramOverviewCard'
import { InPersonOverviewCard } from '@/components/InPersonOverviewCard'
import { programs } from '@/data/programs'
import { copy } from '@/data/copy'

/*
  Home page programs hub. Splits the program list into:
  - In-person (its own card with a bullets sidebar)
  - Online (the remaining three programs in a row)

  The "Most Popular" badge is applied to the Lifestyle program — the
  one piece of marketing emphasis that's intrinsic to the home page
  rather than a property of the underlying program. Lives here, not
  in programs.ts.
*/
export function ProgramsOverview() {
  const inPerson = programs.find((p) => p.slug === 'in-person')
  const online = programs.filter((p) => p.slug !== 'in-person')

  return (
    <section id="programs" className="px-5 py-12 md:px-10 md:py-16">
      <Container>
        <SectionHead
          tag={copy.programsOverview.eyebrow}
          title={copy.programsOverview.title}
          sub={copy.programsOverview.sub}
        />

        {inPerson ? (
          <>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-display text-muted text-[0.72rem] uppercase tracking-[0.2em]">
                {copy.programsOverview.inPersonDividerLabel}
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <InPersonOverviewCard program={inPerson} />
          </>
        ) : null}

        <div className="mb-5 mt-10 flex items-center gap-3">
          <span className="font-display text-muted text-[0.72rem] uppercase tracking-[0.2em]">
            {copy.programsOverview.onlineDividerLabel}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          {online.map((program) => (
            <ProgramOverviewCard
              key={program.slug}
              program={program}
              badge={program.slug === 'lifestyle' ? 'Most Popular' : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
