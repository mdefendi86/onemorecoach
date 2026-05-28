import type { Testimonial } from '@/types/content'

/*
  Single testimonial card — left accent bar + quote + attribution.
*/
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <blockquote className="flex flex-1 flex-col rounded-[var(--radius)] border border-border border-l-4 border-l-accent bg-bg-card p-6 md:p-7">
      <p className="text-[0.95rem] italic leading-[1.75] text-text">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-4">
        <div className="font-display text-accent text-[1.1rem] tracking-[0.05em]">
          {testimonial.clientName}
        </div>
        <div className="text-muted mt-0.5 text-[0.76rem]">{testimonial.programLabel}</div>
      </footer>
    </blockquote>
  )
}
