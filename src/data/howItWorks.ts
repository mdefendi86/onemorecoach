import type { HowItWorksStep } from '@/types/content'

/*
  "What Happens Next" — 4 steps shown on the apply page.
  Copy ported verbatim from the legacy contact.html (REBUILD_PLAN.md §6).
*/
export const howItWorks: HowItWorksStep[] = [
  {
    number: '01',
    title: 'You Apply',
    description: 'Fill out the form. Takes 2 minutes.',
  },
  {
    number: '02',
    title: 'Josh Reaches Out',
    description: "He'll follow up within 24 hours to learn more about your goals.",
  },
  {
    number: '03',
    title: 'Program Built for You',
    description: 'Your custom plan is put together — training, nutrition, or both.',
  },
  {
    number: '04',
    title: 'You Start',
    description: 'Begin on your first day with a clear plan and a coach in your corner.',
  },
]
