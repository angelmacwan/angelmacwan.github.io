'use client';

import React, { useState } from 'react';
import { TelemetryHeader } from '@/components/kinetic/telemetry-header';
import { HeroCanvas } from '@/components/kinetic/hero-canvas';
import { MarqueeTicker } from '@/components/kinetic/marquee-ticker';
import { WorksIndex } from '@/components/kinetic/works-index';
import { PracticeAccordion } from '@/components/kinetic/practice-accordion';
import { SkillsMatrix } from '@/components/kinetic/skills-matrix';
import { KineticFooter } from '@/components/kinetic/kinetic-footer';
import { CaseStudyTakeover } from '@/components/kinetic/case-study-takeover';

export default function Home() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(
    null
  );

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-hidden transition-colors duration-500">
      {/* 1. Architectural Telemetry Header */}
      <TelemetryHeader />

      {/* 2. Hero Section + Living Generative Canvas */}
      <section
        id="hero"
        className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden"
      >
        {/* Full-Bleed Living Generative Bio-Data Topology Canvas */}
        <HeroCanvas className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" />

        {/* Editorial Composition: Eyebrow + Headline + Bio Strip */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 my-auto">
          {/* Eyebrow Status */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between font-mono-tech text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>00 / HYBRID TECHNOLOGIST</span>
            </span>
            <span className="hidden sm:inline-block">
              DATA ENG &times; BIOLOGICAL AI &times; AGENT ENGINES
            </span>
          </div>

          {/* Asymmetric Editorial Display Headline */}
          <h1 className="hero-display font-syne font-extrabold uppercase select-none leading-[0.98] text-[clamp(1.85rem,3.5vw,3.85rem)] tracking-[-0.035em] max-w-4xl">
            <div className="block">DATA SYSTEMS,</div>
            <div className="block">
              <span className="font-serif-ed italic font-normal lowercase tracking-normal pr-2 sm:pr-4 text-[1.08em] text-[var(--accent)]">
                biological
              </span>
              <span>AI,</span>
            </div>
            <div className="block">&amp; AGENT ENGINES.</div>
          </h1>

          {/* 2-Column Sub-Hero Description Strip */}
          <div className="hairline-t pt-6 mt-8 sm:mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 items-end">
            <div className="md:col-span-8">
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                <strong className="font-medium text-[var(--fg)]">
                  Data Engineer at IBM
                </strong>{' '}
                architecting scalable cloud data platforms across Snowflake, Databricks, and AWS.{' '}
                <strong className="font-medium text-[var(--fg)]">
                  AI &amp; Computational Biology researcher
                </strong>{' '}
                engineering clinical vision models for ocular morphometrics and biomedical NLP. Creator of{' '}
                <strong className="font-medium text-[var(--fg)]">Thallus</strong>{' '}
                and agentic intelligence systems.
              </p>
            </div>

            <div className="md:col-span-4 flex md:justify-end items-center gap-4">
              <a
                href="#works"
                className="magnetic group inline-flex items-center gap-3 hairline-all px-5 py-3 font-mono-tech text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
              >
                <span>EXPLORE INDEX</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  &darr;
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Velocity-Reactive Typographic Marquee */}
      <MarqueeTicker />

      {/* 4. Signature Selected Works & Artifacts Index */}
      <WorksIndex onSelectProject={(idx) => setSelectedProjectIndex(idx)} />

      {/* 5. The Three Disciplines ("Practice") Expandable Accordion */}
      <PracticeAccordion />

      {/* 6. Technical Stack & Capabilities Repertoire */}
      <SkillsMatrix />

      {/* 7. Kinetic Footer & Interactive CTA */}
      <KineticFooter />

      {/* 8. Full-Screen Case Study Deep-Dive Takeover */}
      <CaseStudyTakeover
        projectIndex={selectedProjectIndex}
        onClose={() => setSelectedProjectIndex(null)}
        onNavigate={(idx) => setSelectedProjectIndex(idx)}
      />
    </div>
  );
}
