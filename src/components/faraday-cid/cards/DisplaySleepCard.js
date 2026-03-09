import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import moonSvg from '../../../assets/faraday/quick_svg/moon_displaysleep.svg';

const data = QUICK_CARDS.displaySleep;

function DisplaySleepCard() {
  return (
    <CIDCard title={data.title} size={data.size}>
      <div className="cid-card__footer">
        <img src={moonSvg} alt="Display sleep" className="cid-icon cid-icon--md" />
        <span className="cid-card__status">{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default DisplaySleepCard;
