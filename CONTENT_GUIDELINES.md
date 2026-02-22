# Panduan Penulisan & Gaya Konten The_89_Project

Dokumen ini berfungsi sebagai acuan untuk menjaga konsistensi gaya bahasa dan struktur konten dalam blog ini. 

## 🎭 Karakter Penulis (Persona)
Konten ditulis dari sudut pandang seorang **"Pembelajar" (Learner)**. 
- **Nada Bicara**: Rendah hati, hangat, personal, dan reflektif.
- **Tujuan**: Bukan untuk menggurui, melainkan untuk mencatat hikmah yang baru dipelajari dan membagikannya agar bermanfaat bagi orang lain.
- **Bahasa**: Bahasa Indonesia yang mengalir (natural), tidak kaku seperti terjemahan mesin, namun tetap sopan dan bermartabat.

## 📝 Struktur Postingan
Setiap tulisan sebaiknya mengikuti alur berikut:

1.  **Pembukaan (Sapaan)**: Gunakan "Bismillah" atau salam singkat yang hangat. Ceritakan sedikit alasan mengapa topik hari ini menarik untuk dipelajari.
2.  **📖 Bagian Ayat**:
    - Sertakan teks Arab (Utsmani) di dalam tag `<div class="arabic-verse">`.
    - Sertakan terjemahan di dalam tag `<div class="arabic-translation">`.
3.  **🔍 Konteks (Sabab al-Nuzul)**: Jelaskan latar belakang sejarah atau asbabun nuzul ayat tersebut dengan bahasa yang sangat sederhana, seperti menceritakan sebuah kisah.
4.  **🌐 Relevansi Modern (Kontekstualisasi)**: Hubungkan hikmah ayat tersebut dengan isu-isu zaman sekarang (Media sosial, etika digital, hubungan antar manusia, dsb). Gunakan sub-headline yang menarik.
5.  **✅ Action Item**: Berikan instruksi praktis yang bisa dilakukan pembaca hari ini. Bungkus di dalam tag `<div class="action-item">`.
6.  **Penutup**: Akhiri dengan doa, harapan, atau kata-kata penutup yang menyejukkan.

## 🎨 Komponen Visual dalam Markdown
Gunakan komponen HTML berikut di dalam file `.json` atau `.md` untuk tampilan yang konsisten dengan tema:

### 1. Bagian Ayat
```html
<div class="verse-section">
  <div class="verse-label">Surah Nama_Surah (Nomor:Ayat)</div>
  <div class="arabic-verse">Teks_Arab_Di_Sini</div>
  <div class="arabic-translation">"Terjemahan_Bahasa_Indonesia"</div>
</div>
```

### 2. Kotak Aksi (Action Item)
```html
<div class="action-item">
  <p>Instruksi praktis atau pertanyaan reflektif untuk pembaca.</p>
</div>
```

## 🌈 Tema Visual (UI/UX)
- **Mode**: Light Mode (Bersih dan Terang).
- **Aksen Warna**: Gradasi Emerald Green (`#10b981`) ke Royal Blue (`#3b82f6`).
- **Font Utama**: *Outfit* (Judul) dan *Inter* (Isi).
- **Font Arab**: *Amiri* (Memberikan kesan klasik/kaligrafi).

---
*Gunakan panduan ini untuk setiap postingan baru guna memastikan "jiwa" dari The_89_Project tetap terjaga.*
