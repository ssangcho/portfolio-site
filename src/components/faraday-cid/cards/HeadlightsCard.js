import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { transitions } from '../motionTokens';
import { useCIDState } from '../CIDStateContext';
import lightswitchOn from '../../../assets/faraday/quick_svg/lightswitch_on.svg';
import lightswitchOff from '../../../assets/faraday/quick_svg/lightswitch_off.svg';

const data = QUICK_CARDS.headlights;
const pillTransition = transitions.pillSlide;

// Dissolve speeds: luxury for Off↔On, fast for Auto blink
const DISSOLVE_LUXURY = 'opacity 0.35s cubic-bezier(0.1, 0, 0.4, 1)';
const DISSOLVE_BLINK  = 'opacity 0.12s linear';

function HeadlightsCard() {
  const { headlights: active, setHeadlights: setActive } = useCIDState();
  const [iconOn, setIconOn] = useState(active === 'On' || active === 'Auto');
  const [blinking, setBlinking] = useState(false);
  const containerRef = useRef(null);
  const pillRefs = useRef({});
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  const measure = useCallback(() => {
    const activeEl = pillRefs.current[active];
    if (!activeEl) return;
    setIndicator({ x: activeEl.offsetLeft, width: activeEl.offsetWidth });
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
      setBlinking(false);
      prevIconOn.current = false;
      setIconOn(false);
    } else if (active === 'On') {
      setBlinking(false);
      prevIconOn.current = true;
      setIconOn(true);
    } else if (active === 'Auto') {
      setBlinking(true);
      const wasOn = prevIconOn.current;
      if (wasOn) {
        // On → Auto: off, on
        setIconOn(false);
        const t1 = setTimeout(() => setIconOn(true), 200);
        const t2 = setTimeout(() => setBlinking(false), 350);
        return () => { clearTimeout(t1); clearTimeout(t2); };
      } else {
        // Off → Auto: on, off, on
        setIconOn(true);
        const t1 = setTimeout(() => setIconOn(false), 150);
        const t2 = setTimeout(() => setIconOn(true), 300);
        const t3 = setTimeout(() => setBlinking(false), 450);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
      }
    }
  }, [active]);

  return (
    <CIDCard size={data.size}>
      <div className="cid-card__header">
        <span className="cid-card__title">{data.title}</span>
        <div style={{ position: 'relative', width: 18, height: 18, flexShrink: 0 }}>
          <img
            src={lightswitchOff}
            alt=""
            className="cid-icon"
            style={{
              width: 18, height: 18,
              position: 'absolute', top: 0, left: 0,
              opacity: iconOn ? 0 : 0.25,
              transition: blinking ? DISSOLVE_BLINK : DISSOLVE_LUXURY,
            }}
          />
          <img
            src={lightswitchOn}
            alt=""
            className="cid-icon"
            style={{
              width: 18, height: 18,
              position: 'absolute', top: 0, left: 0,
              opacity: iconOn ? 1 : 0,
              transition: blinking ? DISSOLVE_BLINK : DISSOLVE_LUXURY,
            }}
          />
        </div>
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
