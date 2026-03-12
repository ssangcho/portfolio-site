import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { screenSlideVariants } from '../motionTokens';
import { useLongPress } from '../useLongPress';
import lockOpenSvg from '../../../assets/faraday/quick_svg/lock-open.svg';
// lockLockedSvg reserved for future Lock All icon state
// import lockLockedSvg from '../../../assets/faraday/quick_svg/lock_locked.svg';
import popAllSvg from '../../../assets/faraday/doors_svg/popall.svg';
import openAllSvg from '../../../assets/faraday/doors_svg/openall.svg';
import closeAllSvg from '../../../assets/faraday/doors_svg/door-close.svg';
import hoodOpenSvg from '../../../assets/faraday/doors_svg/hood-open.svg';
import liftgateSvg from '../../../assets/faraday/doors_svg/liftgate-open.svg';
import chargePortSvg from '../../../assets/faraday/doors_svg/charging-port.svg';
import topdownCar from '../../../assets/faraday/doors_svg/Topdown.png';
import trunkOpenImg from '../../../assets/faraday/doors_svg/TrunkOpen.png';

/* ── Door frame sequence (01=barely open → 08=fully open) ── */
import frame1 from '../../../assets/faraday/doors_svg/dooropen01.png';
import frame2 from '../../../assets/faraday/doors_svg/dooropen02.png';
import frame3 from '../../../assets/faraday/doors_svg/dooropen03.png';
import frame4 from '../../../assets/faraday/doors_svg/dooropen04.png';
import frame5 from '../../../assets/faraday/doors_svg/dooropen05.png';
import frame6 from '../../../assets/faraday/doors_svg/dooropen06.png';
import frame7 from '../../../assets/faraday/doors_svg/dooropen07.png';
import frame8 from '../../../assets/faraday/doors_svg/dooropen08.png';

const FRAMES = [topdownCar, frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8];
const POP_FRAME = 3;       // Pop All target (slightly ajar)
const OPEN_FRAME = 8;      // Open All target (fully open)
const CLOSED_FRAME = 0;    // Closed state

/* ── Frame delay generators ── */
function linearDelays(steps, totalMs) {
  return Array(steps).fill(totalMs / steps);
}

function easeOutDelays(steps, totalMs) {
  // fast start → slow end (quadratic weight)
  const weights = [];
  for (let i = 0; i < steps; i++) {
    weights.push(Math.pow((i + 1) / steps, 2));
  }
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => (w / sum) * totalMs);
}

const BG_ON       = '#404144';
const BG_OFF      = '#2A2B2E';
const BG_WIPE     = '#2A2B2E';
const COLOR_ON    = '#C9C9D1';
const COLOR_OFF   = '#646669';

