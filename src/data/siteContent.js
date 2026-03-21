/* ─── Site-wide text content ─── */
/* Edit here instead of hunting through components */

export const site = {
  name: 'Sangcho',
  tagline: 'Product UI Motion',
  navLinks: [
    { label: 'Works', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Resume', href: '/SangchoShin_Resume.pdf', download: true },
  ],
  footerLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sangchoshin/' },
    { label: 'Email', email: ['ssangcho', 'gmail.com'] },
  ],
  projects: [
    { label: 'All', to: '/' },
    { label: 'Faraday EV CID Motion System', to: '/faraday' },
    { label: 'OnCall Medical Platform', to: '/medical' },
    { label: 'Airbnb UI Motion Studies', to: '/airbnb' },
  ],
};

export const landing = {
  cards: [
    {
      to: '/faraday',
      thumbClass: 'landing-thumb--faraday',
      title: 'Faraday EV CID Motion System',
      desc: 'Motion system for in-vehicle touchscreen under NHTSA timing constraints',
    },
    {
      to: '/medical',
      thumbClass: 'landing-thumb--medical',
      title: 'OnCall Medical Platform',
      desc: 'Gusto meets Uber, a scheduling and payroll platform for hospitals and doctors',
    },
    {
      to: '/airbnb',
      thumbClass: 'landing-thumb--airbnb',
      title: 'Airbnb UI Motion Studies',
      desc: 'Micro-interaction studies: scroll-driven cards, toggle states, Lottie loops',
    },
  ],
};

export const airbnb = {
  role: {
    role: 'UI Motion Designer',
    scope: 'Visual design, micro-interaction design, Lottie animation, scroll-driven motion prototype',
    tools: 'After Effects, Lottie',
    type: 'Concept',
  },
};

