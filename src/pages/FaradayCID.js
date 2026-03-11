import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CIDShell from '../components/faraday-cid/CIDShell';
import { CIDStateProvider } from '../components/faraday-cid/CIDStateContext';
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

function FaradayCID() {
  const [activeTab, setActiveTab] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null);
  const shellRef = useRef(null);

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
      setActiveTab((prev) => {
        const next = prev + 1;
        return next > 2 ? 0 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [autoPlay]);

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
    <CIDStateProvider>
      <div className="cid-root">
        {autoPlay && <div className="cid-autoplay-dot" />}
        <div ref={shellRef} style={{ zoom: scale }}>
          <CIDShell activeTab={activeTab} onTabChange={setActiveTab} contentRef={contentRef}>
            <AnimatePresence mode="wait">
              <ScreenComponent key={activeTab} />
            </AnimatePresence>
          </CIDShell>
        </div>
      </div>
    </CIDStateProvider>
  );
}

export default FaradayCID;
