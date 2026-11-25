'use client';

import React, { useEffect, useRef } from 'react';

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className = '' }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId: number;

    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.45
    };

    const ptr = {
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0
    };

    interface BioNode {
      bx: number;
      by: number;
      x: number;
      y: number;
      phase: number;
      r: number;
    }

    const nodes: BioNode[] = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes.length = 0;
      const count = width < 640 ? 18 : 34;
      for (let i = 0; i < count; i++) {
        nodes.push({
          bx: Math.random() * width,
          by: Math.random() * height,
          x: 0,
          y: 0,
          phase: Math.random() * Math.PI * 2,
          r: 1.5 + Math.random() * 2
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      const parentRect = canvas.parentElement?.getBoundingClientRect();
      if (parentRect) {
        mouse.y = e.clientY - parentRect.top;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let t = 0;
    const render = () => {
      t += 1;
      const time = t * 0.016;

      // Spring pointer physics
      const fx = (mouse.x - ptr.x) * 0.08;
      const fy = (mouse.y - ptr.y) * 0.08;
      ptr.vx = (ptr.vx + fx) * 0.8;
      ptr.vy = (ptr.vy + fy) * 0.8;
      ptr.x += ptr.vx;
      ptr.y += ptr.vy;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-mode') === 'light';
      const baseLineColor = isLight ? 'rgba(11, 11, 12,' : 'rgba(240, 237, 230,';

      // 1. Organic cellular wave contour lines
      const rows = width < 640 ? 12 : 18;
      const cols = width < 640 ? 28 : 52;
      const stepX = width / (cols - 1);
      const stepY = (height * 0.94) / (rows - 1);

      for (let r = 0; r < rows; r++) {
        const baseY = r * stepY + height * 0.03;
        ctx.beginPath();

        for (let c = 0; c < cols; c++) {
          const x = c * stepX;
          const nx = c * 0.13;
          const ny = r * 0.32;

          let wave =
            Math.sin(nx + time * 1.3 + ny * 0.7) * 15 +
            Math.cos(nx * 0.6 - time * 0.85 + ny) * 10;

          // Interactive ripple
          const dx = x - ptr.x;
          const dy = (baseY + wave) - ptr.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 230;

          if (dist < radius) {
            const force = Math.pow(1 - dist / radius, 2);
            const ripple = Math.sin(dist * 0.045 - time * 4.5) * 15 * force;
            wave += ripple + (dy / (dist + 1)) * 26 * force;
          }

          const y = baseY + wave;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = r % 4 === 0 ? 0.16 : 0.06;
        ctx.strokeStyle = `${baseLineColor} ${alpha})`;
        ctx.lineWidth = r % 4 === 0 ? 1.1 : 0.75;
        ctx.stroke();
      }

      // 2. Cellular bio-nodes & proximity links
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const targetX = n.bx + Math.sin(time * 1.2 + n.phase) * 24;
        const targetY = n.by + Math.cos(time * 1.0 + n.phase) * 20;

        let pushX = 0;
        let pushY = 0;
        const mdx = targetX - ptr.x;
        const mdy = targetY - ptr.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 180) {
          const f = (1 - mdist / 180) * 38;
          pushX = (mdx / (mdist + 1)) * f;
          pushY = (mdy / (mdist + 1)) * f;
        }

        n.x = targetX + pushX;
        n.y = targetY + pushY;

        // Proximity connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 140) {
            const a = (1 - d / 140) * 0.16;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle =
              d < 70
                ? `rgba(255, 59, 0, ${a * 1.8})`
                : `${baseLineColor} ${a})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = mdist < 140 ? '#FF3B00' : `${baseLineColor} 0.35)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block ${className}`} />;
}
