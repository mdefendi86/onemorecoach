import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'

export const metadata: Metadata = {
  title: 'Programs & Pricing',
  description:
    'In-person sessions or online coaching from anywhere — both fully customized. Pick your path and Josh handles the rest.',
}

/*
  Phase 1 placeholder for /programs.
  Real program cards + pricing tiers driven from programs.ts land in Phase 2.
*/
export default function ProgramsPage() {
  return (
    <Container className="py-20">
      <SectionHead
        as={1}
        tag="Coaching Programs"
        title="How Do You Want to Train?"
        sub="In-person or online — both fully customized. Page content lands in Phase 2."
      />
    </Container>
  )
}
