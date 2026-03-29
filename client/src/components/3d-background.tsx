import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const colors = ['#3b82f6', '#8b5cf6', '#22d3ee', '#10b981', '#a78bfa'];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.floor((canvas.width * canvas.height) / 12000);
    const particles: Particle[] = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const maxDist = 130;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}

const floatingSymbols = [
  { text: '</>',  top: '12%', left: '8%',   delay: 0,   duration: 6 },
  { text: '{ }',  top: '18%', right: '12%', delay: 1.2, duration: 7 },
  { text: '//',   top: '65%', left: '6%',   delay: 0.5, duration: 8 },
  { text: '()',   top: '72%', right: '8%',  delay: 2,   duration: 6.5 },
  { text: '[];',  top: '35%', left: '3%',   delay: 1.8, duration: 9 },
  { text: '=>',   top: '45%', right: '5%',  delay: 0.8, duration: 7.5 },
  { text: '##',   top: '82%', left: '15%',  delay: 2.5, duration: 8.5 },
  { text: '∑',    top: '25%', left: '85%',  delay: 3,   duration: 10 },
  { text: '∞',    top: '55%', right: '18%', delay: 1.5, duration: 9 },
];

const glowOrbs = [
  { size: 500, top: '-10%', left: '-5%',  color: 'rgba(59,130,246,0.18)',  blur: 120, delay: 0,   duration: 12 },
  { size: 400, top: '20%',  right: '-8%', color: 'rgba(139,92,246,0.18)',  blur: 100, delay: 2,   duration: 15 },
  { size: 350, bottom: '-8%',left: '25%', color: 'rgba(34,211,238,0.14)', blur: 90,  delay: 4,   duration: 18 },
  { size: 300, top: '50%',  left: '40%', color: 'rgba(168,85,247,0.10)',  blur: 80,  delay: 1,   duration: 20 },
];

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">

      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080818] via-[#0d0d2b] to-[#0a0a1a]" />

      {/* Soft aurora gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(59,130,246,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 10%, rgba(139,92,246,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(34,211,238,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Animated glow orbs */}
      {glowOrbs.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            top: (orb as any).top,
            left: (orb as any).left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
            borderRadius: '50%',
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Particle constellation canvas */}
      <ParticleCanvas />

      {/* Perspective grid at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '45%',
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(55deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating tech symbols */}
      {floatingSymbols.map((sym, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -18, 0],
            opacity: [0.08, 0.2, 0.08],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: sym.duration,
            repeat: Infinity,
            delay: sym.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: sym.top,
            left: (sym as any).left,
            right: (sym as any).right,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#60a5fa',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            userSelect: 'none',
            textShadow: '0 0 20px rgba(96,165,250,0.5)',
          }}
        >
          {sym.text}
        </motion.div>
      ))}

      {/* Horizontal scan line — subtle */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(99,179,237,0.3), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
