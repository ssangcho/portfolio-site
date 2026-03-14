import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactComponent as Logo } from '../assets/common/SanPavicon.svg';
import { site } from '../data/siteContent';

const ease = [0.22, 1, 0.36, 1];

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay },
  }),
};

function Nav({ intro = false }) {
  const navRef = useRef(null);
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const anim = (delay) =>
    intro
      ? { variants: slideUp, initial: 'hidden', animate: 'visible', custom: delay }
      : {};

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastScrollY.current) > 10) {
          setScrollHidden(y > lastScrollY.current && y > 80);
          lastScrollY.current = y;
        }
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      className="nav"
      animate={{
        y: scrollHidden ? -100 : 0,
        opacity: scrollHidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to="/" className="nav-brand">
        <Logo className="logo" />
        <div className="nav-brand-text">
          <motion.span className="nav-brand-name" {...anim(0.15)}>
            {site.name}
          </motion.span>
          <motion.span className="nav-brand-sub" {...anim(0.3)}>
            {site.tagline}
          </motion.span>
        </div>
      </Link>
      <motion.div className="nav-links" {...anim(0.4)}>
        {site.navLinks.map((link) =>
          link.to ? (
            <Link key={link.label} to={link.to} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>{link.label}</Link>
          ) : (
            <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>{link.label}</a>
          )
        )}
      </motion.div>
    </motion.nav>
  );
}

export default Nav;
