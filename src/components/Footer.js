import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '../data/siteContent';
import './Footer.css';

function Footer() {
  const { pathname } = useLocation();
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end end'],
  });

  // horizontal dot line: draws left→right at 20%–60%
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ['0%', '100%']);
  // project links scale up: small→normal at 30%–80%
  const fontSize = useTransform(scrollYProgress, [0.3, 0.8], [0.6, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  // bottom bar fades in later
  const bottomOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <div className="footer-wrap" ref={wrapRef}>
      <footer className="footer">
        <div className="footer-line-track">
          <motion.div className="footer-line-fill" style={{ width: lineWidth }} />
        </div>

        <motion.nav
          className="footer-projects"
          style={{ opacity: contentOpacity, scale: fontSize }}
        >
          {site.projects.map((p) => {
            const active = pathname === p.to;
            return (
              <Link
                key={p.to}
                to={p.to}
                className={`footer-project-link${active ? ' is-active' : ''}`}
              >
                {p.label}
              </Link>
            );
          })}
        </motion.nav>
        <motion.div
          className="footer-bottom"
          style={{ opacity: bottomOpacity }}
        >
          <span className="footer-copy">&copy; 2026 Sangcho Shin</span>
          <div className="footer-social">
            {site.footerLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default Footer;
