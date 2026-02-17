# Keamanan

## Melaporkan Kerentanan

Jika Anda menemukan kerentanan keamanan, please email kami di **Arlianto032@gmail.com** segera.

Kami sangat menghargai upaya pelaporan kerentanan secara bertanggung jawab dan akan memberikan pengakuan publik jika diinginkan.

## Kebijakan Keamanan

### Scope

Kerentanan berikut termasuk dalam scope:
- Authentication bypass
- Authorization bypass
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- File inclusion vulnerabilities
- Remote Code Execution
- Information Disclosure
- Denial of Service

### Yang Tidak Included

Yang berikut tidak termasuk dalam scope:
- Serangan social engineering
- Serangan fisik
- Penolakan dari pihak ketiga
- Bug yang sudah diketahui

## Timeline Respons

| Tahap | Waktu |
|-------|-------|
| Initial Response | 24-48 jam |
| Severity Assessment | 3-5 hari |
| Fix Verification | 1-2 minggu |
| Public Disclosure | Setelah fix tersedia |

## Versi yang Didukung

| Versi | Didukung |
|--------|----------|
| 1.0.x | ✅ Ya |

## Best Practices

### Untuk Developer

1. **Validasi Input**
   - Validasi semua input di server side
   - Gunakan prepared statements untuk query database

2. **Authentication**
   - Gunakan password hashing yang kuat (bcrypt/argon2)
   - Implementasikan rate limiting
   - Enable 2FA untuk akun admin

3. **Authorization**
   - Gunakan RBAC untuk manajemen izin
   - Validasi permission di setiap endpoint

4. **Data Protection**
   - Encrypt data sensitif
   - Use HTTPS everywhere
   - Protect sensitive data in logs

### Untuk User

1. Gunakan password yang kuat dan unik
2. Enable two-factor authentication
3. Jangan klik link mencurigakan
4. Update password secara berkala

---

Terima kasih telah membantu menjaga keamanan Neverland Studio!
