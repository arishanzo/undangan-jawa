import React from 'react';
import useReveal from '../hooks/useReveal';

function EventCard({ evt, idx }) {
  const ref = useReveal();
  return (
    <div className="event-card reveal" ref={ref} style={{ transitionDelay: `${idx * 0.15}s` }}>
      <div className="event-icon-badge">{idx === 0 ? '💍' : '🎉'}</div>
      <div className="event-javanese-tag">{idx === 0 ? 'Akad Nikah' : 'Resepsi Pernikahan'}</div>
      <h3 className="event-title">{evt.title}</h3>
      <div className="event-detail-item"><span>📅</span><strong>{evt.date}</strong></div>
      <div className="event-detail-item"><span>⏰</span><span>{evt.time}</span></div>
      <div className="event-venue">📍 {evt.venue}</div>
      <p className="event-address">{evt.address}</p>
      {evt.mapsUrl && (
        <a href={evt.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-maps">
          <span>Buka Google Maps</span><span>↗</span>
        </a>
      )}
    </div>
  );
}

export default function EventsSection({ data }) {
  const headerRef = useReveal();
  return (
    <section className="invitation-section section-dark">
      <div className="section-header reveal" ref={headerRef}>
        <div className="section-pretitle">Rangkaian Acara</div>
        <h2 className="section-main-title">Detail Acara</h2>
        <div className="section-subtitle">Waktu & Tempat Pelaksanaan</div>
      </div>
      {data.events.map((evt, idx) => <EventCard key={evt.id || idx} evt={evt} idx={idx} />)}
    </section>
  );
}
