import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TrackerObject {
  id: number;
  size: number;
  color: string;
  delay: number;
  shape: 'circle' | 'square';
}

export function CursorTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const trackerObjects: TrackerObject[] = [
    { id: 1, size: 60, color: 'from-primary/30 to-chart-2/30', delay: 0, shape: 'circle' },
    { id: 2, size: 45, color: 'from-chart-2/25 to-purple-500/25', delay: 0.1, shape: 'square' },
    { id: 3, size: 35, color: 'from-purple-500/20 to-primary/20', delay: 0.2, shape: 'circle' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 hidden lg:block">
      {trackerObjects.map((obj) => (
        <motion.div
          key={obj.id}
          animate={{
            x: mousePosition.x - obj.size / 2,
            y: mousePosition.y - obj.size / 2,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            delay: obj.delay,
            duration: 0.3,
            ease: 'easeOut',
          }}
          className={`absolute w-${obj.size} h-${obj.size} rounded-full pointer-events-none`}
          style={{
            width: `${obj.size}px`,
            height: `${obj.size}px`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            className={`w-full h-full bg-gradient-to-br ${obj.color} rounded-full border border-white/10`}
            style={{
              borderRadius: obj.shape === 'circle' ? '50%' : '8px',
            }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${obj.color}`}
            style={{
              borderRadius: obj.shape === 'circle' ? '50%' : '8px',
              opacity: 0.3,
              filter: 'blur(2px)',
            }}
          />
        </motion.div>
      ))}

      {/* Glow effect around cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}
