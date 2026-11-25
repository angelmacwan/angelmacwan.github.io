'use client';

import React, { useEffect, useState } from 'react';

interface TelemetryHeaderProps {
  onInvertToggle?: (isLight: boolean) => void;
}

export function TelemetryHeader({ onInvertToggle }: TelemetryHeaderProps) {
  const [clock, setClock] = useState('00:00:00');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [scrollPct, setScrollPct] = useState('00%');
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Live local clock with visitor's timezone
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        const tz = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
          .formatToParts(now)
          .find((p) => p.type === 'timeZoneName')?.value;
        setClock(tz ? `${formatter.format(now)} ${tz}` : formatter.format(now));
      } catch {
        const d = new Date();
        setClock(d.toTimeString().slice(0, 8));
      }
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll percentage
    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const pct = Math.min(100, Math.max(0, Math.round((y / maxScroll) * 100)));
      setScrollPct(`${String(pct).padStart(2, '0')}%`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(clockInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInvert = () => {
    const nextMode = !isLight;
    setIsLight(nextMode);
    document.documentElement.setAttribute('data-mode', nextMode ? 'light' : 'dark');
    if (onInvertToggle) {
      onInvertToggle(nextMode);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--hairline)] transition-colors duration-500">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-8">
        {/* Left: Identity */}
        <a
          href="#hero"
          className="magnetic font-syne text-xs sm:text-sm font-bold tracking-[0.16em] uppercase hover:text-[var(--accent)] transition-colors"
        >
          ANGEL MACWAN
        </a>

        {/* Center: Live Telemetry */}
        <div className="hidden lg:flex items-center gap-7 font-mono-tech text-[var(--muted)]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
            <span className="text-[var(--fg)]">{clock}</span>
          </span>
          <span>
            X: {String(coords.x).padStart(4, '0')} &nbsp;Y:{' '}
            {String(coords.y).padStart(4, '0')}
          </span>
          <span>
            SCRL <span className="text-[var(--fg)]">{scrollPct}</span>
          </span>
        </div>

        {/* Right: Section Nav + INVERT Toggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#works"
            className="magnetic hidden sm:inline-block font-mono-tech text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            WORKS
          </a>
          <a
            href="#practice"
            className="magnetic hidden md:inline-block font-mono-tech text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            DISCIPLINES
          </a>
          <a
            href="#skills"
            className="magnetic hidden lg:inline-block font-mono-tech text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            TOOLKIT
          </a>
          <button
            onClick={handleInvert}
            type="button"
            className="magnetic hairline-all px-3 py-1.5 font-mono-tech text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            aria-label="Toggle Obsidian Ink / Gallery Paper theme"
          >
            {isLight ? 'OBSIDIAN' : 'INVERT'}
          </button>
        </div>
      </div>
    </header>
  );
}