export const medical = {
  hero: {
    title: ['OnCall', 'Medical Platform'],
    subtitle: 'Gusto meets Uber. A scheduling and earnings platform for hospitals and freelance anesthesiologists.',
  },
  role: {
    role: 'Product Designer / Motion Lead',
    scope: 'End-to-end product design, motion system, interactive prototype with real data',
    tools: 'Figma, Claude Code: React, Framer Motion, Supabase',
    type: 'Live Product (anonymized)',
  },

  /* ── Research & Discovery ── */
  research: {
    label: 'Research & Discovery',
    before: {
      headline: ['20+ cases a day.', 'All-day process.'],
      parties: [
        { name: 'Hospitals', pain: 'request and wait.' },
        { name: 'Coordinators', pain: 'call, check, retry.' },
        { name: 'Doctors', pain: 'no control over their own schedule.' },
      ],
    },
    after: {
      headline: ['20+ cases a day.', 'Minutes, not hours.'],
      subtitle: 'One platform. Real-time. Accurate. Automated.',
    },
    portals: [
      {
        name: 'Hospital',
        quote: 'We just need a doctor for our surgery.',
        desc: 'One page, mobile-first. Request, check status, done.',
      },
      {
        name: 'Coordinator',
        quote: 'By the time I confirm one doctor, three things have changed.',
        desc: '20+ assignments a day from one screen. AI for the routine ones.',
      },
      {
        name: 'Doctor',
        quote: 'Where do I go, and how much am I making?',
        desc: 'Today\'s cases with directions. Earnings at a glance. Block days in one tap.',
      },
    ],
    myRole: 'I worked alongside the people running this. Designed every animation to get each user to their answer faster. Nothing moves without a reason.',
  },

  /* ── 01. First Impression ── */
  section01: {
    title: '01_FIRST IMPRESSION',
    subtitle: 'Three portals, one entry point',
  },
  challenge01: {
    label: 'Portal Selection',
    challenge: 'Three user types, one landing screen. Find your door in under a second.',
    solution: 'Three panels, three colors. Motion here is wayfinding, not decoration.',
  },

  /* ── 02. At a Glance ── */
  section02: {
    title: '02_AT A GLANCE',
    subtitle: 'What matters most, shown first',
  },
  challenge02: {
    label: 'Information Hierarchy',
    challenge: '7am. A coordinator needs three numbers: unassigned cases, time to next surgery, weekly revenue. Everything loads at once and she scans instead of acting.',
    solution: 'The screen builds in order of urgency. Status lands first, then the countdown, then revenue and detail. The build order matches her decision order.',
  },

  /* ── 03. AI-Assisted Workflow ── */
  section03: {
    title: '03_AI-ASSISTED WORKFLOW',
    subtitle: 'Making automation feel trustworthy',
  },
  challenge03: {
    label: 'AI Assignment',
    challenge: '20 cases a day, each with different variables. AI handles the routine matches. But if you press a button and a number quietly changes, you don\'t trust it.',
    solution: 'I made the machine\'s work visible. Countdown shows progress, color shift confirms completion, pulse marks the moment it\'s safe to move on.',
  },

  /* ── 04. Direct Manipulation ── */
  section04: {
    title: '04_HUMAN IN THE LOOP',
    subtitle: 'Drag-and-drop assignment for edge cases',
  },
  challenge04: {
    label: 'Drag & Drop',
    challenge: 'AI handles the routine, but edge cases need a human. The coordinator places each one manually. It has to feel instant on the 100th drop.',
    solution: 'Four beats: grab, highlight, drop, confirm. A pulse on the settled row catches the eye without interrupting the next drag.',
  },

  /* ── 05. The Doctor's View ── */
  section05: {
    title: '05_THE DOCTOR\'S VIEW',
    subtitle: 'Designed for a one-person business',
  },
  challenge05: {
    label: 'Doctor Dashboard',
    challenge: 'Freelancers, not employees. Schedule equals income. At 6am they need two things: where do I go, and how much have I made.',
    solution: 'Built around right now. Next case pulses, done cases fade, everything else stays out of the way.',
  },

  /* ── Token System ── */
  tokenSystem: {
    label: 'Motion Token System',
    desc: 'Every value is a deliberate choice. Coordinators use this tool under time pressure, so each animation earns its milliseconds or gets cut.',
    highlights: [
      {
        name: 'ease.drop',
        value: 'cubic-bezier(.2, 1.4, .4, 1)',
        title: 'Drop Settle',
        why: 'When a case is dragged and released, it overshoots the target row then snaps back. The overshoot is the confirmation: it landed. Without it, the row just appears and the coordinator second-guesses whether the drop registered.',
      },
      {
        name: 'duration.emphasis',
        value: '300ms',
        title: 'Status Pulse',
        why: 'The AI countdown turns the donut from amber to green. 300ms is long enough to register as a deliberate color shift, not a glitch. Shorter and it looks like a rendering artifact. Longer and it slows down a flow the coordinator repeats 20 times a day.',
      },
      {
        name: 'stagger.row',
        value: '30ms',
        title: 'Row Cascade',
        why: '30ms per row means 12 rows cascade in 360ms. The eye can track each row arriving without the whole table feeling slow. At 50ms the cascade drags. At 15ms the rows blur together and the stagger loses its purpose.',
      },
    ],
    tokens: [
      { name: 'duration.instant',   value: '50ms',          usage: 'Hover, press: instant feedback' },
      { name: 'duration.fast',      value: '150ms',         usage: 'Dismiss, close, chip return' },
      { name: 'duration.normal',    value: '250ms',         usage: 'Modal open, form expand' },
      { name: 'duration.emphasis',  value: '300ms',         usage: 'Status color pulse' },
      { name: 'duration.counter',   value: '600ms',         usage: 'Stat counter count-up' },
      { name: 'ease.enter',         value: 'ease-out',      usage: 'Elements appearing' },
      { name: 'ease.exit',          value: 'ease-in',       usage: 'Elements leaving' },
      { name: 'ease.counter',       value: 'easeOutCubic',  usage: 'Counter: fast start, decelerate' },
      { name: 'duration.drag',      value: '120ms',         usage: 'Drag pickup scale + shadow lift' },
      { name: 'ease.drop',          value: 'cubic-bezier(.2,1.4,.4,1)', usage: 'Drop settle: overshoot then snap' },
      { name: 'stagger.chip',       value: '30ms',          usage: 'Stat chip cascade' },
      { name: 'stagger.row',        value: '30ms',          usage: 'Table row cascade' },
    ],
  },

  /* ── Outcome ── */
  outcome: {
    label: 'Outcome',
    stats: [
      { label: 'Portals', value: '3', desc: 'Hospital, Admin, Doctor' },
      { label: 'Hospitals', value: '20', desc: 'LA area, real addresses' },
      { label: 'Surgery Cases', value: '640+', desc: '' },
      { label: 'Active Doctors', value: '45', desc: '' },
      { label: 'Motion Tokens', value: '12', desc: '' },
      { label: 'Interaction Target', value: '<400ms', desc: 'Every transition' },
    ],
  },
};

