import { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';

const PRECISION = [0.25, 0.1, 0.25, 1];  // near-linear for visual contrast (token: 0.0, 0, 0, 1)
const REFINEMENT = [0.05, 0.7, 0.1, 1];

/*
 * Correct cubic-bezier easing sampler.
 * x-axis = uniform time, y-axis = easing output.
 * Newton's method to invert bezier-x → parametric u → bezier-y.
 */
function cubicBezierAt(p1x, p1y, p2x, p2y, t) {
  let u = t;
  for (let i = 0; i < 8; i++) {
    const x = 3 * (1 - u) ** 2 * u * p1x + 3 * (1 - u) * u ** 2 * p2x + u ** 3 - t;
    const dx = 3 * (1 - u) ** 2 * p1x + 6 * (1 - u) * u * (p2x - p1x) + 3 * u ** 2 * (1 - p2x);
    if (Math.abs(dx) < 1e-6) break;
    u -= x / dx;
    u = Math.max(0, Math.min(1, u));
  }
  return 3 * (1 - u) ** 2 * u * p1y + 3 * (1 - u) * u ** 2 * p2y + u ** 3;
}

function sampleEasing(p1x, p1y, p2x, p2y, steps = 60) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = cubicBezierAt(p1x, p1y, p2x, p2y, t);
    pts.push([t, y]);
  }
  return pts;
}

function CurvePath({ points, color, w, h, pad, xScale = 1 }) {
  const d = points
    .map(([x, y], i) => {
      const px = pad + x * xScale * (w - pad * 2);
      const py = h - pad - y * (h - pad * 2);
      return `${i === 0 ? 'M' : 'L'}${px},${py}`;
    })
    .join(' ');
  return <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />;
}

function EasingCompare() {
  const W = 500, H = 300, PAD = 40;
  const [progress, setProgress] = useState(0);
  const hasPlayed = useRef(false);
  const ref = useRef(null);

  const precisionPts = sampleEasing(...PRECISION);
  const refinementPts = sampleEasing(...REFINEMENT);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          const loop = () => {
            animate(0, 1, {
              duration: 2,
              ease: 'linear',
              onUpdate: (v) => setProgress(v),
              onComplete: () => setTimeout(loop, 1000),
            });
          };
          loop();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getY = (pts, t) => {
    const idx = Math.min(Math.floor(t * (pts.length - 1)), pts.length - 2);
    const frac = t * (pts.length - 1) - idx;
    return pts[idx][1] * (1 - frac) + pts[idx + 1][1] * frac;
  };

  /* Precision finishes at 50% of timeline (200ms of 400ms) */
  const precisionT = Math.min(progress / 0.5, 1);
  const precisionY = getY(precisionPts, precisionT);
  const refinementY = getY(refinementPts, progress);

  const gw = W - PAD * 2;
  const gh = H - PAD * 2;
  /* Dots: x = time position, y = easing output */
  const precisionDotX = PAD + precisionT * 0.5 * gw;
  const refinementDotX = PAD + progress * gw;
  const precisionDotY = H - PAD - precisionY * gh;
  const refinementDotY = H - PAD - refinementY * gh;

  /* Bar: both time-based. Precision 2x faster. */
  const precisionBarPct = precisionT * 100;   // 0→100% at progress=0.5
  const refinementBarPct = progress * 100;    // 0→100% at progress=1.0

  return (
    <div ref={ref} className="easing-compare">
      <svg viewBox={`0 0 ${W} ${H}`} className="easing-compare__svg">
        {/* Grid */}
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#e0e0e0" strokeWidth="1" />
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#e0e0e0" strokeWidth="1" />
        <line x1={PAD} y1={PAD} x2={W - PAD} y2={PAD} stroke="#e0e0e0" strokeWidth="0.5" strokeDasharray="4" />

        {/* Axis labels */}
        <text x={PAD - 8} y={H - PAD + 20} fontSize="11" fill="#999" textAnchor="middle">0</text>
        <text x={PAD - 12} y={PAD + 4} fontSize="11" fill="#999" textAnchor="end">1</text>

        {/* 200ms / 400ms markers */}
        <line x1={PAD + 0.5 * gw} y1={PAD} x2={PAD + 0.5 * gw} y2={H - PAD} stroke="#e0e0e0" strokeWidth="0.5" strokeDasharray="4" />
        <text x={PAD + 0.5 * gw} y={H - PAD + 20} fontSize="10" fill="#FF6B35" textAnchor="middle">200ms</text>
        <text x={W - PAD} y={H - PAD + 20} fontSize="10" fill="#4ECDC4" textAnchor="middle">400ms</text>

        {/* Curves */}
        <CurvePath points={precisionPts} color="#FF6B35" w={W} h={H} pad={PAD} xScale={0.5} />
        <CurvePath points={refinementPts} color="#4ECDC4" w={W} h={H} pad={PAD} xScale={1} />

        {/* Animated dots */}
        <circle cx={precisionDotX} cy={precisionDotY} r="5" fill="#FF6B35" />
        <circle cx={refinementDotX} cy={refinementDotY} r="5" fill="#4ECDC4" />
      </svg>

      {/* Table below graph */}
      <div className="easing-compare__table">
        <div className="easing-compare__row easing-compare__row--header">
          <div className="easing-compare__cell easing-compare__cell--name"></div>
          <div className="easing-compare__cell">Token</div>
          <div className="easing-compare__cell">Duration</div>
          <div className="easing-compare__cell">Use</div>
        </div>

        {/* Precision row */}
        <div className="easing-compare__row">
          <div className="easing-compare__cell easing-compare__cell--name">
            <span className="easing-compare__dot" style={{ background: '#FF6B35' }} />
            Precision
          </div>
          <div className="easing-compare__cell easing-compare__mono">ease.precision</div>
          <div className="easing-compare__cell">200ms</div>
          <div className="easing-compare__cell">Direct controls</div>
        </div>
        <div className="easing-compare__bar-row">
          <div className="easing-compare__bar-track">
            <motion.div
              className="easing-compare__bar-fill"
              style={{ background: '#FF6B35', width: `${precisionBarPct}%` }}
            />
          </div>
        </div>

        {/* Refinement row */}
        <div className="easing-compare__row">
          <div className="easing-compare__cell easing-compare__cell--name">
            <span className="easing-compare__dot" style={{ background: '#4ECDC4' }} />
            Refinement
          </div>
          <div className="easing-compare__cell easing-compare__mono">ease.refinement</div>
          <div className="easing-compare__cell">400ms</div>
          <div className="easing-compare__cell">System transitions</div>
        </div>
        <div className="easing-compare__bar-row">
          <div className="easing-compare__bar-track">
            <motion.div
              className="easing-compare__bar-fill"
              style={{ background: '#4ECDC4', width: `${refinementBarPct}%` }}
            />
          </div>
        </div>
        <p className="easing-compare__note">* Simulated at reduced speed. Not real-time.</p>
      </div>
    </div>
  );
}

export default EasingCompare;
