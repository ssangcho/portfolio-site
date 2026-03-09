import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import liftgateSvg from '../../../assets/faraday/quick_svg/liftgate-closed-2.svg';

const data = QUICK_CARDS.liftgate;

function LiftgateCard() {
  return (
    <CIDCard title={data.title} size={data.size} titleStyle={{ color: '#C9C9D1' }}>
      <div className="cid-card__footer">
        <img src={liftgateSvg} alt="Liftgate" className="cid-icon cid-icon--md" style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(4%) saturate(200%) hue-rotate(210deg) brightness(95%) contrast(90%)' }} />
        <span className="cid-card__status" style={{ color: '#C9C9D1' }}>{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default LiftgateCard;