export const faraday = {
  hero: {
    title: ['Center Information Display', 'Motion System'],
    subtitle: 'How I defined motion for a shared in-vehicle touchscreen',
  },
  role: {
    role: 'UI Motion Designer',
    scope: 'Sole motion designer. I defined the choreography, built the token system, wrote the timing spec, and produced prototype videos for engineering handoff.',
    tools: 'After Effects, Figma, Lottie',
    type: 'Concept',
  },
  context: {
    label: 'Context',
    desc: 'The FF 91 has a 15.4" center screen shared between driver and passenger. Six tabs across the top: Quick Controls, Doors, Energy, Lights, Seats, Settings. There was no unified motion system yet, so I built one.',
  },
  /* ── Section 01: CID Motion System ── */
  section01: {
    title: '01_CID MOTION SYSTEM',
    subtitle: 'A motion language for in-vehicle interaction',
  },
  challengeA: {
    label: 'Navigation Choreography',
    challenge: 'When everything moves at once, the driver\'s eye has nowhere to go. A tab switch shouldn\'t require scanning the whole screen again.',
    solution: 'I broke the transition into three phases: indicator slides first, old content fades, then new cards stagger in. One thing moves at a time, so the eye always knows where to land.',
  },
  challengeB: {
    label: 'Brand Motion Identity',
    challenge: 'NHTSA\'s 2-second glance rule caps transitions at 400ms. Material Design defaults fit the budget, but they feel like every other car.',
    solution: 'I defined two curve characters that share the same time budget.\nPrecision: fast and sharp, for controls the driver taps directly.\nRefinement: slow deceleration, for system-level transitions.\nSame duration, different feel.',
  },
  challengeC: {
    label: 'State Feedback',
    challenge: 'Color alone shows state, but I wanted stronger confirmation. When a driver taps a control, there should be no question about what just changed.',
    solution: 'The card responds first, then the icon follows with a staggered animation. Two beats instead of one, so the eye catches it twice.',
  },
  tokenSystem: {
    label: 'Motion Token System',
    desc: 'Every duration, easing, and delay is a named token. If something feels off on any screen, you can trace it back to one value and fix it there.',
    tokens: [
      { name: 'duration.fast',    value: '150ms',                             usage: 'Content exit, quick state change' },
      { name: 'duration.control', value: '200ms',                             usage: 'Direct control response (pill slide, slider)' },
      { name: 'duration.normal',  value: '300ms',                             usage: 'Indicator move, content enter' },
      { name: 'duration.slow',    value: '400ms',                             usage: 'Max transition budget (NHTSA)' },
      { name: 'ease.precision',   value: 'cubic-bezier(0, 0, 0, 1)',         usage: 'Direct controls (sharp response)' },
      { name: 'ease.refinement',  value: 'cubic-bezier(0.05, 0.7, 0.1, 1)',  usage: 'System transitions (luxury deceleration)' },
      { name: 'stagger.navigation', value: '40ms',                              usage: 'Per card delay (12 cards \u2264 440ms)' },
    ],
  },
  timingCalc: {
    label: 'Timing Calculation',
    desc: 'Tokens compose into a full transition sequence. The total is capped by the slowest allowed duration.',
    rationale: 'NHTSA says a driver\'s glance should stay under 2 seconds. A 400ms transition budget means they can confirm the tab change without looking twice.',
  },
  /* ── Section 02: Configurator ── */
  configurator: {
    title: '02_CONFIGURATOR',
    subtitle: 'Real-time 3D vehicle configurator in Unreal Engine 5',
    context: 'I built a full CG environment for the FF 91 launch key visual, then reused those assets for a VR showroom prototype and a real-time configurator. The project didn\'t reach production, but the pipeline from key visual to interactive prototype proved the approach worked.',
  },
};
