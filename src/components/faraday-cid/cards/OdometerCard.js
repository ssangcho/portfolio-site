import { motion } from 'framer-motion';
import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';

const data = QUICK_CARDS.odometer;

function OdometerCard() {
  return (
    <CIDCard size={data.size}>
      <div className="cid-card__header" style={{ alignItems: 'baseline' }}>
        <span className="cid-card__title">{data.title}</span>
        <span className="cid-card__status" style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.1, 0, 0.4, 1] }}
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: 'var(--cid-text-primary)',
              fontFamily: 'var(--cid-font)',
              lineHeight: 1,
            }}
          >
            {data.value}
          </motion.span>
          <span>{data.unit}</span>
        </span>
      </div>
    </CIDCard>
  );
}

export default OdometerCard;
