# Sistem Bendahara Management

Sistem ini digunakan untuk **membantu bendahara** dalam mengelola keuangan organisasi, mulai dari pencatatan transaksi hingga laporan keuangan.

---

## 🛠️ Teknologi
- **Backend:** Laravel 12  
- **Frontend:** Inertia.js + React  
- **UI:** TailwindCSS  
- **Database:** MySQL  

---

## 🗄️ Struktur Database Utama
1. **users** → data data bendahara
2. **transactions** → catatan pemasukan & pengeluaran  
   - Kolom: `type`, `category`, `amount`, `description`, `date`, `user_id` 

---

## ⚡ Fitur
### 1. Transaksi (CRUD)
- Input **pemasukan**  
- Input **pengeluaran**  
- Edit & hapus transaksi  

### 2. Dashboard Keuangan
- Hitung otomatis **saldo** = total pemasukan - total pengeluaran  
- Grafik pemasukan vs pengeluaran  
- List transaksi terbaru  

### 3. Laporan
- Filter transaksi berdasarkan tanggal/kategori  
- Export ke **PDF/Excel** untuk LPJ  

### 4. Transparansi Anggota (Opsional)
- Anggota login bisa melihat status iuran  
- Cek laporan kas umum  

---

## 🚀 Cara Menjalankan Project
1. Clone repository:  
```bash
git clone https://github.com/username/nama-repo.git
```
2. Masuk ke folder project:  
```bash
cd nama-repo
```
3. Install dependencies backend & frontend:  
```bash
composer install
npm install
npm run dev
```
4. Buat file `.env` dan sesuaikan konfigurasi database.  
5. Migrasi database:  
```bash
php artisan migrate
```
6. Jalankan server:  
```bash
php artisan serve
```

---

## 📌 Catatan
- Jangan push file `.env` atau `vendor/` ke GitHub.  
- Gunakan `.gitignore` untuk mengabaikan `node_modules/`, `storage/`, dan file sensitif.  

---

## 👨‍💻 Contributor
- **Teuku Aryansyah Pratama** 

