'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Use relative path to fix build error
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WaveHeader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Configuration for the wave
    const config = {
      dotSize: 1.5, // Size of the dots
      spacing: 25, // Spacing between dots
      amplitude: 40, // How high the wave peaks are
      frequency: 0.02, // How tight the waves are
      speed: 0.02, // How fast the animation moves
      color: 'rgba(255, 255, 255, 0.7)', // Dot color
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = config.color;

      const rows = Math.ceil(canvas.height / config.spacing);
      const cols = Math.ceil(canvas.width / config.spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * config.spacing;
          const originalY = j * config.spacing;

          // The Magic Math:
          // We offset the Y position based on X and Z (row/col) to create a 3D-like wave
          const waveOffset =
            Math.sin(i * config.frequency + time) * config.amplitude +
            Math.cos(j * config.frequency + time) * config.amplitude;

          const y = originalY + waveOffset;

          // Draw the dot
          ctx.beginPath();
          // Optional: Change dot size based on wave height for "depth" perception
          const scale = (waveOffset + config.amplitude * 2) / (config.amplitude * 4);
          const radius = config.dotSize + (scale * 1);

          ctx.arc(x, y, radius > 0 ? radius : 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += config.speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);

    // Initialize
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // The section itself is full width (w-full) and breaks out of parent constraints if any
    // But we'll handle the breakout in the parent layout usage to be safe
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[600px] bg-black overflow-hidden flex items-center justify-center">
      {/* Background Canvas - Spans full width of the screen */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />

      {/* Gradient Overlay for better text readability - spans 1/3 of width */}
      <div className="absolute inset-0 w-full h-full flex justify-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-black via-black/80 to-black blur-xl opacity-80"></div>
      </div>

      {/* Content Overlay - Constrained to max-w-6xl to match other page content */}
      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto flex flex-col justify-center h-full">
        <motion.h1
          className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-tight mb-6 max-w-3xl relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Building the future of <br className="hidden md:block" />
          <span className="text-zinc-500 italic">health, tech, and communication.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          I&apos;m Emmanuel Uchenna. I engineer scalable frontend systems, write technical documentation that humans actually read, and advocate for digital health equity.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2 min-w-[200px] justify-center md:justify-start"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-zinc-700 text-white font-medium rounded-full hover:bg-zinc-900 transition-colors flex items-center gap-2 min-w-[200px] justify-center md:justify-start"
          >
            About Me <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Gradient Overlay for better text readability at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
    </section>
  );
};

export default WaveHeader;