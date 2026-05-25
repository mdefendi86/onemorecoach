import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { coach } from '@/data/coach'

export const metadata: Metadata = {
  title: 'About Coach Josh',
  description:
    'Coach Josh Horton — competitive bodybuilder and online personal trainer. Real background, real results.',
}

/*
  Phase 1 placeholder for /about.
  Bio paragraphs from coach.ts land verbatim in Phase 2.
*/
export default function AboutPage() {
  return (
    <Container className="py-20">
      <SectionHead
        as={1}
        tag="About"
        title={coach.name}
        sub={`${coach.role} — full bio lands in Phase 2.`}
      />
    </Container>
  )
}
