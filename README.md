# VPBI-KPI-TRACKER

**Versi:** 2.0.1

Project ini bertujuan untuk menilai kinerja karyawan per-divisi dengan role **admin**, **leader**, dan **user**. Penilaian per karyawan diharapkan mampu meningkatkan kinerja dan efisiensi tugas.

---

## Daftar Isi

1. Overview
2. Fitur Utama
3. Arsitektur & Teknologi
4. Persyaratan & Instalasi
5. Struktur Proyek (Frontend)
6. Variabel Lingkungan (ENV)
7. Menjalankan Aplikasi (Development & Production)
8. API (ringkasan endpoint yang umum digunakan)
9. Komponen Utama & Penjelasan
10. Panduan Penggunaan singkat
11. Troubleshooting & Tips
12. Contributing
13. Changelog singkat
14. Lisensi & Support

---

## 1. Overview

VPBI-KPI-TRACKER adalah aplikasi dashboard yang memudahkan monitoring dan penilaian KPI karyawan per-divisi. Sistem mendukung beberapa role (admin, leader, user) dan menampilkan visualisasi menggunakan grafik untuk analisis cepat.

## 2. Fitur Utama

* Multi-role: admin, leader, user
* Penilaian KPI per karyawan dan per divisi
* Dashboard interaktif (grafik garis & batang)
* Manajemen user dan divisi
* Authentication (mis. Clerk, JWT, atau sistem yang Anda pilih)
* Notifikasi (toast) untuk aksi CRUD
* Dark Mode (jika template mendukung)

## 3. Arsitektur & Teknologi

**Frontend**

* React 19 + Vite
* Tailwind CSS v4
* Recharts (visualisasi)
* lucide-react (ikon)
* axios (http client)
* react-router-dom v7 (routing)
* react-hot-toast (notifikasi)

**Backend**

* (Backend tidak disertakan di repo ini) — gunakan Node.js + Express / NestJS / Laravel atau framework lain.
* Basis data: PostgreSQL / MySQL / MongoDB (pilih sesuai kebutuhan)

## 4. Persyaratan & Instalasi

**Prerequisites**

* Node.js 18.x atau lebih baru
* npm atau yarn

**Clone repository**

```bash
git clone <REPO_URL>
cd vpbi-frontend
```

**Install dependencies**

```bash
npm install
# atau
yarn install
```

**Script penting (package.json)**

* `dev` -> jalankan Vite (development)
* `build` -> build untuk production
* `preview` -> preview hasil build
* `lint` -> jalankan eslint

Contoh `package.json` (ringkasan):

* React, Vite, Tailwind, Recharts, axios, lucide-react, react-router-dom, dll.

## 5. Struktur Proyek (Frontend) — Contoh

```
vpbi-frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ api/              # Untuk menghubungkan api CRUD
│  ├─ components/       # Reusable components (Button, Modal, Table, dll)
│  ├─ context/          # menimpan semua Context
│  ├─ layouts/          # Layouts (MainLayout, AuthLayout)
│  ├─ pages/            # Halaman (Dashboard, Users, Divisions, KPI)
│  ├─ store/            # Context atau state management
│  ├─ utils/            # Helper functions
│  └─ main.jsx
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

> Catatan: struktur bisa menyesuaikan kebutuhan tim. Jika menggunakan Inertia + Laravel, tempatkan folder frontend di dalam project Laravel.

## 6. Variabel Lingkungan (ENV)

Buat file `.env` di root atau `.env.local` (tidak commit ke git). Contoh variabel:

```
VITE_API_URL= "https://example.com"

VITE_CLERK_PUBLISHABLE_KEY=wkwkwkwkwkwkkwkwkwwkwkk
```

Penamaan `VITE_` diperlukan agar Vite mengekspos variabel ke browser.

## 7. Menjalankan Aplikasi

**Development**

```bash
npm run dev
# atau
yarn dev
```

Akses di `http://localhost:5173` (atau port Vite default).

**Build untuk production**

```bash
npm run build
npm run preview
```

**Deployment**

* Frontend dapat dideploy ke Vercel, Netlify, atau S3 + CloudFront.
* Pastikan variabel environment pada hosting diatur sesuai.

