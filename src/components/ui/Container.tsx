/*
  Container — width-constrained layout wrapper.
  REBUILD_PLAN.md §8 UI primitives. Replaces legacy `.container`
  (max-width 1200 + horizontal padding).
*/
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-10 ${className}`}>{children}</div>
  )
}
