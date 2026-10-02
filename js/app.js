/**
 * Main Application Logic
 * Undangan Pernikahan Adat Jawa
 */

let appData = getInvitationData();
let bgMusic = null;
let isMusicPlaying = false;
let countdownInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderInvitation(appData);
  setupGuestNameFromUrl();
  setupAudioPlayer();
  setupEventListeners();
  startCountdown();
  renderWishes();
  setupShareGenerator();
}

/**
 * Mendeteksi nama tamu dari URL param: ?to=Nama+Tamu atau ?u=... atau ?kepada=...
 */
function setupGuestNameFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('u') || urlParams.get('kepada');
  const guestNameEl = document.getElementById('guestNameCover');
  const rsvpNameEl = document.getElementById('rsvpName');

  if (guestParam && guestParam.trim() !== '') {
    const decodedName = decodeURIComponent(guestParam.trim());
    guestNameEl.textContent = decodedName;
    if (rsvpNameEl) rsvpNameEl.value = decodedName;
  } else {
    guestNameEl.textContent = "Bapak / Ibu / Saudara / i";
  }
}

/**
 * Render Konten Halaman berdasarkan Data
 */
function renderInvitation(data) {
  // Cover
  document.getElementById('coverGroomBrideNames').textContent = `${data.groom.nickName} & ${data.bride.nickName}`;
  document.getElementById('coverSubTitle').textContent = data.wedding.subTitle || "Pawiwahan Ageng";

  // Hero
  document.getElementById('heroGroomBrideNames').textContent = `${data.groom.nickName} & ${data.bride.nickName}`;
  document.getElementById('heroDate').textContent = data.wedding.dateFormatted;

  // Kutipan
  document.getElementById('quoteJawa').textContent = data.wedding.javaneseQuote;
  document.getElementById('quoteJawaSource').textContent = data.wedding.quoteSource;
  document.getElementById('quoteReligious').textContent = data.wedding.religiousQuote;
  document.getElementById('quoteReligiousSource').textContent = data.wedding.religiousSource;

  // Mempelai Pria
  document.getElementById('groomFullName').textContent = data.groom.fullName;
  document.getElementById('groomNickName').textContent = `( ${data.groom.nickName} )`;
  document.getElementById('groomParents').textContent = data.groom.parents;
  document.getElementById('groomAvatar').src = data.groom.avatar;
  const groomIg = document.getElementById('groomInstagram');
  if (data.groom.instagram) {
    groomIg.href = `https://instagram.com/${data.groom.instagram}`;
    groomIg.textContent = `@${data.groom.instagram}`;
    groomIg.style.display = 'inline-flex';
  } else {
    groomIg.style.display = 'none';
  }

  // Mempelai Wanita
  document.getElementById('brideFullName').textContent = data.bride.fullName;
  document.getElementById('brideNickName').textContent = `( ${data.bride.nickName} )`;
  document.getElementById('brideParents').textContent = data.bride.parents;
  document.getElementById('brideAvatar').src = data.bride.avatar;
  const brideIg = document.getElementById('brideInstagram');
  if (data.bride.instagram) {
    brideIg.href = `https://instagram.com/${data.bride.instagram}`;
    brideIg.textContent = `@${data.bride.instagram}`;
    brideIg.style.display = 'inline-flex';
  } else {
    brideIg.style.display = 'none';
  }

  // Rincian Acara
  renderEvents(data.events);

  // Linimasa Kisah Cinta
  renderLoveStories(data.loveStories);

  // Galeri Foto
  renderGallery(data.gallery);

  // Rekening Hadiah
  renderGifts(data.gifts);

  // Penutup
  document.getElementById('closingCoupleNames').textContent = `${data.groom.nickName} & ${data.bride.nickName}`;
}

