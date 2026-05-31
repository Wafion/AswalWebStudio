'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinates motion values
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth springs for a luxury, fluid lag physics (feels responsive yet soft)
  const springConfig = { damping: 45, stiffness: 180, mass: 0.9 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const checkDevice = () => {
      const isTouch = 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0) || 
        window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const setupListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-card, Link'
      );

      elements.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    setupListeners();

    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || isMobile || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] blur-[80px]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: hovered ? 350 : 220,
        height: hovered ? 350 : 220,
        // High-end ambient light glow that reacts on interactive elements
        background: hovered
          ? 'radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(79, 70, 229, 0.1) 40%, rgba(37, 99, 235, 0.05) 60%, rgba(0,0,0,0) 80%)' // Rich Orange/Indigo active light
          : 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(79, 70, 229, 0.08) 45%, rgba(0,0,0,0) 75%)', // Smooth Blue/Indigo ambient light
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  );
}
