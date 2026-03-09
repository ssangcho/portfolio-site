import { motion } from 'framer-motion';
import { cardVariants } from '../motionTokens';

function EnergyScreen() {
  return (
    <motion.div
      className="cid-screen-placeholder"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="cid-placeholder-screen">
        Energy Screen — Coming Soon
      </div>
    </motion.div>
  );
}

export default EnergyScreen;
