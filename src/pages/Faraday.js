import { useRef, useCallback } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import RoleBlock from '../components/RoleBlock';
import { motion } from 'framer-motion';
import { TypeReveal, ScrollReveal } from '../components/TextReveal';
import LazyVideo from '../components/LazyVideo';
import EasingCompare from '../components/EasingCompare';
import { faraday } from '../data/siteContent';
import cidInterior from '../assets/faraday/CID_screenshot.jpg';
import ffScreen from '../assets/faraday/A_2.mp4';
import challengeCVideo from '../assets/faraday/C_2.mp4';
import './Faraday.css';

/* ─── Context Image with Parallax ─── */
function ContextImage() {
  const imgRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (imgRef.current) {
      imgRef.current.style.transform = `scale(2.45) translate(${x * -12}px, ${y * -12}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(2.4)';
    }
  }, []);

  return (
    <div
      className="faraday-context-screen"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={cidInterior}
        alt="FF 91 Interior — CID center display"
        className="context-img"
      />
    </div>
  );
}

/* ─── Main Page ─── */
function Faraday() {
  return (
    <div className="app">
      <Nav />

      <header className="hero faraday-hero">
        <h1>
          <TypeReveal text={faraday.hero.title[0]} delay={0.2} />
          <br />
          <TypeReveal text={faraday.hero.title[1]} delay={0.6} />
        </h1>
        <motion.p
          className="faraday-hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {faraday.hero.subtitle}
        </motion.p>
      </header>

      <main className="case-study faraday-case">

        <RoleBlock data={faraday.role} />

        {/* ── Section 00: Context ── */}
        <ScrollReveal>
          <section className="faraday-context">
            <h2 className="section-label">{faraday.context.label}</h2>
            <p className="section-desc">{faraday.context.desc}</p>
            <ContextImage />
          </section>
        </ScrollReveal>

        <hr className="case-divider-thick" />

        {/* ── Section 01: CID Motion System ── */}
        <ScrollReveal>
          <h2 className="case-title">{faraday.section01.title}</h2>
          <p className="case-subtitle">{faraday.section01.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        {/* Challenge A: Navigation Choreography */}
        <ScrollReveal>
          <section className="section--full">
            <div className="cs-row">
              <div className="cs-row__text">
                <div className="challenge-header">
                  <span className="challenge-letter">a</span>
                  <h4 className="challenge-name">{faraday.challengeA.label}</h4>
                </div>
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{faraday.challengeA.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{faraday.challengeA.solution}</p>
                </div>
              </div>
              <div className="cs-row__media" style={{marginTop: '21px'}}>
                <LazyVideo className="cs-row__video" src={ffScreen} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Challenge B: Brand Motion Identity */}
        <ScrollReveal>
          <section className="section--full">
            <div className="cs-row cs-row--reverse">
              <div className="cs-row__text">
                <div className="challenge-header">
                  <span className="challenge-letter">b</span>
                  <h4 className="challenge-name">{faraday.challengeB.label}</h4>
                </div>
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{faraday.challengeB.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{faraday.challengeB.solution}</p>
                </div>
              </div>
              <div className="cs-row__media">
                <EasingCompare />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Challenge C: State Feedback */}
        <ScrollReveal>
          <section className="section--full">
            <div className="cs-row">
              <div className="cs-row__text">
                <div className="challenge-header">
                  <span className="challenge-letter">c</span>
                  <h4 className="challenge-name">{faraday.challengeC.label}</h4>
                </div>
                <div className="block-challenge">
                  <h3 className="section-label">Challenge</h3>
                  <p className="section-desc">{faraday.challengeC.challenge}</p>
                </div>
                <div className="block-solution">
                  <h3 className="section-label">Solution</h3>
                  <p className="section-desc">{faraday.challengeC.solution}</p>
                </div>
              </div>
              <div className="cs-row__media" style={{marginTop: '34px'}}>
                <LazyVideo className="cs-row__video" src={challengeCVideo} />
              </div>
            </div>
          </section>
        </ScrollReveal>

        <hr className="case-divider" />

        {/* ── Interactive Prototype ── */}
        <motion.div
          className="faraday-proto-bg"
          initial={{ backgroundColor: '#ffffff', color: '#1a1a1a' }}
          whileInView={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <section className="section--full faraday-prototype-section">
            <h3 className="section-label">Interactive Prototype</h3>
            <p className="section-desc">
              Try it. Tap the tabs below.
            </p>
            <div className="cid-embed-wrapper">
              <iframe
                src="/faraday/prototype"
                title="CID Interactive Prototype"
                className="cid-embed-iframe"
                scrolling="no"
              />
            </div>
          </section>
        </motion.div>

        <hr className="case-divider-thick" />

        {/* ── Section 02: Configurator ── */}
        <ScrollReveal>
          <h2 className="case-title">{faraday.configurator.title}</h2>
          <p className="case-subtitle">{faraday.configurator.subtitle}</p>
          <hr className="case-divider" />
        </ScrollReveal>

        <ScrollReveal>
          <section className="section--full">
            <p className="section-desc">{faraday.configurator.context}</p>
            <LazyVideo
              className="section-video"
              src={require('../assets/faraday/ff91_config_v1_720p.mp4')}
            />
          </section>
        </ScrollReveal>

      </main>
      <Footer />
    </div>
  );
}

export default Faraday;
