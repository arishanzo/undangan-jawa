import React from 'react';

export default function WayangSvg({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 280"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      {/* Gunungan / Kayon wayang siluet */}
      <path d="M60 4 L116 80 L116 200 Q116 220 100 230 L60 250 L20 230 Q4 220 4 200 L4 80 Z" />
      {/* Inner detail lines */}
      <path d="M60 20 L104 84 L104 196 Q104 210 92 218 L60 234 L28 218 Q16 210 16 196 L16 84 Z" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      {/* Center ornament */}
      <ellipse cx="60" cy="130" rx="18" ry="22" fill="rgba(0,0,0,0.12)" />
      <ellipse cx="60" cy="130" rx="10" ry="13" fill="rgba(0,0,0,0.1)" />
      {/* Top flame */}
      <path d="M60 4 Q68 -4 72 8 Q76 -2 80 10 Q84 0 86 14 Q90 4 88 20 L60 4Z" />
      <path d="M60 4 Q52 -4 48 8 Q44 -2 40 10 Q36 0 34 14 Q30 4 32 20 L60 4Z" />
      {/* Base */}
      <rect x="30" y="248" width="60" height="28" rx="6" />
      <rect x="40" y="244" width="40" height="8" rx="4" />
      {/* Side wings */}
      <path d="M4 120 Q-8 100 2 80 Q10 90 16 110 Z" />
      <path d="M116 120 Q128 100 118 80 Q110 90 104 110 Z" />
      <path d="M4 160 Q-10 140 2 120 Q10 130 16 150 Z" />
      <path d="M116 160 Q130 140 118 120 Q110 130 104 150 Z" />
    </svg>
  );
}
