'use client';

import React from 'react';

export function FilmGrain() {
  return (
    <svg className="film-grain" aria-hidden="true">
      <filter id="studio-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#studio-grain)" />
    </svg>
  );
}
