import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import Airbnb from './pages/Airbnb';
import Faraday from './pages/Faraday';
import FaradayCID from './pages/FaradayCID';
import About from './pages/About';
import GlbTest from './pages/GlbTest';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/airbnb" element={<Airbnb />} />
        <Route path="/faraday" element={<Faraday />} />
        <Route path="/faraday/prototype" element={<FaradayCID />} />
        <Route path="/about" element={<About />} />
        <Route path="/glb-test" element={<GlbTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
