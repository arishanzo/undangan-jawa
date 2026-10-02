/**
 * Konfigurasi & Data Undangan Pernikahan Adat Jawa
 * Tersedia fungsi penyimpanan LocalStorage, Import, dan Export JSON
 */

const STORAGE_KEY = 'undangan_jawa_wedding_config';
const WISHES_STORAGE_KEY = 'undangan_jawa_wishes_data';

const DEFAULT_INVITATION_DATA = {
  // Data Mempelai
  groom: {
    fullName: "Raden Arya Bagaskara, S.T.",
    nickName: "Arya",
    parents: "Putra pertama dari Bpk. Bambang Hermawan & Ibu Siti Rahayu",
    instagram: "aryabagaskara",
    avatar: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80"
  },
  bride: {
    fullName: "Dyah Ayu Sekar Kedaton, S.Pd.",
    nickName: "Sekar",
    parents: "Putri bungsu dari Bpk. Hartono Kusumo & Ibu Retno Wulandari",
    instagram: "sekarkedaton",
    avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80"
  },

  // Info Umum Acara
  wedding: {
    title: "Pawiwahan Ageng",
    subTitle: "Ngunduh Mantu & Ijab Qabul",
    isoDate: "2026-11-20T08:00:00",
    dateFormatted: "Jumat Kliwon, 20 November 2026",
    javaneseQuote: "Mugi Gusti Kang Maha Agung tansah paring berkah, katentreman, kaslametan, lan katresnan ingkang langgeng tumrap kaluwarga enggal punika.",
    quoteSource: "Serat Wedhatama & Pepatah Luhur Jawa",
    religiousQuote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
    religiousSource: "Surah Ar-Rum Ayat 21",
    aksaraJawa: "ꦩꦼꦩꦪꦸ ꦲꦪꦸꦤꦶꦁ ꦧꦮꦤ" // Memayu Hayuning Bawana
  },

  // Rincian Acara
  events: [
    {
      id: "akad",
      title: "Akad Nikah / Ijab Qabul",
      javaneseTitle: "Ijab Qabul & Pasrah Tinampi",
      date: "Jumat Kliwon, 20 November 2026",
      time: "08.00 - 10.00 WIB",
      venue: "Pendopo Ageng Ndalem Kilen",
      address: "Jl. Palagan Tentara Pelajar No. 88, Sariharjo, Ngaglik, Sleman, D.I. Yogyakarta",
      mapsUrl: "https://maps.google.com/?q=Ndalem+Kilen+Yogyakarta",
      dresscode: "Adat Jawa / Busana Muslim Sopan (Batik Sogan)"
    },
    {
      id: "resepsi",
      title: "Resepsi & Panggih Temanten",
      javaneseTitle: "Pahargyan & Ramah Tamah",
      date: "Jumat Kliwon, 20 November 2026",
      time: "11.00 - 15.00 WIB",
      venue: "Sasana Hinggil Dwijoseputro",
      address: "Jl. Magelang KM 7.5, Mlati, Sleman, D.I. Yogyakarta",
      mapsUrl: "https://maps.google.com/?q=Sasana+Hinggil+Yogyakarta",
      dresscode: "Formal / Batik Nusantara"
    }
  ],

  // Kisah Cinta (Linimasa)
  loveStories: [
    {
      year: "2021",
      title: "Pitepangan Kapisan (Pertemuan Awal)",
      desc: "Kinasih pinanggih ing kutha Ngayogyakarta Hadiningrat nalika sami ngudi ngilmu ing pawiyatan luhur. Saka pitepangan punika, tuwuh raos tresna kang tulus."
    },
    {
      year: "2024",
      title: "Nglamar & Pasang Janji (Lamaran)",
      desc: "Kanthi ridho saking Gusti Ingkang Maha Kuwaos saha restu saking tiyang sepuh kekalih, panjenenganipun masrahaken paningset pinangka tandha ikatan suci."
    },
    {
      year: "2026",
      title: "Manunggal ing Pelaminan (Hari Bahagia)",
      desc: "Nyuwun lumunturing sih wilasa Gusti Allah SWT, kaleksanan anggenipun ngambah bale wisma, dados pasangan ingkang sakinah, mawaddah, warahmah."
    }
  ],

  // Galeri Foto
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "Candra Kirana - Cahaya Katresnan"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "Siraman & Nyuwun Doa Restu"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      caption: "Gebyok Kencana & Paes Ageng"
    },
    {
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      caption: "Janji Suci ing Ngajeng Penghulu"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "Binar Kasih Pasangan Temanten"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      caption: "Lelampahan Menyang Katentreman"
    }
  ],

  // Amplop Digital & Hadiah
  gifts: {
    message: "Doa restu panjenengan sedaya sampun dados kado ingkang paling aji tumraping kawula sakalih. Nanging menawi kepareng maringi tanda tresna, saged lumantar rekening punika:",
    accounts: [
      {
        bank: "BCA",
        number: "8830129384",
        holder: "Arya Bagaskara",
        logo: "🏛️"
      },
      {
        bank: "Bank Mandiri",
        number: "1370019283741",
        holder: "Dyah Ayu Sekar",
        logo: "🏦"
      },
      {
        bank: "BSI",
        number: "7129840291",
        holder: "Arya & Sekar",
        logo: "🌙"
      }
    ],
    giftAddress: {
      recipient: "Arya Bagaskara & Dyah Ayu Sekar",
      phone: "0812-3456-7890",
      address: "Jl. Palagan Tentara Pelajar No. 88, Sariharjo, Kec. Ngaglik, Kab. Sleman, D.I. Yogyakarta 55581"
    }
  },

  // Musik Latar (Instrumental Tradisional Gamelan Jawa)
  music: {
    title: "Gamelan Jawa Ladrang Wilujeng",
    artist: "Karawitan Jawa Kraton",
    // Audio instrumentalia tradisional bebas royalti / soundscape gamelan
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_27694f4a39.mp3?filename=traditional-asian-melody-10926.mp3",
    autoplay: true
  }
};

