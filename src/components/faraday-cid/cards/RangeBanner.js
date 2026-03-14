import { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';

const RANGE_PCT = 72;
const TARGET_PCT = 80;
const DURATION_TEXT = '3 hr 45 min';
const EASE = [0.25, 0.1, 0.25, 1];

function RangeBanner() {
  const [pct, setPct] = useState('00');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    animate(0, RANGE_PCT, {
      duration: 0.4,
      ease: EASE,
      onUpdate: (v) => setPct(String(Math.round(v)).padStart(2, '0')),
    });
  }, []);

  return (
    <div className="cid-range-banner">
      {/* Top row: Range info + charging info */}
      <div className="cid-range-banner__row">
        <div className="cid-range-banner__left">
          <span className="cid-range-banner__label">Range</span>
          <div className="cid-range-banner__value">
            <span className="cid-range-banner__number">{pct}</span>
            <span className="cid-range-banner__unit">%</span>
          </div>
        </div>
        <div className="cid-range-banner__right">
          <div className="cid-range-banner__col">
            <span className="cid-range-banner__info-label">Target:</span>
            <span className="cid-range-banner__info-label">Duration:</span>
            <span className="cid-range-banner__info-sub">(Estimate)</span>
          </div>
          <div className="cid-range-banner__col">
            <span className="cid-range-banner__info-value">{TARGET_PCT}%</span>
            <span className="cid-range-banner__info-value">{DURATION_TEXT}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="cid-range-banner__bar-track">
        <motion.div
          className="cid-range-banner__bar-fill"
          initial={{ width: '0%' }}
          animate={{ width: `${RANGE_PCT}%` }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Leading circle at the end of fill */}
          <div className="cid-range-banner__bar-dot" />
          {/* Soft white glow trailing behind the dot */}
          <div className="cid-range-banner__bar-glow" />
        </motion.div>
      </div>
    </div>
  );
}

export default RangeBanner;
