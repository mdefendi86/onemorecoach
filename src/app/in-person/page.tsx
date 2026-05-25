import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'

export const metadata: Metadata = {
  title: 'In-Person Training',
  description:
    'Face-to-face coaching with Coach Josh — real-time feedback, hands-on cueing, and custom programming.',
}

/*
  Phase 1 placeholder for /in-person.
  REBUILD_PLAN.md §15 #3: gym name / city / address still pending.
  Real page content lands in Phase 2.
*/
export default function InPersonPage() {
  return (
    <Container className="py-20">
      <SectionHead
        as={1}
        tag="In-Person Training"
        title="Train With Josh — In Person"
        sub="Face-to-face coaching with hands-on cueing every rep. Page content lands in Phase 2."
      />
    </Container>
  )
}
