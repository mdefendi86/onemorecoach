import type { ClientResult } from '@/types/content'

/*
  Client results / before & afters.

  Per IMAGE_INVENTORY.md resolved decision #5 + #7, results.ts sources
  EXCLUSIVELY from the existing /results/ folder at the repo root.
  No files from /images/owner-images/ appear here.

  Source files: results/result-1..5.JPG and results/IMG_9420.jpg.

  For Phase 0, entries are placeholders pointing to paths that will be
  populated in Phase 4 when the legacy result-*.JPG files are renamed,
  optimized, and copied into public/results/result-*.webp.

  Coach Josh's OWN transformation is on coach.ts (transformationSrc), not here.
*/
export const results: ClientResult[] = [
  {
    imageSrc: '/results/result-1.webp', // Phase 4 — port from results/result-1.JPG
    alt: 'Client muscle-building transformation — before and after.',
    category: 'Muscle Building',
    isPlaceholder: true,
  },
  {
    imageSrc: '/results/result-2.webp',
    alt: 'Client weight-loss transformation — before and after.',
    category: 'Weight Loss',
    isPlaceholder: true,
  },
  {
    imageSrc: '/results/result-3.webp',
    alt: 'Client body recomposition transformation — before and after.',
    category: 'Body Recomp',
    isPlaceholder: true,
  },
  {
    imageSrc: '/results/result-4.webp',
    alt: 'Client body recomposition — back view, before and after.',
    category: 'Body Recomp',
    isPlaceholder: true,
  },
]
