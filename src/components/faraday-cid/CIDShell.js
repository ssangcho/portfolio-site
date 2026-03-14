import { useRef, useCallback } from 'react';
import CIDTabBar from './CIDTabBar';
import statusBarImg from '../../assets/faraday/top/status/night.png';
import launcherImg from '../../assets/faraday/bottom/launcher/night.png';
import climateImg from '../../assets/faraday/bottom/climate/action-bar-night.png';

const SWIPE_THRESHOLD = 50;    // px minimum distance
const SWIPE_MAX_Y = 80;        // px — ignore if vertical movement exceeds this
const MAX_TAB = 2;              // Quick(0), Doors(1), Energy(2)

function CIDShell({ activeTab, onTabChange, contentRef, children }) {
  const startRef = useRef(null);

  // Resolve swipe direction from start/end coordinates
  const resolveSwipe = useCallback((endX, endY) => {
    if (!startRef.current) return;
    const dx = endX - startRef.current.x;
    const dy = Math.abs(endY - startRef.current.y);
    const dt = Date.now() - startRef.current.t;
    startRef.current = null;

    if (dy > SWIPE_MAX_Y || Math.abs(dx) < SWIPE_THRESHOLD || dt > 500) return;

    if (dx < 0 && activeTab < MAX_TAB) {
      onTabChange(activeTab + 1);
    } else if (dx > 0 && activeTab > 0) {
      onTabChange(activeTab - 1);
    }
  }, [activeTab, onTabChange]);

  // Pointer events (mouse + desktop)
  // Skip swipe when interacting with controls (buttons, sliders, toggles)
  const isInteractive = (el) => {
    const tag = el.tagName;
    if (tag === 'BUTTON' || tag === 'INPUT') return true;
    return el.closest('button, input, [role="button"], [role="slider"], .cid-brightness-track, .energy-card__stepper, .energy-card__toggle, .energy-charging__stop, .doors-btn, .doors-icon-tile, .doors-action-pill-wrap');
  };

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (isInteractive(e.target)) {
      startRef.current = null;
      return;
    }
    startRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  }, []);

  const onPointerUp = useCallback((e) => {
    resolveSwipe(e.clientX, e.clientY);
  }, [resolveSwipe]);

  // Touch events (mobile + DevTools responsive)
  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    startRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  }, []);

  const onTouchEnd = useCallback((e) => {
    const t = e.changedTouches[0];
    resolveSwipe(t.clientX, t.clientY);
  }, [resolveSwipe]);

  return (
    <div className="cid-shell">
      <img src={statusBarImg} className="cid-status-bar" alt="" />

      <CIDTabBar activeIndex={activeTab} onTabChange={onTabChange} />

      <div
        className="cid-content-area"
        ref={contentRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>

      <img src={launcherImg} className="cid-launcher-bar" alt="" />
      <img src={climateImg} className="cid-climate-bar" alt="" />
    </div>
  );
}

export default CIDShell;
