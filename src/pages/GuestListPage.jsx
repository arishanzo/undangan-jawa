import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getStoredGuests, saveStoredGuests, getStoredData } from '../data/defaultData';
import Toast from '../components/Toast';

export default function GuestListPage() {
  const [guests, setGuests] = useState(() => getStoredGuests());
  const [weddingData] = useState(() => getStoredData());
  const [activeTab, setActiveTab] = useState('single');
  const [nameInput, setNameInput] = useState('');
  const [greetingInput, setGreetingInput] = useState('Bapak/Ibu/Saudara/i');
  const [phoneInput, setPhoneInput] = useState('');
  const [batchNames, setBatchNames] = useState('');
  const [batchGreeting, setBatchGreeting] = useState('Bapak/Ibu/Saudara/i');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const getGuestUrl = (guestName) =>
    `${window.location.origin}/?to=${encodeURIComponent(guestName.trim())}`;

  const getWhatsAppMessage = (guest) => {
    const link = getGuestUrl(guest.name);
    const guestLabel = `${guest.greeting || 'Bapak/Ibu/Saudara/i'} ${guest.name}`;
    const groomName = weddingData.groom?.fullName || 'Raden Arya Bagaskara';
    const groomNick = weddingData.groom?.nickName || 'Arya';
    const brideName = weddingData.bride?.fullName || 'Dyah Ayu Sekar Kedaton';
    const brideNick = weddingData.bride?.nickName || 'Sekar';
    const weddingDate = weddingData.wedding?.dateFormatted || 'Jumat Kliwon, 20 November 2026';
    const venue = weddingData.events?.[0]?.venue || 'Pendopo Ageng';
    return `Kepada Yth.\n${guestLabel}\n\nAssalamu'alaikum Warahmatullahi Wabarakatuh / Rahayu.\n\nKanthi nyuwun lumunturing sih wilasa Gusti Ingkang Maha Agung, tanpa ngirangi raos kurmat, lumantar serat punika kepareng kula sakaluwarga ngaturi rawuh panjenengan ing adicara Pawiwahan putra-putri kawula:\n\n🤵 ${groomName} (${groomNick})\n👰 ${brideName} (${brideNick})\n\n📅 Tanggal: ${weddingDate}\n📍 Tempat: ${venue}\n\nTautan Undangan & Konfirmasi Kehadiran:\n👉 ${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan berkah doa restu.\n\nMatur nuwun sanget.\nWassalamu'alaikum Warahmatullahi Wabarakatuh.`;
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    const newGuest = { id: 'g-' + Date.now(), name: nameInput.trim(), greeting: greetingInput, phone: phoneInput.replace(/[^0-9+]/g, ''), sent: false, createdAt: new Date().toISOString() };
    const updated = [newGuest, ...guests];
    setGuests(updated);
    saveStoredGuests(updated);
    setNameInput('');
    setPhoneInput('');
    showToast(`✓ Tamu "${newGuest.name}" berhasil ditambahkan`);
  };

  const handleBatchAdd = () => {
    const lines = batchNames.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) { showToast('Masukkan minimal satu nama tamu.'); return; }
    const newEntries = lines.map((name, i) => ({ id: 'g-' + Date.now() + '-' + i, name, greeting: batchGreeting, phone: '', sent: false, createdAt: new Date().toISOString() }));
    const updated = [...newEntries, ...guests];
    setGuests(updated);
    saveStoredGuests(updated);
    setBatchNames('');
    setActiveTab('single');
    showToast(`✓ Berhasil menambahkan ${newEntries.length} nama tamu undangan`);
  };

  const handleToggleSent = (id) => {
    const updated = guests.map(g => g.id === id ? { ...g, sent: !g.sent } : g);
    setGuests(updated);
    saveStoredGuests(updated);
  };

  const handleDeleteGuest = (id, name) => {
    if (window.confirm(`Hapus tamu "${name}" dari daftar undangan?`)) {
      const updated = guests.filter(g => g.id !== id);
      setGuests(updated);
      saveStoredGuests(updated);
      showToast('Tamu telah dihapus.');
    }
  };

  const handleCopyLink = (guest) => {
    navigator.clipboard.writeText(getGuestUrl(guest.name)).then(() => {
      setCopiedId(guest.id);
      showToast(`✓ Tautan khusus ${guest.name} tersalin!`);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyMessage = (guest) => {
    navigator.clipboard.writeText(getWhatsAppMessage(guest)).then(() =>
      showToast(`✓ Draf pesan WhatsApp untuk ${guest.name} tersalin!`)
    );
  };

  const handleSendWhatsApp = (guest) => {
    const msg = getWhatsAppMessage(guest);
    let cleanPhone = (guest.phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    if (!guest.sent) {
      const updated = guests.map(g => g.id === guest.id ? { ...g, sent: true } : g);
      setGuests(updated);
      saveStoredGuests(updated);
    }
    window.open(url, '_blank');
  };

  const handleExportText = () => {
    if (guests.length === 0) { showToast('Belum ada tamu untuk diekspor.'); return; }
    const content = guests.map((g, i) => `${i + 1}. ${g.greeting} ${g.name}: ${getGuestUrl(g.name)}`).join('\n');
    navigator.clipboard.writeText(content).then(() =>
      showToast(`✓ Seluruh (${guests.length}) tautan tamu telah disalin!`)
    );
  };

  const totalGuests = guests.length;
  const sentCount = guests.filter(g => g.sent).length;
  const pendingCount = totalGuests - sentCount;
  const sentPercentage = totalGuests > 0 ? Math.round((sentCount / totalGuests) * 100) : 0;

  const filteredGuests = useMemo(() => guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || (g.phone && g.phone.includes(searchQuery));
    if (!matchSearch) return false;
    if (filterStatus === 'sent') return g.sent;
    if (filterStatus === 'pending') return !g.sent;
    return true;
  }), [guests, searchQuery, filterStatus]);

  const batchCount = batchNames.split('\n').map(l => l.trim()).filter(l => l.length > 0).length;

  const inputCls = "w-full px-3 py-2.5 text-sm text-stone-800 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition placeholder:text-stone-400";
  const labelCls = "block text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-1.5";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-20">

        {/* Header */}
        <header className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white text-lg flex-shrink-0 shadow-sm">
              👥
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-stone-800 truncate">Buku Tamu & Pengelola Tautan</h1>
              <p className="text-[11px] text-rose-400 truncate mt-0.5">
                {weddingData.groom?.nickName} & {weddingData.bride?.nickName} · {weddingData.wedding?.dateFormatted}
              </p>
            </div>
          </div>
          <Link to="/" className="flex-shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-stone-600 bg-stone-50 border border-stone-200 px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition whitespace-nowrap">
            <span>👀</span><span>Buka Undangan</span>
          </Link>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Total Tamu', value: totalGuests, unit: 'Orang', color: 'text-stone-700' },
            { label: 'Sudah Dibagikan', value: sentCount, badge: '✓ Terkirim', badgeCls: 'bg-emerald-100 text-emerald-600' },
            { label: 'Belum Dibagikan', value: pendingCount, badge: '⏳ Menunggu', badgeCls: 'bg-amber-100 text-amber-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-100 shadow-sm p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">{s.label}</p>
              <div className="flex items-baseline justify-between gap-1">
                <span className={`text-2xl font-bold ${s.color || 'text-stone-800'}`}>{s.value}</span>
                {s.unit && <span className="text-[10px] text-stone-400">{s.unit}</span>}
                {s.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${s.badgeCls}`}>{s.badge}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm px-4 py-3 mb-4">
          <div className="flex justify-between text-[11px] mb-2">
            <span className="text-stone-500 font-medium">Progres Distribusi Undangan</span>
            <span className="font-bold text-amber-600">{sentPercentage}% Selesai</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-400 to-amber-400 rounded-full transition-all duration-500" style={{ width: `${sentPercentage}%` }} />
          </div>
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 mb-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-stone-50 p-1 rounded-xl mb-4 overflow-x-auto scrollbar-none">
            {[
              { key: 'single', label: '➕ Tambah Satu' },
              { key: 'batch', label: '📑 Import Banyak' },
              { key: 'template', label: '💬 Contoh Pesan' },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex-1 min-w-max text-[11px] font-semibold px-3 py-2 rounded-lg transition whitespace-nowrap ${
                  activeTab === t.key
                    ? 'bg-white text-rose-600 shadow-sm border border-rose-100'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Single */}
          {activeTab === 'single' && (
            <form onSubmit={handleAddGuest} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>Sapaan</label>
                  <select className={inputCls} value={greetingInput} onChange={e => setGreetingInput(e.target.value)}>
                    {['Bapak/Ibu/Saudara/i','Bapak','Ibu','Keluarga Besar','Sahabat','Rekan Kerja','Teman Kuliah','Tamu Kehormatan'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Nama Lengkap *</label>
                  <input type="text" className={inputCls} placeholder="Bpk. Joko Suparman & Keluarga" value={nameInput} onChange={e => setNameInput(e.target.value)} required />
                </div>
                <div>
                  <label className={labelCls}>No. WhatsApp</label>
                  <input type="tel" className={inputCls} placeholder="08123456789 (opsional)" value={phoneInput} onChange={e => setPhoneInput(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold rounded-xl shadow-sm hover:brightness-105 hover:-translate-y-0.5 transition">
                  ➕ Tambah ke Daftar
                </button>
              </div>
            </form>
          )}

          {/* Tab: Batch */}
          {activeTab === 'batch' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="w-full sm:w-56">
                  <label className={labelCls}>Sapaan Bawaan</label>
                  <select className={inputCls} value={batchGreeting} onChange={e => setBatchGreeting(e.target.value)}>
                    {['Bapak/Ibu/Saudara/i','Keluarga Besar','Sahabat','Rekan Kerja'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="px-3 py-2 bg-amber-50 border border-dashed border-amber-300 rounded-lg text-[11px] text-amber-700 font-semibold">
                  Terdeteksi: <strong>{batchCount}</strong> nama
                </div>
              </div>
              <div>
                <label className={labelCls}>Daftar Nama (satu nama per baris)</label>
                <textarea
                  className={`${inputCls} font-mono`}
                  rows={5}
                  placeholder={`Bpk. Joko Suparman & Keluarga\nIbu Hj. Siti Fatimah\nKeluarga Besar Trah Mulyoharjo`}
                  value={batchNames}
                  onChange={e => setBatchNames(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleBatchAdd}
                  disabled={batchCount === 0}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold rounded-xl shadow-sm hover:brightness-105 hover:-translate-y-0.5 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  ⚡ Masukkan {batchCount > 0 ? `${batchCount} Tamu` : ''} Sekaligus
                </button>
              </div>
            </div>
          )}

          {/* Tab: Template */}
          {activeTab === 'template' && (
            <div className="space-y-3">
              <p className="text-[11px] text-stone-500">
                Susunan kalimat santun yang otomatis dikirimkan saat Anda menekan tombol <strong className="text-stone-700">Kirim WA</strong>:
              </p>
              <pre className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-[11px] font-mono text-stone-600 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {getWhatsAppMessage({ name: '[Nama Tamu]', greeting: 'Bapak/Ibu/Saudara/i' })}
              </pre>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { navigator.clipboard.writeText(getWhatsAppMessage({ name: '[Nama Tamu]', greeting: 'Bapak/Ibu/Saudara/i' })); showToast('✓ Format pesan telah disalin'); }}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 rounded-xl hover:bg-stone-200 transition"
                >
                  📋 Salin Format Pesan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List Header & Search */}
        <div className="bg-white rounded-t-2xl border border-stone-100 shadow-sm p-4 border-b border-stone-100">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h2 className="text-sm font-bold text-stone-800">
                Daftar Tamu ({filteredGuests.length} dari {totalGuests})
              </h2>
              <p className="text-[10px] text-stone-400 mt-0.5">Setiap tamu memiliki tautan undangan unik</p>
            </div>
            <button onClick={handleExportText} className="text-[10px] font-semibold text-stone-600 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition whitespace-nowrap">
              📋 Salin Semua Link
            </button>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">🔍</span>
              <input
                type="text"
                className="w-full pl-8 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition"
                placeholder="Cari nama atau nomor WhatsApp..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs">✕</button>
              )}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { key: 'all', label: `Semua (${totalGuests})` },
                { key: 'pending', label: `Belum (${pendingCount})` },
                { key: 'sent', label: `Terkirim (${sentCount})` },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition whitespace-nowrap ${
                    filterStatus === f.key
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guest List */}
        <div className="bg-white rounded-b-2xl border border-stone-100 border-t-0 shadow-sm overflow-hidden mb-4">
          {filteredGuests.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-4xl mb-3 opacity-40">📭</div>
              <p className="text-sm font-bold text-stone-600 mb-1">
                {searchQuery ? 'Tamu tidak ditemukan' : 'Belum ada tamu undangan'}
              </p>
              <p className="text-[11px] text-stone-400 max-w-xs mx-auto">
                {searchQuery ? 'Coba periksa kembali ejaan kata kunci.' : 'Tambahkan nama tamu pertama melalui formulir di atas.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-50">
              {filteredGuests.map((guest, idx) => {
                const guestUrl = getGuestUrl(guest.name);
                const isCopied = copiedId === guest.id;
                return (
                  <article key={guest.id || idx} className={`p-4 transition-colors ${guest.sent ? 'bg-emerald-50/40' : 'hover:bg-stone-50/60'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-100 to-amber-100 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {guest.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="text-[10px] text-stone-400">{guest.greeting}</span>
                              <span className="text-sm font-bold text-stone-800 truncate">{guest.name}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              {guest.phone
                                ? <span className="text-[10px] text-stone-400 font-mono">📱 {guest.phone}</span>
                                : <span className="text-[10px] text-stone-300">Tanpa No. WA</span>
                              }
                              <button
                                onClick={() => handleToggleSent(guest.id)}
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition ${
                                  guest.sent
                                    ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
                                    : 'bg-amber-50 text-amber-600 border-amber-200'
                                }`}
                              >
                                {guest.sent ? '✓ Sudah Dibagikan' : '⏳ Belum Dibagikan'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* URL bar */}
                        <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5">
                          <span className="text-[8px] font-bold text-amber-600 tracking-wider flex-shrink-0">LINK</span>
                          <span className="text-[10px] text-stone-400 font-mono truncate flex-1">{guestUrl}</span>
                          <button
                            onClick={() => handleCopyLink(guest)}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-md border flex-shrink-0 transition ${
                              isCopied
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-rose-300 hover:text-rose-600'
                            }`}
                          >
                            {isCopied ? '✓ Tersalin!' : 'Salin'}
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <button onClick={() => handleSendWhatsApp(guest)} className="flex items-center gap-1.5 px-3 py-2 bg-[#25d366] text-white text-[11px] font-bold rounded-xl hover:brightness-105 hover:-translate-y-0.5 transition shadow-sm">
                          💬 Kirim WA
                        </button>
                        <button onClick={() => handleCopyMessage(guest)} className="px-2.5 py-2 text-[10px] font-semibold text-stone-600 bg-stone-100 border border-stone-200 rounded-xl hover:bg-stone-200 transition">
                          📝 Draf
                        </button>
                        <a href={guestUrl} target="_blank" rel="noopener noreferrer" className="px-2.5 py-2 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition">
                          👀 Buka
                        </a>
                        <button onClick={() => handleDeleteGuest(guest.id, guest.name)} className="px-2.5 py-2 text-[10px] text-red-400 border border-red-100 rounded-xl hover:bg-red-50 hover:text-red-500 transition">
                          ✕
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

      </div>
      <Toast message={toastMessage} />
    </div>
  );
}
