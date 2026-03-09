import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';

const data = QUICK_CARDS.odometer;

function OdometerCard() {
  return (
    <CIDCard size={data.size}>
      <div className="cid-card__header">
        <span className="cid-card__title">{data.title}</span>
        <span className="cid-card__status">{data.value} {data.unit}</span>
      </div>
    </CIDCard>
  );
}

export default OdometerCard;
