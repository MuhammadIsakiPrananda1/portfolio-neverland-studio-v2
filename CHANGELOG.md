<div align="center">

# 📜 Changelog

**All notable changes to this project will be documented in this file.**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

</div>

---

## 🌟 [Unreleased]

### 🚧 Planned Features
- [ ] 🌗 Dark / Light mode toggle
- [ ] 🌐 Multi-language support (EN / ID)
- [ ] 🏷️ Blog categories and tags
- [ ] 🔍 Project filtering
- [ ] 📰 Newsletter subscription
- [ ] 💬 Live chat integration
- [ ] 📱 PWA support
- [ ] 🤖 AI-powered security threat analysis
- [ ] 🔗 Blockchain certificate verification system

---

## 🚀 [1.2.0] - 2026-02-23

### ✨ Added
- **Learning Hub** (`/playground/learning`) — New section with CTF write-ups, tools & cheatsheets, and learning roadmaps.
  - `PlaygroundLearning` — Learning hub overview page.
  - `PlaygroundLearningWriteups` — CTF write-up library.
  - `PlaygroundLearningTools` — Security tools and cheatsheets.
  - `PlaygroundLearningRoadmap` — Structured learning roadmaps for cybersecurity.
- **Cyber News** page — Real-time cybersecurity news feed with hero section and category filtering.
- **Dashboard redesign** — All 13 dashboard pages updated with glassmorphism, gradients, and Framer Motion animations.
  - `DashboardTasks`, `DashboardMessages`, `DashboardProjects`, `DashboardServices` — New pages.
  - Full redesign on Analytics, Calendar, Clients, Invoices, Reports, Resources, Team, Settings.
- **VM Playground access control** — Authentication-required gate for virtual machine provisioning.
- **Real-time broadcasting** — Laravel Reverb + Laravel Echo integration for live dashboard updates.

### 🔄 Changed
- Dashboard navigation and layout refined for consistency across all pages.
- Playground hub restructured to accommodate the new Learning section.
- Security Tools playground polished with updated UI.

### 🐛 Fixed
- Docker network configuration for stable multi-service builds.
- Database cleanup: removed unused tables and redundant columns.

---

## 🛠️ [1.1.0] - 2026-02-19

### ✨ Added
- Roadmap 2026 section to `README.md`.
- `INSTALL.md` — Dedicated, detailed installation guide.
- `SUPPORT.md` — Comprehensive support resources document.

### 🔄 Changed
- Updated all copyright notices to 2026.
- Bumped recommended system requirements (Node.js 24.x, PHP 8.4+).
- Improved README structure and clarity.

---

## 🎉 [1.0.0] - 2024-01-15

### ✨ Added (Initial Release)
- **Initial release** — Full portfolio website for Neverland Studio.
- **Frontend** — React 19, TypeScript, Vite, Tailwind CSS, Framer Motion.
- **Backend** — Laravel 11 REST API with PHP 8.2+.
- **Docker support** — Docker Compose with multi-container orchestration (Nginx, MariaDB, phpMyAdmin).

### 🚀 Key Features Include
- JWT / Sanctum token-based authentication.
- Role-based access control (Spatie Permission).
- Two-factor authentication via Google Authenticator.
- Activity logging (Spatie Activitylog).
- Admin dashboard (Analytics, Calendar, Clients, Invoices, Reports, etc.).
- CTF Playground with 10+ challenge categories.
- Security Tools: password generator, hash calculator, encoding.
- Isolated SQL and VM Practice environments.

---

## 🔝 Upgrade Guide

<details>
<summary><b>v1.1.0 → v1.2.0</b></summary>

1. Pull the latest code:
   ```bash
   git pull origin main
   ```
2. Install new dependencies:
   ```bash
   npm install
   cd backend && composer install
   ```
3. Run new migrations & clear caches:
   ```bash
   php artisan migrate
   php artisan config:clear
   php artisan cache:clear
   ```
4. Rebuild (Docker):
   ```bash
   docker-compose up -d --build
   ```

</details>

<details>
<summary><b>v1.0.0 → v1.1.0</b></summary>

1. Back up your database.
2. Update all dependencies:
   ```bash
   composer update
   npm update
   ```
3. Run migrations and clear cache:
   ```bash
   php artisan migrate
   php artisan optimize
   npm run build
   ```

</details>

---

## 🛡️ Security

If you discover a security vulnerability, please refer to our [SECURITY.md](SECURITY.md) and email **Arlianto032@gmail.com**. **Do not open a public issue.**

<div align="center">
<i>This changelog follows <a href="https://keepachangelog.com">Keep a Changelog</a> principles.</i>
</div>
