/* ── Faraday CID Content Data ── */

export const CID_TABS = [
  { id: 'quick', label: 'Quick' },
  { id: 'doors', label: 'Doors' },
  { id: 'energy', label: 'Energy' },
  { id: 'lights', label: 'Lights' },
  { id: 'seats', label: 'Seats' },
  { id: 'settings', label: 'Settings' },
];

export const QUICK_CARDS = {
  driveModes: {
    title: 'Drive Modes',
    size: 'tall',
    hasChevron: true,
    modes: ['Eco', 'Comfort', 'Sport'],
    modesRow2: ['Hyper', 'Launch'],
    activeMode: 'Comfort',
  },
  odometer: {
    title: 'Odometer',
    size: 'compact',
    value: '2,488',
    unit: 'miles',
  },
  headlights: {
    title: 'Headlights',
    size: 'half',
    options: ['Off', 'On', 'Auto'],
    active: 'Auto',
  },
  mirrorAdjust: {
    title: 'Mirror Adjust',
    size: 'half',
    actions: ['Fold Mirrors'],
  },
  steeringWheel: {
    title: 'Steering Wheel Adjust',
    size: 'half',
  },
  doorLocks: {
    title: 'Door Locks',
    size: 'quarter',
    status: 'Unlocked',
  },
  chargeDoor: {
    title: 'Charge Door',
    size: 'quarter',
    status: 'Closed',
  },
  driverDisplays: {
    title: 'Driver Displays',
    size: 'half',
    hasChevron: true,
  },
  liftgate: {
    title: 'Liftgate',
    size: 'quarter',
    status: 'Closed',
  },
  seatHeat: {
    title: 'Drivers Seat Heat',
    size: 'quarter',
    status: 'Off',
  },
  rearDisplay: {
    title: 'Rear Seat Display',
    size: 'quarter',
    status: 'Raised',
  },
  displaySleep: {
    title: 'Display Sleep',
    size: 'quarter',
    status: 'Awake',
  },
};
