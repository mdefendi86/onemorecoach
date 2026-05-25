import type { Program } from '@/types/content'

/*
  Programs and pricing.

  Per REBUILD_PLAN.md §6, Phase 0 ships with real prices where the legacy
  site already publishes them (Lifestyle / Nutrition / Training). In-person
  pricing is `needsClientInput: true` until §15 open question #4 resolves.

  The slugs (lifestyle / nutrition / training / in-person) are the values
  used by the apply form's URL-prefill (?program=…&term=…) and must stay
  stable across the rebuild — they're the contract between the programs
  page and the apply page.
*/
export const programs: Program[] = [
  {
    slug: 'in-person',
    name: 'In-Person Training',
    tagline: 'Face-to-face coaching with hands-on cueing every rep.',
    description:
      'Face-to-face coaching with Josh. Every session is custom-built around your goals, your schedule, and your current training level — with hands-on cueing every rep. Nutrition planning and supplementation guidance can be added on for a complete, end-to-end program.',
    whoItsFor:
      "Anyone who learns best with a coach physically present — beginners building their foundation, experienced lifters chasing their next level, or anyone who wants that hands-on accountability edge.",
    whatsIncluded: [
      '60-minute 1-on-1 sessions with Josh — fully focused on you',
      'Training schedule and session plan built around your goals, availability, and level',
      'Real-time form coaching and hands-on cueing every rep',
      'Progressive overload tracked and adjusted session to session',
      'Messaging access to Josh between sessions',
      'Nutrition & supplementation add-on available — personalized meal plan and supplement stack included on request',
    ],
    tiers: [
      {
        termSlug: 'single',
        label: 'Single Session',
        sublabel: 'No commitment',
        priceLabel: '$[XX]',
        priceUnit: 'per session',
        needsClientInput: true,
      },
      {
        termSlug: '4-sessions',
        label: '4 Sessions',
        sublabel: '~1x per week',
        priceLabel: '$[XX]',
        priceUnit: 'per month',
        needsClientInput: true,
      },
      {
        termSlug: '8-sessions',
        label: '8 Sessions',
        sublabel: '~2x per week',
        priceLabel: '$[XX]',
        priceUnit: 'per month',
        saveLabel: 'BEST VALUE',
        featured: true,
        needsClientInput: true,
      },
      {
        termSlug: '12-sessions',
        label: '12 Sessions',
        sublabel: '~3x per week',
        priceLabel: '$[XX]',
        priceUnit: 'per month',
        needsClientInput: true,
      },
    ],
    ctaLabel: 'Apply for In-Person Training',
    needsClientInput: true, // venue + pricing both pending
  },
  {
    slug: 'lifestyle',
    name: 'Lifestyle',
    tagline: 'Training, nutrition, and accountability — the full package.',
    description:
      "The full package — training, nutrition, and accountability all in one. Built for people who want to lose weight, build lean muscle, or do both at the same time without guesswork.",
    whoItsFor:
      "Anyone who wants to change their body composition — whether that's dropping fat, adding muscle, or both. Ideal for people who need structure, accountability, and a coach who adjusts the plan as they progress. No experience required.",
    whatsIncluded: [
      'Custom training program designed around your goals, equipment, and schedule',
      'Personalized meal plan with multiple food options — no one-size-fits-all diet',
      'Supplement recommendations tailored to your budget and goals',
      '1 weekly check-in with progress review and plan adjustments',
      '24/7 messaging access to Josh — questions answered fast',
      'Ongoing program updates as you hit new milestones',
    ],
    tiers: [
      {
        termSlug: 'monthly',
        label: 'Month-to-Month',
        sublabel: 'Cancel any time',
        priceLabel: '$125',
        priceUnit: 'per month',
      },
      {
        termSlug: '3month',
        label: '3 Months',
        sublabel: '~$108 per month',
        priceLabel: '$325',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
      },
      {
        termSlug: '6month',
        label: '6 Months',
        sublabel: '~$117 per month',
        priceLabel: '$700',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
        featured: true,
      },
      {
        termSlug: '12month',
        label: '12 Months',
        sublabel: '~$121 per month',
        priceLabel: '$1,450',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
      },
    ],
    ctaLabel: 'Apply for Lifestyle Coaching',
  },
  {
    slug: 'nutrition',
    name: 'Nutrition & Supplementation',
    tagline: 'Tailored meal plans and a full supplement stack recommendation.',
    description:
      'Dial in your diet without the confusion. Josh builds a meal plan around your real life — foods you actually like, in portions that work for your goal — and tells you exactly what supplements to add and why.',
    whoItsFor:
      "People who already train on their own but can't crack the nutrition side. Great for those who are overwhelmed by diet culture, unsure what to eat, or want supplement guidance without wasting money on the wrong products.",
    whatsIncluded: [
      'Full personalized meal plan with multiple food options at every meal',
      'Macronutrient targets calibrated to your goal, body, and activity level',
      'Supplement stack recommendations — what to take, when, and how much',
      'Weekly check-in to review how the plan is working and make adjustments',
      '24/7 messaging access to Josh for questions between check-ins',
    ],
    tiers: [
      {
        termSlug: 'monthly',
        label: 'Month-to-Month',
        sublabel: 'Cancel any time',
        priceLabel: '$75',
        priceUnit: 'per month',
      },
      {
        termSlug: '3month',
        label: '3 Months',
        sublabel: '~$58 per month',
        priceLabel: '$175',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
      },
      {
        termSlug: '6month',
        label: '6 Months',
        sublabel: '~$67 per month',
        priceLabel: '$400',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
        featured: true,
      },
      {
        termSlug: '12month',
        label: '12 Months',
        sublabel: '~$71 per month',
        priceLabel: '$850',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
      },
    ],
    ctaLabel: 'Apply for Nutrition Coaching',
  },
  {
    slug: 'training',
    name: 'Training Guidance',
    tagline: 'Structured, progressive programming with video form evaluation.',
    description:
      "Structured, progressive programming for every style of training. Whether you're lifting, doing hybrid work, or training for endurance — this is a real program, not a random workout generator.",
    whoItsFor:
      "Athletes, gym-goers, and anyone who wants structured programming instead of just winging it. Ideal for hybrid athletes, those coming off an injury, or lifters who've hit a plateau and need a coach to build a smarter plan.",
    whatsIncluded: [
      'Structured training program — resistance, hybrid, or endurance, your call',
      "Progressive overload built in so you're always moving forward",
      'Weekly check-in with performance review and program adjustments',
      'Training video evaluation — submit form videos, get detailed feedback',
      '24/7 messaging access to Josh between sessions',
    ],
    tiers: [
      {
        termSlug: 'monthly',
        label: 'Month-to-Month',
        sublabel: 'Cancel any time',
        priceLabel: '$75',
        priceUnit: 'per month',
      },
      {
        termSlug: '3month',
        label: '3 Months',
        sublabel: '~$58 per month',
        priceLabel: '$175',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
      },
      {
        termSlug: '6month',
        label: '6 Months',
        sublabel: '~$67 per month',
        priceLabel: '$400',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
        featured: true,
      },
      {
        termSlug: '12month',
        label: '12 Months',
        sublabel: '~$71 per month',
        priceLabel: '$850',
        priceUnit: 'total',
        saveLabel: 'SAVE $50',
      },
    ],
    ctaLabel: 'Apply for Training Coaching',
  },
]
