<div align="center">

# 🌌 Neverland Studio 🌌

*Securing the Digital Future | Engineering Secure IT Systems*

**A professional corporate portfolio website for a Cyber Security & IT company, built with React, TypeScript, and a modern web stack — backed by a full Laravel 11 REST API.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **Last Updated: February 2026**

</div>

---

## 📑 Table of Contents

1. [📖 About the Project](#-about-the-project)
2. [✨ Features](#-features)
3. [🛠️ Tech Stack](#️-tech-stack)
4. [📂 Project Structure](#-project-structure)
5. [⚙️ Prerequisites](#️-prerequisites)
6. [🚀 Installation](#-installation)
7. [🔧 Environment Configuration](#-environment-configuration)
8. [🏃 Running the Application](#-running-the-application)
9. [📦 Building for Production](#-building-for-production)
10. [📡 API Reference](#-api-reference)
11. [🔑 Key Features](#-key-features)
12. [🎨 Customization](#-customization)
13. [🚑 Troubleshooting](#-troubleshooting)
14. [🗺️ Roadmap](#️-roadmap)
15. [🤝 Contributing](#-contributing)
16. [📄 License](#-license)
17. [📬 Contact](#-contact)

---

## 📖 About the Project

**Neverland Studio** is a professional portfolio website for a Cyber Security and IT company. The project combines a modern React frontend with a robust Laravel backend, delivering a smooth, secure, and visually impressive user experience.

It covers everything from company service pages and project showcases to a full-featured admin dashboard, a CTF Playground with security challenges, and an interactive Learning Hub for cybersecurity learners.

### 🌟 Vision & Mission
- **Vision** — To be a trusted partner in securing the digital transformation of businesses.
- **Mission** — To deliver innovative, integrated IT and cyber security solutions that are reliable and forward-thinking.

---

## ✨ Features

### 🖥️ Frontend
- **Modern UI/UX** — Professional cybersecurity aesthetic with glassmorphism effects, gradient animations, and Framer Motion transitions.
- **Fully Responsive** — Mobile-first design that works seamlessly across all screen sizes.
- **Performance-Optimized** — Lazy loading, code splitting, and optimal bundle sizes.
- **Type-Safe** — Built with TypeScript in strict mode.
- **Accessible** — WCAG-compliant with semantic HTML and ARIA attributes.
- **SEO-Ready** — Proper meta tags, semantic structure, and fast load times.

### 🔒 Backend
- **RESTful API** — Well-structured API architecture with versioning.
- **JWT / Sanctum Authentication** — Secure token-based authentication.
- **Two-Factor Authentication** — Google Authenticator (2FA).
- **Activity Logging** — Full audit trail of user actions (via Spatie Activitylog).
- **Role-Based Access Control** — Granular permission management (via Spatie Permission).
- **Real-Time Broadcasting** — Laravel Reverb + Laravel Echo for live dashboard updates.

### 🎯 Playground / CTF Hub
- Interactive **CTF Challenges** (Web, Binary, Crypto, Forensics, Reverse, OSINT, Steganography, Mobile, CVE).
- **Security Tools** — Password generator, hash calculator, encoding/decoding utilities.
- **Virtual Machine Playground** — Spin up isolated VM environments (auth-required).
- **SQL Playground** — Practice SQL injection in a safe environment.
- **Learning Hub** — CTF write-ups, tools & cheatsheets, and learning roadmaps.

### 📊 Admin Dashboard
- Analytics, Calendar, Client Management, Invoice Management.
- Task Management, Team Management, Project Tracking.
- Reports, Resources, Messages, and Settings.

### 🐋 DevOps
- **Docker + Docker Compose** — Multi-container orchestration.
- **Nginx** — Web server and reverse proxy.
- **MariaDB / MySQL** — Relational database.
- **phpMyAdmin** — Database management UI.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|------------|-------------|
| **React 19.2** | Modern UI library |
| **TypeScript 5.9** | JavaScript with static typing |
| **Vite 7.2.5** | Ultra-fast build tool |
| **Tailwind CSS 3.4.19** | Utility-first CSS framework |
| **Framer Motion 12.33** | Animation library |
| **React Router 7.13** | Client-side routing |

### Backend
| Technology | Description |
|------------|-------------|
| **Laravel 11** | PHP web framework |
| **PHP 8.2+** | Server-side language |
| **MySQL / MariaDB 8.4** | Relational database |
| **Laravel Reverb** | WebSocket broadcasting server |

### DevOps
| Technology | Description |
|------------|-------------|
| **Docker** | Containerization |
| **Nginx** | Web server & proxy |

---

## 📂 Project Structure

<details>
<summary><b>Click to expand the project architecture</b></summary>

```
portofolio-neverland-studio/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components (Atomic Design)
│   ├── pages/                    # Route-based page components (73 pages)
│   ├── services/                 # API service modules
│   ├── styles/                   # Global CSS
│   └── App.tsx                   # Root component
├── backend/                      # Laravel 11 backend
│   ├── app/                      # Application logic (Controllers, Models, etc.)
│   ├── database/                 # Migrations, seeders, factories
│   ├── routes/                   # API & web routes
│   └── tests/                    # Tests
├── docker-compose.yml            # Docker orchestration
├── Dockerfile                    # Docker image definition
└── package.json                  # NPM dependencies
```

</details>

---

## ⚙️ Prerequisites

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **OS** | Ubuntu 20.04+ / Windows 10+ / macOS 11+ | Ubuntu 22.04+ |
| **RAM** | 4 GB | 8 GB+ |
| **Node.js** | 22.x | 24.x |
| **PHP** | 8.2 | 8.4+ |
| **Docker** | 24.x | 25.x+ |

---

## 🚀 Installation

For deeper instructions, please refer to the full [INSTALL.md](INSTALL.md).

### Option 1: Docker (Recommended)

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
   cd portofolio-neverland-studio
   ```
2. **Setup Network & Env:**
   ```bash
   docker network create app-network
   cp .env.example .env
   ```
3. **Start Services:**
   ```bash
   docker-compose up -d --build
   ```

### Option 2: Local Setup (Manual)
1. Frontend setup via `npm install` and `npm run dev`
2. Backend setup via `composer install`, DB creation, and `php artisan serve`

---

## 🔧 Environment Configuration

Example frontend `.env`:
```env
VITE_API_URL=http://localhost:8001
VITE_APP_NAME=Neverland Studio
VITE_APP_URL=http://localhost:5173
```

Example backend `.env` variables:
```env
APP_NAME="Neverland Studio API"
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_DATABASE=neverland_portfolio
BROADCAST_CONNECTION=reverb
```

---

## 🏃 Running the Application

- **Frontend (Dev):** `http://localhost:5173`
- **Frontend (Prod):** `http://localhost:3000`
- **Backend API:** `http://localhost:8001`
- **phpMyAdmin:** `http://localhost:8080`

---

## 📦 Building for Production

### Frontend
```bash
npm run build
npm run preview
```

### Backend
```bash
cd backend
composer dump-autoload -o
php artisan optimize
```

---

## 📡 API Reference

<details>
<summary><b>Click to expand Core API Endpoints</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | User registration |
| `GET` | `/api/user` | Get authenticated user |
| `GET` | `/api/services` | List all services |

For detailed API docs, see `API_DOCUMENTATION.md`.

</details>

---

## 🔑 Key Features

1. **Navigation System** — Sticky glassmorphism navbar with smooth scroll.
2. **Component Architecture** — Atomic Design pattern & full type-safety.
3. **Real-Time Dashboard** — Live analytics via Laravel Reverb + Laravel Echo.
4. **Playground / CTF Hub** — 10+ CTF categories, isolated VMs, and a rich learning environment.

---

## 🎨 Customization

Modify `tailwind.config.js` to adjust colors:
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

---

## 🚑 Troubleshooting

<details>
<summary><b>Click to expand Troubleshooting solutions</b></summary>

**Port Already in Use:**
```bash
lsof -i :5173
kill -9 <PID>
```

**Docker Full Reset:**
```bash
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up -d
```

</details>

---

## 🗺️ Roadmap

We are actively improving! Planned updates for 2026:
- [ ] 🤖 AI-Powered Security Analysis
- [ ] 🔗 Blockchain Certificate Verification
- [ ] 📱 Mobile App (iOS & Android)
- [ ] 🌗 Dark / Light Mode Toggle
- [ ] 🌐 Multi-Language Support (EN / ID)

---

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines, code standards, and the PR process. By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **Email:** Arlianto032@gmail.com
- **Website:** [portfolio.neverlandstudio.my.id](https://portfolio.neverlandstudio.my.id)
- **GitHub:** [@MuhammadIsakiPrananda](https://github.com/MuhammadIsakiPrananda)

<div align="center">
<br/>

**Made with ❤️ by Neverland Studio**
*Securing the Digital Future*
<br/>
Copyright © 2026 Neverland Studio. All rights reserved.

</div>
