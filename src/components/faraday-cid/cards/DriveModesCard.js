import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { transitions } from '../motionTokens';
import { useCIDState } from '../CIDStateContext';
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

const pillTransition = transitions.pillSlide;

function DriveModesCard() {
  const { driveMode: active, setDriveMode: setActive } = useCIDState();
  const [energySaver, setEnergySaver] = useState(false);
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
          <motion.div
            className="cid-split-capsule__btn"
            animate={{ flex: dividerPct }}
            transition={pillTransition}
          >
            Hyper
          </motion.div>
          <div className="cid-split-capsule__divider-wrap">
            <div className="cid-split-capsule__divider" />
          </div>
          <motion.div
            className="cid-split-capsule__btn"
            animate={{ flex: 100 - dividerPct }}
            transition={pillTransition}
          >
            Launch
          </motion.div>
        </div>
        <button className="cid-explainer-btn">
          <img src={explainerSvg} alt="Info" />
        </button>
      </div>

      {/* ── Energy Saver toggle ── */}
      <div className="cid-energy-saver">
        <span className="cid-energy-saver__label">Energy Saver</span>
        <button
          className={`cid-energy-saver__toggle ${energySaver ? 'cid-energy-saver__toggle--on' : ''}`}
          onClick={() => setEnergySaver(!energySaver)}
        >
          <motion.div
            className="cid-energy-saver__thumb"
            animate={{ x: energySaver ? 18 : 0 }}
            transition={pillTransition}
          />
        </button>
      </div>
    </CIDCard>
  );
}

export default DriveModesCard;
