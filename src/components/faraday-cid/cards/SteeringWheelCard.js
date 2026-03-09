import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import wheelPositionSvg from '../../../assets/faraday/quick_svg/wheel-position.svg';
import wheelHeatSvg from '../../../assets/faraday/quick_svg/wheel-heat.svg';

const data = QUICK_CARDS.steeringWheel;

function SteeringWheelCard() {
  return (
    <CIDCard title={data.title} size={data.size}>
      <div className="cid-toggle-group">
        <button className="cid-toggle-btn">
          <img src={wheelPositionSvg} alt="Wheel position" className="cid-icon cid-icon--md" />
        </button>
        <button className="cid-toggle-btn">
          <img src={wheelHeatSvg} alt="Wheel heat" className="cid-icon cid-icon--md" />
        </button>
      </div>
    </CIDCard>
  );
}

export default SteeringWheelCard;
