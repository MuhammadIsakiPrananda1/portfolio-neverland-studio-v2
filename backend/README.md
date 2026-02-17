# Neverland Studio Backend API

> **Backend API untuk Neverland Studio Corporate Website**

API backend yang dibangun dengan Laravel 11 untuk menangani data dan autentikasi pada website portfolio Neverland Studio.

[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?style=flat&logo=php)](https://www.php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=flat&logo=mysql)](https://www.mysql.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)

## Daftar Isi

1. [Tentang](#tentang)
2. [Fitur](#fitur)
3. [Technology Stack](#technology-stack)
4. [Struktur Proyek](#struktur-proyek)
5. [Persiapan](#persiapan)
6. [Instalasi](#instalasi)
7. [Konfigurasi](#konfigurasi)
8. [API Reference](#api-reference)
9. [Database](#database)
10. [Autentikasi](#autentikasi)
11. [Commands](#commands)
12. [Troubleshooting](#troubleshooting)
13. [Lisensi](#lisensi)

---

## Tentang

Neverland Studio Backend adalah RESTful API yang dibangun menggunakan Laravel 11. API ini menangani:

- Autentikasi pengguna (JWT + 2FA)
- Manajemen konten (Services, Projects, Blog, dll)
- Dashboard admin
- Analytics dan tracking
- Media management
- Contact form submissions

## Features

- 🔐 Authentication with Laravel Sanctum
- 👥 Role-based access control (RBAC) with Spatie Permission
- 📝 Blog management
- 💼 Project portfolio management
- 📧 Contact form handling
- 👨‍💼 Client management
- 📊 Analytics tracking
- 📁 Media management
- ⚙️ Settings management
- 🔍 Advanced filtering and sorting with Spatie Query Builder

## Tech Stack

- **Framework**: Laravel 11
- **Authentication**: Laravel Sanctum
- **Permissions**: Spatie Laravel Permission
- **Database**: MySQL/PostgreSQL
- **Cache**: Redis (optional)
- **Queue**: Database/Redis

## Installation

### Prerequisites

- PHP >= 8.2
- Composer
- MySQL/PostgreSQL
- Node.js (optional, for Laravel Mix)

### Setup Steps

1. **Install Dependencies**
   ```bash
   composer install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure Database**
   Update `.env` with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=neverland_portfolio
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. **Run Migrations**
   ```bash
   php artisan migrate
   ```

5. **Seed Database**
   ```bash
   php artisan db:seed
   ```

6. **Create Storage Link**
   ```bash
   php artisan storage:link
   ```

7. **Start Development Server**
   ```bash
   php artisan serve
   ```

   API will be available at `http://localhost:8000`

## Default Credentials

After seeding, you can login with:

- **Admin**
  - Email: `admin@neverlandstudio.com`
  - Password: `password`

- **Editor**
  - Email: `editor@neverlandstudio.com`
  - Password: `password`

## API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout (authenticated)
- `GET /auth/user` - Get authenticated user
- `PUT /auth/profile` - Update profile
- `PUT /auth/password` - Update password

### Public Endpoints

- `GET /services` - List all services
- `GET /projects` - List all projects
- `GET /blog` - List all blog posts
- `GET /team` - List team members
- `GET /testimonials` - List testimonials
- `POST /contact` - Submit contact form

### Protected Endpoints (Require Authentication)

#### Projects
- `POST /projects` - Create project (Admin/Editor)
- `PUT /projects/{id}` - Update project (Admin/Editor)
- `DELETE /projects/{id}` - Delete project (Admin/Editor)

#### Blog
- `POST /blog` - Create blog post (Admin/Editor)
- `PUT /blog/{id}` - Update blog post (Admin/Editor)
- `DELETE /blog/{id}` - Delete blog post (Admin/Editor)

#### Analytics
- `GET /analytics/overview` - Dashboard overview
- `GET /analytics/visitors` - Visitor statistics
- `GET /analytics/projects-stats` - Project statistics

#### Messages
- `GET /messages` - List all messages
- `PUT /messages/{id}/read` - Mark as read
- `POST /messages/{id}/reply` - Reply to message

For complete API documentation, visit `/api/documentation` after setup.

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   ├── Requests/
│   │   ├── Resources/
│   │   └── Middleware/
│   ├── Models/
│   ├── Services/
│   └── Providers/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   └── web.php
└── config/
```

## Testing

Run tests with:
```bash
php artisan test
```

## Deployment

### Production Checklist

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure proper database credentials
4. Set up queue worker: `php artisan queue:work`
5. Set up scheduler: Add to cron `* * * * * php artisan schedule:run`
6. Optimize application:
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

## License

MIT License - lihat file [LICENSE](../LICENSE) untuk detail lengkap.

## Support

Untuk support, email Arlianto032@gmail.com atau visit https://neverland-studio.com
