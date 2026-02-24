<div align="center">

# 🛠️ Support

**Don't hesitate to reach out if you need assistance with Neverland Studio.**

</div>

---

## 📞 Getting Support

### 📧 Email
- **Address**: Arlianto032@gmail.com
- **Response time**: 24–48 business hours

### 🐛 GitHub Issues
- Open a new issue at [GitHub Repository](https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2/issues)
- Use the appropriate issue template (Bug Report / Feature Request)

### 📖 Documentation
- [README.md](README.md) — Project overview and setup guide
- [INSTALL.md](INSTALL.md) — Detailed installation guide
- [CONTRIBUTING.md](CONTRIBUTING.md) — How to contribute
- [SECURITY.md](SECURITY.md) — Security policy and reporting

---

## 🤔 Frequently Asked Questions (FAQ)

<details>
<summary><b>How do I run this project?</b></summary>

See [INSTALL.md](INSTALL.md) for the full installation guide. For a quick start:
```bash
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portofolio-neverland-studio
cp .env.example .env
docker-compose up -d --build
```
Then visit **http://localhost:5173** (dev) or **http://localhost:3000** (production).
</details>

<details>
<summary><b>What are the system requirements?</b></summary>

| Component | Minimum |
|-----------|---------|
| **Node.js** | 22.x |
| **PHP** | 8.2+ |
| **Composer** | 2.x |
| **MySQL / MariaDB** | 8.4 |
| **Docker (optional)** | 24.x+ |
</details>

<details>
<summary><b>How do I report a bug?</b></summary>

1. Check existing [GitHub Issues](https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2/issues) first
2. Create a new issue including:
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots or screen recordings (if applicable)
   - Your environment (OS, Node.js version, browser)
</details>

<details>
<summary><b>How do I report a security vulnerability?</b></summary>

**Do not open a public issue.** Email us directly at **Arlianto032@gmail.com**. See [SECURITY.md](SECURITY.md) for our full security policy.
</details>

<details>
<summary><b>Is this project free to use?</b></summary>

Yes. Neverland Studio is open source and released under the [MIT License](LICENSE).
</details>

<details>
<summary><b>How can I contribute?</b></summary>

Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, code standards, and the PR process.
</details>

<details>
<summary><b>The dashboard is not showing real-time data. What's wrong?</b></summary>

Make sure Laravel Reverb is running and properly configured. Check your `.env` for:
```env
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=your_app_id
REVERB_APP_KEY=your_app_key
REVERB_APP_SECRET=your_app_secret
REVERB_HOST=localhost
REVERB_PORT=8080
```
Then start the Reverb server:
```bash
php artisan reverb:start
```
</details>

<details>
<summary><b>The VM Playground says I need to log in. Is that normal?</b></summary>

Yes. The Virtual Machine Playground requires authentication to prevent abuse. Log in to your account first, then you can start a VM session.
</details>

---

## 🔗 Useful Resources

| Resource | Link |
|----------|------|
| **Live Website** | [portfolio.neverlandstudio.my.id](https://portfolio.neverlandstudio.my.id) |
| **GitHub** | [@MuhammadIsakiPrananda](https://github.com/MuhammadIsakiPrananda) |
| **React Docs** | [react.dev](https://react.dev) |
| **Laravel Docs** | [laravel.com/docs](https://laravel.com/docs) |
| **TypeScript Docs** | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| **Tailwind CSS Docs** | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| **Framer Motion Docs** | [framer.com/motion](https://www.framer.com/motion/) |

<div align="center">
<br/>
<b>Thank you for using Neverland Studio! ✨</b>
</div>
