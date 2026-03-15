import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CIDShell from '../components/faraday-cid/CIDShell';
import { CIDStateProvider, useCIDState } from '../components/faraday-cid/CIDStateContext';
import QuickControls from '../components/faraday-cid/screens/QuickControls';
import DoorsScreen from '../components/faraday-cid/screens/DoorsScreen';
import EnergyScreen from '../components/faraday-cid/screens/EnergyScreen';
import TouchIndicator from '../components/faraday-cid/TouchIndicator';
import './FaradayCID.css';

/* Fixed design dimensions — shell scales to fit */
const DESIGN_W = 600;
const DESIGN_H = 960;

const screens = [
  QuickControls,  // 0: Quick
  DoorsScreen,    // 1: Doors
  EnergyScreen,   // 2: Energy
  null,           // 3: Lights (TBD)
  null,           // 4: Seats (TBD)
  null,           // 5: Settings (TBD)
];

function PlaceholderScreen() {
  return (
    <div className="cid-placeholder-screen">
      Coming Soon
    </div>
  );
}

function CIDInner() {
  const { clearLanding } = useCIDState();
  const [activeTab, setActiveTab] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(null);
  const contentRef = useRef(null);
  const shellRef = useRef(null);
  const prevTabRef = useRef(0);
  const [userZoom, setUserZoom] = useState(1);

  const fitToViewport = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setScale(Math.min(vw / DESIGN_W, vh / DESIGN_H, 1));
  }, []);

  useEffect(() => {
    fitToViewport();
    window.addEventListener('resize', fitToViewport);
    return () => window.removeEventListener('resize', fitToViewport);
  }, [fitToViewport]);

  useEffect(() => {
    document.body.classList.add('cid-active');
    return () => document.body.classList.remove('cid-active');
  }, []);

  const handleTabChange = useCallback((newTab) => {
    clearLanding();
    setDirection(newTab > prevTabRef.current ? 1 : -1);
    prevTabRef.current = newTab;
    setActiveTab(newTab);
  }, [clearLanding]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      clearLanding();
      setActiveTab((prev) => {
        const next = prev + 1;
        const wrapped = next > 2 ? 0 : next;
        setDirection(wrapped === 0 ? -1 : 1);
        prevTabRef.current = wrapped;
        return wrapped;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [autoPlay, clearLanding]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        setAutoPlay((prev) => !prev);
      }
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        setUserZoom((prev) => Math.min(prev + 0.25, 3));
      }
      if (e.key === '-') {
        e.preventDefault();
        setUserZoom((prev) => Math.max(prev - 0.25, 0.5));
      }
      if (e.key === '0') {
        setUserZoom(1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const ScreenComponent = screens[activeTab] || PlaceholderScreen;
  const finalScale = scale * userZoom;

  return (
    <div className="cid-root">
      {autoPlay && <div className="cid-autoplay-dot" />}
      {userZoom !== 1 && (
        <div className="cid-zoom-badge">{Math.round(userZoom * 100)}%</div>
      )}
      <div
        ref={shellRef}
        style={{
          transform: `scale(${finalScale})`,
          transformOrigin: 'center center',
          width: DESIGN_W,
          height: DESIGN_H,
          position: 'relative',
        }}
      >
        <CIDShell activeTab={activeTab} onTabChange={handleTabChange} contentRef={contentRef}>
          <AnimatePresence custom={direction}>
            <ScreenComponent key={activeTab} direction={direction} />
          </AnimatePresence>
        </CIDShell>
        <TouchIndicator shellRef={shellRef} scale={finalScale} />
      </div>
    </div>
  );
}

function FaradayCID() {
  return (
    <CIDStateProvider>
      <CIDInner />
    </CIDStateProvider>
  );
}

export default FaradayCID;