/* ── Long-press action pill ── */
function ActionPill({ label, icon, onComplete, dim }) {
  const { progress, pressing, filled, handlers } = useLongPress(onComplete, 1500);
  const showWipe = pressing || filled;

  return (
    <div className="doors-action-pill-wrap" {...handlers}>
      <div
        className={`doors-action-pill${dim ? ' doors-action-pill--dim' : ''}`}
        style={{
          background: dim ? BG_OFF : BG_ON,
          color: dim ? COLOR_OFF : COLOR_ON,
        }}
      >
        <span className="doors-action-pill__icon">{icon}</span>
        <span className="doors-action-pill__label">{label}</span>
        {showWipe && (
          <div
            className="doors-action-pill__wipe"
            style={{
              background: dim ? BG_ON : BG_WIPE,
              clipPath: filled
                ? 'inset(0 0 0 0)'
                : `inset(0 ${100 - progress * 100}% 0 0)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Door control pill button (Pop / Close) ── */
function DoorBtn({ label, icon, onComplete }) {
  const { progress, pressing, filled, handlers } = useLongPress(onComplete, 1500);
  const showWipe = pressing || filled;

  return (
    <div className="doors-btn" {...handlers}>
      {icon && <span className="doors-btn__icon">{icon}</span>}
      <span className="doors-btn__label">{label}</span>
      {showWipe && (
        <div
          className="doors-btn__wipe"
          style={{
            background: BG_WIPE,
            clipPath: filled
              ? 'inset(0 0 0 0)'
              : `inset(0 ${100 - progress * 100}% 0 0)`,
          }}
        />
      )}
    </div>
  );
}

/* ── Icon tile (Frunk / Trunk) — with long-press wipe + active state ── */
function IconTile({ children, onComplete, active }) {
  const { progress, pressing, filled, handlers } = useLongPress(onComplete, 1500);
  const showWipe = pressing || filled;
  const wipeBg = active ? '#353538' : '#404144';

  return (
    <div className={`doors-icon-tile${active ? ' doors-icon-tile--active' : ''}`} {...handlers}>
      {children}
      {showWipe && (
        <div
          className="doors-icon-tile__wipe"
          style={{
            background: wipeBg,
            clipPath: filled
              ? 'inset(0 0 0 0)'
              : `inset(${100 - progress * 100}% 0 0 0)`,
          }}
        />
      )}
    </div>
  );
}

/* ── Frame sequence hook ── */
function useFrameAnimation() {
  const [frameIndex, setFrameIndex] = useState(CLOSED_FRAME);
  const [animating, setAnimating] = useState(false);
  const frameRef = useRef(CLOSED_FRAME);
  const timerRef = useRef(null);

  const stopAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * @param {number} target - target frame index
   * @param {number[]} delays - per-step delay array (ms)
   */
  const animateToFrame = useCallback((target, delays) => {
    stopAnimation();

    const startFrame = frameRef.current;
    const totalSteps = Math.abs(target - startFrame);
    if (totalSteps === 0) return;

    const direction = target > startFrame ? 1 : -1;
    // fallback: even 100ms if no delays provided
    const stepDelays = delays || linearDelays(totalSteps, totalSteps * 100);

    setAnimating(true);
    let step = 0;

    const tick = () => {
      if (step >= totalSteps) {
        setAnimating(false);
        timerRef.current = null;
        return;
      }
      timerRef.current = setTimeout(() => {
        frameRef.current += direction;
        setFrameIndex(frameRef.current);
        step++;
        tick();
      }, stepDelays[step]);
    };
    tick();
  }, [stopAnimation]);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  return { frameIndex, frameRef, animating, animateToFrame };
}

function DoorsScreen({ direction }) {
  const [locked, setLocked] = useState(true);
  const [trunkOpen, setTrunkOpen] = useState(false);
  const { frameIndex, frameRef, animating, animateToFrame } = useFrameAnimation();

  const isFullyOpen = frameIndex === OPEN_FRAME;
  const isClosed = frameIndex === CLOSED_FRAME;

  /* ── Button handlers ── */
  const handleUnlock = useCallback(() => {
    setLocked(false);
  }, []);

  const handleLock = useCallback(() => {
    setLocked(true);
    const steps = Math.abs(CLOSED_FRAME - frameRef.current);
    if (steps > 0) animateToFrame(CLOSED_FRAME, linearDelays(steps, 2000));
  }, [animateToFrame, frameRef]);

  const handlePop = useCallback(() => {
    if (animating) return;
    setLocked(false);
    const steps = Math.abs(POP_FRAME - frameRef.current);
    if (steps === 0) return;
    animateToFrame(POP_FRAME, steps === 3 ? [60, 80, 90] : easeOutDelays(steps, 230));
  }, [animating, animateToFrame, frameRef]);

  const handleOpen = useCallback(() => {
    if (animating) return;
    setLocked(false);
    const steps = Math.abs(OPEN_FRAME - frameRef.current);
    if (steps === 0) return;
    animateToFrame(OPEN_FRAME, linearDelays(steps, 800));
  }, [animating, animateToFrame, frameRef]);

  const handleClose = useCallback(() => {
    if (animating) return;
    const steps = Math.abs(CLOSED_FRAME - frameRef.current);
    if (steps === 0) return;
    animateToFrame(CLOSED_FRAME, linearDelays(steps, 2000));
  }, [animating, animateToFrame, frameRef]);

  /* ── Per-door toggles (individual controls around car) ── */
  const toggleDoor = useCallback(() => {
    if (animating) return;
    const target = frameIndex >= 4 ? CLOSED_FRAME : OPEN_FRAME;
    const steps = Math.abs(target - frameRef.current);
    if (steps === 0) return;
    const delays = target === CLOSED_FRAME
      ? linearDelays(steps, 2000)
      : linearDelays(steps, 800);
    animateToFrame(target, delays);
  }, [animating, animateToFrame, frameIndex, frameRef]);

  return (
    <motion.div
      className="doors-screen"
      variants={screenSlideVariants}
      custom={direction}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Action bar — 4 pill buttons */}
      <div className="doors-action-bar">
        <ActionPill
          label={locked ? 'Unlock All' : 'Lock All'}
          icon={<img src={lockOpenSvg} alt="" className="doors-action-pill__svg" />}
          onComplete={locked ? handleUnlock : handleLock}
        />
        <ActionPill
          label="Pop All"
          icon={<img src={popAllSvg} alt="" className="doors-action-pill__svg" />}
          onComplete={handlePop}
          dim={locked || isFullyOpen}
        />
        <ActionPill
          label="Open All"
          icon={<img src={openAllSvg} alt="" className="doors-action-pill__svg" />}
          onComplete={handleOpen}
          dim={locked || isFullyOpen}
        />
        <ActionPill
          label="Close All"
          icon={<img src={closeAllSvg} alt="" className="doors-action-pill__svg" />}
          onComplete={handleClose}
          dim={locked || isClosed}
        />
      </div>

      {/* Vehicle area */}
      <div className="doors-vehicle-area">
        {/* Car frame — trunk open overrides door sequence */}
        <img
          src={trunkOpen ? trunkOpenImg : FRAMES[frameIndex]}
          alt=""
          className="doors-car-img"
        />

        {/* Radial ring — circle + all controls positioned relative to circle center */}
        <div className="doors-radial-ring">
          <div className="doors-circle-bg" />

          {/* Frunk — 0° */}
          <div className="doors-ctrl doors-ctrl--frunk">
            <IconTile onComplete={toggleDoor}><img src={hoodOpenSvg} alt="" className="doors-icon-tile__svg" /></IconTile>
          </div>

          {/* FL Pop — ~315° */}
          <div className="doors-ctrl doors-ctrl--fl-pop">
            <DoorBtn label="Pop" onComplete={toggleDoor} />
          </div>
          {/* FL Close — ~295° */}
          <div className="doors-ctrl doors-ctrl--fl-close">
            <DoorBtn label="Close" onComplete={toggleDoor} />
          </div>

          {/* FR Pop — ~45° */}
          <div className="doors-ctrl doors-ctrl--fr-pop">
            <DoorBtn label="Pop" onComplete={toggleDoor} />
          </div>
          {/* FR Close — ~65° */}
          <div className="doors-ctrl doors-ctrl--fr-close">
            <DoorBtn label="Close" onComplete={toggleDoor} />
          </div>

          {/* RL Close — ~245° */}
          <div className="doors-ctrl doors-ctrl--rl-close">
            <DoorBtn label="Close" onComplete={toggleDoor} />
          </div>
          {/* RL Pop — ~225° */}
          <div className="doors-ctrl doors-ctrl--rl-pop">
            <DoorBtn label="Pop" onComplete={toggleDoor} />
          </div>

          {/* RR Close — ~115° */}
          <div className="doors-ctrl doors-ctrl--rr-close">
            <DoorBtn label="Close" onComplete={toggleDoor} />
          </div>
          {/* RR Pop — ~135° */}
          <div className="doors-ctrl doors-ctrl--rr-pop">
            <DoorBtn label="Pop" onComplete={toggleDoor} />
          </div>

          {/* Trunk/Liftgate — 180° */}
          <div className="doors-ctrl doors-ctrl--trunk-icon">
            <IconTile onComplete={() => setTrunkOpen(v => !v)} active={trunkOpen}><img src={liftgateSvg} alt="" className="doors-icon-tile__svg" /></IconTile>
          </div>

          {/* Charge port — ~150° */}
          <div className="doors-ctrl doors-ctrl--charge-port">
            <DoorBtn
              label="Open"
              icon={<img src={chargePortSvg} alt="" className="doors-btn__svg" />}
              onComplete={toggleDoor}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DoorsScreen;
