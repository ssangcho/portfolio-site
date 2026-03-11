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
    activeMode: 'Eco',
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
    active: 'Off',
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

/* ── Doors Screen ── */
export const DOORS_DATA = {
  actions: [
    { id: 'unlock', label: 'Unlock All', icon: 'lock' },
    { id: 'pop', label: 'Pop All', icon: 'pop' },
    { id: 'open', label: 'Open All', icon: 'open' },
    { id: 'close', label: 'Close All', icon: 'close' },
  ],
  doors: [
    { id: 'fl', label: 'Front Left', row: 'front', side: 'left' },
    { id: 'fr', label: 'Front Right', row: 'front', side: 'right' },
    { id: 'rl', label: 'Rear Left', row: 'rear', side: 'left' },
    { id: 'rr', label: 'Rear Right', row: 'rear', side: 'right' },
  ],
  trunk: { id: 'trunk', label: 'Trunk' },
  frunk: { id: 'frunk', label: 'Frunk' },
};

/* ── Energy Screen ── */
export const ENERGY_DATA = {
  range: {
    current: 72,
    target: 80,
    duration: '3 hr 45 min',
  },
  chargingSession: {
    energy: { value: '12', unit: 'kW', delta: '+0.025 kWh' },
    rate: { value: '12', unit: 'mi/hr', delta: '+5 mi' },
    voltage: { value: '239', unit: 'VDC' },
    current: { value: '30', unit: 'A' },
    estimatedDuration: '3 hr 45 min',
  },
};
