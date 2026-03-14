import { motion } from 'framer-motion';

/*
  TypeReveal — Hero title typewriter-ish reveal.
  Each character slides up + fades in with stagger.
  Techy monospace-flash feel without actual typing cursor.

  Usage:
    <TypeReveal text="Center Information Display" delay={0} />
    <TypeReveal text="Motion System" delay={0.6} />
*/

const charVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function TypeReveal({ text, delay = 0, className = '' }) {
  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.012, delayChildren: delay }}
      style={{ display: 'inline' }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
          {word.split('').map((ch, ci) => (
            <motion.span
              key={ci}
              variants={charVariants}
              transition={{ duration: 0.15 }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span
              variants={charVariants}
              transition={{ duration: 0.15 }}
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {' '}
            </motion.span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

/*
  StaggerReveal — Children stagger in on mount.
  Wraps any list of elements (RoleBlock fields, etc.)

  Usage:
    <StaggerReveal delay={0.8}>
      <div>field 1</div>
      <div>field 2</div>
    </StaggerReveal>
*/

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function StaggerReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ delayChildren: delay }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

/*
  ScrollReveal — Fade + slide up on scroll into view.
  Wraps any section title, subtitle, or block.

  Usage:
    <ScrollReveal>
      <h2>Section Title</h2>
    </ScrollReveal>
*/

function ScrollReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-250px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export { TypeReveal, StaggerReveal, ScrollReveal };
