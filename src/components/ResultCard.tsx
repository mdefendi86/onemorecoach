import Image from 'next/image'
import type { ClientResult } from '@/types/content'

/*
  Single result card — image + category meta strip below.
  Image renders 1:1 with object-cover via next/image fill mode.
*/
export function ResultCard({ result }: { result: ClientResult }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius)] border border-border bg-bg-card">
      <div className="relative aspect-square">
        <Image
          src={result.imageSrc}
          alt={result.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-display text-accent text-[0.85rem] tracking-[0.06em]">
          {result.category}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      </div>
    </article>
  )
}
