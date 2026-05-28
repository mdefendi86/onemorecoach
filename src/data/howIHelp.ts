/*
  "How I Help You Win" — 4-item grid on the About page.
  Copy ported verbatim from the legacy about.html.
*/

export interface HowIHelpItem {
  iconName: string
  title: string
  description: string
}

export const howIHelp: HowIHelpItem[] = [
  {
    iconName: 'dumbbell',
    title: 'Custom Training Guidance',
    description:
      'Workouts designed for your specific body, equipment, and schedule — not a template pulled from the internet.',
  },
  {
    iconName: 'salad',
    title: 'Precision Meal Planning',
    description:
      "No starvation diets. Just fueled performance and sustainable fat loss built around food you'll actually eat.",
  },
  {
    iconName: 'smartphone',
    title: 'Accountability & Access',
    description:
      'Expert coaching that meets you wherever you are — online or in-person, with 24/7 access to your coach.',
  },
  {
    iconName: 'zap',
    title: 'The "One More" Mindset',
    description:
      "Pushing past your plateaus to find what you're actually capable of — one rep, one week, one percent at a time.",
  },
]
