import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Landing from './pages/Landing';
import Airbnb from './pages/Airbnb';
import Faraday from './pages/Faraday';
import FaradayCID from './pages/FaradayCID';
import Medical from './pages/Medical';
import About from './pages/About';
import { trackPageView, initScrollTracking, initEngagementTimer } from './analytics';
import './App.css';

/* Lazy-load dev-only page to keep Three.js out of main bundle */
const GlbTest = lazy(() => import('./pages/GlbTest'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
    const cleanupScroll = initScrollTracking();
    const sendEngagement = initEngagementTimer();

    return () => {
      cleanupScroll();
      sendEngagement();
    };
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />
      <Analytics />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/airbnb" element={<Airbnb />} />
        <Route path="/faraday" element={<Faraday />} />
        <Route path="/faraday/prototype" element={<FaradayCID />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/about" element={<About />} />
        <Route path="/glb-test" element={<Suspense fallback={null}><GlbTest /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
