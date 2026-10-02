import React, { useMemo } from 'react';

const PETAL_COLORS = [
  'rgba(196,115,106,0.7)',
  'rgba(232,168,158,0.6)',
  'rgba(201,168,76,0.5)',
  'rgba(240,217,138,0.5)',
  'rgba(245,216,212,0.8)',
  'rgba(255,255,255,0.3)',
];

export default function Petals({ count = 18 }) {
  const petals = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 6 + Math.random() * 8,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      duration: 6 + Math.random() * 8,
      swayDuration: 2 + Math.random() * 3,
      delay: Math.random() * 10,
      borderRadius: Math.random() > 0.5 ? '50% 0 50% 0' : '50% 50% 0 50%',
    }))
  ), [count]);

  return (
    <div className="petals-container">
      {petals.map(p => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.borderRadius,
            animationDuration: `${p.duration}s, ${p.swayDuration}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
