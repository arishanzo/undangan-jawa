import React from 'react';
import WayangSvg from './WayangSvg';
import useReveal from '../hooks/useReveal';

export default function ClosingSection({ data }) {
  const ref = useReveal();
  return (
    <footer className="closing-section">
      <div className="reveal" ref={ref}>
<div className="invitation-section flex flex-col items-center justify-center text-center">
         <img src="/assets/gunungan.svg" className="mb-8" width={100} height={100} alt="" /> </div>
      <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '22px', color: 'var(--gold-light)', marginBottom: '18px', opacity: 0.9 }}>
        جَزَاكُمُ اللَّهُ خَيْرًا
      </div>

      <div className="javanese-divider" style={{ marginBottom: '20px' }}>
        <div className="divider-line" />
        <span style={{ color: 'var(--rose-light)', fontSize: '14px' }}>♡</span>
        <div className="divider-line" />
      </div>

      <p style={{ fontSize: '12px', color: 'rgba(250,247,242,0.6)', lineHeight: 1.9, maxWidth: '340px', margin: '0 auto 24px' }}>
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa Anda, kami ucapkan terima kasih yang sebesar-besarnya.
      </p>

      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '8px' }}>
        Dengan Penuh Cinta,
      </div>

      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 700, background: 'linear-gradient(135deg, #f0dfa0 0%, #d4aa50 35%, #b8922a 60%, #d4948c 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '6px', animation: 'shimmerText 4s linear infinite' }}>
        {data.groom.nickName} & {data.bride.nickName}
      </div>

      <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '12px', color: 'rgba(181,99,90,0.5)', marginTop: '4px' }}>
        Beserta keluarga besar
      </div>

      <div className="javanese-divider" style={{ margin: '24px 0 16px' }}>
        <div className="divider-line" />
        <span style={{ color: 'var(--gold)', fontSize: '12px' }}>✦</span>
        <div className="divider-line" />
      </div>

      <div style={{ fontSize: '10px', color: 'rgba(28,25,23,0.3)' }}>
        Undangan Pernikahan © {new Date().getFullYear()}
      </div>
      </div>
    </footer>
  );
}
