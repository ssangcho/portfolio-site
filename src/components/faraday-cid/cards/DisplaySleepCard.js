import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import moonSvg from '../../../assets/faraday/quick_svg/moon_displaysleep.svg';

const data = QUICK_CARDS.displaySleep;

function DisplaySleepCard() {
  return (
    <CIDCard title={data.title} size={data.size} titleStyle={{ color: '#C9C9D1' }}>
      <div className="cid-card__footer">
        <img src={moonSvg} alt="Display sleep" className="cid-icon cid-icon--md" style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(4%) saturate(200%) hue-rotate(210deg) brightness(95%) contrast(90%)' }} />
        <span className="cid-card__status" style={{ color: '#898987' }}>{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default DisplaySleepCard;
