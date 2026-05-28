import type { Coach } from '@/types/content'

/*
  Coach Josh Horton.

  Phase 2: bioShort, bioFull, credentials, pullQuote, and headshot are
  populated. Bio paragraphs ported verbatim from the legacy about.html.
  Headshot is the Phase 2 starter — see IMAGE_INVENTORY.md entry #1.
  A proper studio headshot is tracked in the launch checklist as an
  Optional Upgrade.

  Still TBD:
  - `certs` — formal certifications (REBUILD_PLAN.md §15 #6 open).
  - `fullLengthSrc` / `transformationSrc` — pending image selection in Phase 4.
*/
export const coach: Coach = {
  name: 'Josh Horton',
  slug: 'josh-horton',
  role: 'Coach & Founder',

  bioShort:
    '12 years under the iron. A decade of competitive bodybuilding. Josh built One More Coach to bring real, elite-level coaching to people who are done guessing and ready to see results.',

  bioFull: [
    "Josh Horton's journey into fitness didn't start from a place of perfection. It started with a challenge. Early on, he found himself struggling with consistency, unsure of how to structure training or make real progress. That frustration became a turning point. Instead of quitting, he leaned in, learning everything he could about training, nutrition, and discipline. Through his own transformation, both physically and mentally, Josh discovered not just a passion for fitness, but a deeper drive to help others avoid the same confusion and setbacks he once faced. That moment of clarity is what set him on the path to coaching.",
    "Over the years, Josh has built his coaching experience by working with a wide range of clients, from complete beginners to individuals looking to break through plateaus and reach the next level. His day-to-day is hands-on and intentional, programming workouts, reviewing check-ins, adjusting plans, and making sure every client is moving forward. He prioritizes communication and accountability, knowing that real progress comes from consistent effort paired with the right guidance. His approach isn't one-size-fits-all; it's built around each individual's goals, lifestyle, and starting point.",
    "Josh's coaching philosophy centers on doing the hard things, because that's where real growth happens. He believes that too many people overcomplicate fitness, when in reality, success comes from mastering the basics and staying consistent over time. His approach blends structured training with sustainable nutrition, focusing on long-term results rather than quick fixes. He pushes his clients to step outside their comfort zones while still meeting them where they are, creating a balance between challenge and support that drives lasting change.",
    "Outside of coaching, Josh loves what he teaches. He's someone who actively seeks out challenges, whether that's pushing his limits through runs, competing in bodybuilding shows, or testing his physical and mental endurance. At the same time, he values balance, spending quality time with his family and his wife keeps him grounded and connected. Above everything, what he enjoys most is helping people transform their lives, knowing that the impact goes far beyond just fitness.",
  ],

  certs: [], // Formal certs — §15 #6 open, leave empty until confirmed

  credentials: ['12 Years Training', 'Competitive Bodybuilder'],

  pullQuote:
    "My goal isn't just to give you a workout. It's to give you the blueprint for a complete lifestyle transformation.",

  headshotSrc: '/coach/josh-headshot.webp',
  headshotAlt:
    'Coach Josh Horton, smiling, arms crossed, wearing a black t-shirt.',

  fullLengthSrc: '/coach/josh-full.webp',
  fullLengthAlt:
    'Coach Josh Horton performing dumbbell biceps curls, side profile, wearing a black tank.',

  transformationSrc: null, // Phase 4

  isPlaceholder: false,
}
