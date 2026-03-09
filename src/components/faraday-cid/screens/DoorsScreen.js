import { motion } from 'framer-motion';
import { cardVariants } from '../motionTokens';

function DoorsScreen() {
  return (
    <motion.div
      className="cid-screen-placeholder"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="cid-placeholder-screen">
        Doors Screen — Coming Soon
      </div>
    </motion.div>
  );
}

export default DoorsScreen;
