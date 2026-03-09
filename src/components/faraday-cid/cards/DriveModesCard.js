import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { duration, easing } from '../motionTokens';
import explainerSvg from '../../../assets/faraday/quick_svg/Explainer Button.svg';

const data = QUICK_CARDS.driveModes;

// Divider position (%) per drive mode — clamped to 30–70 to avoid text overlap
const DIVIDER_RAW = {
  Eco: 33,
  Comfort: 50,
  Sport: 67,
  Hyper: 67,
  Launch: 33,
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const DIVIDER_MIN = 30;
const DIVIDER_MAX = 70;

const pillTransition = { duration: duration.normal, ease: easing.standard };

function DriveModesCard() {
  const [active, setActive] = useState(data.activeMode);
  const containerRef = useRef(null);
  const pillRefs = useRef({});
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const activeEl = pillRefs.current[active];
    if (!container || !activeEl) return;

    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    setIndicator({
      x: aRect.left - cRect.left,
      width: aRect.width,
    });
  }, [active]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const dividerPct = clamp(DIVIDER_RAW[active] ?? 50, DIVIDER_MIN, DIVIDER_MAX);

  return (
    <CIDCard title={data.title} size={data.size} hasChevron={data.hasChevron}>
      {/* ── Primary row: Eco / Comfort / Sport ── */}
      <div className="cid-sliding-pill-track" ref={containerRef}>
        <motion.div
          className="cid-sliding-pill-active"
          animate={{ x: indicator.x, width: indicator.width }}
          transition={pillTransition}
        />
        {data.modes.map((mode) => (
          <button
            key={mode}
            ref={(el) => { pillRefs.current[mode] = el; }}
            className={`cid-sliding-pill-label ${active === mode ? 'cid-sliding-pill-label--active' : ''}`}
            onClick={() => setActive(mode)}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* ── Secondary row: Hyper | Launch split capsule + Explainer ── */}
      <div className="cid-pill-row-secondary">
        <div className="cid-split-capsule">
          {/* Hyper: occupies left portion up to divider */}
          <motion.button
            className={`cid-split-capsule__btn ${active === 'Hyper' ? 'cid-split-capsule__btn--active' : ''}`}
            onClick={() => setActive('Hyper')}
            animate={{ flex: dividerPct }}
            transition={pillTransition}
          >
            Hyper
          </motion.button>
          {/* Animated divider */}
          <div className="cid-split-capsule__divider-wrap">
            <div className="cid-split-capsule__divider" />
          </div>
          {/* Launch: occupies right portion after divider */}
          <motion.button
            className={`cid-split-capsule__btn ${active === 'Launch' ? 'cid-split-capsule__btn--active' : ''}`}
            onClick={() => setActive('Launch')}
            animate={{ flex: 100 - dividerPct }}
            transition={pillTransition}
          >
            Launch
          </motion.button>
        </div>
        <button className="cid-explainer-btn">
          <img src={explainerSvg} alt="Info" />
        </button>
      </div>
    </CIDCard>
  );
}

export default DriveModesCard;
