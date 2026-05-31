'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinates motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics config for spring-lag effect (gives smooth physical momentum)
  const springConfig = { damping: 32, stiffness: 280, mass: 0.45 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

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
      // Only set visible once the mouse actually moves inside the viewport
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

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Scan the DOM for hover items
    const setupListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-card, Link'
      );

      elements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setHovered(true);
          const txt = el.getAttribute('data-cursor-text');
          if (txt) {
            setCursorText(txt);
          }
        });
        el.addEventListener('mouseleave', () => {
          setHovered(false);
          setCursorText('');
        });
      });
    };

    setupListeners();

    // Use MutationObserver to wire up dynamically injected elements
    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer physics-based lagging ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? (cursorText ? 80 : 64) : 32,
          height: hovered ? (cursorText ? 80 : 64) : 32,
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
          borderColor: hovered ? 'rgba(255, 140, 0, 0.8)' : 'rgba(255, 255, 255, 0.65)',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out, border-color 0.25s ease-out',
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-black tracking-widest text-white uppercase text-center select-none animate-pulse px-2">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner direct dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: clicked ? 0.6 : hovered ? 1.5 : 1,
          transition: 'scale 0.15s ease-out',
        }}
      />
    </>
  );
}
