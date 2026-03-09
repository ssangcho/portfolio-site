import { motion } from 'framer-motion';
import { cardVariants } from './motionTokens';

function CIDCard({ title, size = 'half', hasChevron, style, titleStyle, children }) {
  return (
    <motion.div
      className={`cid-card cid-card--${size}`}
      variants={cardVariants}
      style={style}
    >
      {title && (
        <div className={`cid-card__header${hasChevron ? ' cid-card__header--spread' : ''}`}>
          <span className="cid-card__title" style={titleStyle}>{title}</span>
          {hasChevron && <span className="cid-card__chevron">›</span>}
        </div>
      )}
      {children}
    </motion.div>
  );
}

export default CIDCard;
