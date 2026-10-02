import React, { useMemo } from 'react';
import WayangSvg from './WayangSvg';

const HEARTS = ['♡', '❤', '♡', '✿', '♡'];

export default function CoverOpening({ data, guestName, isOpened, onOpen }) {
  const hearts = useMemo(() => HEARTS.map((h, i) => ({
    h, left: `${15 + i * 17}%`,
    duration: 2.5 + i * 0.6,
    delay: i * 0.8,
    size: 12 + (i % 3) * 4,
  })), []);

  return (
    <div className={`opening-cover ${isOpened ? 'opened' : ''}`}>
      <WayangSvg className="cover-wayang" style={{ color: '#d4aa50' }} />

      {/* Floating hearts */}
      <div className="cover-hearts">
        {hearts.map((item, i) => (
          <span key={i} className="cover-heart" style={{
            left: item.left,
            fontSize: item.size,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            color: i % 2 === 0 ? 'rgba(181,99,90,0.55)' : 'rgba(212,170,80,0.45)',
          }}>{item.h}</span>
        ))}
      </div>

      <div className="cover-content">
        <div className="cover-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>

        <div className="cover-divider">
          <div className="cover-divider-line" />
          <div className="cover-divider-dot" />
          <div className="cover-divider-line" />
        </div>

        <div className="cover-badge">Undangan Pernikahan</div>
        <h1 className="cover-title">Walimatul &lsquo;Ursy</h1>
        <div className="cover-subtitle">{data.wedding.subTitle || 'Akad Nikah & Resepsi'}</div>

        <div className="couple-names-cover">
          {data.groom.nickName} & {data.bride.nickName}
        </div>

        <div className="guest-box">
          <div className="guest-intro">Kepada Yth. Bapak / Ibu / Saudara/i:</div>
          <div className="guest-name">{guestName || 'Tamu Undangan'}</div>
          <div style={{ fontSize: '10px', color: 'rgba(181,99,90,0.55)', marginTop: '5px', fontStyle: 'italic' }}>
            *Mohon maaf apabila terdapat kesalahan penulisan nama
          </div>
        </div>

        <button className="btn-open-envelope" onClick={onOpen}>
          <span>✉</span>
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  );
}
