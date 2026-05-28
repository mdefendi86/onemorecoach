/*
  Inline Instagram glyph.

  Lucide removed brand icons (Instagram, Facebook, etc.) in v1+ for
  trademark reasons. This is the same SVG used on the legacy site —
  three concentric strokes (rounded square + lens circle + flash dot).

  Uses currentColor so the parent text-* utility controls the color.
*/

interface InstagramIconProps {
  size?: number
  className?: string
}

export function InstagramIcon({ size = 20, className }: InstagramIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
