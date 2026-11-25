'use client';

import React, { useEffect, useRef } from 'react';

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouchCheck =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      'ontouchstart' in window;

    if (isTouchCheck) return;

    document.body.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const ring = { x: mouse.x, y: mouse.y };
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Magnetic interaction listeners
    const magneticEls = document.querySelectorAll('.magnetic');
    const handlers: {
      el: Element;
      enter: () => void;
      leave: () => void;
      move: (e: Event) => void;
    }[] = [];

    magneticEls.forEach((el) => {
      const enter = () => {
        ringRef.current?.classList.add('cursor-link');
      };
      const leave = () => {
        ringRef.current?.classList.remove('cursor-link');
        (el as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
      };
      const move = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const dx = (mouseEvent.clientX - (rect.left + rect.width / 2)) * 0.22;
        const dy = (mouseEvent.clientY - (rect.top + rect.height / 2)) * 0.22;
        (el as HTMLElement).style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      };

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      el.addEventListener('mousemove', move);
      handlers.push({ el, enter, leave, move });
    });

    const renderLoop = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      handlers.forEach(({ el, enter, leave, move }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.removeEventListener('mousemove', move);
      });
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[120] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--fg)] transition-opacity duration-200 hidden md:block"
      />
      <div
        ref={ringRef}
        id="cursor-ring-el"
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[120] w-[34px] h-[34px] -ml-[17px] -mt-[17px] rounded-full border border-[var(--hairline-strong)] hidden md:flex items-center justify-center font-mono-tech text-[9px] text-white transition-[width,height,margin,background-color,border-color,border-radius] duration-250 ease-out"
      >
        <span ref={labelRef} id="cursor-ring-label"></span>
      </div>
      <style jsx global>{`
        #cursor-ring-el.cursor-link {
          width: 48px;
          height: 48px;
          margin-left: -24px;
          margin-top: -24px;
          border-color: var(--accent);
          background-color: rgba(255, 59, 0, 0.12);
        }
        #cursor-ring-el.cursor-pill {
          width: 94px;
          height: 34px;
          margin-left: -47px;
          margin-top: -17px;
          border-radius: 9999px;
          background-color: var(--accent);
          border-color: var(--accent);
          color: #ffffff;
        }
        #cursor-ring-el.cursor-pill span::before {
          content: 'VIEW ↗';
        }
      `}</style>
    </>
  );
}
