import { createContext, useContext, useState, useCallback } from 'react';
import { QUICK_CARDS } from '../../data/cidContent';

const CIDStateContext = createContext(null);

/**
 * Persists card state across tab switches.
 * State only resets on full page refresh (initial defaults from cidContent).
 */
export function CIDStateProvider({ children }) {
  const [driveMode, setDriveMode] = useState(QUICK_CARDS.driveModes.activeMode);
  const [headlights, setHeadlights] = useState(QUICK_CARDS.headlights.active);
  const [brightness, setBrightness] = useState(40);
  const [doorLocked, setDoorLocked] = useState(false);
  const [chargeDoorOpen, setChargeDoorOpen] = useState(false);
  const [liftgateOpen, setLiftgateOpen] = useState(false);

  const toggleDoorLocked = useCallback(() => setDoorLocked((v) => !v), []);
  const toggleChargeDoor = useCallback(() => setChargeDoorOpen((v) => !v), []);
  const toggleLiftgate = useCallback(() => setLiftgateOpen((v) => !v), []);

  return (
    <CIDStateContext.Provider
      value={{
        driveMode, setDriveMode,
        headlights, setHeadlights,
        brightness, setBrightness,
        doorLocked, toggleDoorLocked,
        chargeDoorOpen, toggleChargeDoor,
        liftgateOpen, toggleLiftgate,
      }}
    >
      {children}
    </CIDStateContext.Provider>
  );
}

export function useCIDState() {
  const ctx = useContext(CIDStateContext);
  if (!ctx) throw new Error('useCIDState must be used within CIDStateProvider');
  return ctx;
}
