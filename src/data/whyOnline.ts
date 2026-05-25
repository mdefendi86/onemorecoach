import type { WhyOnlineItem } from '@/types/content'

/*
  "Why Online Coaching Works" — 6 items.
  Copy ported verbatim from the legacy about.html (REBUILD_PLAN.md §6).
*/
export const whyOnline: WhyOnlineItem[] = [
  {
    iconName: 'map-pin',
    title: 'Train Anywhere',
    description:
      'Your program works at your gym, a hotel gym, or your garage. No location dependency, no excuses.',
  },
  {
    iconName: 'clock',
    title: 'Your Schedule, Not Mine',
    description:
      'No booking windows. Train when it fits your life — 5am before work or 10pm after the kids are down.',
  },
  {
    iconName: 'message-circle',
    title: 'More Access, Not Less',
    description:
      'In-person coaching gives you an hour. Online coaching gives you 24/7 messaging — questions answered the same day.',
  },
  {
    iconName: 'bar-chart-3',
    title: 'Data-Driven Adjustments',
    description:
      'Weekly check-ins mean the plan never gets stale. Progress is tracked, reviewed, and adjusted — every single week.',
  },
  {
    iconName: 'video',
    title: 'Form Still Gets Checked',
    description:
      "Submit training videos, get detailed feedback. You don't need to be in the same room for form coaching to work.",
  },
  {
    iconName: 'dollar-sign',
    title: 'Better Value',
    description:
      'Comparable results to in-person coaching at a fraction of the cost — without the commute or the scheduling hassle.',
  },
]
