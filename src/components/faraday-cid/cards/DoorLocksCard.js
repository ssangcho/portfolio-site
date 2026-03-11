import CIDCard from '../CIDCard';
import { QUICK_CARDS } from '../../../data/cidContent';
import { useLongPress } from '../useLongPress';
import { useCIDState } from '../CIDStateContext';
import lockOpenSvg from '../../../assets/faraday/quick_svg/lock-open.svg';
import lockLockedSvg from '../../../assets/faraday/quick_svg/lock_locked.svg';

const data = QUICK_CARDS.doorLocks;

// 3 background tones
const BG_ACTIVE   = '#404144'; // Unlocked — bright, attention
const BG_IDLE     = '#2A2B2E'; // Wipe mid-tone
const BG_DISABLED = '#1F2023'; // Locked — dark, locked down

const ICON_FILTER_DISABLED = 'brightness(0) saturate(100%) invert(42%) sepia(5%) saturate(350%) hue-rotate(190deg) brightness(93%) contrast(88%)';
const ICON_DELAY = 'opacity 150ms linear 150ms'; // 150ms duration, 150ms delay

function DoorLocksCard() {
  const { doorLocked: locked, toggleDoorLocked: toggle } = useCIDState();
  const { progress, pressing, filled, handlers } = useLongPress(toggle, 1500);

  // Current state bg
  const currentBg = locked ? BG_DISABLED : BG_ACTIVE;
  // Wipe always uses mid-tone (idle)
  const showWipe = pressing || filled;

  return (
    <div {...handlers} style={{ cursor: 'pointer' }}>
      <CIDCard
        title={data.title}
        size={data.size}
        style={{ background: currentBg }}
        titleStyle={{ color: locked ? '#646669' : undefined }}
      >
        <div className="cid-card__footer">
          <div style={{ position: 'relative', width: 'var(--cid-icon-md)', height: 'var(--cid-icon-md)', flexShrink: 0 }}>
            <img
              src={lockOpenSvg}
              alt=""
              className="cid-icon cid-icon--md"
              style={{ position: 'absolute', top: 0, left: 0, opacity: locked ? 0 : 1, transition: ICON_DELAY }}
            />
            <img
              src={lockLockedSvg}
              alt=""
              className="cid-icon cid-icon--md"
              style={{ position: 'absolute', top: 0, left: 0, opacity: locked ? 1 : 0, filter: ICON_FILTER_DISABLED, transition: ICON_DELAY }}
            />
          </div>
          <span className="cid-card__status" style={{ color: locked ? '#646669' : undefined }}>
            {locked ? 'Locked' : 'Unlocked'}
          </span>
        </div>

        {showWipe && (
          <div
            className="cid-wipe-mask"
            style={{
              background: BG_IDLE,
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

export default DoorLocksCard;
