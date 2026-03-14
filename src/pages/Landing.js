import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { landing } from '../data/siteContent';
import faradayThumb from '../assets/faraday/CID_screenshot.jpg';
import airbnbThumb from '../assets/airbnb/Card02.png';
import './Landing.css';

const thumbImages = {
  'landing-thumb--faraday': faradayThumb,
  'landing-thumb--airbnb': airbnbThumb,
};

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.5 + i * 0.15 },
  }),
};

function ThumbCard({ to, thumbClass, title, desc, index }) {
  const thumbRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = thumbRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x * -6}px, ${y * -6}px) scale(1.03)`;
    }
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'translate(0, 0) scale(1)';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
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
    </motion.div>
  );
}

function Landing() {
  return (
    <div className="app">
      <Nav intro />

      <main className="landing-grid">
        {landing.cards.map((card, i) => (
          <ThumbCard key={card.to} {...card} index={i} />
        ))}
      </main>
      <Footer hideProjects />
    </div>
  );
}

export default Landing;
