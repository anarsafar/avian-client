import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ChilderProps {
  children: JSX.Element;
}

function Animate({ children }: ChilderProps): JSX.Element {
  const MotionBox = motion(Box);

  return (
    <MotionBox
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.3 }}
    >
      {children}
    </MotionBox>
  );
}

export default Animate;
