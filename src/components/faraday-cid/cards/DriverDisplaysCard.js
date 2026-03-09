import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { duration, easing } from '../motionTokens';
import brightnessSvg from '../../../assets/faraday/quick_svg/brightness.svg';

const data = QUICK_CARDS.driverDisplays;
const sliderTransition = { duration: duration.normal, ease: easing.standard };
const MIN_PCT = 10;
const MAX_PCT = 85;

function DriverDisplaysCard() {
  const [pct, setPct] = useState(40);
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
        <img src={brightnessSvg} alt="Brightness" className="cid-brightness-icon-inside" />
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
