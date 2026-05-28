/*
  Page copy — eyebrows, headings, subheadings, button labels.

  REBUILD_PLAN.md §2 principle 1 + §5: no headline lives in JSX.
  Every section heading on the site comes from this file (or, for
  per-program copy, from programs.ts).

  Hero headline is split into two halves so the accent line can render
  in <em> without putting layout in the data.
*/

export const copy = {
  hero: {
    eyebrow: 'Online Personal Coaching',
    headlineLine1: 'One more rep.',
    headlineLine2: 'One more % better.',
    sub: 'Custom online training, nutrition & coaching — built for your goals.',
    primaryCtaLabel: 'Apply',
    secondaryCtaLabel: 'See Results',
  },

  programsOverview: {
    eyebrow: 'What We Offer',
    title: 'Train In-Person or Online',
    sub: 'Face-to-face sessions or fully remote coaching — every program is built around your goals, your schedule, and your lifestyle.',
    inPersonDividerLabel: 'In-Person Training',
    onlineDividerLabel: 'Online Coaching',
  },

  included: {
    eyebrow: 'Everything You Need',
    title: "What's Included",
    sub: "No matter which program you choose, you're getting real coaching — not just a PDF.",
  },

  results: {
    eyebrow: 'Client Results',
    title: 'Real Clients. Real Results.',
    sub: 'These are actual transformations from people who showed up and put in the work.',
  },

  testimonials: {
    eyebrow: 'What Clients Say',
    title: 'The Results Speak',
    emptyStateNote: '', // intentionally blank — section hides when no testimonials yet
  },

  bioSnippet: {
    ctaLabel: 'Full Bio →',
  },

  applyCta: {
    eyebrow: 'Get Started',
    title: 'Ready to do one more?',
    sub: 'Apply below and Josh will reach out within 24 hours.',
  },

  instagramSection: {
    eyebrow: 'Follow Along',
    title: 'See the Work on Instagram',
    sub: 'Training clips, client results, and coaching content — follow along for a look inside the process.',
    buttonLabelPrefix: 'Follow', // suffixed with the handle from business.ts at render time
  },

  // -------------------- About page --------------------
  about: {
    storyTitle: 'The Story',
    howIHelp: {
      eyebrow: 'The Approach',
      title: 'How I Help You Win',
    },
    whyOnline: {
      eyebrow: 'Online & Effective',
      title: 'Why Online Coaching Works',
      sub: "The results are the same. The convenience is better. Here's why clients choose remote coaching over in-person.",
    },
    social: {
      eyebrow: 'Stay Connected',
      title: 'Follow the Journey',
      sub: 'Training content, client results, and the occasional dose of real talk — follow along on Instagram.',
    },
    bottomCta: {
      eyebrow: 'Ready?',
      title: "Let's Build Your Program",
      sub: 'Apply below and Josh will reach out within 24 hours to get you started.',
      ctaLabel: 'Apply for Coaching',
    },
    workWithCtaLabel: 'Work With Josh',
  },

  // -------------------- Programs page --------------------
  programsPage: {
    eyebrow: 'Coaching Programs',
    title: 'How Do You Want to Train?',
    sub: 'In-person sessions or online coaching from anywhere — both fully customized. Pick your path and Josh handles the rest.',
    whoItsForLabel: "Who It's For",
    whatsIncludedLabel: "What's Included",
    pricingLabel: 'Pricing',
    bottomCta: {
      eyebrow: 'Not Sure Which Program?',
      title: 'Apply and Josh Will Help You Choose',
      sub: 'Fill out the application form and explain your situation. Josh will match you to the right program — or build something custom.',
      ctaLabel: 'Apply for Coaching',
    },
  },

  // -------------------- In-person page --------------------
  inPersonPage: {
    eyebrow: 'In-Person Training',
    title: 'Train With Josh — In Person',
    sub: 'Face-to-face coaching with hands-on cueing every rep.',
    locationLabel: 'Location & Availability',
    onlineCta: {
      eyebrow: 'Not In-Person?',
      title: 'Online Coaching Available Anywhere',
      sub: 'Same coaching quality, any gym, any schedule. Train with Josh remotely with weekly check-ins and 24/7 access.',
      ctaLabel: 'View Online Programs',
    },
  },

  // -------------------- Apply page --------------------
  applyPage: {
    eyebrow: 'Get Started',
    title: 'Apply for Coaching',
    sub: 'Fill out the form below. Josh reviews every application personally and will reach out within 24 hours.',
    beforeYouApplyTitle: 'Before You Apply',
    responseTimeLabel: 'Response Time',
    responseTimeNote: 'Within 24 hours — usually same day.',
    responseBoxText:
      "Josh reads every application. No automated replies, no gatekeeping assistant — you'll hear from him directly within 24 hours of submitting.",
    whatHappensNextTitle: 'What Happens Next',
    formTitle: 'Application Form',
    formSubmitLabel: 'Submit Application',
    formNote:
      'No spam. Your info is only used to respond to your application. Josh will contact you directly within 24 hours.',
    prefillBannerText:
      "✓ Your selected plan is pre-filled below — update anything before submitting.",
    phaseStubNote:
      "Form submission lands in Phase 3. This page renders the full layout and pre-fills program/term from URL params.",
  },
} as const
