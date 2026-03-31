import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { site } from '../data/siteContent';
import { trackOutboundClick, trackEmailClick } from '../analytics';
import './Footer.css';

function Footer({ hideProjects = false }) {
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
    <div className={`footer-wrap${hideProjects ? ' footer-wrap--compact' : ''}`} ref={wrapRef}>
      <footer className="footer">
        {!hideProjects && (
          <div className="footer-line-track">
            <motion.div className="footer-line-fill" style={{ width: lineWidth }} />
          </div>
        )}

        {!hideProjects && (
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
                  onClick={() => {
                    if (active) window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {p.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
        <motion.div
          className="footer-bottom"
          style={{ opacity: bottomOpacity }}
        >
          <span className="footer-copy">&copy; 2026 Sangcho Shin</span>
          <div className="footer-social">
            {site.footerLinks.map((link) =>
              link.email ? (
                <a
                  key={link.label}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    trackEmailClick();
                    window.location.href = `mailto:${link.email[0]}@${link.email[1]}`;
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick(link.href, link.label)}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default Footer;
