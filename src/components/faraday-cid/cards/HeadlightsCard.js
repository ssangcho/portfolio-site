import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { duration, easing } from '../motionTokens';
import lightswitchOn from '../../../assets/faraday/quick_svg/lightswitch_on.svg';
import lightswitchOff from '../../../assets/faraday/quick_svg/lightswitch_off.svg';

const data = QUICK_CARDS.headlights;
const pillTransition = { duration: duration.normal, ease: easing.standard };

function HeadlightsCard() {
  const [active, setActive] = useState(data.active);
  const [iconOn, setIconOn] = useState(active === 'On' || active === 'Auto');
  const containerRef = useRef(null);
  const pillRefs = useRef({});
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const activeEl = pillRefs.current[active];
    if (!container || !activeEl) return;
    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();
    setIndicator({ x: aRect.left - cRect.left, width: aRect.width });
  }, [active]);

  useEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Icon: Off→off, On→on
  // Auto from Off: on → off → on
  // Auto from On: off → on
  const prevIconOn = useRef(iconOn);
  useEffect(() => {
    if (active === 'Off') {
      prevIconOn.current = false;
      setIconOn(false);
    } else if (active === 'On') {
      prevIconOn.current = true;
      setIconOn(true);
    } else if (active === 'Auto') {
      const wasOn = prevIconOn.current;
      if (wasOn) {
        // On → Auto: off, on
        setIconOn(false);
        const t1 = setTimeout(() => setIconOn(true), 500);
        return () => clearTimeout(t1);
      } else {
        // Off → Auto: on, off, on
        setIconOn(true);
        const t1 = setTimeout(() => setIconOn(false), 400);
        const t2 = setTimeout(() => setIconOn(true), 800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
      }
    }
  }, [active]);

  const iconSrc = iconOn ? lightswitchOn : lightswitchOff;

  return (
    <CIDCard size={data.size}>
      <div className="cid-card__header">
        <span className="cid-card__title">{data.title}</span>
        <img
          src={iconSrc}
          alt="Headlights"
          className="cid-icon"
          style={{ width: 18, height: 18, opacity: iconOn ? 1 : 0.25, transition: 'opacity 0.3s' }}
        />
      </div>
      <div className="cid-sliding-pill-track" ref={containerRef}>
        <motion.div
          className="cid-sliding-pill-active"
          animate={{ x: indicator.x, width: indicator.width }}
          transition={pillTransition}
        />
        {data.options.map((opt) => (
          <button
            key={opt}
            ref={(el) => { pillRefs.current[opt] = el; }}
            className={`cid-sliding-pill-label ${active === opt ? 'cid-sliding-pill-label--active' : ''}`}
            onClick={() => setActive(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </CIDCard>
  );
}

export default HeadlightsCard;
