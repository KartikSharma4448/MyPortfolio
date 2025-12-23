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
      {/* Single smooth cursor follower - small and subtle */}
      <motion.div
        animate={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="absolute pointer-events-none"
        style={{
          width: '30px',
          height: '30px',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          className="w-full h-full bg-gradient-to-br from-primary/15 to-chart-2/15 rounded-full border border-white/10"
          style={{
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.15)',
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-full"
          style={{
            opacity: 0.25,
            filter: 'blur(2px)',
          }}
        />
      </motion.div>

      {/* Subtle glowing halo around cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}
