/**
 * Live Editor Controller
 * Memungkinkan pengguna mengedit seluruh data undangan (Mempelai, Acara, Rekening, Musik, dsb.)
 * Terintegrasi dengan LocalStorage, Ekspor & Impor JSON.
 */

document.addEventListener('DOMContentLoaded', () => {
  initEditor();
});

function initEditor() {
  setupEditorTabs();
  loadDataToEditor();
}

function setupEditorTabs() {
  const tabs = document.querySelectorAll('.editor-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.editor-tab-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });
}

/**
 * Isi form editor dengan data saat ini
 */
function loadDataToEditor() {
  const data = getInvitationData();

  // Mempelai Pria
  setValue('editGroomFullName', data.groom.fullName);
  setValue('editGroomNickName', data.groom.nickName);
  setValue('editGroomParents', data.groom.parents);
  setValue('editGroomAvatar', data.groom.avatar);
  setValue('editGroomInstagram', data.groom.instagram);

  // Mempelai Wanita
  setValue('editBrideFullName', data.bride.fullName);
  setValue('editBrideNickName', data.bride.nickName);
  setValue('editBrideParents', data.bride.parents);
  setValue('editBrideAvatar', data.bride.avatar);
  setValue('editBrideInstagram', data.bride.instagram);

  // Acara & Tanggal
  setValue('editWeddingTitle', data.wedding.title);
  setValue('editWeddingSubTitle', data.wedding.subTitle);
  setValue('editWeddingIsoDate', data.wedding.isoDate ? data.wedding.isoDate.substring(0, 16) : '');
  setValue('editWeddindDateFormatted', data.wedding.dateFormatted);

  // Akad
  const akad = data.events[0] || {};
  setValue('editAkadTitle', akad.title || '');
  setValue('editAkadDate', akad.date || '');
  setValue('editAkadTime', akad.time || '');
  setValue('editAkadVenue', akad.venue || '');
  setValue('editAkadAddress', akad.address || '');
  setValue('editAkadMaps', akad.mapsUrl || '');

  // Resepsi
  const resepsi = data.events[1] || {};
  setValue('editResepsiTitle', resepsi.title || '');
  setValue('editResepsiDate', resepsi.date || '');
  setValue('editResepsiTime', resepsi.time || '');
  setValue('editResepsiVenue', resepsi.venue || '');
  setValue('editResepsiAddress', resepsi.address || '');
  setValue('editResepsiMaps', resepsi.mapsUrl || '');

  // Kutipan & Doa
  setValue('editQuoteJawa', data.wedding.javaneseQuote);
  setValue('editQuoteJawaSource', data.wedding.quoteSource);
  setValue('editQuoteReligious', data.wedding.religiousQuote);
  setValue('editQuoteReligiousSource', data.wedding.religiousSource);

  // Rekening Bank
  const banks = data.gifts.accounts || [];
  setValue('editBank1Name', banks[0]?.bank || 'BCA');
  setValue('editBank1Number', banks[0]?.number || '');
  setValue('editBank1Holder', banks[0]?.holder || '');

  setValue('editBank2Name', banks[1]?.bank || 'Mandiri');
  setValue('editBank2Number', banks[1]?.number || '');
  setValue('editBank2Holder', banks[1]?.holder || '');

  // Kado Fisik
  setValue('editGiftRecipient', data.gifts.giftAddress?.recipient || '');
  setValue('editGiftPhone', data.gifts.giftAddress?.phone || '');
  setValue('editGiftAddress', data.gifts.giftAddress?.address || '');

  // Musik
  setValue('editMusicUrl', data.music.url || '');
  setValue('editMusicTitle', data.music.title || '');

  // Galeri Foto (Textarea dipisah baris baru)
  const galleryUrls = (data.gallery || []).map(g => g.url).join('\n');
  setValue('editGalleryUrls', galleryUrls);
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

/**
 * Simpan data dari Editor ke LocalStorage & Terapkan Perubahan Langsung
 */
function saveEditorChanges() {
  const current = getInvitationData();

  // Kumpulkan Data Terbaru
  const updated = {
    ...current,
    groom: {
      fullName: getValue('editGroomFullName'),
      nickName: getValue('editGroomNickName'),
      parents: getValue('editGroomParents'),
      avatar: getValue('editGroomAvatar'),
      instagram: getValue('editGroomInstagram')
    },
    bride: {
      fullName: getValue('editBrideFullName'),
      nickName: getValue('editBrideNickName'),
      parents: getValue('editBrideParents'),
      avatar: getValue('editBrideAvatar'),
      instagram: getValue('editBrideInstagram')
    },
    wedding: {
      ...current.wedding,
      title: getValue('editWeddingTitle'),
      subTitle: getValue('editWeddingSubTitle'),
      isoDate: getValue('editWeddingIsoDate') || current.wedding.isoDate,
      dateFormatted: getValue('editWeddindDateFormatted'),
      javaneseQuote: getValue('editQuoteJawa'),
      quoteSource: getValue('editQuoteJawaSource'),
      religiousQuote: getValue('editQuoteReligious'),
      religiousSource: getValue('editQuoteReligiousSource')
    },
    events: [
      {
        id: "akad",
        title: getValue('editAkadTitle'),
        javaneseTitle: "Ijab Qabul",
        date: getValue('editAkadDate'),
        time: getValue('editAkadTime'),
        venue: getValue('editAkadVenue'),
        address: getValue('editAkadAddress'),
        mapsUrl: getValue('editAkadMaps')
      },
      {
        id: "resepsi",
        title: getValue('editResepsiTitle'),
        javaneseTitle: "Pahargyan Temanten",
        date: getValue('editResepsiDate'),
        time: getValue('editResepsiTime'),
        venue: getValue('editResepsiVenue'),
        address: getValue('editResepsiAddress'),
        mapsUrl: getValue('editResepsiMaps')
      }
    ],
    gifts: {
      ...current.gifts,
      accounts: [
        {
          bank: getValue('editBank1Name'),
          number: getValue('editBank1Number'),
          holder: getValue('editBank1Holder'),
          logo: "🏛️"
        },
        {
          bank: getValue('editBank2Name'),
          number: getValue('editBank2Number'),
          holder: getValue('editBank2Holder'),
          logo: "🏦"
        }
      ],
      giftAddress: {
        recipient: getValue('editGiftRecipient'),
        phone: getValue('editGiftPhone'),
        address: getValue('editGiftAddress')
      }
    },
    music: {
      ...current.music,
      url: getValue('editMusicUrl'),
      title: getValue('editMusicTitle')
    }
  };

  // Parsing Galeri Foto
  const galleryRaw = getValue('editGalleryUrls');
  if (galleryRaw) {
    const lines = galleryRaw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    updated.gallery = lines.map((url, i) => ({
      url: url,
      caption: `Foto Kenangan ${i + 1}`
    }));
  }

  // Simpan ke LocalStorage
  saveInvitationData(updated);
  appData = updated;

  // Render ulang UI
  renderInvitation(appData);
  startCountdown();
  setupAudioPlayer();

  // Tutup Modal & Notifikasi
  closeModal('modalEditor');
  showToast('✓ Data undangan berhasil disimpan dan diperbarui!');
}

/**
 * Reset data ke pengaturan awal
 */
function handleResetData() {
  if (confirm('Apakah Anda yakin ingin mengembalikan semua data undangan ke setelan default awal? Semua perubahan yang tersimpan di peramban ini akan terhapus.')) {
    appData = resetInvitationData();
    loadDataToEditor();
    renderInvitation(appData);
    startCountdown();
    setupAudioPlayer();
    closeModal('modalEditor');
    showToast('Data undangan telah direset ke bawaan.');
  }
}

/**
 * Ekspor Data ke File JSON
 */
function exportDataToJson() {
  const current = getInvitationData();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(current, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `undangan_jawa_${current.groom.nickName}_${current.bride.nickName}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('File konfigurasi JSON berhasil diunduh!');
}

/**
 * Impor Data dari File JSON
 */
function importDataFromJson(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.groom && imported.bride && imported.wedding) {
        saveInvitationData(imported);
        appData = imported;
        loadDataToEditor();
        renderInvitation(appData);
        startCountdown();
        setupAudioPlayer();
        closeModal('modalEditor');
        showToast('✓ Data undangan berhasil diimpor!');
      } else {
        alert('Format file JSON tidak valid untuk undangan ini.');
      }
    } catch (err) {
      alert('Gagal membaca file JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}
