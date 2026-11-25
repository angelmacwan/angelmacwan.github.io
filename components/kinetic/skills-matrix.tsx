'use client';

import React from 'react';
import { SKILLS_MATRIX } from '@/lib/portfolio-data';

export function SkillsMatrix() {
  const sections = [
    { title: 'LANGUAGES', items: SKILLS_MATRIX.languages },
    { title: 'DATA SYSTEMS & CLOUD', items: SKILLS_MATRIX.dataCloud },
    { title: 'AI & RESEARCH ENGINES', items: SKILLS_MATRIX.aiResearch },
    { title: 'SYSTEMS, TOOLS & PROTOCOLS', items: SKILLS_MATRIX.systemsTools }
  ];

  return (
    <section id="skills" className="mx-auto max-w-[1440px] px-4 sm:px-8 py-16 sm:py-24 hairline-t">
      <div className="pb-8 hairline-b flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="font-mono-tech text-[var(--muted)] mb-2">03 / CAPABILITIES</div>
          <h2 className="font-syne text-3xl sm:text-5xl font-bold tracking-tight uppercase">
            Technical{' '}
            <span className="font-serif-ed italic font-normal lowercase text-[1.12em] text-[var(--accent)]">
              repertoire
            </span>
          </h2>
        </div>
        <div className="font-mono-tech text-[var(--muted)] text-xs">
          CORE TECHNOLOGIES DEPLOYED IN PRODUCTION &amp; RESEARCH
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
        {sections.map((sec, idx) => (
          <div key={sec.title} className="space-y-4">
            <div className="font-mono-tech text-[var(--accent)] font-semibold flex items-center gap-2">
              <span>0{idx + 1}</span>
              <span>/</span>
              <span>{sec.title}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sec.items.map((item) => (
                <span
                  key={item}
                  className="hairline-all px-3 py-1.5 font-mono-tech text-xs text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
