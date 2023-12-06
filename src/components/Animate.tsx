import { motion } from 'framer-motion';

interface ChilderProps {
  children: JSX.Element;
}

function Animate({ children }: ChilderProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default Animate;
