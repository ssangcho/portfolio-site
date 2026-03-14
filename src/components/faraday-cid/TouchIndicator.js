import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * TouchIndicator — white semi-transparent circle that follows press + drag.
 * Stays visible during long-press/drag, fades out on release.
 */
export default function TouchIndicator({ shellRef, scale = 1 }) {
  const [active, setActive] = useState(null);
  const [fading, setFading] = useState([]);
  const activeRef = useRef(null);
  const pressedRef = useRef(false);

  const getLocalCoords = useCallback((e) => {
    if (!shellRef?.current) return null;
    const rect = shellRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  }, [shellRef, scale]);

  const handleDown = useCallback((e) => {
    const pos = getLocalCoords(e);
    if (!pos) return;
    pressedRef.current = true;
    const dot = { id: Date.now() + Math.random(), ...pos };
    setActive(dot);
    activeRef.current = dot;
  }, [getLocalCoords]);

  const handleMove = useCallback((e) => {
    if (!pressedRef.current || !activeRef.current) return;
    const pos = getLocalCoords(e);
    if (!pos) return;
    const updated = { ...activeRef.current, x: pos.x, y: pos.y };
    activeRef.current = updated;
    setActive(updated);
  }, [getLocalCoords]);

  const handleUp = useCallback(() => {
    if (!pressedRef.current) return;
    pressedRef.current = false;
    const dot = activeRef.current;
    if (!dot) return;
    setActive(null);
    activeRef.current = null;
    setFading((prev) => [...prev, dot]);
    setTimeout(() => {
      setFading((prev) => prev.filter((d) => d.id !== dot.id));
    }, 400);
  }, []);

  useEffect(() => {
    const el = shellRef?.current;
    if (!el) return;
    el.addEventListener('pointerdown', handleDown, true);
    window.addEventListener('pointermove', handleMove, true);
    window.addEventListener('pointerup', handleUp, true);
    window.addEventListener('pointercancel', handleUp, true);
    return () => {
      el.removeEventListener('pointerdown', handleDown, true);
      window.removeEventListener('pointermove', handleMove, true);
      window.removeEventListener('pointerup', handleUp, true);
      window.removeEventListener('pointercancel', handleUp, true);
    };
  }, [shellRef, handleDown, handleMove, handleUp]);

  return (
    <>
      {active && (
        <div
          className="cid-touch-dot cid-touch-dot--hold"
          style={{ left: active.x, top: active.y }}
        />
      )}
      {fading.map((dot) => (
        <div
          key={dot.id}
          className="cid-touch-dot cid-touch-dot--fade"
          style={{ left: dot.x, top: dot.y }}
        />
      ))}
    </>
  );
}
