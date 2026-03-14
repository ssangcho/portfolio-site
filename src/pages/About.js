import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './About.css';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay },
  }),
};

/* ── Variant presets ── */
const industryContainer = {
  hidden: {},
  visible: {},
};

const industryDelays = [0, 0.3, 0.45];

const industryItem = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease, delay: industryDelays[i] },
  }),
};

const brandColors = {
  'AE': '#9999FF',
  'Figma': '#F24E1E',
  'Lottie': '#00DDB3',
  'CSS': '#8c8c8c',
};

const badgeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const badgeItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease },
  },
};

function About() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  /* Scroll-linked sentence opacity */
  const specOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);
  const specY = useTransform(scrollYProgress, [0.18, 0.30], [8, 0]);
  const bridgeOpacity = useTransform(scrollYProgress, [0.48, 0.88], [0, 1]);
  const bridgeY = useTransform(scrollYProgress, [0.48, 0.88], [8, 0]);

  /* Scroll-triggered states */
  const [industryVisible, setIndustryVisible] = useState(false);
  const [badgesVisible, setBadgesVisible] = useState(false);
  const [activeSet, setActiveSet] = useState(new Set());
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const hasScrolled = useRef(false);

  /* Auto-trigger: keywords → badges → blink */
  useEffect(() => {
    setIndustryVisible(false);
    setBadgesVisible(false);
    setActiveSet(new Set());
    setShowScrollHint(false);
    const kwTimer = setTimeout(() => setIndustryVisible(true), 900);
    const badgeTimer = setTimeout(() => setBadgesVisible(true), 2200);
    const hintTimer = setTimeout(() => setShowScrollHint(true), 2800);
    return () => { clearTimeout(kwTimer); clearTimeout(badgeTimer); clearTimeout(hintTimer); };
  }, [resetKey]);

  /* Sequential brand-color blink — each badge fades independently */
  useEffect(() => {
    if (!badgesVisible) { setActiveSet(new Set()); return; }
    const timers = [];
    const staggerDone = 400;
    [0, 1, 2, 3].forEach((i) => {
      timers.push(setTimeout(() => setActiveSet((s) => new Set(s).add(i)), staggerDone + i * 120));
      timers.push(setTimeout(() => setActiveSet((s) => { const n = new Set(s); n.delete(i); return n; }), staggerDone + i * 120 + 1500));
    });
    return () => timers.forEach(clearTimeout);
  }, [badgesVisible]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.1) hasScrolled.current = true;

    /* Reset typewriter when scrolled back to top (e.g. nav About click) */
    if (v <= 0.005 && hasScrolled.current) {
      setResetKey((k) => k + 1);
      hasScrolled.current = false;
    }

    if (v > 0.02) setShowScrollHint(false);
  });

  return (
    <div className="app">
      <Nav />

      <div className="about-scroll" ref={scrollRef}>
        <div className="about-sticky">
          <div className="about-content">

            {/* Intro: typewriter */}
            <motion.p
              key={resetKey}
              className="scroll-text intro-line"
              initial="hidden"
              animate="visible"
            >
              {"Hello, I'm a product UI motion designer across".split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="scroll-word"
                  variants={{
                    hidden: { opacity: 0, y: 4 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.12, ease, delay: 0.3 + i * 0.045 },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Industry keywords: scroll-triggered cubic pop */}
            <motion.div
              className="about-industry"
              variants={industryContainer}
              animate={industryVisible ? 'visible' : 'hidden'}
              initial="hidden"
            >
              {['Automotive', 'Entertainment', 'Gaming'].map((word, i) => (
                <motion.div key={word} variants={industryItem} custom={i}>
                  <span className="industry-word">{word}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Spec text: scroll-linked sentence fade */}
            <motion.p className="spec-line" style={{ opacity: specOpacity, y: specY }}>
              I name every timing. Every curve.
            </motion.p>

            {/* Code badges: scroll-triggered stagger */}
            <motion.div
              className="spec-badges"
              variants={badgeContainer}
              animate={badgesVisible ? 'visible' : 'hidden'}
              initial="hidden"
            >
              {['AE', 'Figma', 'Lottie', 'CSS'].map((label, i) => (
                <motion.span
                  key={label}
                  className={`code-badge${activeSet.has(i) ? ' code-badge--active' : ''}`}
                  variants={badgeItem}
                  style={{ '--badge-color': brandColors[label] }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Bridge: scroll-linked sentence fade */}
            <motion.p className="bridge-line" style={{ opacity: bridgeOpacity, y: bridgeY }}>
              There's about 1-2% between design and engineering that shapes how things feel.<br />That's where I sit.
            </motion.p>

          </div>

          {/* Scroll hint */}
          <motion.div
            className="scroll-hint"
            animate={{ opacity: showScrollHint ? 0.4 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="scroll-hint-dot"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Experience */}
      <main className="about-bottom">
        <motion.div
          className="about-experience"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          custom={0}
        >
          <p className="about-current">
            Currently on General Motors' Brand UI Design team.
          </p>
          <p className="about-previous">
            Previously worked with{' '}
            <span className="company-name">Faraday Future</span>,{' '}
            <span className="company-name">Supercell</span>,{' '}
            <span className="company-name">FOX</span>,{' '}
            <span className="company-name">National Geographic</span>.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
