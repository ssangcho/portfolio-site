import { motion } from 'framer-motion';
import { screenSlideVariants } from '../motionTokens';
import CIDCardGrid from '../CIDCardGrid';
import RangeBanner from '../cards/RangeBanner';
import DriveModesCard from '../cards/DriveModesCard';
import OdometerCard from '../cards/OdometerCard';
import MirrorAdjustCard from '../cards/MirrorAdjustCard';
import HeadlightsCard from '../cards/HeadlightsCard';
import SteeringWheelCard from '../cards/SteeringWheelCard';
import DoorLocksCard from '../cards/DoorLocksCard';
import ChargeDoorCard from '../cards/ChargeDoorCard';
import DriverDisplaysCard from '../cards/DriverDisplaysCard';
import LiftgateCard from '../cards/LiftgateCard';
import SeatHeatCard from '../cards/SeatHeatCard';
import RearDisplayCard from '../cards/RearDisplayCard';
import DisplaySleepCard from '../cards/DisplaySleepCard';

function QuickControls({ direction }) {
  return (
    <motion.div
      variants={screenSlideVariants}
      custom={direction}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
    <RangeBanner />
    <CIDCardGrid dense>
      {/* Row 1-2: Drive Modes spans 2 rows, Odometer + Mirror Adjust stack right */}
      <DriveModesCard />
      <OdometerCard />
      <MirrorAdjustCard />

      {/* Row 3: Headlights + Steering Wheel */}
      <HeadlightsCard />
      <SteeringWheelCard />

      {/* Row 4: small + small + half */}
      <DoorLocksCard />
      <ChargeDoorCard />
      <DriverDisplaysCard />

      {/* Row 5: four quarter cards */}
      <LiftgateCard />
      <SeatHeatCard />
      <RearDisplayCard />
      <DisplaySleepCard />
    </CIDCardGrid>
    </motion.div>
  );
}

export default QuickControls;
