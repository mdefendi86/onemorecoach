import { stats } from '@/data/stats'

/*
  Three-stat strip shown directly under the hero.
  Data from src/data/stats.ts. One-line claims, no body copy.
*/
export function StatsStrip() {
  return (
    <div className="border-y border-border bg-bg-card px-5 py-7 md:px-10">
      <div className="mx-auto flex max-w-[560px] items-center justify-around">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-5">
            <div className="text-center">
              <div className="font-display text-accent text-[2.8rem] leading-none">
                {stat.number}
              </div>
              <div className="text-muted mt-1.5 text-[0.7rem] uppercase tracking-[0.13em]">
                {stat.label}
              </div>
            </div>
            {i < stats.length - 1 ? (
              <div className="h-11 w-px bg-border" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
