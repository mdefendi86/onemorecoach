import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { ResultCard } from '@/components/ResultCard'
import { results } from '@/data/results'
import { copy } from '@/data/copy'

/*
  Client results section — anchored at #results so the hero "See Results"
  CTA scrolls here. If results.ts is empty, the section short-circuits
  rather than rendering an empty grid.
*/
export function ResultsGrid() {
  if (results.length === 0) return null

  return (
    <section id="results" className="px-5 py-12 md:px-10 md:py-16">
      <Container>
        <SectionHead
          tag={copy.results.eyebrow}
          title={copy.results.title}
          sub={copy.results.sub}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {results.map((result) => (
            <ResultCard key={result.imageSrc} result={result} />
          ))}
        </div>
      </Container>
    </section>
  )
}
