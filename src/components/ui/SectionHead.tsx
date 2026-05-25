import { SectionTag } from './SectionTag'

/*
  SectionHead — reusable tag + title + subtitle block.
  Replaces legacy `.section-head`.
*/

interface SectionHeadProps {
  tag?: string
  title: string
  sub?: string
  align?: 'center' | 'left'
  /** HTML heading level — defaults to h2; pass 1 for the page hero. */
  as?: 1 | 2 | 3
}

export function SectionHead({ tag, title, sub, align = 'center', as = 2 }: SectionHeadProps) {
  const Heading: 'h1' | 'h2' | 'h3' = `h${as}`
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-10 max-w-2xl ${alignClass}`}>
      {tag ? <SectionTag>{tag}</SectionTag> : null}
      <Heading className="font-display mt-2.5 text-4xl leading-[1.05] md:text-5xl">{title}</Heading>
      {sub ? <p className="text-muted mt-3 text-[0.95rem] leading-[1.7]">{sub}</p> : null}
    </div>
  )
}
