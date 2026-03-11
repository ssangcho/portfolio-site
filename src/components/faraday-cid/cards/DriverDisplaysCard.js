import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { transitions } from '../motionTokens';
import { useCIDState } from '../CIDStateContext';
import brightnessLow from '../../../assets/faraday/quick_svg/brightness.svg';
import brightnessHigh from '../../../assets/faraday/quick_svg/brightness_high.svg';

const data = QUICK_CARDS.driverDisplays;
const sliderTransition = transitions.sliderSnap;
const MIN_PCT = 5;
const MAX_PCT = 100;

function DriverDisplaysCard() {
  const { brightness: pct, setBrightness: setPct } = useCIDState();
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const updateFromPointer = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(Math.max(raw, MIN_PCT), MAX_PCT));
  }, []);

  const onDown = useCallback((e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  }, [updateFromPointer]);

  const onMove = useCallback((e) => {
    if (dragging.current) updateFromPointer(e.clientX);
  }, [updateFromPointer]);

  const onUp = useCallback(() => { dragging.current = false; }, []);

  return (
    <CIDCard title={data.title} size={data.size} hasChevron={data.hasChevron}>
      <div
        className="cid-brightness-track"
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        <div style={{ position: 'relative', width: 'var(--cid-icon-sm)', height: 'var(--cid-icon-sm)', flexShrink: 0, margin: '0 6px' }}>
          <img
            src={brightnessLow}
            alt=""
            className="cid-icon"
            style={{
              width: '100%', height: '100%',
              position: 'absolute', top: 0, left: 0,
              opacity: 1 - (pct / MAX_PCT),
              transition: 'opacity 0.15s linear',
            }}
          />
          <img
            src={brightnessHigh}
            alt=""
            className="cid-icon"
            style={{
              width: '100%', height: '100%',
              position: 'absolute', top: 0, left: 0,
              opacity: pct / MAX_PCT,
              transition: 'opacity 0.15s linear',
            }}
          />
        </div>
        <motion.div
          className="cid-brightness-fill"
          animate={{ flex: pct }}
          transition={sliderTransition}
        >
          <div className="cid-brightness-grip">
            <span className="cid-grip-line" />
            <span className="cid-grip-line" />
            <span className="cid-grip-line" />
          </div>
        </motion.div>
        <motion.div
          className="cid-brightness-empty"
          animate={{ flex: 100 - pct }}
          transition={sliderTransition}
        />
      </div>
    </CIDCard>
  );
}

export default DriverDisplaysCard;
