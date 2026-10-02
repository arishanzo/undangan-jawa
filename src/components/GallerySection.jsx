import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';

export default function GallerySection({ data }) {
  const [selected, setSelected] = useState(null);
  const headerRef = useReveal();
  if (!data.gallery?.length) return null;
  return (
    <section className="invitation-section section-dark">
      <div className="section-header reveal" ref={headerRef}>
        <div className="section-pretitle">Galeri Foto</div>
        <h2 className="section-main-title">Momen Berharga</h2>
        <div className="section-subtitle">Kenangan indah yang abadi</div>
      </div>
      <div className="gallery-grid">
        {data.gallery.map((photo, i) => (
          <div key={i} className="gallery-item" onClick={() => setSelected(photo)}>
            <img src={photo.url} alt={photo.caption || 'Foto'} loading="lazy" />
          </div>
        ))}
      </div>
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.94)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', cursor: 'pointer' }}
        >
          <div style={{ textAlign: 'center', maxWidth: '90%' }}>
            <img src={selected.url} alt={selected.caption} style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '14px', border: '2px solid rgba(184,146,42,0.4)' }} />
            {selected.caption && <div style={{ color: '#fff', marginTop: '10px', fontSize: '13px' }}>{selected.caption}</div>}
            <div style={{ color: 'rgba(181,99,90,0.5)', fontSize: '10px', marginTop: '5px' }}>Ketuk untuk menutup</div>
          </div>
        </div>
      )}
    </section>
  );
}
