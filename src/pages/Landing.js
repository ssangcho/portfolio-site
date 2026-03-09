import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { landing } from '../data/siteContent';
import faradayThumb from '../assets/faraday/cid-quick-controls.png';
import airbnbThumb from '../assets/airbnb/Card02.png';
import './Landing.css';

const thumbImages = {
  'landing-thumb--faraday': faradayThumb,
  'landing-thumb--airbnb': airbnbThumb,
};

function ThumbCard({ to, thumbClass, title, desc }) {
  const thumbRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x * -12}px, ${y * -12}px) scale(1.08)`;
    }
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'translate(0, 0) scale(1)';
    }
  };

  return (
    <Link to={to} className="landing-card">
      <div
        className={`landing-thumb ${thumbClass}`}
        ref={thumbRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="landing-thumb-inner" ref={innerRef}>
          <img
            src={thumbImages[thumbClass]}
            alt={title}
            className="landing-thumb-img"
          />
        </div>
      </div>
      <div className="landing-card-info">
        <h2 className="landing-card-title">{title}</h2>
        <p className="landing-card-desc">{desc}</p>
      </div>
    </Link>
  );
}

function Landing() {
  return (
    <div className="app">
      <Nav />

      <main className="landing-grid">
        {landing.cards.map((card) => (
          <ThumbCard key={card.to} {...card} />
        ))}
      </main>
    </div>
  );
}

export default Landing;
