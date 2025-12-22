import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const floatingVariants = (delay: number, duration: number) => ({
    animate: {
      y: [0, -30, 0],
      x: [0, Math.random() * 20 - 10, 0],
      rotateX: [0, 180, 360],
      rotateY: [0, 180, 360],
      rotateZ: [0, 180, 360],
      opacity: [0.1, 0.4, 0.1],
      scale: [1, 1.2, 1],
    },
    transition: {
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    },
  });

  const shapes = [
    { id: 1, delay: 0, duration: 8, top: '10%', left: '10%', size: 100 },
    { id: 2, delay: 1, duration: 10, top: '20%', right: '15%', size: 80 },
    { id: 3, delay: 2, duration: 12, top: '50%', left: '5%', size: 120 },
    { id: 4, delay: 0.5, duration: 9, bottom: '20%', right: '10%', size: 90 },
    { id: 5, delay: 1.5, duration: 11, bottom: '10%', left: '20%', size: 110 },
    { id: 6, delay: 2.5, duration: 13, top: '60%', right: '5%', size: 75 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50" />

      {/* 3D floating shapes */}
      <div style={{ perspective: '1000px', width: '100%', height: '100%' }}>
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            variants={floatingVariants(shape.delay, shape.duration)}
            animate="animate"
            style={{
              position: 'absolute',
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              width: shape.size,
              height: shape.size,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Cube Shape */}
            {shape.id % 3 === 0 && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Cube faces */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                    border: '2px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                  }}
                />
              </div>
            )}

            {/* 3D Sphere Shape */}
            {shape.id % 3 === 1 && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.1))',
                  border: '2px solid rgba(34, 197, 94, 0.3)',
                  boxShadow: `0 0 30px rgba(34, 197, 94, 0.3),
                              inset -20px -20px 40px rgba(0, 0, 0, 0.2),
                              inset 20px 20px 40px rgba(34, 197, 94, 0.1)`,
                  backdropFilter: 'blur(10px)',
                }}
              />
            )}

            {/* 3D Torus/Ring Shape */}
            {shape.id % 3 === 2 && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '8px solid rgba(168, 85, 247, 0.3)',
                  background: 'radial-gradient(circle at 30% 30%, transparent 30%, rgba(168, 85, 247, 0.1))',
                  boxShadow: `0 0 30px rgba(168, 85, 247, 0.3),
                              inset 0 0 20px rgba(168, 85, 247, 0.1)`,
                  backdropFilter: 'blur(10px)',
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Mesh grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.05) 25%, rgba(59, 130, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.05) 75%, rgba(59, 130, 246, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
