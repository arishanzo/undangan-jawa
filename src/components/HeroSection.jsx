import React, { useState, useEffect } from 'react';
import WayangSvg from './WayangSvg';

export default function HeroSection({ data }) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    function calc() {
      const diff = new Date(data.wedding.isoDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' }); return; }
      setTimeLeft({
        days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [data.wedding.isoDate]);

  const addToCalendar = () => {
    const title = encodeURIComponent(`Pernikahan ${data.groom.nickName} & ${data.bride.nickName}`);
    const details = encodeURIComponent(`Walimatul Ursy ${data.groom.fullName} & ${data.bride.fullName}`);
    const location = encodeURIComponent(`${data.events[0]?.venue}, ${data.events[0]?.address}`);
    const d = new Date(data.wedding.isoDate);
    const fmt = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(d)}/${fmt(new Date(d.getTime() + 6 * 3600000))}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <header className="hero-section">
      <img src="/assets/corner.svg" className="ornament-corner ornament-top-left" alt="" />
      <img src="/assets/corner.svg" className="ornament-corner ornament-top-right" alt="" />

      {/* Wayang kiri & kanan */}

      <div className="hero-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
      <div className="hero-tagline">Idin &lsquo;Fitra</div>
      <h1 className="hero-main-title">Undangan Pernikahan</h1>

      <div className="hero-couple-names">
        {data.groom.nickName} & {data.bride.nickName}
      </div>

      <div className="hero-date-badge">
        <span>📅</span>
        <span>{data.wedding.dateFormatted}</span>
      </div>

      <div className="countdown-container">
        <div className="countdown-title">Menuju Hari Bahagia</div>
        <div className="countdown-grid">
          {[['days','Hari'],['hours','Jam'],['minutes','Menit'],['seconds','Detik']].map(([k, label]) => (
            <div key={k} className="countdown-card">
              <span className="countdown-num">{timeLeft[k]}</span>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>
        <button className="btn-calendar" onClick={addToCalendar}>
          <span>📅</span><span>Simpan ke Kalender</span>
        </button>
      </div>
    </header>
  );
}
