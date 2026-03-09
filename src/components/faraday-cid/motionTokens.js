/* ── Faraday CID Motion Token System ──
 *
 * All motion in the CID uses these tokens.
 * Framer Motion uses seconds; CSS uses milliseconds.
 * Keep both in sync.
 *
 * Rationale: NHTSA recommends in-vehicle glance time under 2 seconds.
 * Total transition budget: 400ms max.
 */

export const duration = {
  fast: 0.15,     // 150ms — content exit, quick state changes
  normal: 0.3,    // 300ms — indicator slide, content enter
  slow: 0.4,      // 400ms — max transition budget
};

export const easing = {
  standard: [0, 0, 0.2, 1],  // Material-style decelerate
};

export const stagger = {
  step: 0.04,       // 40ms per card
  stepDense: 0.025, // 25ms for screens with many cards (12+)
};

// Pre-composed transition presets
export const transitions = {
  contentExit: {
    duration: duration.fast,
    ease: easing.standard,
  },
  contentEnter: {
    duration: duration.normal,
    ease: easing.standard,
  },
  indicatorSlide: {
    duration: duration.normal,
    ease: easing.standard,
  },
};

// Framer Motion variants for cards
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.contentEnter,
  },
  exit: {
    opacity: 0,
    transition: transitions.contentExit,
  },
};
