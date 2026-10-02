import React from 'react';
import useReveal from '../hooks/useReveal';

function StoryItem({ story, delay }) {
  const ref = useReveal();
  return (
    <div className="timeline-item reveal" ref={ref} style={{ transitionDelay: `${delay}s` }}>
      <div className="timeline-dot" />
      <div className="timeline-year">{story.year}</div>
      <h4 className="timeline-title">{story.title}</h4>
      <p className="timeline-desc">{story.desc}</p>
    </div>
  );
}

export default function TimelineSection({ data }) {
  if (!data.loveStories?.length) return null;
  return (
    <section className="invitation-section section-warm">
      <div className="section-header">
        <div className="section-pretitle">Perjalanan Cinta</div>
        <h2 className="section-main-title">Kisah Kami</h2>
        <div className="section-subtitle">Dari pertemuan menuju pelaminan</div>
      </div>
      <div className="timeline-wrap">
        {data.loveStories.map((story, i) => (
          <StoryItem key={i} story={story} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}
