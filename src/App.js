import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Airbnb from './pages/Airbnb';
import Faraday from './pages/Faraday';
import FaradayCID from './pages/FaradayCID';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/airbnb" element={<Airbnb />} />
        <Route path="/faraday" element={<Faraday />} />
        <Route path="/faraday/prototype" element={<FaradayCID />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
