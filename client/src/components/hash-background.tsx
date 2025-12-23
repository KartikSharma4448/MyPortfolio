import { motion } from 'framer-motion';

interface Hash {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  size: string;
}

export function HashBackground() {
  // Generate random hash symbols positioned across the background
  const hashes: Hash[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
    size: ['text-lg', 'text-xl', 'text-2xl'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hashes.map((hash) => (
        <motion.div
          key={hash.id}
          className={`absolute ${hash.size} font-bold text-green-500/30 dark:text-green-400/25`}
          style={{
            left: hash.left,
            top: hash.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: hash.duration,
            delay: hash.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          #
        </motion.div>
      ))}
    </div>
  );
}
