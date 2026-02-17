# Neverland Studio - Corporate Website

> **Securing the Digital Future | Engineering Secure IT Systems**

Website korporat profesional untuk perusahaan Cyber Security & IT yang dibangun dengan React, TypeScript, dan teknologi web modern.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Daftar Isi

1. [Tentang Proyek](#tentang-proyek)
2. [Fitur](#fitur)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Struktur Proyek](#struktur-proyek)
5. [Persiapan Sebelum Instalasi](#persiapan-sebelum-instalasi)
6. [Panduan Instalasi](#panduan-instalasi)
   - [Opsi 1: Docker (Disarankan)](#opsi-1-docker-disarankan)
   - [Opsi 2: Instalasi Lokal](#opsi-2-instalasi-lokal)
7. [Konfigurasi Environment](#konfigurasi-environment)
8. [Menjalankan Aplikasi](#menjalankan-aplikasi)
9. [Build untuk Produksi](#build-untuk-produksi)
10. [API Documentation](#api-documentation)
11. [Fitur Utama](#fitur-utama)
12. [Customization](#customization)
13. [Troubleshooting](#troubleshooting)
14. [Kontribusi](#kontribusi)
15. [Lisensi](#lisensi)
16. [Kontak](#kontak)

---

## Tentang Proyek

Neverland Studio adalah website portfolio profesional untuk perusahaan Cyber Security dan IT. Proyek ini menggabungkan frontend modern berbasis React dengan backend yang kuat menggunakan Laravel, menciptakan pengalaman pengguna yang smooth dan aman.

### Visi Misi
- **Visi**: Menjadi mitra terpercaya dalam mengamankan transformasi digital perusahaan
- **Misi**: Menyediakan solusi IT dan keamanan siber terintegrasi yang inovatif dan dapat diandalkan

---

## Fitur

### Frontend
- **Modern UI/UX** - Estetika profesional cyber security dengan efek glassmorphism
- **Responsif Penuh** - Desain mobile-first yang bekerja sempurna di semua perangkat
- **Optimasi Performa** - Lazy loading, code splitting, dan ukuran bundle yang optimal
- **Type-Safe** - Dibangun dengan TypeScript dalam mode strict
- **Aksesibel** - Sesuai WCAG dengan HTML semantik dan atribut ARIA
- **SEO Optimal** - Tag meta yang tepat, struktur semantik, dan pemuatan cepat
- **Animasi Halus** - Ditenagai oleh Framer Motion untuk transisi profesional

### Backend
- **RESTful API** - Arsitektur API yang terstruktur
- **JWT Authentication** - Autentikasi berbasis token yang aman
- **Two-Factor Authentication** - Menggunakan Google Authenticator
- **Activity Logging** - Pencatatan aktivitas pengguna
- **Role-Based Access** - Manajemen izin berbasis peran

### DevOps
- **Docker Container** - Orkestrasi multi-kontainer
- **Nginx** - Web server dan reverse proxy
- **MySQL/MariaDB** - Database relasional
- **phpMyAdmin** - Manajemen database

---

## Teknologi yang Digunakan

### Frontend
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| React | 19.2 | Library UI modern |
| TypeScript | 5.9 | Superset JavaScript dengan type safety |
| Vite | 7.2.5 | Build tool yang cepat |
| Tailwind CSS | 3.4.19 | Framework CSS utility-first |
| Framer Motion | 12.33.0 | Library animasi |
| React Router | 7.13.0 | Routing client-side |
| Lucide React | 0.563.0 | Library ikon |
| Axios | 1.13.5 | HTTP client |

### Backend
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| Laravel | 11 | Framework PHP |
| PHP | 8.2+ | Server-side language |
| MySQL | 8.4 | Database |
| Laravel Sanctum | 4.0 | API authentication |
| Laravel Socialite | 5.24 | OAuth authentication |
| Spatie Permission | 6.24 | Role management |
| Spatie Activitylog | 4.11 | Activity logging |
| Google2FA | 9.0 | Two-factor auth |

### DevOps & Tools
| Teknologi | Deskripsi |
|-----------|-----------|
| Docker | Containerization |
| Docker Compose | Orkestrasi kontainer |
| Nginx | Web server & reverse proxy |
| phpMyAdmin | Database management |
| Git | Version control |

---

## Struktur Proyek

```
portofolio-neverland-studio/
├── src/                      # Source code frontend
│   ├── assets/              # Gambar, font, static files
│   ├── components/          # Komponen React (Atomic Design)
│   │   ├── atoms/           # Button, Input, TextArea, Logo
│   │   ├── molecules/        # ServiceCard, SectionTitle
│   │   └── organisms/        # Navbar, Footer, HeroSection
│   ├── config/              # Konfigurasi dan data aplikasi
│   ├── layouts/             # Layout halaman
│   ├── pages/               # Halaman route
│   ├── styles/              # Global CSS
│   ├── types/               # Definisi TypeScript
│   ├── utils/               # Fungsi utility
│   ├── App.tsx              # Komponen root dengan routing
│   └── main.tsx             # Entry point
├── backend/                 # Laravel backend
│   ├── app/                 # Aplikasi Laravel
│   ├── bootstrap/           # Bootstrap files
│   ├── config/              # Konfigurasi Laravel
│   ├── database/            # Migration, seeder, factory
│   ├── public/               # Public assets
│   ├── resources/           # Views, assets
│   ├── routes/              # Route definitions
│   ├── storage/             # Logs, cache, uploads
│   ├── tests/               # Unit & feature tests
│   └── vendor/              # Composer dependencies
├── public/                   # Static assets
├── docker-compose.yml       # Docker orchestration
├── Dockerfile               # Docker image definition
├── nginx.conf               # Nginx configuration
├── package.json             # NPM dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

### Struktur Halaman

```
src/pages/
├── Home/                    # Halaman utama
├── About/                   # Tentang kami
├── Services/               # Layanan
│   ├── Consulting/
│   ├── WebDevelopment/
│   ├── UIUXDesign/
│   ├── ECommerce/
│   ├── APIDevelopment/
│   └── PWA/
├── IT Services/
│   ├── ITInfrastructure/
│   ├── ITGovernance/
│   ├── ITStrategyPlanning/
│   ├── ITConsulting/
│   └── ManagedServices/
├── Cloud Solutions/
│   ├── CloudSolutions/
│   ├── CloudSecurity/
│   ├── CloudSecuritySolutions/
│   └── CloudMigration/
├── Cyber Security/
│   ├── CyberSecurity/
│   ├── NetworkSecurity/
│   ├── SecurityAudit/
│   ├── PenetrationTesting/
│   ├── MonitoringMaintenance/
│   └── Virtualization/
├── Network/
│   ├── NetworkInfrastructure/
│   └── NetworkSecurity/
├── Digital Transformation/
├── Cost Optimization/
├── Projects/                # Portofolio proyek
├── Team/                    # Tim
├── Testimonials/            # Testimoni
├── Resources/               # Resources
├── Blog/                    # Blog
├── Contact/                 # Kontak
├── Help/                   # Bantuan
├── Settings/               # Pengaturan
├── CTF/                    # Capture The Flag
├── Playground/             # Playground
│   ├── Playground/
│   ├── PlaygroundSystem/
│   ├── PlaygroundSQL/
│   └── PlaygroundVM/
├── VendorManagement/
├── TechnologyAssessment/
└── Dashboard/              # Admin Dashboard
    ├── DashboardLogin/
    ├── DashboardAnalytics/
    ├── DashboardCalendar/
    ├── DashboardClients/
    ├── DashboardInvoices/
    ├── DashboardReports/
    ├── DashboardResources/
    ├── DashboardSettings/
    └── DashboardTeam/
```

---

## Persiapan Sebelum Instalasi

### Persyaratan Sistem

| Komponen | Minimum | Disarankan |
|----------|---------|-------------|
| OS | Ubuntu 20.04+ / Windows 10+ / macOS 11+ | Ubuntu 22.04+ |
| RAM | 4 GB | 8 GB+ |
| Disk Space | 10 GB | 20 GB+ |
| Node.js | 20.x | 22.x |
| PHP | 8.2 | 8.3+ |
| Composer | 2.x | Latest |
| Docker | 24.x | 25.x |
| Docker Compose | 2.x | Latest |

### Software yang Diperlukan

1. **Node.js & npm** - [Download](https://nodejs.org/)
2. **PHP 8.2+** - [Download](https://www.php.net/downloads)
3. **Composer** - [Download](https://getcomposer.org/download/)
4. **Git** - [Download](https://git-scm.com/downloads)
5. **Docker & Docker Compose** - [Download](https://www.docker.com/products/docker-desktop/)

---

## Panduan Instalasi

### Opsi 1: Docker (Disarankan)

Cara termudah untuk menjalankan aplikasi lengkap adalah menggunakan Docker.

#### Langkah 1: Clone Repository

```bash
git clone https://github.com/neverland-studio/portofolio.git
cd portofolio-neverland-studio
```

#### Langkah 2: Buat Network Docker

```bash
docker network create app-network
```

#### Langkah 3: Konfigurasi Environment

Salin file `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Edit file `.env` sesuai kebutuhan:

```env
# Frontend
VITE_API_URL=http://localhost:8001
VITE_APP_NAME=Neverland Studio

# Backend
APP_NAME="Neverland Studio API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8001

DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=root
DB_PASSWORD=root
```

#### Langkah 4: Jalankan Docker Compose

```bash
# Mulai semua layanan
docker-compose up -d --build

# Atau gunakan script provided
./deploy.sh
```

#### Langkah 5: Verifikasi Layanan

Setelah container berjalan, layanan berikut akan tersedia:

| Layanan | URL | Keterangan |
|---------|-----|------------|
| Frontend (Dev) | http://localhost:5173 | Development server dengan hot reload |
| Frontend (Prod) | http://localhost:3000 | Production build |
| Backend API | http://localhost:8001 | Laravel API |
| phpMyAdmin | http://localhost:8080 | Database management |
| MySQL | localhost:3306 | Database |

#### Perintah Docker Umum

```bash
# Mulai layanan
docker-compose up -d

# Hentikan layanan
docker-compose down

# Restart layanan
docker-compose restart

# Lihat logs
docker-compose logs -f

# Lihat logs service tertentu
docker-compose logs -f backend

# Rebuild setelah perubahan kode
docker-compose up -d --build

# Hapus semua data dan mulai ulang
docker-compose down -v
docker-compose up -d --build
```

---

### Opsi 2: Instalasi Lokal

Jika lebih memilih menjalankan tanpa Docker, ikuti langkah berikut:

#### Frontend

```bash
# Navigasi ke direktori proyek
cd portofolio-neverland-studio

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

#### Backend

```bash
# Navigasi ke direktori backend
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Buat database (MySQL)
mysql -u root -p -e "CREATE DATABASE neverland_portfolio;"

# Jalankan migration
php artisan migrate

# Seed database (opsional)
php artisan db:seed

# Jalankan server
php artisan serve --host=0.0.0.0 --port=8001
```

Backend API akan berjalan di `http://localhost:8001`

---

## Konfigurasi Environment

### Variabel Environment Frontend

```env
VITE_API_URL=http://localhost:8001
VITE_APP_NAME=Neverland Studio
VITE_APP_URL=http://localhost:5173
VITE_API_VERSION=/api/v1
```

### Variabel Environment Backend

```env
APP_NAME="Neverland Studio API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8001
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=root
DB_PASSWORD=your_password

CACHE_DRIVER=file
SESSION_DRIVER=database
QUEUE_CONNECTION=sync
```

### Konfigurasi CORS

Untuk mengizinkan akses dari frontend:

```php
// backend/config/cors.php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
'supports_credentials' => true,
```

---

## Menjalankan Aplikasi

### Mode Development

```bash
# Terminal 1 - Backend
cd backend
php artisan serve --host=0.0.0.0 --port=8001

# Terminal 2 - Frontend
npm run dev
```

Akses:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8001

### Mode Production (Docker)

```bash
docker-compose up -d --build
```

Akses:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001

### Mode Development dengan Docker

```bash
docker-compose --profile dev up -d
```

---

## Build untuk Produksi

### Frontend

```bash
# Build frontend
npm run build

# Preview build
npm run preview
```

### Backend

```bash
cd backend

# Optimize autoload
composer dump-autoload -o

# Clear cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize
php artisan optimize
```

---

## API Documentation

### Endpoint Utama

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Registrasi |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/user` | Get current user |
| GET | `/api/services` | List services |
| GET | `/api/projects` | List projects |
| GET | `/api/contact` | Submit contact form |

### Contoh Request

```bash
# Health Check
curl http://localhost:8001/api/health

# Login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password"}'

# Get Services
curl http://localhost:8001/api/services \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Untuk dokumentasi API lengkap, lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## Fitur Utama

### 1. Sistem Navigasi
- Navbar sticky dengan efek glassmorphism
- Menu hamburger responsif mobile
- Penandaan route aktif
- Perilaku scroll halus

### 2. Komponen
- Komponen atom yang dapat digunakan kembali
- TypeScript typing penuh
- Animasi Framer Motion
- Dukungan aksesibilitas

### 3. Formulir
- Formulir kontak dengan validasi
- Status loading dan success
- Penghitung karakter
- Penanganan error

### 4. Performa
- Halaman lazy-loaded
- Code splitting per route
- Ukuran bundle optimal
- Pemuatan awal cepat

### 5. Dashboard Admin
- Analytics dashboard
- Calendar management
- Client management
- Invoice management
- Team management
- Reports
- Resources
- Settings

---

## Customization

### Mengubah Warna

Edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        secondary: '#06B6D4',
        accent: '#A855F7',
      }
    }
  }
}
```

### Mengubah Konten

Update file di `src/config/`:
- `constants.ts` - Informasi perusahaan
- `services.ts` - Penawaran layanan
- `projects.ts` - Studi kasus

### Mengubah Font

Modifikasi import Google Fonts di `src/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap');
```

---

## Troubleshooting

### Masalah Umum

#### 1. Port Sudah Digunakan

```bash
# Cari proses yang menggunakan port
lsof -i :5173
lsof -i :8001

# Kill proses
kill -9 <PID>
```

#### 2. Error Node Modules

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
rm package-lock.json
npm install
```

#### 3. Error Composer

```bash
# Clear composer cache
composer clear-cache

# Install ulang
composer install --no-interaction
```

#### 4. Database Connection Error

```bash
# Cek konfigurasi database
php artisan config:clear

# Test koneksi
php artisan tinker
DB::connection()->getPdo();
```

#### 5. Docker Issues

```bash
# Hapus semua container, volume, dan image
docker-compose down -v --rmi all

# Build ulang
docker-compose build --no-cache
docker-compose up -d
```

### Logs

```bash
# Laravel logs
tail -f backend/storage/logs/laravel.log

# Docker logs
docker-compose logs -f
```

---

## Kontribusi

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

## Kontak

- Email: Arlianto032@gmail.com
- Website: https://portfolio.neverlandstudio.my.id
- GitHub: https://github.com/MuhammadIsakiPrananda

---

**Dibuat dengan ❤️ untuk Neverland Studio**

*Securing the Digital Future*
