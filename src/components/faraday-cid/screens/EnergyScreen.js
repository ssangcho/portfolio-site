import { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { cardVariants, screenSlideVariants } from '../motionTokens';
import { useLongPress } from '../useLongPress';
import carRear from '../../../assets/faraday/doors_svg/Car-Rear.png';
import carPortClosed from '../../../assets/faraday/doors_svg/Charge PortClosed.png';

const RANGE_MI = 372;
const TARGET_PCT = 82;
const FILL_PCT = 68; // green bar fill percentage

/* ── Long-press charging button ── */
const WIPE_TO_OFF = '#404144';   // Stop → Start: off 상태 배경으로 wipe
const WIPE_TO_ON = '#9A9A9E';    // Start → Stop: 옅은 회색 wipe

function ChargingBtn({ label, active, onComplete }) {
  const { progress, pressing, filled, handlers } = useLongPress(onComplete, 1500);
  const showWipe = pressing || filled;
  const wipeBg = active ? WIPE_TO_OFF : WIPE_TO_ON;

  return (
    <div className={`energy-charging__stop ${!active ? 'energy-charging__stop--off' : ''}`} {...handlers}>
      <span className="energy-charging__stop-label">{label}</span>
      {showWipe && (
        <div
          className="energy-charging__stop-wipe"
          style={{
            background: wipeBg,
            clipPath: filled
              ? 'inset(0 0 0 0)'
              : `inset(0 ${100 - progress * 100}% 0 0)`,
          }}
        />
      )}
    </div>
  );
}

function EnergyScreen({ direction }) {
  const [rangeVal, setRangeVal] = useState(0);
  const [isCharging, setIsCharging] = useState(true);
  const [energySaver, setEnergySaver] = useState(false);
  const [currentAmps, setCurrentAmps] = useState(15);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    animate(0, RANGE_MI, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setRangeVal(Math.round(v)),
    });
  }, []);

  return (
    <motion.div
      className="energy-screen"
      variants={screenSlideVariants}
      custom={direction}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ── Range section ── */}
      <motion.div className="energy-range" variants={cardVariants}>
        <div className="energy-range__row">
          <div className="energy-range__left">
            <span className="energy-range__label">Range</span>
            <div className="energy-range__value">
              <span className="energy-range__number">{rangeVal}</span>
              <span className="energy-range__unit">mi</span>
            </div>
          </div>
          <div className="energy-range__right">
            <span className="energy-range__target">Target:  {TARGET_PCT}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="energy-range__bar-track">
          <motion.div
            className="energy-range__bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${FILL_PCT}%` }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.div
            className="energy-range__bar-target"
            initial={{ left: '15%' }}
            animate={{ left: `${TARGET_PCT}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Target pill — animates with dot */}
        <motion.div
          className="energy-range__target-pill-row"
          initial={{ left: '15%' }}
          animate={{ left: `${TARGET_PCT}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="energy-range__target-pill">
            <span className="energy-range__target-arrow">‹</span>
            <span className="energy-range__target-label">Target</span>
            <span className="energy-range__target-arrow">›</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Charging section — 2 columns ── */}
      <motion.div className="energy-charging" variants={cardVariants}>
        <div className="energy-charging__left">
          <svg className={`energy-charging__bolt-icon${isCharging ? ' energy-charging__bolt-icon--active' : ''}`} width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M11 1L2 14h7l-1 9 9-13h-7l1-9z" stroke={isCharging ? '#4CAF50' : '#646669'} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          </svg>
          <h2 className="energy-charging__title">Level 2 Charging</h2>
          <span className="energy-charging__sub">3 hrs remaining</span>
          <ChargingBtn
            label={isCharging ? 'Stop Charging' : 'Start Charging'}
            active={isCharging}
            onComplete={() => setIsCharging((v) => !v)}
          />
        </div>
        <div className="energy-charging__right">
          <div className="energy-charging__car-wrap">
            <img src={isCharging ? carRear : carPortClosed} alt="" className="energy-charging__car" />
            {isCharging && (
              <svg className="energy-charging__pulse-svg" viewBox="0 0 620 485" fill="none">
                {/* 충전포트 glow — cx,cy,r 조정 */}
                <circle cx="509" cy="255" r="18" className="energy-charging__pulse-dot" />
              </svg>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Bottom cards — 2 columns ── */}
      <motion.div className="energy-cards" variants={cardVariants}>
        {/* Energy Saver */}
        <div className="energy-card">
          <div className="energy-card__header">
            <span className="energy-card__title">Energy Saver</span>
            <button
              className={`energy-card__toggle ${energySaver ? 'energy-card__toggle--on' : ''}`}
              onClick={() => setEnergySaver((v) => !v)}
            >
              <motion.div
                className="energy-card__thumb"
                animate={{ x: energySaver ? 18 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          <p className="energy-card__desc">
            Climate and vehicle performance will be reduced to maximize energy saving.
          </p>
        </div>

        {/* Current Energy */}
        <div className="energy-card">
          <span className="energy-card__title">Current Energy</span>
          <div className="energy-card__stepper">
            <button className="energy-card__stepper-btn" onClick={() => setCurrentAmps((v) => Math.max(1, v - 1))}>−</button>
            <span className="energy-card__stepper-val">{currentAmps} A</span>
            <button className="energy-card__stepper-btn" onClick={() => setCurrentAmps((v) => Math.min(48, v + 1))}>+</button>
          </div>
        </div>
      </motion.div>

      {/* ── Current Charging Session ── */}
      <motion.div className="energy-session" variants={cardVariants}>
        <h3 className="energy-session__title">Current Charging Session</h3>
        <div className="energy-session__grid">
          <div className="energy-session__item">
            <span className="energy-session__label">Power (EVSE)</span>
            <div className="energy-session__row">
              <span className="energy-session__val">12</span>
              <span className="energy-session__unit">mi/kWh</span>
              <span className="energy-session__delta">+0.025 kWh</span>
            </div>
          </div>
          <div className="energy-session__item">
            <span className="energy-session__label">Avg. Rate, Mileage</span>
            <div className="energy-session__row">
              <span className="energy-session__val">12</span>
              <span className="energy-session__unit">mi/hr</span>
              <span className="energy-session__delta">+5 mi</span>
            </div>
          </div>
          <div className="energy-session__item">
            <span className="energy-session__label">Voltage (EVSE), Current (EVSE)</span>
            <div className="energy-session__row">
              <span className="energy-session__val">239</span>
              <span className="energy-session__unit">V</span>
              <span className="energy-session__val" style={{ marginLeft: 12 }}>30</span>
              <span className="energy-session__unit">A</span>
            </div>
          </div>
          <div className="energy-session__item">
            <span className="energy-session__label">Duration, End</span>
            <div className="energy-session__row">
              <span className="energy-session__val">3</span>
              <span className="energy-session__unit">hr</span>
              <span className="energy-session__val" style={{ marginLeft: 4 }}>45</span>
              <span className="energy-session__unit">min</span>
              <span className="energy-session__val" style={{ marginLeft: 12 }}>6:45</span>
              <span className="energy-session__unit">pm</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default EnergyScreen;
