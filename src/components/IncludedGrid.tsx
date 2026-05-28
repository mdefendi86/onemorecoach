import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { Icon } from '@/components/ui/Icon'
import { included } from '@/data/included'
import { copy } from '@/data/copy'

/*
  "What's Included" — 8-item grid.
  Icons are Lucide names from included.ts.
*/
export function IncludedGrid() {
  return (
    <section
      id="included"
      className="border-y border-border bg-bg-card px-5 py-12 md:px-10 md:py-16"
    >
      <Container>
        <SectionHead
          tag={copy.included.eyebrow}
          title={copy.included.title}
          sub={copy.included.sub}
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {included.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius)] border border-border bg-bg p-5 text-center"
            >
              <div className="mb-2.5 flex justify-center">
                <Icon name={item.iconName} size={26} className="text-accent" />
              </div>
              <strong className="font-display block text-[1rem] tracking-[0.04em]">
                {item.title}
              </strong>
              <span className="text-muted mt-1 block text-[0.76rem] leading-[1.5]">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
