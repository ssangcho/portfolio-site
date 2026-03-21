import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './About.css';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

const industryDelays = [0.7, 0.85, 0.95];

function About() {
  return (
    <div className="app">
      <Nav />

      <main className="about-content">

        {/* Intro: word-by-word reveal */}
        <motion.p className="scroll-text intro-line" initial="hidden" animate="visible">
          {"Hello, I'm a product UI motion designer across".split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="scroll-word"
              variants={{
                hidden: { opacity: 0, y: 4 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.12, ease, delay: 0.2 + i * 0.045 },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Industry keywords */}
        <div className="about-industry">
          {['Automotive', 'Entertainment', 'Gaming'].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease, delay: industryDelays[i] }}
            >
              <span className="industry-word">{word}</span>
            </motion.div>
          ))}
        </div>

        {/* Spec */}
        <motion.p className="spec-line" {...fadeUp(1.1)}>
          I name every timing. Every curve.
        </motion.p>

        {/* Bridge */}
        <motion.p className="bridge-line" {...fadeUp(1.3)}>
          There's about 1-2% between design and engineering that shapes how things feel.<br />That's where I sit.
        </motion.p>

        {/* Experience */}
        <motion.div className="about-experience" {...fadeUp(1.5)}>
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
