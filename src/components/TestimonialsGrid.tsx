import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { TestimonialCard } from '@/components/TestimonialCard'
import { testimonials } from '@/data/testimonials'
import { copy } from '@/data/copy'

/*
  Testimonials section — short-circuits when testimonials.ts is empty
  (Phase 2 ships with zero testimonials and the user explicitly ruled
  out fake ones, so the section renders nothing rather than placeholder
  copy).
*/
export function TestimonialsGrid() {
  if (testimonials.length === 0) return null

  return (
    <section
      id="testimonials"
      className="border-y border-border bg-bg-card px-5 py-12 md:px-10 md:py-16"
    >
      <Container>
        <SectionHead tag={copy.testimonials.eyebrow} title={copy.testimonials.title} />
        <div className="flex flex-col gap-4 md:flex-row">
          {testimonials.map((t) => (
            <TestimonialCard key={t.clientName + t.quote} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  )
}
