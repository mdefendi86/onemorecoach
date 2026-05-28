/*
  Home page stats strip — three numbers shown under the hero.

  Sourced verbatim from the legacy index.html. "100% Online" and
  "24/7 Coach Access" are program-feature facts. "50+ Clients" is
  a count claim — flagged for periodic verification but not blocking.
*/

export interface Stat {
  number: string
  label: string
  /** True if the claim could become stale and should be re-verified before each launch. */
  needsClientInput?: boolean
}

export const stats: Stat[] = [
  { number: '50+', label: 'Clients', needsClientInput: true },
  { number: '100%', label: 'Online' },
  { number: '24/7', label: 'Coach Access' },
]
