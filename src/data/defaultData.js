/**
 * Data Bawaan & Konfigurasi Undangan Adat Jawa
 */

export const STORAGE_KEY = 'undangan_jawa_react_data_v2';
export const WISHES_STORAGE_KEY = 'undangan_jawa_react_wishes';
export const GUESTS_STORAGE_KEY = 'undangan_jawa_react_guests';

export const DEFAULT_INVITATION_DATA = {
  // Data Mempelai
  groom: {
    fullName: "M. Mukhyiddin, S.Pd.",
    nickName: "Idin",
    parents: "Putra Kelima dari Bpk. Alikan & Ibu Malikah",
    instagram: "",
  avatar: "https://img.magnific.com/vektor-premium/pengantin-sunda-dan-mempelai-pria-dengan-pakaian-pernikahan-tradisional-budaya-sunda_429315-9.jpg"  },
  bride: {
    fullName: "Lidiya Fitra, S.Pd.",
    nickName: "Fitra",
    parents: "Putri kedua dari Bpk. Mukhromin & Ibu Rodhiyah (Almh.)",
    instagram: "",
  avatar: "https://img.magnific.com/vektor-premium/pengantin-sunda-dan-mempelai-pria-dengan-pakaian-pernikahan-tradisional-budaya-sunda_429315-9.jpg"  },

  // Info Umum Pernikahan
  wedding: {
    title: "Walimatul 'Ursy",
    subTitle: "Akad Nikah & Resepsi Pernikahan",
    isoDate: "2026-10-18T08:00",
    dateFormatted: "Ahad, 18 Oktober 2026",
    javaneseQuote: "Semoga Allah memberkahi kalian berdua, memberkahi atas kalian, dan mengumpulkan kalian berdua dalam kebaikan.",
    quoteSource: "Doa Pernikahan — HR. Abu Dawud & Tirmidzi",
    religiousQuote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    religiousSource: "QS. Ar-Rum: 21",
    aksaraJawa: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا"
  },

  // Rincian Acara
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      javaneseTitle: "Ijab Qabul",
      date: "Ahad, 18 Oktober 2026",
      time: "08.00 WIB",
      venue: "Kediaman Mempelai Pria",
      address: "Ds. Kentong RT.01 / RW.03 Kec. Glagah, Kab. Lamongan Jawa Timur",
      mapsUrl: "https://goo.gl/maps/NDAvPcJfLN469KWT7"
    },
    {
      id: "resepsi",
      title: "Resepsi Pernikahan",
      javaneseTitle: "Walimatul 'Ursy",
      date: "Ahad, 18 Oktober 2026",
      time: "08.00 WIB",
     venue: "Kediaman Mempelai Pria",
      address: "Ds. Kentong RT.01 / RW.03 Kec. Glagah, Kab. Lamongan Jawa Timur",
      mapsUrl: "https://goo.gl/maps/NDAvPcJfLN469KWT7"
    }
  ],

  // Kisah Cinta
  loveStories: [
    {
      year: "2021",
      title: "Pertemuan Pertama",
      desc: "Takdir mempertemukan kami di Kota Yogyakarta saat sama-sama menuntut ilmu. Dari pertemuan sederhana itu, tumbuh rasa yang tulus dan terjaga."
    },
    {
      year: "2024",
      title: "Lamaran",
      desc: "Dengan ridho Allah SWT dan restu kedua orang tua, ia datang melamar sebagai tanda keseriusan untuk melangkah ke jenjang yang lebih suci."
    },
    {
      year: "2026",
      title: "Hari Pernikahan",
      desc: "Alhamdulillah, dengan izin Allah SWT kami melangsungkan pernikahan. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah."
    }
  ],

  // Galeri Foto
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "Cahaya Cinta"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "Momen Bersama"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      caption: "Hari Istimewa"
    },
    {
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
      caption: "Janji Suci"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "Kebahagiaan Kami"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      caption: "Menuju Pelaminan"
    }
  ],

  // Rekening Hadiah
  gifts: {
    message: "Doa restu Bapak/Ibu/Saudara/i adalah hadiah terindah bagi kami. Namun jika berkenan memberikan tanda kasih, dapat melalui rekening berikut:",
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
      recipient: "Idin dan fitra",
      phone: "085870363471",
      address: "JDs. Kentong RT.01 / RW.03 Kec. Glagah, Kab. Lamongan Jawa Timur"
    }
  },

  // Audio Backsound
  music: {
    title: "Nasyid Islami",
    artist: "Musik Latar Pernikahan",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_27694f4a39.mp3?filename=traditional-asian-melody-10926.mp3"
  },

  // Nomor WhatsApp penerima ucapan (format: 628xxx tanpa +)
  waNumber: "6285870363471"
};

export const DEFAULT_WISHES = [
  {
    id: "w-1",
    name: "Bpk. Suryo Broto & Keluarga",
    status: "hadir",
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    date: "1 jam lalu"
  },
  {
    id: "w-2",
    name: "Keluarga Besar H. Mangunwijaya",
    status: "hadir",
    message: "Selamat menempuh hidup baru Mas Idin & Mbak Fitra. Semoga Allah meridhoi dan memberkahi rumah tangga kalian.",
    date: "3 jam lalu"
  },
  {
    id: "w-3",
    name: "Dimas & Dinda",
    status: "hadir",
    message: "Selamat ya Idin & Fitra! Semoga lancar acaranya dan bahagia selalu dunia akhirat!",
    date: "Kemarin"
  }
];

export const DEFAULT_GUESTS = [
  { id: "g-1", name: "Bpk. Joko Suparman & Keluarga", greeting: "Bapak/Ibu/Saudara/i", phone: "" },
  { id: "g-2", name: "Ibu Hj. Siti Fatimah", greeting: "Ibu", phone: "" },
  { id: "g-3", name: "Keluarga Besar Trah Mulyoharjo", greeting: "Keluarga Besar", phone: "" },
  { id: "g-4", name: "Dimas Prasetyo & Rekan Kerja", greeting: "Sahabat", phone: "" }
];

export function getStoredData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_INVITATION_DATA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error("Gagal load data:", e);
  }
  return DEFAULT_INVITATION_DATA;
}

export function saveStoredData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Gagal save data:", e);
    return false;
  }
}

export function getStoredWishes() {
  try {
    const saved = localStorage.getItem(WISHES_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Gagal load ucapan:", e);
  }
  return DEFAULT_WISHES;
}

export function saveStoredWishes(wishes) {
  try {
    localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(wishes));
    return true;
  } catch (e) {
    console.error("Gagal save ucapan:", e);
    return false;
  }
}

export function getStoredGuests() {
  try {
    const saved = localStorage.getItem(GUESTS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Gagal load tamu:", e);
  }
  return DEFAULT_GUESTS;
}

export function saveStoredGuests(guests) {
  try {
    localStorage.setItem(GUESTS_STORAGE_KEY, JSON.stringify(guests));
    return true;
  } catch (e) {
    console.error("Gagal save tamu:", e);
    return false;
  }
}
