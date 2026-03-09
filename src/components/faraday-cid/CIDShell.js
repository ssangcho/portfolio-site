import CIDTabBar from './CIDTabBar';
import statusBarImg from '../../assets/faraday/top/status/night.png';
import launcherImg from '../../assets/faraday/bottom/launcher/night.png';
import climateImg from '../../assets/faraday/bottom/climate/action-bar-night.png';

function CIDShell({ activeTab, onTabChange, contentRef, children }) {
  return (
    <div className="cid-shell">
      <img src={statusBarImg} className="cid-status-bar" alt="" />

      <CIDTabBar activeIndex={activeTab} onTabChange={onTabChange} />

      <div className="cid-content-area" ref={contentRef}>
        {children}
      </div>

      <img src={launcherImg} className="cid-launcher-bar" alt="" />
      <img src={climateImg} className="cid-climate-bar" alt="" />
    </div>
  );
}

export default CIDShell;
