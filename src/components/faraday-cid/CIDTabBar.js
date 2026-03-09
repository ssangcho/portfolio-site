import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { transitions } from './motionTokens';
import { CID_TABS } from '../../data/cidContent';

function CIDTabBar({ activeIndex, onTabChange }) {
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  const measureTab = useCallback(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      const parent = el.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const tabRect = el.getBoundingClientRect();
      setIndicator({
        x: tabRect.left - parentRect.left,
        width: tabRect.width,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    measureTab();
  }, [measureTab]);

  return (
    <div className="cid-tab-bar">
      {CID_TABS.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => (tabRefs.current[i] = el)}
          className={`cid-tab ${i === activeIndex ? 'cid-tab--active' : ''}`}
          onClick={() => onTabChange(i)}
        >
          {tab.label}
        </button>
      ))}
      <motion.div
        className="cid-tab-indicator"
        animate={{
          x: indicator.x,
          width: indicator.width,
        }}
        transition={transitions.indicatorSlide}
      />
    </div>
  );
}

export default CIDTabBar;
