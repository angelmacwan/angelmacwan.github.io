'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '@/lib/portfolio-data';
import { renderProjectSimulation, INITIAL_PG_STATE } from '@/lib/procedural-renderers';

interface WorksIndexProps {
  onSelectProject: (index: number) => void;
}

export function WorksIndex({ onSelectProject }: WorksIndexProps) {
  const [filter, setFilter] = useState<'all' | 'bio' | 'data' | 'apps'>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewStageRef = useRef<HTMLDivElement>(null);
  const isTouchRef = useRef(true);

  // Mouse position and stage tilt
  const mousePos = useRef({ x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const stagePos = useRef({ x: 0, y: 0, rotY: 0, rotZ: 0 });

  useEffect(() => {
    isTouchRef.current =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      'ontouchstart' in window;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.vx = e.clientX - mousePos.current.lastX;
      mousePos.current.vy = e.clientY - mousePos.current.lastY;
      mousePos.current.lastX = e.clientX;
      mousePos.current.lastY = e.clientY;
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Setup preview canvas DPR
    const canvas = previewCanvasRef.current;
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = 360 * dpr;
      canvas.height = 230 * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let animId: number;
    let t = 0;
    const animate = () => {
      t += 1;

      if (!isTouchRef.current && hoveredProject !== null && previewStageRef.current) {
        const targetX = Math.min(
          window.innerWidth - 380,
          Math.max(20, mousePos.current.x + 28)
        );
        const targetY = Math.min(
          window.innerHeight - 250,
          Math.max(70, mousePos.current.y - 115)
        );

        stagePos.current.x += (targetX - stagePos.current.x) * 0.14;
        stagePos.current.y += (targetY - stagePos.current.y) * 0.14;

        const targetRotZ = Math.max(-7, Math.min(7, mousePos.current.vx * 0.28));
        const targetRotY = Math.max(-14, Math.min(14, mousePos.current.vx * 0.45));
        stagePos.current.rotZ += (targetRotZ - stagePos.current.rotZ) * 0.12;
        stagePos.current.rotY += (targetRotY - stagePos.current.rotY) * 0.12;

        previewStageRef.current.style.transform = `translate3d(${stagePos.current.x}px, ${stagePos.current.y}px, 0) perspective(900px) rotateY(${stagePos.current.rotY}deg) rotateZ(${stagePos.current.rotZ}deg)`;

        const ctx = previewCanvasRef.current?.getContext('2d');
        if (ctx) {
          renderProjectSimulation(
            ctx,
            360,
            230,
            hoveredProject,
            t * 16,
            false,
            INITIAL_PG_STATE
          );
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredProject]);

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const handleMouseEnterRow = (idx: number) => {
    setHoveredProject(idx);
    const ring = document.getElementById('cursor-ring-el');
    if (ring) {
      ring.classList.add('cursor-pill');
    }
  };

  const handleMouseLeaveRow = () => {
    setHoveredProject(null);
    const ring = document.getElementById('cursor-ring-el');
    if (ring) {
      ring.classList.remove('cursor-pill');
    }
  };

  return (
    <section id="works" className="mx-auto max-w-[1440px] px-4 sm:px-8 py-20 sm:py-32">
      {/* Floating 3D Tilt Preview Stage */}
      <div
        ref={previewStageRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-[360px] h-[230px] pointer-events-none z-40 border border-[var(--hairline-strong)] bg-[#0B0B0C] overflow-hidden shadow-2xl transition-opacity duration-200 hidden md:block ${
          hoveredProject !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <canvas ref={previewCanvasRef} className="block w-full h-full" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono-tech text-[9px] text-[#F0EDE6]/80 pointer-events-none">
          <span>
            {hoveredProject !== null
              ? PROJECTS[hoveredProject].previewMeta
              : 'LIVE SIMULATION'}
          </span>
          <span className="text-[var(--accent)] font-semibold">60 FPS</span>
        </div>
      </div>

      {/* Section Header + Filter Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between pb-8 hairline-b">
        <div>
          <div className="font-mono-tech text-[var(--muted)] mb-2">
            01 / SELECTED WORKS &amp; ARTIFACTS
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-bold tracking-tight uppercase">
            Index of{' '}
            <span className="font-serif-ed italic font-normal lowercase text-[1.12em] text-[var(--accent)]">
              systems
            </span>
          </h2>
        </div>

        {/* Minimal Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="Filter portfolio projects"
        >
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`magnetic hairline-all px-3.5 py-2 font-mono-tech transition-colors ${
              filter === 'all'
                ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            ALL [{PROJECTS.length.toString().padStart(2, '0')}]
          </button>
          <button
            type="button"
            onClick={() => setFilter('bio')}
            className={`magnetic hairline-all px-3.5 py-2 font-mono-tech transition-colors ${
              filter === 'bio'
                ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            AI &amp; COMP-BIO [02]
          </button>
          <button
            type="button"
            onClick={() => setFilter('data')}
            className={`magnetic hairline-all px-3.5 py-2 font-mono-tech transition-colors ${
              filter === 'data'
                ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            DATA SYSTEMS [02]
          </button>
          <button
            type="button"
            onClick={() => setFilter('apps')}
            className={`magnetic hairline-all px-3.5 py-2 font-mono-tech transition-colors ${
              filter === 'apps'
                ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            AGENTIC &amp; LAB [03]
          </button>
        </div>
      </div>

      {/* Full-Width Horizontal Hairline Project Rows */}
      <div className="divide-y divide-[var(--hairline)]">
        {filteredProjects.map((project) => {
          const originalIndex = PROJECTS.findIndex((p) => p.id === project.id);
          return (
            <article
              key={project.id}
              onClick={() => onSelectProject(originalIndex)}
              onMouseEnter={() => handleMouseEnterRow(originalIndex)}
              onMouseLeave={handleMouseLeaveRow}
              className="work-row group py-8 sm:py-11 grid grid-cols-1 md:grid-cols-12 items-baseline gap-3 md:gap-4 cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`Open case study for ${project.titlePrefix} ${project.titleItalic}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(originalIndex);
                }
              }}
            >
              {/* Index */}
              <div className="md:col-span-1 font-mono-tech text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                {project.index}
              </div>

              {/* Title */}
              <div className="md:col-span-7">
                <h3 className="work-title font-syne font-bold uppercase">
                  {project.titlePrefix}{' '}
                  <span className="work-title-serif font-serif-ed font-normal lowercase tracking-normal">
                    {project.titleItalic}
                  </span>{' '}
                  {project.titleSuffix && (
                    <span className="text-[var(--accent)] text-[0.8em] font-extrabold ml-1">
                      {project.titleSuffix}
                    </span>
                  )}
                </h3>
              </div>

              {/* Domain & Role */}
              <div className="md:col-span-3 font-mono-tech text-[var(--muted)]">
                {project.role}
              </div>

              {/* Year & Mobile Affordance */}
              <div className="md:col-span-1 font-mono-tech text-[var(--muted)] md:text-right flex items-center justify-between md:justify-end gap-2">
                <span>{project.year.split('–')[0]}</span>
                <span className="md:hidden text-[var(--accent)] font-bold">
                  INSPECT &nearr;
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
