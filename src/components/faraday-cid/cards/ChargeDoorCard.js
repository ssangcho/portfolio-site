import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import chargeportSvg from '../../../assets/faraday/quick_svg/chargeport.svg';

const data = QUICK_CARDS.chargeDoor;

function ChargeDoorCard() {
  return (
    <CIDCard title={data.title} size={data.size} style={{ background: '#1F2023' }} titleStyle={{ color: '#646669' }}>
      <div className="cid-card__footer">
        <img src={chargeportSvg} alt="Charge door" className="cid-icon cid-icon--md" style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(5%) saturate(350%) hue-rotate(190deg) brightness(93%) contrast(88%)' }} />
        <span className="cid-card__status" style={{ color: '#646669' }}>{data.status}</span>
      </div>
    </CIDCard>
  );
}

export default ChargeDoorCard;
