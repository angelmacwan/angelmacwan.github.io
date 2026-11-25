'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { Project, PROJECTS } from '@/lib/portfolio-data';
import {
  renderProjectSimulation,
  PlaygroundState,
  INITIAL_PG_STATE
} from '@/lib/procedural-renderers';

interface CaseStudyTakeoverProps {
  projectIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function CaseStudyTakeover({
  projectIndex,
  onClose,
  onNavigate
}: CaseStudyTakeoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const takeoverRef = useRef<HTMLDivElement>(null);
  const [pgState, setPgState] = useState<PlaygroundState>(INITIAL_PG_STATE);
  const [, startTransition] = useTransition();

  const isOpen = projectIndex !== null;
  const project: Project | undefined =
    projectIndex !== null ? PROJECTS[projectIndex] : undefined;

  // Handle ESC key and body overflow lock
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && projectIndex !== null) {
        onNavigate((projectIndex - 1 + PROJECTS.length) % PROJECTS.length);
      } else if (e.key === 'ArrowRight' && projectIndex !== null) {
        onNavigate((projectIndex + 1) % PROJECTS.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, projectIndex, onClose, onNavigate]);

  // Interactive playground canvas render loop
  useEffect(() => {
    if (!isOpen || projectIndex === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let t = 0;
    const render = () => {
      t += 1;
      renderProjectSimulation(
        ctx,
        width,
        height,
        projectIndex,
        t * 16,
        true,
        pgState
      );
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isOpen, projectIndex, pgState]);

  if (!isOpen || !project) return null;

  return (
    <div
      ref={takeoverRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500"
    >
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 sm:px-8 hairline-b bg-[var(--bg)]/90 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4 font-mono-tech">
          <span className="text-[var(--accent)] font-bold">{project.index}</span>
          <span className="text-[var(--muted)]">/ CASE STUDY DEEP-DIVE</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={() =>
              onNavigate((projectIndex - 1 + PROJECTS.length) % PROJECTS.length)
            }
            className="magnetic font-mono-tech text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            &larr; PREV
          </button>
          <button
            type="button"
            onClick={() => onNavigate((projectIndex + 1) % PROJECTS.length)}
            className="magnetic font-mono-tech text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            NEXT &rarr;
          </button>
          <button
            type="button"
            onClick={onClose}
            className="magnetic hairline-all px-3 py-1.5 font-mono-tech text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            CLOSE [ESC]
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8 py-10 sm:py-16">
        {/* Giant Case Study Display Title */}
        <div className="space-y-2">
          {project.badge && (
            <span className="inline-block font-mono-tech text-[10px] text-[var(--accent)] border border-[var(--accent)]/40 px-2 py-0.5 mb-2">
              {project.badge}
            </span>
          )}
          <h2 className="font-syne text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.96]">
            {project.titlePrefix}{' '}
            <span className="font-serif-ed italic font-normal lowercase tracking-normal text-[var(--accent)]">
              {project.titleItalic}
            </span>{' '}
            {project.titleSuffix}
          </h2>
        </div>

        {/* Metadata Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 hairline-t hairline-b font-mono-tech text-xs">
          <div>
            <div className="text-[var(--muted)] mb-1.5">ROLE</div>
            <div className="text-[var(--fg)] font-medium">{project.role}</div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1.5">DOMAIN</div>
            <div className="text-[var(--fg)] font-medium">{project.domain}</div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1.5">STACK</div>
            <div className="text-[var(--fg)] font-medium">{project.stack}</div>
          </div>
          <div>
            <div className="text-[var(--muted)] mb-1.5">YEAR / STATUS</div>
            <div className="text-[var(--fg)] font-medium">{project.year}</div>
          </div>
        </div>

        {/* Interactive Mini-Playground Canvas */}
        <div className="mt-10 hairline-all bg-[#0B0B0C] text-[#F0EDE6] overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-white/15">
            <div className="flex items-center gap-2.5 font-mono-tech">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
              <span>{project.pgTitle}</span>
            </div>

            {/* Custom Interactive Controls Per Project */}
            <div className="flex flex-wrap items-center gap-3 font-mono-tech text-[11px]">
              {/* 0: MGD */}
              {projectIndex === 0 && (
                <>
                  <label className="flex items-center gap-2 text-white/80">
                    CONFIDENCE{' '}
                    <span className="text-[var(--accent)] font-mono font-bold">
                      {pgState.confThreshold.toFixed(2)}
                    </span>
                    <input
                      type="range"
                      min="0.30"
                      max="0.95"
                      step="0.01"
                      value={pgState.confThreshold}
                      onChange={(e) =>
                        setPgState((prev) => ({
                          ...prev,
                          confThreshold: parseFloat(e.target.value)
                        }))
                      }
                      className="studio-range w-24 sm:w-28"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setPgState((prev) => ({
                        ...prev,
                        showVectors: !prev.showVectors
                      }))
                    }
                    className="border border-white/20 px-2.5 py-1 text-white hover:border-[var(--accent)] transition-colors"
                  >
                    VECTORS: {pgState.showVectors ? 'ON' : 'OFF'}
                  </button>
                </>
              )}

              {/* 1: Disease-Gene */}
              {projectIndex === 1 && (
                <>
                  <label className="flex items-center gap-2 text-white/80">
                    CONFIDENCE{' '}
                    <span className="text-[var(--accent)] font-mono font-bold">
                      {pgState.relationConfidence.toFixed(2)}
                    </span>
                    <input
                      type="range"
                      min="0.50"
                      max="0.98"
                      step="0.02"
                      value={pgState.relationConfidence}
                      onChange={(e) =>
                        setPgState((prev) => ({
                          ...prev,
                          relationConfidence: parseFloat(e.target.value)
                        }))
                      }
                      className="studio-range w-24 sm:w-28"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(() => {
                        setPgState((prev) => ({
                          ...prev,
                          relationConfidence: prev.relationConfidence > 0.8 ? 0.65 : 0.88
                        }));
                      });
                    }}
                    className="border border-[var(--accent)] bg-[var(--accent)] text-white px-2.5 py-1 hover:opacity-90"
                  >
                    RELATION ATTRIBUTION
                  </button>
                </>
              )}

              {/* 2: IBM Data Mesh */}
              {projectIndex === 2 && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const newPackets = [
                        { edge: 0, p: 0 },
                        { edge: 1, p: 0.1 },
                        { edge: 2, p: 0 },
                        { edge: 3, p: 0.2 },
                        { edge: 4, p: 0 }
                      ];
                      setPgState((prev) => ({
                        ...prev,
                        burstPackets: [...prev.burstPackets, ...newPackets]
                      }));
                    }}
                    className="border border-[var(--accent)] bg-[var(--accent)] text-white px-2.5 py-1 hover:opacity-90"
                  >
                    + INJECT BURST TRAFFIC
                  </button>
                  <label className="flex items-center gap-2 text-white/80">
                    CADENCE
                    <input
                      type="range"
                      min="0.4"
                      max="2.4"
                      step="0.1"
                      value={pgState.cadence}
                      onChange={(e) =>
                        setPgState((prev) => ({
                          ...prev,
                          cadence: parseFloat(e.target.value)
                        }))
                      }
                      className="studio-range w-20"
                    />
                  </label>
                </>
              )}

              {/* 3: Thallus */}
              {projectIndex === 3 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPgState((prev) => ({
                        ...prev,
                        simulationRound: prev.simulationRound + 1
                      }))
                    }
                    className="border border-[var(--accent)] bg-[var(--accent)] text-white px-2.5 py-1 hover:opacity-90"
                  >
                    STEP ROUND ({pgState.simulationRound}) &rarr;
                  </button>
                  <label className="flex items-center gap-2 text-white/80">
                    AGENTS
                    <input
                      type="range"
                      min="12"
                      max="40"
                      step="4"
                      value={pgState.populationSize}
                      onChange={(e) =>
                        setPgState((prev) => ({
                          ...prev,
                          populationSize: parseInt(e.target.value, 10)
                        }))
                      }
                      className="studio-range w-20"
                    />
                  </label>
                </>
              )}

              {/* 4: Pluto */}
              {projectIndex === 4 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPgState((prev) => ({
                        ...prev,
                        executionProgress: (prev.executionProgress + 1) % 4
                      }))
                    }
                    className="border border-[var(--accent)] bg-[var(--accent)] text-white px-2.5 py-1 hover:opacity-90"
                  >
                    EXECUTE GRAPH CHECKPOINT &rarr;
                  </button>
                </>
              )}

              {/* 5: PrivateRAG */}
              {projectIndex === 5 && (
                <div className="flex items-center gap-1.5">
                  {(['ANALYST', 'AUDITOR', 'ADMIN'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() =>
                        setPgState((prev) => ({ ...prev, userRole: r }))
                      }
                      className={`border px-2 py-0.5 ${
                        pgState.userRole === r
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                          : 'border-white/20 text-white/70'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}

              {/* 6: Evolutionary */}
              {projectIndex === 6 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPgState((prev) => ({
                        ...prev,
                        generation: prev.generation + 10
                      }))
                    }
                    className="border border-[var(--accent)] bg-[var(--accent)] text-white px-2.5 py-1 hover:opacity-90"
                  >
                    ADVANCE +10 GENS
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Canvas container */}
          <div className="relative w-full h-[320px] sm:h-[400px]">
            <canvas ref={canvasRef} className="block w-full h-full" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono-tech text-[10px] text-white/70 pointer-events-none">
              <span>PROCEDURAL SIMULATOR · 60 FPS</span>
              <span className="text-[var(--accent)]">
                STATUS: INTERACTIVE FIELD READY
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Structured Breakdown */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pb-16 hairline-b">
          <div>
            <div className="font-mono-tech text-[var(--accent)] font-semibold mb-3">
              01 / CONTEXT &amp; CHALLENGE
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--fg)]/85">
              {project.context}
            </p>
          </div>

          <div>
            <div className="font-mono-tech text-[var(--accent)] font-semibold mb-3">
              02 / ENGINEERING &amp; RESEARCH CRAFT
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--fg)]/85">
              {project.craft}
            </p>
          </div>

          <div>
            <div className="font-mono-tech text-[var(--accent)] font-semibold mb-3">
              03 / IMPACT &amp; OUTCOME
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--fg)]/85">
              {project.impact}
            </p>
          </div>
        </div>

        {/* External Links Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono-tech">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] text-white px-5 py-2.5 text-xs hover:opacity-90 transition-opacity"
            >
              <span>INSPECT CODE / SOURCE REPO</span>
              <span>&nearr;</span>
            </a>
          ) : (
            <span className="text-[var(--muted)] text-xs">
              RESEARCH REPOSITORY (PENDING PEER REVIEW PUBLICATION)
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="magnetic font-mono-tech text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            RETURN TO INDEX &uarr;
          </button>
        </div>
      </div>
    </div>
  );
}
