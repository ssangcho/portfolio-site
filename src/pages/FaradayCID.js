import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CIDShell from '../components/faraday-cid/CIDShell';
import { CIDStateProvider, useCIDState } from '../components/faraday-cid/CIDStateContext';
import QuickControls from '../components/faraday-cid/screens/QuickControls';
import DoorsScreen from '../components/faraday-cid/screens/DoorsScreen';
import EnergyScreen from '../components/faraday-cid/screens/EnergyScreen';
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
  const [direction, setDirection] = useState(null); // null = initial load (no slide), 1 = right, -1 = left
  const contentRef = useRef(null);
  const shellRef = useRef(null);
  const prevTabRef = useRef(0);

  // Fit shell to viewport via scale transform
  const fitToViewport = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = Math.min(vw / DESIGN_W, vh / DESIGN_H, 1);
    setScale(s);
  }, []);

  useEffect(() => {
    fitToViewport();
    window.addEventListener('resize', fitToViewport);
    return () => window.removeEventListener('resize', fitToViewport);
  }, [fitToViewport]);

  // Dark background for prototype page only
  useEffect(() => {
    document.body.classList.add('cid-active');
    return () => document.body.classList.remove('cid-active');
  }, []);

  // Track direction on tab change
  const handleTabChange = useCallback((newTab) => {
    clearLanding(); // First tab switch ends landing stagger
    setDirection(newTab > prevTabRef.current ? 1 : -1);
    prevTabRef.current = newTab;
    setActiveTab(newTab);
  }, [clearLanding]);

  // Reset scroll on tab change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Auto-play mode: cycle tabs 0 → 1 → 2
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

  // Keyboard: A to toggle auto-play
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        setAutoPlay((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const ScreenComponent = screens[activeTab] || PlaceholderScreen;

  return (
    <div className="cid-root">
      {autoPlay && <div className="cid-autoplay-dot" />}
      <div ref={shellRef} style={{ zoom: scale }}>
        <CIDShell activeTab={activeTab} onTabChange={handleTabChange} contentRef={contentRef}>
          <AnimatePresence mode="wait" custom={direction}>
            <ScreenComponent key={activeTab} direction={direction} />
          </AnimatePresence>
        </CIDShell>
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
