'use client';

import React, { useState } from 'react';

export function KineticFooter() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const copyEmail = (email = 'armacwan@gmail.com') => {
    try {
      navigator.clipboard.writeText(email);
      showToast(`COPIED: ${email.toUpperCase()}`);
    } catch {
      showToast(`EMAIL: ${email.toUpperCase()}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id="contact" className="hairline-t mt-16 bg-[var(--bg)] transition-colors duration-500">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 pt-16 sm:pt-24 pb-12">
          <div className="font-mono-tech text-[var(--muted)] mb-4">
            04 / INITIATE DIALOGUE
          </div>

          {/* Massive Edge-to-Edge Interactive CTA */}
          <div className="py-4">
            <button
              onClick={() => copyEmail('armacwan@gmail.com')}
              type="button"
              className="footer-cta magnetic font-syne font-extrabold uppercase text-left w-full cursor-pointer"
              title="Click to copy email address"
            >
              LET&apos;S{' '}
              <span className="font-serif-ed italic font-normal lowercase text-[var(--accent)]">
                build
              </span>{' '}
              &nearr;
            </button>
          </div>

          {/* Links & Attribution Strip */}
          <div className="mt-12 sm:mt-20 pt-8 hairline-t flex flex-col gap-6 md:flex-row md:items-center md:justify-between font-mono-tech text-xs">
            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-6 text-[var(--muted)]">
              <button
                type="button"
                onClick={() => copyEmail('armacwan@gmail.com')}
                className="magnetic text-[var(--fg)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                ARMACWAN@GMAIL.COM [COPY]
              </button>
              <button
                type="button"
                onClick={() => copyEmail('angel.macwan@ibm.com')}
                className="magnetic hover:text-[var(--fg)] transition-colors"
              >
                IBM WORK EMAIL
              </button>
              <a
                href="https://raw.githubusercontent.com/angelmacwan/resume/refs/heads/main/Angel%20Macwan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic hover:text-[var(--fg)] transition-colors"
              >
                RESUME [PDF]
              </a>
              <a
                href="https://github.com/angelmacwan/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic hover:text-[var(--fg)] transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/angel-im/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic hover:text-[var(--fg)] transition-colors"
              >
                LINKEDIN
              </a>
            </div>

            {/* Copyright & Scroll to Top */}
            <div className="flex items-center justify-between md:justify-end gap-8 text-[var(--muted)]">
              <span>&copy; {new Date().getFullYear()} ANGEL MACWAN</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="magnetic text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              >
                BACK TO TOP &uarr;
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Monospaced Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[160] bg-[var(--fg)] text-[var(--bg)] px-4 py-2.5 font-mono-tech text-xs shadow-xl animate-fade-in"
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
