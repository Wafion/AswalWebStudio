'use client';

import React, { useState, useEffect } from 'react';

const words = ['Grow Your Business', 'Drive Direct Sales', 'Build Brand Trust', 'Outperform Competitors'];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter typing logic
  useEffect(() => {
    if (!mounted) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 65);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, mounted]);

  // Cursor blinking logic
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return <span className="text-gradient">Grow Your Business</span>;
  }

  return (
    <span className="text-gradient inline-flex items-center min-h-[1.1em]">
      {words[index].substring(0, subIndex)}
      <span 
        className={`inline-block w-[3px] h-[0.9em] bg-primary ml-1.5 transition-opacity duration-75 ${blink ? 'opacity-100' : 'opacity-0'}`}
        style={{ verticalAlign: 'baseline' }}
      />
    </span>
  );
}
