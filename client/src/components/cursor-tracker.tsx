import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CursorTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

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
      {/* Single smooth cursor follower */}
      <motion.div
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="absolute w-16 h-16 pointer-events-none"
        style={{
          width: '60px',
          height: '60px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          className="w-full h-full bg-gradient-to-br from-primary/25 to-chart-2/25 rounded-full border border-white/15 shadow-lg"
          style={{
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/15 to-chart-2/15 rounded-full"
          style={{
            opacity: 0.4,
            filter: 'blur(3px)',
          }}
        />
      </motion.div>

      {/* Glowing halo around cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent)',
          filter: 'blur(25px)',
        }}
      />
    </div>
  );
}
