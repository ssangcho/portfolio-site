import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import leftMirrorSvg from '../../../assets/faraday/quick_svg/lefr-mirror.svg';
import rightMirrorSvg from '../../../assets/faraday/quick_svg/right-mirror.svg';

const data = QUICK_CARDS.mirrorAdjust;

function MirrorAdjustCard() {
  return (
    <CIDCard title={data.title} size={data.size}>
      <div className="cid-toggle-group">
        <button className="cid-toggle-btn">
          <img src={leftMirrorSvg} alt="Left mirror" className="cid-icon cid-icon--md" />
        </button>
        <button className="cid-toggle-btn">
          <img src={rightMirrorSvg} alt="Right mirror" className="cid-icon cid-icon--md" />
        </button>
      </div>
      <button className="cid-action-btn">Fold Mirrors</button>
    </CIDCard>
  );
}

export default MirrorAdjustCard;
