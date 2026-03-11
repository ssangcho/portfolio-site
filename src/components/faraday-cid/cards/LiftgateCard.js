import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { useLongPress } from '../useLongPress';
import { useCIDState } from '../CIDStateContext';
import liftgateClosedSvg from '../../../assets/faraday/quick_svg/liftgate-closed-2.svg';
import liftgateOpenedSvg from '../../../assets/faraday/quick_svg/liftgate-opened.svg';

const data = QUICK_CARDS.liftgate;

const ICON_FILTER_IDLE = 'brightness(0) saturate(100%) invert(85%) sepia(4%) saturate(200%) hue-rotate(210deg) brightness(95%) contrast(90%)';
const ICON_DELAY = 'opacity 150ms linear 150ms';

// Liftgate: Closed = Idle (normal), Open = Active (attention)
const BG_ACTIVE = '#404144';
const BG_IDLE   = '#2A2B2E';

function LiftgateCard() {
  const { liftgateOpen: open, toggleLiftgate: toggle } = useCIDState();
  const { progress, pressing, filled, handlers } = useLongPress(toggle, 1500);

  const currentBg = open ? BG_ACTIVE : BG_IDLE;
  const wipeBg = open ? BG_IDLE : BG_ACTIVE;
  const showWipe = pressing || filled;

  return (
    <div {...handlers} style={{ cursor: 'pointer' }}>
      <CIDCard
        title={data.title}
        size={data.size}
        titleStyle={{ color: '#C9C9D1' }}
        style={{ background: currentBg }}
      >
        <div className="cid-card__footer">
          <div style={{ position: 'relative', width: 'var(--cid-icon-md)', height: 'var(--cid-icon-md)', flexShrink: 0 }}>
            <img
              src={liftgateClosedSvg}
              alt=""
              className="cid-icon cid-icon--md"
              style={{ position: 'absolute', top: 0, left: 0, opacity: open ? 0 : 1, filter: ICON_FILTER_IDLE, transition: ICON_DELAY }}
            />
            <img
              src={liftgateOpenedSvg}
              alt=""
              className="cid-icon cid-icon--md"
              style={{ position: 'absolute', top: 0, left: 0, opacity: open ? 1 : 0, filter: ICON_FILTER_IDLE, transition: ICON_DELAY }}
            />
          </div>
          <span className="cid-card__status" style={{ color: '#898987' }}>
            {open ? 'Open' : 'Closed'}
          </span>
        </div>

        {showWipe && (
          <div
            className="cid-wipe-mask"
            style={{
              background: wipeBg,
              clipPath: filled
                ? 'inset(0 0 0 0)'
                : `inset(0 ${100 - progress * 100}% 0 0)`,
            }}
          />
        )}
      </CIDCard>
    </div>
  );
}

export default LiftgateCard;
