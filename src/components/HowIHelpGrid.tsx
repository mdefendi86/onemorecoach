import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { Icon } from '@/components/ui/Icon'
import { howIHelp } from '@/data/howIHelp'
import { copy } from '@/data/copy'

/*
  About page "How I Help You Win" — 4-item grid.
*/
export function HowIHelpGrid() {
  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      <Container>
        <SectionHead tag={copy.about.howIHelp.eyebrow} title={copy.about.howIHelp.title} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {howIHelp.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-[var(--radius)] border border-border bg-bg p-5"
            >
              <Icon name={item.iconName} size={24} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-[1rem] tracking-[0.04em]">{item.title}</h4>
                <p className="text-muted mt-1 text-[0.84rem] leading-[1.55]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