## 8. API (Ringkasan endpoint umum)

> Catatan: endpoint backend tergantung implementasi. Berikut contoh pola REST yang biasa digunakan.
POST /auth/logout` — logout

**Users**

* `GET /user/all` — list users
* `GET /user/:id` — detail user
* `POST /user` — create user
* `PUT /user/update/:id`— update user
* `DELETE /user/delete/:id` — delete user

**Divisions**

* `GET /divisi/all`
* `POST /divisi`
* `PUT/divisi/update/:id`
* `DELETE /divisi/delete/:id`

**KPI / Scores**

* `GET /matriksKpi/all` — list KPI entries
* `GET /matriksKpi/:id`
* `POST /matriksKpi` — create penilaian
* `PUT /matriksKpi/update/:id` — update
* `DELETE /matriksKpi/:delete/id` — hapus penilaian
**Detail / Scores**

* `GET /detailPenilaian/all` — list KPI entries
* `GET /detailPenilaian/:id`
* `POST /detailPenilaian` — create penilaian
* `PUT /detailPenilaian/update/:id` — update
* `DELETE /detailPenilaian/:delete/id` — hapus penilaian
**Karyawan / User**

* `GET /karyawan/all` — list Karyawan entries
* `GET /karyawan/:id`
* `POST /karyawan` — create Karyawan
* `PUT /karyawan/update/:id` — update
* `DELETE /karyawan/delete/:id` — hapus Karyawan
**Penilaian / Score**

* `GET /penilaianKpi/all` — list Karyawan entries
* `GET /penilaianKpi/:id`
* `POST /penilaianKpi` — create Karyawan
* `PUT /penilaianKpi/update/:id` — update
* `DELETE /penilaianKpi/delete/:id` — hapus Karyawan


**Contoh header**

```
Authorization: Bearer <token>
Content-Type: application/json
```

## 9. Komponen Utama & Penjelasan

* **Dashboard**: menampilkan ringkasan KPI, grafik (Recharts), dan indikator performa.
* **User Management**: CRUD user, assign role.
* **Division Management**: CRUD divisi.
* **KPI Management**: Form input KPI, list dan nilai karyawan, filter by period/divisi.
* **Auth & Guard**: Private route untuk role tertentu (admin/leader).
* **Toasts**: feedback aksi (sukses/gagal).

## 10. Panduan Penggunaan Singkat

1. Admin membuat divisi dan menambahkan user.
2. Leader mengisi penilaian KPI anggota divisinya.
3. Dashboard menampilkan ringkasan dan tren performa.
4. Gunakan filter periode (bulan/tahun) untuk melihat tren.

## 11. Troubleshooting & Tips

* Jika ada error CORS, pastikan backend mengizinkan origin dari frontend.
* Jika `react-is` atau paket lain error saat build, coba sinkronkan versi React dan dependensi.
* Jika mengalami masalah `react-router-dom` versi 7, cek migrasi API (v6 -> v7 perubahan routing).
* Saat menggunakan Clerk atau layanan auth lain, pastikan public key & client ID benar.

## 12. Contributing

1. Fork repository
2. Buat branch feature: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah fitur X"`
4. Push dan buat PR

Pastikan menulis deskripsi PR jelas dan menjalankan `npm run lint` sebelum submit.

## 13. Changelog singkat

* **2.0.1 (Feb 27, 2025)** — upgrade Tailwind CSS v4, perbaikan kelas
* **2.0.0 (Feb 2025)** — redesign UI, fitur baru (calendar, chat, collapsible sidebar)

## 14. Lisensi & Support

* Lisensi: Team C
* Jika ingin dukungan: buka issue di repository atau contact maintainer lewat email di file `package.json` atau README utama.

---

### Catatan terakhir

Dokumentasi ini dibuat sebagai *baseline*. Jika Anda ingin saya tambahkan bagian teknis lebih lanjut (contoh kode API call dengan `axios`, `Context` untuk auth, contoh komponen Dashboard, atau panduan deployment ke Vercel), beri tahu bagian mana yang ingin diperluas dan akan saya tambahkan.
