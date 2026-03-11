/* ── Faraday CID Motion Token System ──
 *
 * 3-Layer Motion Hierarchy + "Precision meets Luxury" character.
 * Framer Motion uses seconds; CSS uses milliseconds.
 *
 * NHTSA budget: single glance ≤ 2s → total transition ≤ ~430ms (21.5%)
 * Spec: motion-choreography-spec.md
 */

// ── Duration ──────────────────────────────────────────
export const duration = {
  instant:  0.05,   //  50ms — feedback snap
  fast:     0.15,   // 150ms — exit, quick feedback
  control:  0.20,   // 200ms — precision control interactions
  normal:   0.25,   // 250ms — indicator slide
  refined:  0.40,   // 400ms — luxury content enter, relaxed
  dissolve: 0.35,   // 350ms — luxury icon dissolve (+50ms hold)
  slow:     0.40,   // 400ms — max navigation budget
};

// ── Easing ────────────────────────────────────────────
export const easing = {
  // Base (MD3-derived)
  standard:    [0.2, 0, 0, 1],     // element visible throughout
  decelerate:  [0, 0, 0, 1],       // entering screen
  accelerate:  [0.3, 0, 1, 1],     // leaving screen
  linear:      [0, 0, 1, 1],       // opacity/color only

  // Faraday Character — Precision (high-tech, instant response)
  precision:       [0.0, 0, 0, 1],       // instant start, smooth stop
  precisionSnap:   [0, 0, 0.2, 0.8],     // micro-settle at endpoint

  // Faraday Character — Refinement (luxury, gentle glide)
  refinement:      [0.05, 0.7, 0.1, 1],  // emphasized decelerate
  refinementFade:  [0.1, 0, 0.4, 1],     // subtle ease on opacity
};

// ── Stagger ───────────────────────────────────────────
export const stagger = {
  navigation: 0.06,   // 60ms — refined card cascade, visible entrance
  dense:      0.05,   // 50ms — 12+ cards, relaxed pace
};

// ── Pre-composed Transitions ──────────────────────────
export const transitions = {
  // Layer 1: Navigation
  contentExit:    { duration: duration.fast,    ease: easing.accelerate },
  contentEnter:   { duration: duration.refined, ease: easing.refinement },
  indicatorSlide: { duration: duration.normal,  ease: easing.standard },

  // Layer 2: Control — Precision tone
  pillSlide:      { duration: duration.control, ease: easing.precision },
  modeSwitch:     { duration: duration.control, ease: easing.precision },
  sliderSnap:     { duration: duration.fast,    ease: easing.precisionSnap },

  // Layer 3: Feedback — Refinement tone
  iconDissolve:   { duration: duration.dissolve, ease: easing.refinementFade },
  stateChange:    { duration: duration.fast,     ease: easing.linear },
};

// ── Framer Motion Variants ────────────────────────────
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

// ── Directional Screen Slide Variants ─────────────────
// direction: 1 = forward (→), -1 = backward (←)
const SLIDE_DISTANCE = 60; // px — subtle slide, not full-screen swipe

export const screenSlideVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction * SLIDE_DISTANCE,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x:       { duration: duration.refined, ease: easing.refinement },
      opacity: { duration: duration.normal,  ease: easing.linear },
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction * -SLIDE_DISTANCE,
    transition: {
      x:       { duration: duration.fast, ease: easing.accelerate },
      opacity: { duration: duration.fast, ease: easing.linear },
    },
  }),
};
