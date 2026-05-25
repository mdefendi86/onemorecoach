import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'

export const metadata: Metadata = {
  title: 'Apply for Coaching',
  description:
    'Fill out the form below. Josh reviews every application personally and will reach out within 24 hours.',
}

/*
  Phase 1 placeholder for /apply.
  ApplicationForm + Server Action backend wired in Phase 3.
*/
export default function ApplyPage() {
  return (
    <Container className="py-20">
      <SectionHead
        as={1}
        tag="Get Started"
        title="Apply for Coaching"
        sub="Form goes here in Phase 2; Server Action backend in Phase 3."
      />
    </Container>
  )
}
