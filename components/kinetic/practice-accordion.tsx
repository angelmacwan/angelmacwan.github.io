'use client';

import React, { useState } from 'react';
import { DISCIPLINES } from '@/lib/portfolio-data';

export function PracticeAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="practice" className="mx-auto max-w-[1440px] px-4 sm:px-8 py-16 sm:py-28">
      {/* Section Header */}
      <div className="pb-8 hairline-b flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="font-mono-tech text-[var(--muted)] mb-2">02 / PRACTICE</div>
          <h2 className="font-syne text-3xl sm:text-5xl font-bold tracking-tight uppercase">
            Three{' '}
            <span className="font-serif-ed italic font-normal lowercase text-[1.12em] text-[var(--accent)]">
              disciplines
            </span>
          </h2>
        </div>
        <div className="font-mono-tech text-[var(--muted)] text-xs">
          CLICK ANY DISCIPLINE TO EXPAND ARCHITECTURAL SPECS
        </div>
      </div>

      {/* Accordion Rows */}
      <div className="divide-y divide-[var(--hairline)] hairline-b">
        {DISCIPLINES.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.index}
              className={`accordion-item transition-colors duration-300 ${
                isOpen ? 'is-open bg-[var(--bg-elevated)]/30' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="accordion-trigger w-full py-7 sm:py-9 flex items-center justify-between gap-4 text-left group"
                aria-expanded={isOpen}
              >
                <div className="flex items-baseline gap-5 sm:gap-10">
                  <span className="font-mono-tech text-[var(--accent)] font-bold">
                    {item.index}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className="font-syne text-xl sm:text-3xl font-bold uppercase tracking-tight group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono-tech text-[var(--muted)] text-[10px] hidden lg:inline">
                      {item.tagline}
                    </span>
                  </div>
                </div>
                <span className="accordion-plus font-mono text-2xl leading-none text-[var(--muted)] font-light">
                  +
                </span>
              </button>

              <div className="accordion-body">
                <div className="accordion-inner">
                  <div className="pb-9 pl-0 sm:pl-14 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                    {/* Philosophy */}
                    <div className="md:col-span-6">
                      <div className="font-mono-tech text-[var(--muted)] mb-2">
                        PRACTICE PHILOSOPHY
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-[var(--fg)]/85">
                        {item.philosophy}
                      </p>
                    </div>

                    {/* Domains */}
                    <div className="md:col-span-3">
                      <div className="font-mono-tech text-[var(--muted)] mb-2">
                        CORE DOMAINS
                      </div>
                      <ul className="font-mono-tech leading-loose text-[var(--fg)] space-y-1">
                        {item.domains.map((dom) => (
                          <li key={dom} className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[var(--accent)] rounded-full inline-block" />
                            <span>{dom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tooling */}
                    <div className="md:col-span-3">
                      <div className="font-mono-tech text-[var(--muted)] mb-2">
                        TOOLKIT &amp; ENGINES
                      </div>
                      <ul className="font-mono-tech leading-loose text-[var(--fg)] space-y-1">
                        {item.toolkit.map((tool) => (
                          <li key={tool} className="flex items-center gap-2">
                            <span className="h-1 w-1 bg-[var(--hairline-strong)] rounded-full inline-block" />
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
