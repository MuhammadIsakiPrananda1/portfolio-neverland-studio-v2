# Installation Guide

Panduan instalasi lengkap untuk Neverland Studio.

## Quick Start (5 Menit)

### Menggunakan Docker (Disarankan)

```bash
# 1. Clone repository
git clone https://github.com/neverland-studio/portofolio.git
cd portofolio-neverland-studio

# 2. Buat network
docker network create app-network

# 3. Copy environment file
cp .env.example .env

# 4. Jalankan Docker Compose
docker-compose up -d --build

# 5. Selesai!
# Akses: http://localhost:5173
```

---

## Persiapan Sistem

### Windows

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install [Git](https://git-scm.com)
3. Install [VS Code](https://code.visualstudio.com) (disarankan)

### macOS

```bash
# Install Homebrew (jika belum ada)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker
brew install --cask docker

# Install Git
brew install git
```

### Linux (Ubuntu)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io docker-compose

# Install Git
sudo apt install git

# Install PHP & Composer
sudo apt install php php-cli php-mbstring php-xml php-curl
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs
```

---

## Instalasi Lengkap

### Frontend Saja

```bash
# Install dependencies
npm install

# Copy environment
cp .env.example .env

# Run development server
npm run dev
```

### Backend Saja

```bash
cd backend

# Install dependencies
composer install

# Copy environment
cp .env.example .env

# Generate key
php artisan key:generate

# Setup database
mysql -u root -p -e "CREATE DATABASE neverland_portfolio;"

# Run migrations
php artisan migrate

# Seed data
php artisan db:seed

# Run server
php artisan serve --host=0.0.0.0 --port=8001
```

### Full Stack (Tanpa Docker)

```bash
# Terminal 1 - Backend
cd backend
php artisan serve --host=0.0.0.0 --port=8001

# Terminal 2 - Frontend
npm run dev
```

---

## Setup Setelah Instalasi

### Login Admin Default

```
Email: admin@neverlandstudio.com
Password: password
```

### Konfigurasi Awal

1. **Ubah password admin**
   - Login ke dashboard
   - Pergi ke Settings > Security
   - Ubah password

2. **Setup email**
   - Edit `.env` dengan konfigurasi email
   - Jalankan `php artisan config:clear`

3. **Setup 2FA** (opsional)
   - Pergi ke Settings > Security
   - Scan QR code dengan Google Authenticator
   - Simpan backup codes

---

## Troubleshooting

### Port Sudah Digunakan

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5173
kill -9 <PID>
```

### Error Database

```bash
cd backend
php artisan config:clear
php artisan migrate:fresh --seed
```

### Error Node Modules

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Langkah Selanjutnya

Setelah instalasi berhasil:

1. [Baca README.md](../README.md) untuk overview
2. [Baca API Documentation](backend/README.md) untuk API reference
3. [Kontribusi](CONTRIBUTING.md) jika ingin berkontribusi

---

Butuh bantuan? Email: Arlianto032@gmail.com
