import React from 'react';

export default function GiftsSection({ data, onCopy }) {
  const { gifts } = data;
  if (!gifts) return null;
  return (
    <section className="invitation-section section-cream">
      <div className="section-header">
        <div className="section-pretitle">Hadiah & Doa</div>
        <h2 className="section-main-title">Kirim Hadiah</h2>
        <div className="section-subtitle">Amplop digital & kado fisik</div>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--ink-muted)', textAlign: 'center', maxWidth: '360px', margin: '0 auto 20px', lineHeight: 1.7 }}>
        {gifts.message}
      </p>
      {gifts.accounts?.map((acc, i) => (
        <div key={i} className="bank-card">
          <div className="bank-header">
            <span className="bank-name">{acc.bank}</span>
            <span style={{ fontSize: '20px' }}>{acc.logo || '💳'}</span>
          </div>
          <div className="bank-number-box">
            <span className="bank-number">{acc.number}</span>
            <button className="btn-copy" onClick={() => onCopy(acc.number, `Nomor rekening ${acc.bank} berhasil disalin!`)}>
              Salin
            </button>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>a.n. <strong>{acc.holder}</strong></div>
        </div>
      ))}
      {gifts.giftAddress && (
        <div className="gift-address-card">
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '7px' }}>📦 Kirim Kado Fisik</div>
          <div style={{ fontSize: '11px', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '10px' }}>
            <strong>Penerima:</strong> {gifts.giftAddress.recipient} ({gifts.giftAddress.phone})<br />
            <strong>Alamat:</strong> {gifts.giftAddress.address}
          </div>
          <button className="btn-copy" onClick={() => onCopy(gifts.giftAddress.address, 'Alamat berhasil disalin!')}>
            Salin Alamat
          </button>
        </div>
      )}
    </section>
  );
}
