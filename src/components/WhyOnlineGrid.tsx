import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { Icon } from '@/components/ui/Icon'
import { whyOnline } from '@/data/whyOnline'
import { copy } from '@/data/copy'

/*
  About page "Why Online Coaching Works" — 6-item grid.
*/
export function WhyOnlineGrid() {
  return (
    <section className="border-y border-border bg-bg-card px-5 py-12 md:px-10 md:py-16">
      <Container>
        <SectionHead
          tag={copy.about.whyOnline.eyebrow}
          title={copy.about.whyOnline.title}
          sub={copy.about.whyOnline.sub}
        />
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {whyOnline.map((item) => (
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
