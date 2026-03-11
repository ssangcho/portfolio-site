import { motion } from 'framer-motion';
import { stagger } from './motionTokens';

function CIDCardGrid({ children, dense }) {
  return (
    <motion.div
      className="cid-card-grid"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: dense ? stagger.dense : stagger.navigation,
          },
        },
        exit: {},
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export default CIDCardGrid;
