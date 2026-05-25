import { icons, type LucideProps } from 'lucide-react'

/*
  Icon — typed wrapper around Lucide icons with consistent sizing.
  REBUILD_PLAN.md §8. Replaces all emoji from the legacy site.

  Usage: <Icon name="dumbbell" />
  Data files reference Lucide icon names (kebab-case) in `iconName`
  fields — see src/data/included.ts, whyOnline.ts.

  Stroke width defaults to 1.8 (matches Lucide's "fitness/athletic"
  feel a touch better than the 2.0 default).
*/

const toPascal = (s: string) =>
  s
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')

interface IconProps extends Omit<LucideProps, 'ref'> {
  /** Lucide icon name in kebab-case, e.g. "dumbbell", "map-pin". */
  name: string
}

export function Icon({ name, size = 20, strokeWidth = 1.8, ...rest }: IconProps) {
  const pascal = toPascal(name) as keyof typeof icons
  const LucideIcon = icons[pascal]

  if (!LucideIcon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`<Icon name="${name}"> — no Lucide icon found for "${pascal}".`)
    }
    return null
  }

  return <LucideIcon size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}
