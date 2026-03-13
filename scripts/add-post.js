#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '..', 'data', 'posts.json');

// Read existing posts
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));

// New post - Ayat 15
const newPost = {
  "id": 15,
  "title": "Ayat 15: Kedaulatan Mental di Tengah Arus Dominan",
  "slug": "ayat-15-kedaulatan-mental-di-tengah-arus-dominan",
  "excerpt": "Surah Ali 'Imran 3:149 — Kedaulatan mental di tengah arus dominan. Jangan mentaati orang kafir karena akan mengembalikan kita ke belakang menjadi orang yang rugi. Melawan sosial engineering, inferiority complex, dan pengaruh influencers global.",
  "date": "2026-03-13T09:00:00.000Z", // REQUIRED: never omit this field
  "content": "Bismillah,\n\nSetelah pada ayat 130 Allah melarang kita mengikuti sistem ekonomi mereka (Riba), maka di ayat 149 ini Allah melarang kita mengikuti standar nilai dan arahan mereka secara umum. Allah menegaskan bahwa ada kaitan erat antara \"siapa yang kita taati\" dengan \"ke mana arah hidup kita\". Mengikuti rujukan yang salah bukan hanya membuat kita tersesat, tapi membuat kita mundur (*naushulubillah*) dari kemajuan spiritual yang sudah kita capai.\n\n### 📖 Ayat\n\n<div class=\"verse-section\">\n<div class=\"verse-label\">Surah Ali 'Imran (3:149)</div>\n<div class=\"arabic-verse\">\nيَا أَيُّهَا الَّذِينَ آمَنُوا إِن تُطِيعُوا الَّذِينَ كَفَرُوا يَرُدُّوكُمْ عَلَىٰ أَعْقَابِكُمْ فَتَنقَلِبُوا خَاسِرِينَ\n</div>\n<div class=\"arabic-translation\">\n\"Wahai orang-orang yang beriman! Jika kamu mentaati orang-orang kafir itu, niscaya mereka akan mengembalikan kamu ke belakang (murtad), lalu kamu menjadi orang-orang yang rugi.\"\n</div>\n</div>\n\n### 🔍 Konteks Kekinian: \"Social Engineering\" dan Krisis Identitas\n\nDi era globalisasi dan digitalisasi, \"mentaati\" tidak selalu berarti mengikuti perintah langsung, melainkan mengadopsi cara pandang dan gaya hidup yang dianggap sebagai standar kesuksesan universal.\n\n1. **Inferiority Complex (Rasa Minder):** Seringkali kita merasa bahwa nilai-nilai Islam itu \"kuno\" dan nilai-nilai luar itu \"modern\". Akibatnya, kita lebih bangga mengikuti tren pemikiran mereka meskipun bertentangan dengan syariat. Inilah awal dari \"kembali ke belakang\".\n2. **Kekalahan Mental:** Saat kita menjadikan standar kebahagiaan orang yang tidak beriman sebagai tujuan (seperti hedonisme atau materialisme tanpa bats), kita sedang memutar arah hidup kita mundur. Kita mengejar dunia yang mereka puja, tapi kehilangan akhirat yang kita yakini.\n3. **Pengaruh Influencer Global:** Kita hidup di masa di mana opini populer seringkali dianggap sebagai kebenaran. Ayat ini mengingatkan agar kita tidak \"taat\" secara buta pada narasi-narasi global yang ingin menjauhkan kita dari prinsip tauhid dan moralitas Islam.\n\n### 💡 Pelajaran Utama: Berani Berbeda untuk Menang\n\nAllah menutup ayat ini dengan peringatan bahwa mengikuti mereka akan membuat kita menjadi \"orang yang rugi\" (Khasirin).\n\n- **Kerugian Ganda:** Kita kehilangan keberkahan di dunia (karena selalu merasa kurang mengejar standar orang lain) dan kehilangan pahala di akhirat.\n- **Maju Bukan Mundur:** Islam adalah agama yang progresif. Mengikuti wahyu adalah langkah maju, sementara kembali pada nilai-nilai yang mengabaikan Tuhan adalah langkah mundur ke masa jahiliah.\n\n### ✅ Daily Action: Menetapkan Standar Sendiri\n\nMari kita ambil kendali atas rujukan hidup kita hari ini:\n\n1. **Filter Konten:** Perhatikan sumber informasi atau tokoh yang paling memengaruhi keputusanamu dalam sepekan terakhir. Jika narasi mereka membuatmu merasa \"jauh\" dari Allah atau merasa malu menjadi Muslim, saatnya mencari rujukan baru yang lebih menguatkan iman.\n\n2. **Uji Kebenaran:** Sebelum mengikuti sebuah tren (baik itu cara berpakaian, cara berbisnis, atau cara bergaul), tanyakan: *\"Apakah ini membuat saya maju secara kualitas manusia, atau justru membuat saya mundur secara moral?\"*\n\n3. **Bangga dengan Identitas:** Tunjukkan satu perilaku yang menunjukkan identitasmu sebagai Muslim hari ini (misal: tetap salat tepat waktu di tengah kesibukan atau tetap berkata jujur saat orang lain berbohong). Jangan biarkan tekanan mayoritas mengubah prinsipmu.\n\n---\n\n*Semoga Allah mempertahankan kita di antara orang-orang selalu mindful tentang lingkungan terdekatnya, dan diberikan hikmah untuk memilih inner circle yang benar. Barakallahu fiukum.*\n\n*The_89_Project — Islamic Reflections for Daily Life*"
};

// Add new post
posts.push(newPost);

// Write back
fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2) + '\n');

console.log('✅ Added Ayat 15 to posts.json');
console.log('📊 Total posts:', posts.length);
