#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', 'data', 'posts.json');

// Read existing posts
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

// New post - Ayat 16
const newPost = {
  "id": 16,
  "title": "Ayat 16: Menghapus \"Seandainya\" dan Membangun Mentalitas Berani",
  "slug": "ayat-16-menghapus-seandainya-dan-membangun-mentalitas-berani",
  "excerpt": "Surah Ali 'Imran 3:156 — Hentikan penyesalan dengan 'seandainya', bangun mentalitas berani dengan tauhid. Ridha dan ambil langkah tanpa takut hasil.",
  "content": "Bismillah,\n\nSetelah Allah melarang kita mengikuti standar orang kafir (ayat 149) dan mengingatkan bahwa mereka memiliki pola pikir yang keliru tentang takdir, pada ayat 156 ini Allah memberikan contoh spesifik:他们对 takdir memiliki logika semu yang menghasilkan penyesalan dan ketakutan.\n\n### 📖 Ayat\n\n<div class=\"verse-section\">\n<div class=\"verse-label\">Surah Ali 'Imran (3:156)</div>\n<div class=\"arabic-verse\">\nيَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَكُونُوا كَالَّذِينَ كَفَرُوا وَقَالُوا لِإِخْوَانِهِمْ إِذَا ضَرَبُوا فِي الْأَرْضِ أَوْ كَانُوا غُزًّى لَّوْ كَانُوا عِندَنَا مَا مَاتُوا وَمَا قُتِلُوا...\n</div>\n<div class=\"arabic-translation\">\n\"Wahai orang-orang yang beriman! Janganlah kamu menyerupai orang-orang kafir yang berkata kepada saudara-saudaranya apabila mereka mengadakan perjalanan di bumi atau berperang, 'Sekiranya mereka tetap bersama kita, tentulah mereka tidak mati dan tidak terbunuh'...\"\n</div>\n</div>\n\n### 🔗 Jembatan Antar Ayat: Dari Kedaulatan Mental ke Keteguhan Tauhid\n\nSetelah pada ayat 149 Allah melarang kita mentaati cara pandang orang luar, di ayat 156 ini Allah memberikan contoh spesifik tentang *pola pikir* mereka yang harus kita hindari: yaitu logika semu tentang takdir. Orang yang tidak beriman melihat hidup hanya sebagai rangkaian kebetulan atau hasil dari perhitungan manusia semata. Orang beriman melihat hidup sebagai rencana Allah yang maha sempurna. Perbedaan cara pandang ini menentukan apakah kita akan hidup dalam kecemasan atau dalam ketenangan.\n\n### 🔍 Konteks Kekinian: Overthinking dan Penyesalan Masa Lalu\n\nDi dunia modern, kita sering terjebak dalam siklus *overthinking* yang dipicu oleh kata \"seandainya\" (*if only*).\n\n1. **Jebakan \"What If\":** \"Seandainya saya mengambil pekerjaan itu...\", \"Seandainya saya tidak lewat jalan itu...\", \"Seandainya saya lebih cepat bertindak...\". Allah mengingatkan bahwa ucapan ini hanya akan menjadi penyesalan dalam hati (*hasratan fi qulubihim*). Ia tidak mengubah apa pun kecuali merusak kesehatan mental dan kualitas iman kita.\n\n2. **Mentalitas Penakut:** Ketakutan berlebihan akan risiko sering kali membuat kita tidak bergerak maju. Kita takut gagal, takut rugi, atau takut pada masa depan. Ayat ini menegaskan bahwa hidup dan mati (serta sukses dan gagal) ada di tangan Allah (*Wallahu yuhyi wa yumit*). Tugas kita adalah berusaha, hasilnya adalah wilayah Allah.\n\n3. **Analisa Tanpa Iman:** Banyak analis atau pakar yang hanya mengandalkan hitungan di atas kertas tanpa melibatkan faktor keberkahan dan takdir. Sebagai Mukmin, kita menggunakan logika, tapi tidak pernah menuhankan logika tersebut.\n\n### 💡 Pelajaran Utama: Tauhid adalah Ketenangan\n\n* **Mematikan Penyesalan:** Berhenti meratapi pilihan masa lalu. Apa yang sudah terjadi adalah takdir yang harus diterima untuk menjadi pelajaran, bukan untuk menjadi beban.\n* **Fokus pada Kontrol Diri:** Kita tidak bisa mengontrol hasil akhir, tapi kita bisa mengontrol niat dan usaha kita saat ini. Keyakinan bahwa \"Allah yang menghidupkan dan mematikan\" memberikan keberanian luar biasa untuk mengambil langkah besar dalam hidup.\n\n### ✅ Daily Action: Latihan Penerimaan (Ridha)\n\nMari kita bersihkan hati dari \"sampah\" penyesalan hari ini:\n\n1. **Hapus Kata \"Seandainya\":** Setiap kali pikiranmu mulai berkata \"Seandainya...\", segera potong dengan kalimat: *\"Qaddarallahu wa maa syaa-a fa'ala\"* (Allah telah menakdirkan, dan apa yang Dia kehendaki, Dia lakukan).\n\n2. **Evaluasi Tanpa Meratapi:** Jika kamu melakukan kesalahan, lakukan evaluasi secara teknis (apa yang perlu diperbaiki besok), tapi jangan biarkan hatimu tenggelam dalam kesedihan yang melumpuhkan produktivitasmu.\n\n3. **Ambil Langkah Berani:** Jika ada kebaikan yang selama ini kamu tunda karena takut akan risiko, bismillah, mulailah langkah pertamamu hari ini. Ingat, risiko hasil akhir ada di tangan Allah, tugasmu hanya melangkah.\n\n---\n\n*Semoga Allah menjadikan kita orang-orang yang menerima takdir-Nya dengan redha, dan berikan kami keberanian untuk beramal tanpa terhalang rasa \"seandainya\". Barakallahu fiikum.*\n\n*The_89_Project — Islamic Reflections for Daily Life*"
};

// Add new post
posts.push(newPost);

// Write back
fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2) + '\n');

console.log('✅ Added Ayat 16 to posts.json');
console.log('📊 Total posts:', posts.length);
