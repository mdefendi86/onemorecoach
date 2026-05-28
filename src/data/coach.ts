import type { Coach } from '@/types/content'

/*
  Coach Josh Horton.

  Bio is written in first person from Josh's perspective per
  REBUILD_PLAN.md §15 #17. The site brand is still "One More Coach";
  Josh is the owner/coach — not a separate competing brand.

  Phase 2: bioShort, bioFull, credentials, pullQuote, and headshot are
  populated. Bio paragraphs were originally ported verbatim from the
  legacy about.html (third person) and rewritten in first person for
  the rebuild.

  Still TBD:
  - `certs` — formal certifications (REBUILD_PLAN.md §15 #6 open).
  - `transformationSrc` — pending image selection in Phase 4.
*/
export const coach: Coach = {
  name: 'Josh Horton',
  slug: 'josh-horton',
  role: 'Coach & Founder',

  bioShort:
    '12 years under the iron. A decade of competitive bodybuilding. I built One More Coach to bring real, elite-level coaching to people who are done guessing and ready to see results.',

  bioFull: [
    "My journey into fitness didn't start from a place of perfection. It started with a challenge. Early on, I found myself struggling with consistency, unsure of how to structure training or make real progress. That frustration became a turning point. Instead of quitting, I leaned in, learning everything I could about training, nutrition, and discipline. Through my own transformation, both physically and mentally, I discovered not just a passion for fitness, but a deeper drive to help others avoid the same confusion and setbacks I once faced. That moment of clarity is what set me on the path to coaching.",
    "Over the years, I've built my coaching experience by working with a wide range of clients, from complete beginners to individuals looking to break through plateaus and reach the next level. My day-to-day is hands-on and intentional — programming workouts, reviewing check-ins, adjusting plans, and making sure every client is moving forward. I prioritize communication and accountability, knowing that real progress comes from consistent effort paired with the right guidance. My approach isn't one-size-fits-all; it's built around each individual's goals, lifestyle, and starting point.",
    "My coaching philosophy centers on doing the hard things, because that's where real growth happens. I believe too many people overcomplicate fitness, when in reality, success comes from mastering the basics and staying consistent over time. My approach blends structured training with sustainable nutrition, focusing on long-term results rather than quick fixes. I push my clients to step outside their comfort zones while still meeting them where they are — creating a balance between challenge and support that drives lasting change.",
    "Outside of coaching, I love what I teach. I'm someone who actively seeks out challenges, whether that's pushing my limits through runs, competing in bodybuilding shows, or testing my physical and mental endurance. At the same time, I value balance — spending quality time with my family and my wife keeps me grounded and connected. Above everything, what I enjoy most is helping people transform their lives, knowing that the impact goes far beyond just fitness.",
  ],

  certs: [], // Formal certs — §15 #6 open, leave empty until confirmed

  credentials: ['12 Years Training', 'Competitive Bodybuilder'],

  pullQuote:
    "My goal isn't just to give you a workout. It's to give you the blueprint for a complete lifestyle transformation.",

  // TODO(phase-4): Replace with a true studio/profile portrait. The current
  // file is a phone-selfie starter (head + shoulders, smiling, plain wall)
  // approved at the project level — workable as a profile image but a proper
  // studio shoot would meaningfully upgrade the Meet Your Coach section and
  // the About page hero. Tracked in IMAGE_INVENTORY.md as Optional Upgrade.
  headshotSrc: '/coach/josh-headshot.webp',
  headshotAlt: 'Coach Josh Horton, smiling, arms crossed, wearing a black t-shirt.',

  fullLengthSrc: '/coach/josh-full.webp',
  fullLengthAlt:
    'Coach Josh Horton performing dumbbell biceps curls, side profile, wearing a black tank.',

  // Coaching-in-action image break used on the About page (REBUILD_PLAN.md §15 #18).
  // Distinct from the In-Person page hero so the same shot isn't reused across pages.
  actionShotSrc: '/coaching/coach-josh-hamstring-spot.webp',
  actionShotAlt: 'Coach Josh assisting a client through a single-leg hamstring curl in a gym.',

  transformationSrc: null, // Phase 4

  isPlaceholder: false,
}
