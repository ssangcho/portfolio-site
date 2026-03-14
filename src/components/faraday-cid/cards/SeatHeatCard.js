import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import seatHeatSvg from '../../../assets/faraday/quick_svg/seat-heat.svg';

const data = QUICK_CARDS.seatHeat;

function SeatHeatCard() {
  return (
    <CIDCard title={data.title} size={data.size} style={{ background: '#2A2B2E' }} titleStyle={{ color: '#646669' }}>
      <div className="cid-card__footer">
        <img src={seatHeatSvg} alt="Seat heat" className="cid-icon cid-icon--md" style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(5%) saturate(350%) hue-rotate(190deg) brightness(93%) contrast(88%)' }} />
        <span className="cid-card__status" style={{ color: '#646669' }}>{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default SeatHeatCard;
