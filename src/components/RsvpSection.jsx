import React, { useState } from 'react';

export default function RsvpSection({ guestName, wishes, onAddWish, onNotify, data }) {
  const [name, setName] = useState(guestName || '');
  const [status, setStatus] = useState('hadir');
  const [count, setCount] = useState('2');
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    if (guestName && !name) setName(guestName);
  }, [guestName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      onNotify('Mohon isi nama dan ucapan terlebih dahulu.');
      return;
    }

    // Simpan ke daftar ucapan lokal
    onAddWish({ name: name.trim(), status, count, message: message.trim(), date: 'Baru saja' });

    // Susun pesan WA
    const statusLabel = status === 'hadir' ? `✅ Insya Allah Hadir (${count} orang)` : '❌ Mohon Maaf, Berhalangan';
    const waText =
`Assalamu'alaikum Warahmatullahi Wabarakatuh 🤍

Kepada Yth. ${data?.groom?.nickName ?? ''} & ${data?.bride?.nickName ?? ''}

Nama  : ${name.trim()}
Hadir : ${statusLabel}

Ucapan & Doa:
"${message.trim()}"

Semoga Allah memberkahi pernikahan kalian. Aamiin 🤲`;

    const phone = (data?.waNumber ?? '').replace(/[^0-9]/g, '');
    const url = phone
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(waText)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;

    setMessage('');
    window.open(url, '_blank');
    onNotify('Membuka WhatsApp... 💬');
  };

  const inputCls = "w-full px-3.5 py-2.5 text-sm text-stone-800 bg-white border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition placeholder:text-stone-300 font-[var(--font-sans)]";
  const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1.5";

  return (
    <section className="invitation-section section-cream">
      <div className="section-header">
        <div className="section-pretitle">Konfirmasi Kehadiran</div>
        <h2 className="section-main-title">RSVP & Ucapan</h2>
        <div className="section-subtitle">Sampaikan doa dan ucapan terbaik Anda</div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-5 mb-5">
        {/* Top accent line */}
        <div className="h-0.5 bg-gradient-to-r from-rose-300 via-amber-300 to-rose-200 rounded-full mb-5 -mx-5 -mt-5 rounded-t-3xl" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelCls}>Nama Anda</label>
            <input
              type="text"
              className={inputCls}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tulis nama Anda..."
              required
            />
          </div>

          <div>
            <label className={labelCls}>Konfirmasi Kehadiran</label>
            <div className="flex gap-2">
              {[
                { val: 'hadir', label: '✓ Insya Allah Hadir' },
                { val: 'tidak', label: '✕ Mohon Maaf, Berhalangan' },
              ].map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setStatus(opt.val)}
                  className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border transition ${
                    status === opt.val
                      ? 'bg-stone-800 text-amber-300 border-stone-800 shadow-sm'
                      : 'bg-white text-stone-500 border-rose-100 hover:border-rose-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Jumlah Tamu</label>
            <select className={inputCls} value={count} onChange={e => setCount(e.target.value)}>
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
              <option value="4">4 Orang atau Lebih</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Ucapan & Doa</label>
            <textarea
              className={inputCls}
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa terbaik Anda..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#25d366] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-sm hover:brightness-105 hover:-translate-y-0.5 transition flex items-center justify-center gap-2"
          >
            <span>💬</span> Kirim via WhatsApp
          </button>
        </form>
      </div>

      {/* Wishes List */}
      {wishes.length > 0 && (
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-0.5">
          {wishes.map((w, idx) => (
            <div
              key={w.id || idx}
              className="bg-white border border-rose-50 rounded-2xl px-4 py-3.5 shadow-xs hover:border-rose-100 hover:translate-x-0.5 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-700">👤 {w.name}</span>
                <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${
                  w.status === 'hadir'
                    ? 'bg-rose-50 text-rose-500'
                    : 'bg-stone-100 text-stone-400'
                }`}>
                  {w.status === 'hadir' ? '✓ Hadir' : '✕ Berhalangan'}
                </span>
              </div>
              <p className="text-[13px] text-stone-600 leading-relaxed italic">"{w.message}"</p>
              <p className="text-[10px] text-stone-300 mt-1.5">{w.date}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
