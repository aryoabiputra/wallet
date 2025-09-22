# Wallet — Aplikasi Pencatat Keuangan Pribadi

Wallet adalah aplikasi web pencatat keuangan sederhana dengan tampilan modern. Dibuat menggunakan **HTML, CSS, dan JavaScript**, dengan tambahan bundling melalui **Vite**. Aplikasi ini membantu kamu mengelola dompet, mencatat transaksi (pemasukan, pengeluaran, maupun hutang), serta menganalisis laporan keuangan bulanan maupun tahunan dengan mudah dan cepat:contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}.  

---

## ✨ Fitur Utama

### 🏠 Home
- Ringkasan total saldo dari semua dompet.  
- Daftar saldo per dompet.  
- Ringkasan total hutang.  
- Riwayat transaksi terbaru (pemasukan, pengeluaran, hutang) dengan filter.  

### 👛 Wallet
- Tambah, edit, dan hapus dompet sesuai kebutuhan (Bank, E-Wallet, Tabungan, dll).  
- Dompet memiliki tema warna dan ikon berbeda.  
- Saldo otomatis terupdate saat ada transaksi baru.  

### 📊 Statistik
- Diagram Donut: distribusi pengeluaran/pemasukan per kategori.  
- Diagram Batang: perbandingan pemasukan dan pengeluaran.  
- Mode **Bulanan** dan **Tahunan**.  
- Filter berdasarkan dompet tertentu atau semua dompet.  

### ⚙️ Settings
- Ubah nama profil dengan mudah.  
- Kelola kategori transaksi.  
- Export seluruh data ke format **Excel (.xlsx)** menggunakan **SheetJS**:contentReference[oaicite:3]{index=3}.  

---

## 🎨 Desain & UX
- Tampilan modern bergaya **glassmorphism** dengan efek blur, shadow, dan animasi halus:contentReference[oaicite:4]{index=4}.  
- Navigasi bawah ala aplikasi mobile.  
- Animasi *reveal on scroll* untuk transisi yang lebih hidup.  
- **Responsif**: nyaman digunakan di desktop maupun smartphone.  

---

## 🛠️ Teknologi yang Digunakan
- **HTML5** — Struktur halaman.  
- **CSS3** (Glassmorphism, Animasi) — Tampilan modern dan responsif.  
- **JavaScript (Vanilla JS)** — Logika aplikasi, CRUD dompet/transaksi, statistik, export Excel.  
- **React + Vite** — Build tooling modern:contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}.  
- **SheetJS (xlsx)** — Export data ke Excel.  
- **Font Awesome** — Ikon navigasi dan UI.  

---

## 🚀 Cara Menjalankan
1. **Akses langsung (GitHub Pages / Hosting statis)**  
   Cukup buka file `index.html` di browser.  

2. **Jalankan secara lokal dengan Vite**  
   - Clone repo ini:
     ```bash
     git clone https://github.com/username/repo-wallet.git
     ```
   - Masuk ke folder project:
     ```bash
     cd repo-wallet
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Jalankan server lokal:
     ```bash
     npm run dev
     ```
   - Akses di browser: `http://localhost:3000`

---

## 📌 Catatan
- Data disimpan di **localStorage** browser, jadi aman dan tidak butuh server/database:contentReference[oaicite:7]{index=7}.  
- Jika data dihapus, cukup clear cache/localStorage browser.  
- Cocok untuk **pengguna personal** yang ingin mengatur keuangan secara ringan dan praktis.  

---

## 📄 Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan penggunaan pribadi. Silakan modifikasi sesuai kebutuhanmu.  
