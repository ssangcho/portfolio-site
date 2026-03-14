/* ─── Site-wide text content ─── */
/* Edit here instead of hunting through components */

export const site = {
  name: 'Sangcho',
  tagline: 'Visual & Motion',
  navLinks: [
    { label: 'Works', to: '/' },
    { label: 'About', href: 'https://ssangcho.com/about/' },
  ],
  footerLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sangchoshin/' },
    { label: 'Email', href: 'mailto:ssangcho@gmail.com' },
  ],
  projects: [
    { label: 'All', to: '/' },
    { label: 'Faraday CID Motion System', to: '/faraday' },
    { label: 'Airbnb UI Motion Studies', to: '/airbnb' },
  ],
};

export const landing = {
  cards: [
    {
      to: '/faraday',
      thumbClass: 'landing-thumb--faraday',
      title: 'Faraday CID Motion System',
      desc: 'Motion system for in-vehicle touchscreen under NHTSA timing constraints',
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
      { name: 'stagger.step',     value: '35ms',                              usage: 'Per card delay (12 cards \u2264 420ms)' },
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
