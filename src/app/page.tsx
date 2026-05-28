import { Hero } from '@/components/Hero'
import { StatsStrip } from '@/components/StatsStrip'
import { ProgramsOverview } from '@/components/ProgramsOverview'
import { IncludedGrid } from '@/components/IncludedGrid'
import { ResultsGrid } from '@/components/ResultsGrid'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { CoachBioSnippet } from '@/components/CoachBioSnippet'
import { InstagramCtaSection } from '@/components/InstagramCtaSection'
import { ApplyCtaSection } from '@/components/ApplyCtaSection'

/*
  Home page — section order ports the legacy index.html layout, with two
  intentional differences:
    1. Google reviews badge removed (Phase 5 work; was a half-broken
       placeholder on the legacy site).
    2. InstagramCtaSection placed near the social-proof area per
       REBUILD_PLAN.md §15 #16.

  Every section's content comes from a data file. Zero hex codes, zero
  hardcoded headlines, zero hardcoded email/IG values in this file.
*/
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProgramsOverview />
      <IncludedGrid />
      <ResultsGrid />
      <TestimonialsGrid />
      <InstagramCtaSection location="home_social_proof" />
      <CoachBioSnippet />
      <ApplyCtaSection location="home_bottom" />
    </>
  )
}
