import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface Card3DFlipProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
}

export function Card3DFlip({ frontContent, backContent, className = "" }: Card3DFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontVariants = {
    front: { rotateY: 0, opacity: 1 },
    back: { rotateY: 180, opacity: 0 },
  };

  const backVariants = {
    front: { rotateY: -180, opacity: 0 },
    back: { rotateY: 0, opacity: 1 },
  };

  return (
    <div
      className={`relative w-full h-full cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        initial={false}
        animate={isFlipped ? 'back' : 'front'}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div variants={frontVariants} style={{ backfaceVisibility: 'hidden' }}>
          {frontContent}
        </motion.div>
        <motion.div
          variants={backVariants}
          style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
        >
          {backContent}
        </motion.div>
      </motion.div>
    </div>
  );
}
