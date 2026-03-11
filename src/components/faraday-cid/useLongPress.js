import { useState, useRef, useCallback } from 'react';

// Ease-out: fast start, slow end
function easeOut(t) {
  return Math.pow(t, 0.4);
}

/**
 * Long-press hook with 3-phase transition:
 *   1. pressing: wipe fills 0→100% (ease-out)
 *   2. filled: wipe stays at 100% briefly
 *   3. complete: wipe gone, onComplete fires → final state appears
 *
 * Release early → cancel, reset to 0.
 */
export function useLongPress(onComplete, holdDuration = 1500) {
  const [progress, setProgress] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [filled, setFilled] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const activeRef = useRef(false);

  const stop = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPressing(false);
    setProgress(0);
  }, []);

  const animate = useCallback(() => {
    if (!activeRef.current) return;
    const elapsed = Date.now() - startRef.current;
    const linear = Math.min(elapsed / holdDuration, 1);
    setProgress(easeOut(linear));

    if (linear >= 1) {
      activeRef.current = false;
      setPressing(false);
      setFilled(true);
      // Hold filled state briefly, then complete
      setTimeout(() => {
        setFilled(false);
        setProgress(0);
        onComplete();
      }, 200);
      return;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [holdDuration, onComplete]);

  const start = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    activeRef.current = true;
    startRef.current = Date.now();
    setPressing(true);
    setFilled(false);
    setProgress(0);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const cancel = useCallback((e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!activeRef.current && !pressing) return; // already completed
    stop();
  }, [stop, pressing]);

  const preventContext = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handlers = {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
    onContextMenu: preventContext,
  };

  return { progress, pressing, filled, handlers };
}
