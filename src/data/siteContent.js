/* ─── Site-wide text content ─── */
/* Edit here instead of hunting through components */

export const site = {
  name: 'Sangcho',
  tagline: 'Visual & Motion',
  navLinks: [
    { label: 'Works', to: '/' },
    { label: 'About', href: 'https://ssangcho.com/about/' },
  ],
};

export const landing = {
  cards: [
    {
      to: '/faraday',
      thumbClass: 'landing-thumb--faraday',
      title: 'Faraday CID Motion System',
      desc: 'In-vehicle display choreography + motion token system',
    },
    {
      to: '/airbnb',
      thumbClass: 'landing-thumb--airbnb',
      title: 'Airbnb UI Motion Studies',
      desc: 'Wishlist heart, translation toggle, gift cards',
    },
  ],
};

export const faraday = {
  hero: {
    title: ['Center Information Display', 'Motion System'],
    subtitle: 'In-vehicle display choreography for FF 91',
  },
  context: {
    label: 'Context',
    desc: 'Faraday Future\'s flagship EV, the FF 91, features a 15.4" center information display (CID) shared between driver and passenger. Five top-level tabs — Quick Controls, Climate, Doors, Energy, Seats — each surface different vehicle functions.',
  },
  tabNav: {
    title: '01_TAB NAVIGATION',
    subtitle: 'Choreographing screen transitions',
    challenge: 'When all content swaps simultaneously on tab change, the driver\'s eye has no guidance. Visual hierarchy collapses and cognitive load spikes at the worst possible moment.',
    solution: 'A sequenced choreography: tab indicator slides first, previous content fades, then new content staggers in card by card. Each phase directs attention to one thing at a time.',
  },
  tokenSystem: {
    label: 'Motion Token System',
    desc: 'Every duration, easing, and delay is defined as a reusable token. The system ensures consistency across all CID transitions and makes the motion language auditable.',
    tokens: [
      { name: 'duration.fast',   value: '150ms',                       usage: 'Content exit' },
      { name: 'duration.normal', value: '300ms',                       usage: 'Indicator move, content enter' },
      { name: 'duration.slow',   value: '400ms',                       usage: 'Max transition budget' },
      { name: 'ease.standard',   value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'All enter/exit' },
      { name: 'stagger.step',    value: '40ms',                        usage: 'Per card delay' },
    ],
  },
  timingCalc: {
    label: 'Timing Calculation',
    desc: 'Tokens compose into a full transition sequence. The total budget is capped by the slowest allowed duration.',
    rationale: 'NHTSA recommends in-vehicle glance time under 2 seconds. A 400ms transition budget keeps the entire interaction well within safe attention limits, allowing the driver to confirm the tab change in a single glance.',
  },
  mobileSync: {
    title: '02_CID ↔ MOBILE SYNC',
    subtitle: 'Cross-device system response',
    challenge: 'When the mobile app and CID respond independently, the two devices feel disconnected. There is no sense of a unified system.',
    solution: 'A deliberate timing offset between mobile input and CID response creates a causal rhythm. The user perceives one system, not two screens.',
    specLabel: 'Sync Timing Spec',
    specDesc: 'The delay between trigger and response is not latency. It is a designed interval that lets the brain register causality.',
    steps: [
      { label: 'TRIGGER',  ms: '—', desc: 'User taps control on mobile app' },
      { label: 'DELAY',    ms: '—', desc: 'Perceptual gap for causal connection' },
      { label: 'RESPONSE', ms: '—', desc: 'CID reflects the change' },
      { label: 'TOTAL',    ms: '—', desc: 'Full sync cycle' },
    ],
  },
  configurator: {
    title: '03_CONFIGURATOR',
    subtitle: 'Vehicle exterior in 3D',
  },
};
