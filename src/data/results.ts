import type { ClientResult } from '@/types/content'

/*
  Client results / before & afters.

  Per IMAGE_INVENTORY.md resolved decision #5 + #7, results.ts sources
  EXCLUSIVELY from the existing /results/ folder at the repo root.
  No files from /images/owner-images/ appear here.

  Phase 2: the four legacy result-*.JPG photos have been copied from
  results/ to public/results/ with lowercase filenames + .jpg extension.
  Phase 4 will re-export them as optimized WebP — at that point swap
  the .jpg paths for .webp.

  Coach Josh's OWN transformation is on coach.ts (transformationSrc), not here.
*/
export const results: ClientResult[] = [
  {
    imageSrc: '/results/result-1.jpg',
    alt: 'Client muscle-building transformation — before and after.',
    category: 'Muscle Building',
  },
  {
    imageSrc: '/results/result-2.jpg',
    alt: 'Client weight-loss transformation — before and after.',
    category: 'Weight Loss',
  },
  {
    imageSrc: '/results/result-3.jpg',
    alt: 'Client body recomposition transformation — before and after.',
    category: 'Body Recomp',
  },
  {
    imageSrc: '/results/result-4.jpg',
    alt: 'Client body recomposition — back view, before and after.',
    category: 'Body Recomp',
  },
]
