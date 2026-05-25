/*
  SectionTag — small accent-colored eyebrow label above section titles.
  Replaces legacy `.section-tag` (Bebas Neue, uppercase, wide tracking).
*/
export function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display text-accent inline-block text-[0.78rem] uppercase tracking-[0.2em]">
      {children}
    </span>
  )
}
