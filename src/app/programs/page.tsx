import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { ProgramSection } from '@/components/ProgramSection'
import { ApplyCtaSection } from '@/components/ApplyCtaSection'
import { programs } from '@/data/programs'
import { copy } from '@/data/copy'

export const metadata: Metadata = {
  title: 'Programs & Pricing',
  description:
    'In-person sessions or online coaching from anywhere — both fully customized. Pick your path and Josh handles the rest.',
}

/*
  Programs page — one ProgramSection per program from programs.ts.
  Sections alternate background color subtly via the `alt` prop.
*/
export default function ProgramsPage() {
  return (
    <>
      <section className="px-5 pt-16 md:px-10 md:pt-20">
        <Container>
          <SectionHead
            as={1}
            tag={copy.programsPage.eyebrow}
            title={copy.programsPage.title}
            sub={copy.programsPage.sub}
          />
        </Container>
      </section>

      {programs.map((program, i) => (
        <ProgramSection key={program.slug} program={program} index={i} alt={i % 2 === 1} />
      ))}

      <ApplyCtaSection
        location="programs_page_bottom"
        eyebrow={copy.programsPage.bottomCta.eyebrow}
        title={copy.programsPage.bottomCta.title}
        sub={copy.programsPage.bottomCta.sub}
        ctaLabel={copy.programsPage.bottomCta.ctaLabel}
      />
    </>
  )
}