// Ucapan Doa Awal
const DEFAULT_WISHES = [
  {
    name: "Bpk. Suryo Broto & Ibu",
    status: "hadir",
    message: "Ndherek bingah lan memuji marang Gusti, mugi tansah pinaringan berkah, rukun, ayem tentrem dumugi kaken-kaken ninen-ninen.",
    date: "1 jam lalu"
  },
  {
    name: "Keluarga Besar Trah Mangunwijaya",
    status: "hadir",
    message: "Sugeng ngambah bale wisma Mas Arya lan Mbak Sekar. Mugi dados kaluwarga ingkang sakinah, mawaddah, warahmah.",
    date: "3 jam lalu"
  },
  {
    name: "Dimas & Dinda",
    status: "hadir",
    message: "Selamat ya Arya & Sekar! Semoga lancar acaranya sampai hari H dan bahagia selalu selamanya!",
    date: "Kemarin"
  }
];

// Helper Functions
function getInvitationData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_INVITATION_DATA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Gagal membaca data dari storage, menggunakan data bawaan:", e);
  }
  return DEFAULT_INVITATION_DATA;
}

function saveInvitationData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Gagal menyimpan data:", e);
    return false;
  }
}

function resetInvitationData() {
  localStorage.removeItem(STORAGE_KEY);
  return DEFAULT_INVITATION_DATA;
}

function getStoredWishes() {
  try {
    const saved = localStorage.getItem(WISHES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Gagal membaca ucapan:", e);
  }
  return DEFAULT_WISHES;
}

function saveWishes(wishes) {
  try {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
    return true;
  } catch (e) {
    console.error("Gagal menyimpan ucapan:", e);
    return false;
  }
}
