"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Particle canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; alphaDir: number;
    };

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      alphaDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const CONNECTION_DIST = 130;

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha >= 0.7 || p.alpha <= 0.05) p.alphaDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
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

/* ─── Network / World Connectivity SVG ─── */
function NetworkSVG() {
  const nodes = [
    { cx: "12%", cy: "20%" },
    { cx: "35%", cy: "12%" },
    { cx: "60%", cy: "18%" },
    { cx: "82%", cy: "8%" },
    { cx: "90%", cy: "35%" },
    { cx: "75%", cy: "60%" },
    { cx: "55%", cy: "75%" },
    { cx: "30%", cy: "80%" },
    { cx: "8%", cy: "65%" },
    { cx: "48%", cy: "45%" },
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [5, 6], [6, 7], [7, 8], [8, 0], [1, 9],
    [2, 9], [4, 9], [5, 9], [7, 9], [0, 9],
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.22 }}
    >
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#22c55e"
          strokeWidth="0.5"
          strokeDasharray="6 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.25,
          }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r="3"
          fill="#22c55e"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ─── Signal Tower ─── */
function SignalTower({ x, y, scale = 1 }: { x: string; y: string; scale?: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, transform: `scale(${scale})` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <svg width="40" height="72" viewBox="0 0 40 72" fill="none">
        {/* Tower structure */}
        <line x1="20" y1="0" x2="4" y2="64" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="20" y1="0" x2="36" y2="64" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="6" y1="24" x2="34" y2="24" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="8" y1="40" x2="32" y2="40" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="11" y1="54" x2="29" y2="54" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Base */}
        <line x1="0" y1="68" x2="40" y2="68" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.6" />
        {/* Signal dot at top */}
        <circle cx="20" cy="0" r="2.5" fill="#22c55e" />

        {/* Signal waves */}
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M ${20 - i * 5} ${-i * 6} Q 20 ${-i * 8 - 4} ${20 + i * 5} ${-i * 6}`}
            stroke="#22c55e"
            strokeWidth="1"
            fill="none"
            strokeOpacity={0.7 / i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.8 / i, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

/* ─── Radial Glow Orbs ─── */
function GlowOrbs() {
  return (
    <>
      {/* Primary top-center orb */}
      <motion.div
        className="absolute"
        style={{
          top: "-15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left accent orb */}
      <motion.div
        className="absolute"
        style={{
          top: "30%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Right accent orb */}
      <motion.div
        className="absolute"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </>
  );
}

/* ─── Scan Line ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.3) 50%, transparent 100%)",
        top: 0,
      }}
      animate={{ y: ["0vh", "100vh"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
    />
  );
}

/* ─── Main export ─── */
export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient — dark-mode only; light mode hides it via CSS so the
          green particles render over the pale hero instead of a grey veil */}
      <div
        className="hero-dark-base absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #080c14 0%, #0a1020 40%, #081018 70%, #080c14 100%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <GlowOrbs />
      <ParticleCanvas />
      <NetworkSVG />
      <ScanLine />

      {/* Signal towers positioned at corners/edges */}
      <SignalTower x="5%" y="55%" scale={0.7} />
      <SignalTower x="88%" y="48%" scale={0.55} />
      <SignalTower x="78%" y="62%" scale={0.45} />

      {/* Bottom fade overlay — dark-mode only (hidden in light via CSS) */}
      <div
        className="hero-dark-base absolute bottom-0 left-0 right-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(8,12,20,0.9))",
        }}
      />

      {/* Radial center spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(34,197,94,0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
