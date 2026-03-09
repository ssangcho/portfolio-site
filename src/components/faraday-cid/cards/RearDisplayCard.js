import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import rsdLowerSvg from '../../../assets/faraday/quick_svg/rsd-lower.svg';

const data = QUICK_CARDS.rearDisplay;

function RearDisplayCard() {
  return (
    <CIDCard title={data.title} size={data.size}>
      <div className="cid-card__footer">
        <img src={rsdLowerSvg} alt="Rear display" className="cid-icon cid-icon--md" />
        <span className="cid-card__status">{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default RearDisplayCard;