function renderEvents(events) {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  container.innerHTML = events.map((evt, idx) => `
    <div class="event-card">
      <div class="event-icon-badge">${idx === 0 ? '💍' : '🎉'}</div>
      <div class="event-javanese-tag">${evt.javaneseTitle || "Pahargyan"}</div>
      <h3 class="event-title">${evt.title}</h3>
      
      <div class="event-detail-item">
        <span>📅</span>
        <strong>${evt.date}</strong>
      </div>
      <div class="event-detail-item">
        <span>⏰</span>
        <span>${evt.time}</span>
      </div>

      <div class="event-venue">📍 ${evt.venue}</div>
      <p class="event-address">${evt.address}</p>

      ${evt.mapsUrl ? `
        <a href="${evt.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-maps">
          <span>Buka di Google Maps</span>
          <span>↗</span>
        </a>
      ` : ''}
    </div>
  `).join('');
}

function renderLoveStories(stories) {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  if (!stories || stories.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#7d6e64;">Kisah cinta belum ditambahkan.</p>';
    return;
  }

  container.innerHTML = stories.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-year">${item.year}</div>
      <h4 class="timeline-title">${item.title}</h4>
      <p class="timeline-desc">${item.desc}</p>
    </div>
  `).join('');
}

function renderGallery(photos) {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  container.innerHTML = photos.map(photo => `
    <div class="gallery-item" onclick="openLightbox('${photo.url}', '${photo.caption || ''}')">
      <img src="${photo.url}" alt="${photo.caption || 'Prewedding'}" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-caption">${photo.caption || 'Pawiwahan'}</span>
      </div>
    </div>
  `).join('');
}

function renderGifts(gifts) {
  const bankContainer = document.getElementById('bankAccountsContainer');
  const addressContainer = document.getElementById('giftAddressContainer');

  if (bankContainer && gifts.accounts) {
    bankContainer.innerHTML = gifts.accounts.map(acc => `
      <div class="bank-card">
        <div class="bank-header">
          <span class="bank-name">${acc.bank}</span>
          <span class="bank-logo">${acc.logo || '💳'}</span>
        </div>
        <div class="bank-number-box">
          <span class="bank-number" id="acc-${acc.number}">${acc.number}</span>
          <button class="btn-copy" onclick="copyText('${acc.number}', 'Nomor rekening ${acc.bank} berhasil disalin!')">
            Salin No.
          </button>
        </div>
        <div class="bank-holder">Atas Nama: <strong>${acc.holder}</strong></div>
      </div>
    `).join('');
  }

  if (addressContainer && gifts.giftAddress) {
    addressContainer.innerHTML = `
      <div class="gift-address-title">📦 Kirim Kado Fisik</div>
      <div class="gift-address-text">
        <strong>Penerima:</strong> ${gifts.giftAddress.recipient} (${gifts.giftAddress.phone})<br>
        <strong>Alamat:</strong> ${gifts.giftAddress.address}
      </div>
      <button class="btn-copy" onclick="copyText('${gifts.giftAddress.address}', 'Alamat pengiriman berhasil disalin!')">
        Salin Alamat Lengkap
      </button>
    `;
  }
}

/**
 * Setup Audio Gamelan Player
 */
function setupAudioPlayer() {
  if (bgMusic) {
    bgMusic.pause();
  }
  bgMusic = new Audio(appData.music.url);
  bgMusic.loop = true;
  bgMusic.preload = 'auto';

  const musicBtn = document.getElementById('btnMusic');
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }
}

function toggleMusic() {
  if (!bgMusic) return;

  const musicBtn = document.getElementById('btnMusic');
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '🔇';
    showToast('Musik latar dijeda');
  } else {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.innerHTML = '🎵';
      showToast('Musik latar diputar');
    }).catch(err => {
      console.warn("Autoplay audio dicegah oleh peramban:", err);
    });
  }
}

/**
 * Buka Amplop Cover
 */
function openEnvelope() {
  const cover = document.getElementById('openingCover');
  cover.classList.add('opened');

  // Putar musik jika diizinkan
  if (bgMusic && !isMusicPlaying) {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      const musicBtn = document.getElementById('btnMusic');
      if (musicBtn) {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '🎵';
      }
    }).catch(err => {
      console.log("Audio autoplay dicegah hingga interaksi berikutnya:", err);
    });
  }

  // Scroll lembut ke konten
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Hitung Mundur (Countdown Timer)
 */
function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);

  function update() {
    const target = new Date(appData.wedding.isoDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('daysNum').textContent = '00';
      document.getElementById('hoursNum').textContent = '00';
      document.getElementById('minutesNum').textContent = '00';
      document.getElementById('secondsNum').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('daysNum').textContent = String(days).padStart(2, '0');
    document.getElementById('hoursNum').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutesNum').textContent = String(minutes).padStart(2, '0');
    document.getElementById('secondsNum').textContent = String(seconds).padStart(2, '0');
  }

  update();
  countdownInterval = setInterval(update, 1000);
}

/**
 * Simpan ke Google Calendar
 */
function addToGoogleCalendar() {
  const title = encodeURIComponent(`Pawiwahan ${appData.groom.nickName} & ${appData.bride.nickName}`);
  const details = encodeURIComponent(`Pawiwahan Ageng Pernikahan Adat Jawa ${appData.groom.fullName} & ${appData.bride.fullName}. Mugi tansah pinaringan berkah lan karaharjan.`);
  const location = encodeURIComponent(appData.events[0]?.venue + ', ' + appData.events[0]?.address);
  
  // Format tanggal untuk Google Calendar (YYYYMMDDTHHMMSSZ)
  const dateObj = new Date(appData.wedding.isoDate);
  const startIso = dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
  // Durasi 6 jam
  const endDateObj = new Date(dateObj.getTime() + 6 * 60 * 60 * 1000);
  const endIso = endDateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  window.open(gCalUrl, '_blank');
}

/**
 * RSVP Form Handler
 */
function setupEventListeners() {
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitRSVP();
    });
  }

  // Lightbox close on click outside
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) {
    lightbox.addEventListener('click', closeLightbox);
  }
}

function submitRSVP() {
  const name = document.getElementById('rsvpName').value.trim();
  const statusEl = document.querySelector('input[name="rsvpStatus"]:checked');
  const count = document.getElementById('rsvpCount').value;
  const message = document.getElementById('rsvpMessage').value.trim();

  if (!name || !message) {
    showToast('Mohon lengkapi nama dan ucapan doa restu.');
    return;
  }

  const status = statusEl ? statusEl.value : 'hadir';
  const newWish = {
    name: name,
    status: status,
    count: count,
    message: message,
    date: 'Baru saja'
  };

  const wishes = getStoredWishes();
  wishes.unshift(newWish);
  saveWishes(wishes);

  renderWishes();
  document.getElementById('rsvpMessage').value = '';
  showToast('Matur nuwun sanget! Doa restu panjenengan sampun katampi.');
}

function renderWishes() {
  const container = document.getElementById('wishesList');
  if (!container) return;

  const wishes = getStoredWishes();
  container.innerHTML = wishes.map(w => `
    <div class="wish-item">
      <div class="wish-header">
        <span class="wish-sender">👤 ${w.name}</span>
        <span class="wish-badge ${w.status === 'hadir' ? 'badge-hadir' : 'badge-tidak'}">
          ${w.status === 'hadir' ? '✓ Hadir' : '✕ Berhalangan'}
        </span>
      </div>
      <p class="wish-message">"${w.message}"</p>
      <div class="wish-time">${w.date}</div>
    </div>
  `).join('');
}

/**
 * Generator Tautan Tamu & WhatsApp ("bisa dibagikan sesuai dengan nama")
 */
function setupShareGenerator() {
  const guestInput = document.getElementById('shareGuestName');
  const phoneInput = document.getElementById('shareGuestPhone');
  const greetingSelect = document.getElementById('shareGreetingSelect');
  const outputLink = document.getElementById('shareGeneratedLink');
  const previewText = document.getElementById('shareMessagePreview');

  function updateLink() {
    const rawName = guestInput.value.trim();
    const greeting = greetingSelect.value;
    const phone = (phoneInput.value || '').replace(/[^0-9]/g, '');

    // Buat URL yang membawa query string ?to=... (kompatibel web server maupun file:// lokal)
    const baseUrl = window.location.href.split('?')[0].split('#')[0];
    const fullUrl = rawName ? `${baseUrl}?to=${encodeURIComponent(rawName)}` : baseUrl;
    outputLink.value = fullUrl;

    const guestFormatted = rawName ? `${greeting} ${rawName}` : 'Bapak/Ibu/Saudara/i';

    // Draf pesan sopan bernuansa Jawa & Indonesia
    const message = 
`Kepada Yth.
${guestFormatted}

Assalamu’alaikum Warahmatullahi Wabarakatuh / Rahayu.

Kanthi nyuwun lumunturing sih wilasa Gusti Ingkang Maha Agung, tanpa ngirangi raos kurmat, lumantar serat punika kepareng kula sakaluwarga ngaturi rawuh panjenengan ing adicara Pawiwahan putra-putri kawula:

🤵 ${appData.groom.fullName} (${appData.groom.nickName})
👰 ${appData.bride.fullName} (${appData.bride.nickName})

📅 Tanggal: ${appData.wedding.dateFormatted}
📍 Tempat: ${appData.events[0]?.venue || 'Pendopo Ageng'}

Tautan Undangan & Konfirmasi Kehadiran (RSVP):
👉 ${fullUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan berkah doa restu.

Matur nuwun sanget.
Wassalamu’alaikum Warahmatullahi Wabarakatuh.

Keluarga Besar:
${appData.groom.nickName} & ${appData.bride.nickName}`;

    previewText.value = message;

    // Tombol WhatsApp
    const btnWa = document.getElementById('btnSendWhatsapp');
    if (btnWa) {
      const waUrl = phone 
        ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      btnWa.onclick = () => window.open(waUrl, '_blank');
    }
  }

  guestInput.addEventListener('input', updateLink);
  phoneInput.addEventListener('input', updateLink);
  greetingSelect.addEventListener('change', updateLink);

  // Inisialisasi awal
  updateLink();
}

/**
 * Fitur Generator Massal (Batch Share Generator)
 */
function generateBatchGuestLinks() {
  const textarea = document.getElementById('batchGuestNames');
  const resultContainer = document.getElementById('batchResultList');
  const greeting = document.getElementById('batchGreetingSelect').value;

  if (!textarea || !resultContainer) return;

  const names = textarea.value.split('\n').map(n => n.trim()).filter(n => n.length > 0);
  if (names.length === 0) {
    showToast('Mohon masukkan minimal satu nama tamu.');
    return;
  }

  const baseUrl = window.location.href.split('?')[0].split('#')[0];

  resultContainer.innerHTML = names.map((name, i) => {
    const link = `${baseUrl}?to=${encodeURIComponent(name)}`;
    const guestLabel = `${greeting} ${name}`;
    const waText = encodeURIComponent(
`Kepada Yth. ${guestLabel}

Assalamu’alaikum Warahmatullahi Wabarakatuh / Rahayu.
Perkenankan kami mengundang Bapak/Ibu/Saudara/i pada acara pernikahan kami:
🤵 ${appData.groom.fullName} & 👰 ${appData.bride.fullName}

Tautan Undangan:
${link}

Matur nuwun sanget.`);

    return `
      <div style="background:#f9f6f0; border:1px solid #dcd1c2; border-radius:8px; padding:10px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <div style="font-size:12.5px; overflow:hidden; text-overflow:ellipsis;">
          <strong>${i+1}. ${name}</strong><br>
          <a href="${link}" target="_blank" style="color:#8c6721; font-size:11px; text-decoration:none;">${link}</a>
        </div>
        <div style="display:flex; gap:6px; flex-shrink:0;">
          <button class="btn-copy" style="padding:4px 8px; font-size:10px;" onclick="copyText('${link}', 'Link untuk ${name} disalin!')">Salin</button>
          <a href="https://api.whatsapp.com/send?text=${waText}" target="_blank" class="btn-copy" style="padding:4px 8px; font-size:10px; text-decoration:none; background:#25D366; border-color:#25D366; color:#fff;">WA</a>
        </div>
      </div>
    `;
  }).join('');

  showToast(`Berhasil membuat ${names.length} tautan undangan tamu!`);
}

/**
 * Utilitas Umum: Copy to Clipboard & Toast
 */
function copyText(text, successMsg = 'Berhasil disalin!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast(successMsg);
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/**
 * Lightbox Modal
 */
function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!lightbox || !img) return;

  img.src = imgSrc;
  if (cap) cap.textContent = caption || '';
  lightbox.classList.add('active');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) lightbox.classList.remove('active');
}

/**
 * Modal Controls
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}
