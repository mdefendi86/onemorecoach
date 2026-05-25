import type { IncludedItem } from '@/types/content'

/*
  "What's Included" grid — 8 items.
  Copy ported verbatim from the legacy index.html (REBUILD_PLAN.md §6).
  `iconName` values are Lucide icon names — wired in Phase 1 when the
  Icon primitive is built.
*/
export const included: IncludedItem[] = [
  {
    iconName: 'dumbbell',
    title: 'Custom Training Plan',
    description: 'Built for your body, equipment & schedule',
  },
  {
    iconName: 'salad',
    title: 'Personalized Meal Plan',
    description: 'Real food. Real options. No crash diets.',
  },
  {
    iconName: 'pill',
    title: 'Supplement Guidance',
    description: 'Know what to take, when, and why',
  },
  {
    iconName: 'bar-chart-3',
    title: 'Weekly Check-ins',
    description: 'Track progress and adjust every week',
  },
  {
    iconName: 'message-circle',
    title: '24/7 Coach Access',
    description: 'Message Josh any time, any day',
  },
  {
    iconName: 'video',
    title: 'Video Evaluation',
    description: 'Form checks and movement feedback',
  },
  {
    iconName: 'trending-up',
    title: 'Progress Tracking',
    description: 'Measurable goals and clear milestones',
  },
  {
    iconName: 'target',
    title: 'Goal Adjustments',
    description: 'Plans that evolve as you progress',
  },
]
