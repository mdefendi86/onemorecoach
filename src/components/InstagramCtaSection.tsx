import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { InstagramLink } from '@/components/InstagramLink'
import { business } from '@/data/business'
import { copy } from '@/data/copy'

/*
  Instagram CTA section.

  REBUILD_PLAN.md §15 #16: outbound CTA only. No feed, no embeds, no API.
  Visitor clicks the link; the follow happens on Instagram itself.
*/

interface InstagramCtaSectionProps {
  /** Analytics location for the instagram_click event. */
  location: string
}

export function InstagramCtaSection({ location }: InstagramCtaSectionProps) {
  return (
    <section className="px-5 py-12 text-center md:px-10 md:py-16">
      <Container>
        <SectionHead
          tag={copy.instagramSection.eyebrow}
          title={copy.instagramSection.title}
          sub={copy.instagramSection.sub}
        />
        <div className="mt-2 flex justify-center">
          <InstagramLink
            location={location}
            className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-border bg-bg-card px-6 py-3.5 text-[1rem] text-text transition-colors hover:border-accent hover:text-accent"
          >
            <InstagramIcon size={20} />
            <span>
              {copy.instagramSection.buttonLabelPrefix} {business.socials.instagram}
            </span>
          </InstagramLink>
        </div>
      </Container>
    </section>
  )
}
