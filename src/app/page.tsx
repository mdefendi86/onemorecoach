import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { Button } from '@/components/ui/Button'
import { business } from '@/data/business'

/*
  Phase 1 home placeholder.
  Real homepage content (Hero · StatsStrip · ProgramsOverview · etc.)
  is built in Phase 2. This page exists so the navigation works
  end-to-end and the chrome (SiteNav + SiteFooter) has something to wrap.
*/
export default function HomePage() {
  return (
    <Container className="py-20">
      <SectionHead
        as={1}
        tag="Phase 1 Scaffold"
        title={business.name}
        sub={`${business.tagline} — chrome and navigation only. Page content lands in Phase 2.`}
      />

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button href="/apply" variant="primary">
          Apply
        </Button>
        <Button href="/programs" variant="ghost">
          See Programs
        </Button>
      </div>
    </Container>
  )
}
