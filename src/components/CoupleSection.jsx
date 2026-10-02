import React from 'react';
import useReveal from '../hooks/useReveal';

export default function CoupleSection({ data }) {
  const groomRef = useReveal();
  const brideRef = useReveal();
  return (
    <section className="invitation-section section-cream">
      <div className="section-header">
        <div className="section-pretitle">Mempelai</div>
        <h2 className="section-main-title">Kedua Insan</h2>
        <div className="section-subtitle">Yang akan melangsungkan pernikahan</div>
      </div>

      <div className="couple-card reveal" ref={groomRef}>
        <img src="/assets/corner.svg" className="ornament-corner ornament-top-left" alt="" />
        <img src="/assets/corner.svg" className="ornament-corner ornament-top-right" alt="" />
        <div className="couple-avatar-wrap">
          <img src={data.groom.avatar} alt={data.groom.nickName} className="couple-avatar" />
        </div>
        <div className="couple-role">Mempelai Pria</div>
        <h3 className="couple-name">{data.groom.fullName}</h3>
        <div className="couple-nickname">( {data.groom.nickName} )</div>
        <p className="couple-parents">{data.groom.parents}</p>
        {data.groom.instagram && (
          <a href={`https://instagram.com/${data.groom.instagram}`} target="_blank" rel="noopener noreferrer" className="btn-social">
            <span>📷</span><span>@{data.groom.instagram}</span>
          </a>
        )}
      </div>


      <div className="couple-card reveal" ref={brideRef} style={{ transitionDelay: '0.15s' }}>
        <img src="/assets/corner.svg" className="ornament-corner ornament-top-left" alt="" />
        <img src="/assets/corner.svg" className="ornament-corner ornament-top-right" alt="" />
        <div className="couple-avatar-wrap">
          <img src={data.bride.avatar} alt={data.bride.nickName} className="couple-avatar" />
        </div>
        <div className="couple-role">Mempelai Wanita</div>
        <h3 className="couple-name">{data.bride.fullName}</h3>
        <div className="couple-nickname">( {data.bride.nickName} )</div>
        <p className="couple-parents">{data.bride.parents}</p>
        {data.bride.instagram && (
          <a href={`https://instagram.com/${data.bride.instagram}`} target="_blank" rel="noopener noreferrer" className="btn-social">
            <span>📷</span><span>@{data.bride.instagram}</span>
          </a>
        )}
      </div>
    </section>
  );
}
