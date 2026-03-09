import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import lockOpenSvg from '../../../assets/faraday/quick_svg/lock-open.svg';

const data = QUICK_CARDS.doorLocks;

function DoorLocksCard() {
  return (
    <CIDCard title={data.title} size={data.size} style={{ background: '#404144' }}>
      <div className="cid-card__footer">
        <img src={lockOpenSvg} alt="Door locks" className="cid-icon cid-icon--md" />
        <span className="cid-card__status">{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default DoorLocksCard;
