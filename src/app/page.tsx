import { business } from '@/data/business'
import { coach } from '@/data/coach'
import { programs } from '@/data/programs'

/*
  Phase 0 placeholder page.

  This is NOT the real homepage — it's a smoke test that proves
  the Next.js scaffold renders and the data layer imports cleanly.
  The real home page is built in Phase 2 (REBUILD_PLAN.md §14).
*/
export default function Phase0Placeholder() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-display text-sm tracking-[0.2em] text-[color:var(--color-accent)] uppercase">
        Phase 0 Scaffold
      </p>
      <h1 className="font-display mt-3 text-5xl leading-tight">{business.name}</h1>
      <p className="mt-4 text-[color:var(--color-muted)]">
        {business.tagline} — placeholder render. The real site is built in Phase 1+.
      </p>

      <section className="mt-10 space-y-2 text-sm">
        <p>
          <span className="text-[color:var(--color-muted)]">Email:</span>{' '}
          {business.email}
        </p>
        <p>
          <span className="text-[color:var(--color-muted)]">Canonical:</span>{' '}
          {business.canonicalUrl}
        </p>
        <p>
          <span className="text-[color:var(--color-muted)]">Instagram:</span>{' '}
          {business.socials.instagram}
        </p>
        <p>
          <span className="text-[color:var(--color-muted)]">Coach:</span> {coach.name} ·{' '}
          {coach.role}
        </p>
        <p>
          <span className="text-[color:var(--color-muted)]">Programs loaded:</span>{' '}
          {programs.length}
        </p>
      </section>

      <p className="mt-12 text-xs text-[color:var(--color-muted)]">
        See <code className="text-[color:var(--color-accent)]">Rebuild Plan/REBUILD_PLAN.md</code>{' '}
        for the build plan.
      </p>
    </main>
  )
}
