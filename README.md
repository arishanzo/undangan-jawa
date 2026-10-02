# ⚜️ Undangan Online Pernikahan Adat Jawa (React.js Edition)

Aplikasi web undangan online adat Jawa modern berbasis **React.js + Vite** dengan pemisahan URL halaman yang jelas antara **Undangan Tamu**, **Halaman Edit Undangan**, dan **Halaman Manajemen Tamu**.

---

## 🌐 Pemisahan URL Halaman (Routing Mandiri)

| Halaman | URL Path | Fungsi & Hak Akses |
|---|---|---|
| **Undangan Utama (Tamu)** | `http://localhost:3000/` atau `http://localhost:3000/?to=Nama+Tamu` | Halaman murni undangan untuk para tamu. Bersih dari tombol edit/admin. Menampilkan cover gunungan, musik gamelan, profil, acara, maps, galeri, kado, dan RSVP. |
| **Undangan Khusus Tamu** | `http://localhost:3000/to/Bpk.+Suparman` | Tautan langsung dengan nama tamu di path URL atau query string. |
| **Edit Undangan (Admin)** | `http://localhost:3000/edit` | **Halaman terpisah khusus pemilik/pengantin** untuk mengubah nama mempelai, tanggal acara, Google Maps, nomor rekening, alamat kado fisik, musik latar, kutipan doa, dan galeri foto. Dilengkapi backup/restore JSON. |
| **Daftar & Generator Tamu** | `http://localhost:3000/tamu` | **Halaman manajemen tamu**: tambah nama tamu satu per satu atau massal (batch), menghasilkan link personal setiap tamu, salin link 1-klik, dan kirim langsung via WhatsApp dengan pesan undangan santun. |

---

## 👥 Personalisasi Nama Tamu Setiap Undangan

1. Buka halaman **Manajemen Tamu** di: `http://localhost:3000/tamu`
2. Masukkan nama tamu (contoh: *Bpk. Suparman & Keluarga*, *Sahabat Dimas Prasetyo*, dll.) beserta nomor WhatsApp (opsional).
3. Sistem akan membuat tautan personal khusus untuk tamu tersebut:
   ```
   http://localhost:3000/?to=Bpk.+Suparman+%26+Keluarga
   ```
4. Klik **📋 Salin Link** untuk menyalin tautan, atau klik **💬 WhatsApp** untuk langsung membuka WhatsApp dengan draf pesan undangan resmi berbahasa santun.
5. Saat tautan dibuka oleh tamu:
   - Nama tamu akan tercantum secara anggun di sampul Gunungan (*Katur Panjenenganipun: Bpk. Suparman & Keluarga*).
   - Kolom nama di formulir Buku Tamu / RSVP otomatis terisi dengan nama tamu tersebut.

---

## 🚀 Cara Menjalankan Proyek

### Cara 1: Menggunakan File Pintasan (Paling Mudah di Windows)
Cukup klik dua kali file:
👉 **[jalankan_react.bat](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/jalankan_react.bat)**

Server lokal Vite akan otomatis berjalan di port 3000 dan membuka peramban Anda.

### Cara 2: Lewat Terminal PowerShell
```powershell
cd "C:\Users\MyBook Hype\.gemini\antigravity\scratch\undangan-jawa"
npm.cmd run dev
```

---

## 🛠️ Struktur Komponen React

* [src/App.jsx](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/App.jsx) — Pengatur routing React Router (`/`, `/edit`, `/tamu`, `/to/:guestParam`).
* [src/pages/InvitationPage.jsx](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/pages/InvitationPage.jsx) — Halaman undangan murni untuk tamu (bebas dari tombol admin).
* [src/pages/EditorPage.jsx](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/pages/EditorPage.jsx) — Halaman editor data mempelai, acara, rekening, kutipan, dan musik.
* [src/pages/GuestListPage.jsx](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/pages/GuestListPage.jsx) — Halaman manajemen nama tamu & pembuat link WhatsApp personal.
* [src/components/CoverOpening.jsx](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/components/CoverOpening.jsx) — Sampul Gunungan dengan nama tamu personal.
* [src/components/AudioPlayer.jsx](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/components/AudioPlayer.jsx) — Pemutar gamelan Jawa melayang.
* [src/data/defaultData.js](file:///C:/Users/MyBook%20Hype/.gemini/antigravity/scratch/undangan-jawa/src/data/defaultData.js) — Data konfigurasi dan sinkronisasi `localStorage`.
