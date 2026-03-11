import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import seatHeatSvg from '../../../assets/faraday/quick_svg/seat-heat.svg';

const data = QUICK_CARDS.seatHeat;

function SeatHeatCard() {
  return (
    <CIDCard title={data.title} size={data.size} style={{ background: '#2A2B2E' }} titleStyle={{ color: '#C9C9D1' }}>
      <div className="cid-card__footer">
        <img src={seatHeatSvg} alt="Seat heat" className="cid-icon cid-icon--md" style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(4%) saturate(200%) hue-rotate(210deg) brightness(95%) contrast(90%)' }} />
        <span className="cid-card__status" style={{ color: '#898987' }}>{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default SeatHeatCard;
