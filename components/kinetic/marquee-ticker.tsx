'use client';

import React, { useEffect, useRef } from 'react';

export function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let posX = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let animId: number;

    const onScroll = () => {
      const y = window.scrollY;
      scrollVelocity = y - lastScrollY;
      lastScrollY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const update = () => {
      const speed = 0.75 + Math.min(Math.abs(scrollVelocity) * 0.16, 8.5);
      const dir = scrollVelocity < -2 ? -1 : 1;
      posX -= speed * dir;

      const singleWidth = track.scrollWidth / 3;
      if (posX <= -singleWidth) posX += singleWidth;
      if (posX > 0) posX -= singleWidth;

      track.style.transform = `translate3d(${posX}px, 0, 0)`;
      scrollVelocity *= 0.92;

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const items = [
    'IBM DATA ENGINEERING',
    'COMPUTATIONAL BIOLOGY',
    'MEIBOMIAN GLAND SEGMENTATION',
    'THALLUS AGENT SIMULATION',
    'PLUTO WORKFLOW BLUEPRINTS',
    'ENTERPRISE PRIVATERAG',
    'GENETIC ALGORITHMS & NEURAL AGENTS'
  ];

  const phrase = items.join(' — ') + ' — ';

  return (
    <div
      className="hairline-t hairline-b py-4 overflow-hidden select-none bg-[var(--bg-elevated)] transition-colors duration-500"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform font-syne text-sm sm:text-xl md:text-2xl font-bold tracking-[0.06em] uppercase text-[var(--fg)]"
      >
        <span className="pr-12 whitespace-nowrap">{phrase}</span>
        <span className="pr-12 whitespace-nowrap">{phrase}</span>
        <span className="pr-12 whitespace-nowrap">{phrase}</span>
      </div>
    </div>
  );
}
