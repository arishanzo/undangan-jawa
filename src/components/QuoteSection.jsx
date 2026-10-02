import React from 'react';
import WayangSvg from './WayangSvg';
import useReveal from '../hooks/useReveal';

export default function QuoteSection({ data }) {
  const ref = useReveal();
  return (
<section className="invitation-section section-warm flex flex-col items-center justify-center text-center">
         <img src="/assets/gunungan.svg" className="mb-8" width={100} height={100} alt="" />
      <div className="quote-box reveal" ref={ref}>
        <div className="quote-arabic">{data.wedding.aksaraJawa || 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا'}</div>
        <div className="javanese-divider">
          <div className="divider-line" />
          <span style={{ color: 'var(--gold)', fontSize: '13px' }}>✦</span>
          <div className="divider-line" />
        </div>
        <p className="quote-text-main">"{data.wedding.religiousQuote}"</p>
        <div className="quote-source">{data.wedding.religiousSource}</div>
        <div className="javanese-divider" style={{ margin: '18px 0 14px' }}>
          <div className="divider-line" />
          <span style={{ color: 'var(--rose)', fontSize: '13px' }}>♡</span>
          <div className="divider-line" />
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-soft)' }}>
          {data.wedding.javaneseQuote}
        </p>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: '8px' }}>
          — {data.wedding.quoteSource} —
        </div>
      </div>
    </section>
  );
}
