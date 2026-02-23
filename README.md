# Neverland Studio — Corporate Portfolio Website

> **Last Updated: February 2026**
>
> *Securing the Digital Future | Engineering Secure IT Systems*

A professional corporate portfolio website for a Cyber Security & IT company, built with React, TypeScript, and a modern web stack — backed by a full Laravel 11 REST API.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)](https://laravel.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
   - [Option 1: Docker (Recommended)](#option-1-docker-recommended)
   - [Option 2: Local Setup](#option-2-local-setup)
7. [Environment Configuration](#environment-configuration)
8. [Running the Application](#running-the-application)
9. [Building for Production](#building-for-production)
10. [API Reference](#api-reference)
11. [Key Features](#key-features)
12. [Customization](#customization)
13. [Troubleshooting](#troubleshooting)
14. [Roadmap](#roadmap)
15. [Contributing](#contributing)
16. [License](#license)
17. [Contact](#contact)

---

## About the Project

**Neverland Studio** is a professional portfolio website for a Cyber Security and IT company. The project combines a modern React frontend with a robust Laravel backend, delivering a smooth, secure, and visually impressive user experience.

It covers everything from company service pages and project showcases to a full-featured admin dashboard, a CTF Playground with security challenges, and an interactive Learning Hub for cybersecurity learners.

### Vision & Mission
- **Vision** — To be a trusted partner in securing the digital transformation of businesses.
- **Mission** — To deliver innovative, integrated IT and cyber security solutions that are reliable and forward-thinking.

---

## Features

### Frontend
- **Modern UI/UX** — Professional cybersecurity aesthetic with glassmorphism effects, gradient animations, and Framer Motion transitions
- **Fully Responsive** — Mobile-first design that works seamlessly across all screen sizes
- **Performance-Optimized** — Lazy loading, code splitting, and optimal bundle sizes
- **Type-Safe** — Built with TypeScript in strict mode
- **Accessible** — WCAG-compliant with semantic HTML and ARIA attributes
- **SEO-Ready** — Proper meta tags, semantic structure, and fast load times

### Backend
- **RESTful API** — Well-structured API architecture with versioning
- **JWT / Sanctum Authentication** — Secure token-based authentication
- **Two-Factor Authentication** — Google Authenticator (2FA)
- **Activity Logging** — Full audit trail of user actions (via Spatie Activitylog)
- **Role-Based Access Control** — Granular permission management (via Spatie Permission)
- **Real-Time Broadcasting** — Laravel Reverb + Laravel Echo for live dashboard updates

### Playground / CTF Hub
- Interactive **CTF Challenges** (Web, Binary, Crypto, Forensics, Reverse, OSINT, Steganography, Mobile, CVE)
- **Security Tools** — Password generator, hash calculator, encoding/decoding utilities
- **Virtual Machine Playground** — Spin up isolated VM environments (auth-required)
- **SQL Playground** — Practice SQL injection in a safe environment
- **Learning Hub** — CTF write-ups, tools & cheatsheets, and learning roadmaps

### Admin Dashboard
- Analytics, Calendar, Client Management, Invoice Management
- Task Management, Team Management, Project Tracking
- Reports, Resources, Messages, and Settings

### DevOps
- **Docker + Docker Compose** — Multi-container orchestration
- **Nginx** — Web server and reverse proxy
- **MariaDB / MySQL** — Relational database
- **phpMyAdmin** — Database management UI

---

## Tech Stack

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.2 | Modern UI library |
| TypeScript | 5.9 | JavaScript with static typing |
| Vite (rolldown-vite) | 7.2.5 | Ultra-fast build tool |
| Tailwind CSS | 3.4.19 | Utility-first CSS framework |
| Framer Motion | 12.33.0 | Animation library |
| React Router DOM | 7.13.0 | Client-side routing |
| Lucide React | 0.563.0 | Icon library |
| Axios | 1.13.5 | HTTP client |
| Laravel Echo | 2.3.0 | Real-time event listener |
| Pusher JS | 8.4.0 | WebSocket client |
| xterm.js | 5.3.0 | Terminal emulator for VM Playground |

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| Laravel | 11 | PHP web framework |
| PHP | 8.2+ | Server-side language |
| MySQL / MariaDB | 8.4 | Relational database |
| Laravel Sanctum | 4.0 | API authentication |
| Laravel Socialite | 5.24 | OAuth authentication |
| Laravel Reverb | — | WebSocket broadcasting server |
| Spatie Permission | 6.24 | Role & permission management |
| Spatie Activitylog | 4.11 | User activity logging |
| Google2FA | 9.0 | Two-factor authentication |

### DevOps & Tools

| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Web server & reverse proxy |
| phpMyAdmin | Database management |
| Git | Version control |

---

## Project Structure

```
portofolio-neverland-studio/
├── src/                          # Frontend source code
│   ├── assets/                   # Images, fonts, static files
│   ├── components/               # Reusable React components (Atomic Design)
│   │   ├── atoms/                # Button, Input, TextArea, Logo
│   │   ├── molecules/            # ServiceCard, SectionTitle
│   │   └── organisms/            # Navbar, Footer, HeroSection
│   ├── config/                   # App configuration and static data
│   ├── contexts/                 # React context providers
│   ├── hooks/                    # Custom React hooks
│   ├── layouts/                  # Page layout wrappers
│   ├── pages/                    # Route-based page components (73 pages)
│   ├── services/                 # API service modules
│   ├── styles/                   # Global CSS
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   ├── App.tsx                   # Root component with routing
│   └── main.tsx                  # Application entry point
├── backend/                      # Laravel 11 backend
│   ├── app/                      # Application logic (Controllers, Models, etc.)
│   ├── bootstrap/                # Bootstrap files
│   ├── config/                   # Laravel configuration
│   ├── database/                 # Migrations, seeders, factories
│   ├── public/                   # Public assets
│   ├── resources/                # Views, raw assets
│   ├── routes/                   # API & web route definitions
│   ├── storage/                  # Logs, cache, uploaded files
│   ├── tests/                    # Unit & feature tests
│   └── vendor/                   # Composer dependencies
├── public/                       # Static front-end assets
├── docker-compose.yml            # Docker orchestration
├── Dockerfile                    # Docker image definition
├── nginx.conf                    # Nginx configuration
├── package.json                  # NPM dependencies & scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── vite.config.ts                # Vite configuration
└── tsconfig.json                 # TypeScript configuration
```

### Page Structure (`src/pages/`)

```
pages/
├── Home/                         # Landing page
├── About/                        # About us
├── Projects/                     # Project portfolio
├── Team/                         # Team members
├── Testimonials/                 # Client testimonials
├── Blog/                         # Blog articles
├── Contact/                      # Contact form
├── Help/                         # Help & FAQ
├── Settings/                     # User settings
│
├── Services/                     # Web & IT services
│   ├── Consulting/
│   ├── WebDevelopment/
│   ├── CustomWebApps/
│   ├── UIUXDesign/
│   ├── ECommerce/
│   ├── APIDevelopment/
│   └── PWA/
│
├── IT Services/
│   ├── ITInfrastructure/
│   ├── ITGovernance/
│   ├── ITStrategyPlanning/
│   ├── ManagedServices/
│   ├── ServerManagement/
│   ├── StorageSolutions/
│   └── InfrastructureAsCode/
│
├── Cloud Solutions/
│   ├── CloudSolutions/
│   ├── CloudSecurity/
│   ├── CloudSecuritySolutions/
│   └── CloudMigration/
│
├── Cyber Security/
│   ├── CyberSecurity/
│   ├── NetworkSecurity/
│   ├── NetworkInfrastructure/
│   ├── SecurityAudit/
│   ├── PenetrationTesting/
│   ├── MonitoringMaintenance/
│   └── Virtualization/
│
├── Business Solutions/
│   ├── DigitalTransformation/
│   ├── CostOptimization/
│   ├── VendorManagement/
│   └── TechnologyAssessment/
│
├── Resources/                    # Resources & downloads
├── CyberNews/                    # Cyber security news feed
│
├── Playground/                   # CTF & Security Playground Hub
│   ├── Playground/               # Playground overview
│   ├── PlaygroundWeb/            # Web challenges
│   ├── PlaygroundBinary/         # Binary exploitation
│   ├── PlaygroundCrypto/         # Cryptography challenges
│   ├── PlaygroundForensics/      # Digital forensics
│   ├── PlaygroundReverse/        # Reverse engineering
│   ├── PlaygroundOSINT/          # OSINT challenges
│   ├── PlaygroundSteganography/  # Steganography challenges
│   ├── PlaygroundMobile/         # Mobile security challenges
│   ├── PlaygroundCVE/            # CVE research & practice
│   ├── PlaygroundSQL/            # SQL injection practice
│   ├── PlaygroundSystem/         # System hacking challenges
│   ├── PlaygroundVM/             # Virtual machine environment (auth-required)
│   └── PlaygroundLearning/       # Learning Hub
│       ├── PlaygroundLearning/       # Learning hub overview
│       ├── PlaygroundLearningWriteups/   # CTF write-ups
│       ├── PlaygroundLearningTools/      # Tools & cheatsheets
│       └── PlaygroundLearningRoadmap/    # Learning roadmaps
│
└── Dashboard/                    # Admin Dashboard (auth-required)
    ├── DashboardLogin/
    ├── Dashboard/                # Overview
    ├── DashboardAnalytics/
    ├── DashboardCalendar/
    ├── DashboardClients/
    ├── DashboardInvoices/
    ├── DashboardMessages/
    ├── DashboardProjects/
    ├── DashboardReports/
    ├── DashboardResources/
    ├── DashboardServices/
    ├── DashboardSettings/
    ├── DashboardTasks/
    └── DashboardTeam/
```

---

## Prerequisites

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Ubuntu 20.04+ / Windows 10+ / macOS 11+ | Ubuntu 22.04+ |
| RAM | 4 GB | 8 GB+ |
| Disk Space | 10 GB | 20 GB+ |
| Node.js | 22.x | 24.x |
| PHP | 8.2 | 8.4+ |
| Composer | 2.x | Latest |
| Docker | 24.x | 25.x+ |
| Docker Compose | 2.x | Latest |

### Required Software

1. **Node.js & npm** — [nodejs.org](https://nodejs.org/)
2. **PHP 8.2+** — [php.net/downloads](https://www.php.net/downloads)
3. **Composer** — [getcomposer.org](https://getcomposer.org/download/)
4. **Git** — [git-scm.com](https://git-scm.com/downloads)
5. **Docker & Docker Compose** — [docker.com](https://www.docker.com/products/docker-desktop/)

---

## Installation

### Option 1: Docker (Recommended)

The easiest way to run the full stack is with Docker.

#### Step 1 — Clone the Repository

```bash
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portofolio-neverland-studio
```

#### Step 2 — Create Docker Network

```bash
docker network create app-network
```

#### Step 3 — Configure Environment

Copy the example environment file and update it:

```bash
cp .env.example .env
```

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

#### Step 4 — Start Docker Compose

```bash
docker-compose up -d --build
```

#### Step 5 — Verify Services

| Service | URL | Description |
|---------|-----|-------------|
| Frontend (Dev) | http://localhost:5173 | Vite dev server with hot reload |
| Frontend (Prod) | http://localhost:3000 | Nginx-served production build |
| Backend API | http://localhost:8001 | Laravel REST API |
| phpMyAdmin | http://localhost:8080 | Database management UI |
| MariaDB | localhost:3306 | Database |

#### Common Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Stream all logs
docker-compose logs -f

# Stream logs for a specific service
docker-compose logs -f backend

# Rebuild after code changes
docker-compose up -d --build

# Full reset (removes volumes)
docker-compose down -v
docker-compose up -d --build
```

---

### Option 2: Local Setup

Prefer running without Docker? Follow these steps:

#### Frontend

```bash
# Navigate to the project root
cd portofolio-neverland-studio

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the development server
npm run dev
```

Frontend will be available at **http://localhost:5173**

#### Backend

```bash
# Navigate to the backend directory
cd backend

# Install PHP dependencies
composer install

# Copy and configure environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Create the database
mysql -u root -p -e "CREATE DATABASE neverland_portfolio;"

# Run database migrations
php artisan migrate

# (Optional) Seed with sample data
php artisan db:seed

# Start the development server
php artisan serve --host=0.0.0.0 --port=8001
```

Backend API will be available at **http://localhost:8001**

---

## Environment Configuration

### Frontend Environment Variables

```env
VITE_API_URL=http://localhost:8001
VITE_APP_NAME=Neverland Studio
VITE_APP_URL=http://localhost:5173
VITE_API_VERSION=/api/v1
```

### Backend Environment Variables

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

CACHE_STORE=file
SESSION_DRIVER=database
QUEUE_CONNECTION=sync

# Laravel Reverb (WebSocket Broadcasting)
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=your_app_id
REVERB_APP_KEY=your_app_key
REVERB_APP_SECRET=your_app_secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http
```

### CORS Configuration

To allow requests from the frontend:

```php
// backend/config/cors.php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
'supports_credentials' => true,
```

---

## Running the Application

### Development Mode

```bash
# Terminal 1 — Backend
cd backend
php artisan serve --host=0.0.0.0 --port=8001

# Terminal 2 — Frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8001

### Production Mode (Docker)

```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8001

---

## Building for Production

### Frontend

```bash
# Type-check and build
npm run build

# Preview the production build locally
npm run preview
```

Build output will be in the `dist/` directory.

### Backend

```bash
cd backend

# Optimize Composer autoloader
composer dump-autoload -o

# Clear all caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Cache for production
php artisan optimize
```

---

## API Reference

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/user` | Get authenticated user |
| GET | `/api/services` | List all services |
| GET | `/api/projects` | List all projects |
| POST | `/api/contact` | Submit contact form |

### Example Requests

```bash
# Health check
curl http://localhost:8001/api/health

# Login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password"}'

# Get services (authenticated)
curl http://localhost:8001/api/services \
  -H "Authorization: Bearer YOUR_TOKEN"
```

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

---

## Key Features

### 1. Navigation System
- Sticky glassmorphism navbar with smooth scroll behavior
- Responsive hamburger menu for mobile
- Active route highlighting

### 2. Component Architecture
- Atomic Design pattern (atoms → molecules → organisms)
- Full TypeScript typing throughout
- Framer Motion animations for all transitions
- Full accessibility support

### 3. Forms
- Contact form with client-side and server-side validation
- Loading, success, and error states
- Character count indicators

### 4. Performance
- Per-route lazy loading with `React.lazy`
- Automatic code splitting via Vite
- Optimal bundle sizes and fast initial paint

### 5. Real-Time Dashboard
- Live analytics via Laravel Reverb + Laravel Echo
- Task, project, and client management
- Invoice tracking and report generation

### 6. Playground / CTF Hub
- 10+ CTF challenge categories
- Isolated SQL and VM practice environments
- Authentication-gated VM provisioning
- Learning Hub with write-ups, tools, and roadmaps

---

## Customization

### Changing the Color Palette

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

### Updating Company Content

Edit files in `src/config/`:
- `constants.ts` — Company name, contact info, social links
- `services.ts` — Service offerings
- `projects.ts` — Project case studies

### Changing Fonts

Modify the Google Fonts import in `src/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap');
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find which process is using the port
lsof -i :5173
lsof -i :8001

# Kill the process
kill -9 <PID>
```

### Node Modules Error

```bash
# Clean reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Composer Error

```bash
# Clear cache and reinstall
composer clear-cache
composer install --no-interaction
```

### Database Connection Error

```bash
# Clear Laravel config cache
php artisan config:clear

# Test the connection
php artisan tinker
>>> DB::connection()->getPdo();
```

### Docker Issues

```bash
# Full rebuild (removes all containers, volumes, and images)
docker-compose down -v --rmi all
docker-compose build --no-cache
docker-compose up -d
```

### Viewing Logs

```bash
# Laravel application logs
tail -f backend/storage/logs/laravel.log

# Docker container logs
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Roadmap

Planned development for 2026 and beyond:

- [ ] **AI-Powered Security Analysis** — AI-driven threat detection and analysis
- [ ] **Blockchain Certificate Verification** — Tamper-proof certification system
- [ ] **Mobile App** — Native iOS and Android companion app
- [ ] **Enhanced Dashboard Analytics** — Predictive modelling and deeper insights
- [ ] **Global CDN Expansion** — Edge infrastructure for better global performance
- [ ] **Dark / Light Mode Toggle** — User-selectable theme preference
- [ ] **Multi-Language Support** — Full i18n support (EN / ID)
- [ ] **Blog Categories & Tags** — Improved content discoverability
- [ ] **Newsletter Subscription** — Email marketing integration
- [ ] **PWA Support** — Offline-capable Progressive Web App

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for full details.

---

## Contact

- **Email** — Arlianto032@gmail.com
- **Website** — [portfolio.neverlandstudio.my.id](https://portfolio.neverlandstudio.my.id)
- **GitHub** — [@MuhammadIsakiPrananda](https://github.com/MuhammadIsakiPrananda)

---

<div align="center">

**Made with ❤️ by Neverland Studio**

*Securing the Digital Future*

Copyright © 2026 Neverland Studio. All rights reserved.

</div>
