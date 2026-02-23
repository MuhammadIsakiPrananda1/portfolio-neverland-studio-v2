# Contributing to Neverland Studio

Thank you for considering contributing to the Neverland Studio portfolio project! We welcome contributions from developers of all skill levels.

## Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

---

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please search existing issues to avoid duplicates.

When creating a bug report, include:

| Field | Description |
|-------|-------------|
| **Title** | A clear, concise summary of the bug |
| **Description** | A detailed explanation of the issue |
| **Steps to Reproduce** | Exact steps to reproduce the behavior |
| **Expected Behavior** | What you expected to happen |
| **Actual Behavior** | What actually happened |
| **Environment** | OS, browser, Node.js version, PHP version |
| **Screenshots** | If applicable, add screenshots |

### Requesting Features

1. Check existing issues to see if the feature has already been requested
2. Open a new issue with the label `feature-request` and include:
   - **Title** — Feature name
   - **Description** — Detailed explanation of the feature
   - **Use Case** — Why this feature would be valuable
   - **Alternatives** — Any alternative solutions you considered

### Submitting Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/YourAmazingFeature
   # or for bug fixes:
   git checkout -b fix/YourBugFix
   ```
3. **Make your changes** following the code standards below
4. **Commit** with a descriptive message:
   ```bash
   git commit -m 'Add: YourAmazingFeature'
   # Prefixes: Add, Fix, Update, Remove, Refactor, Docs, Style, Test
   ```
5. **Push** to your branch:
   ```bash
   git push origin feature/YourAmazingFeature
   ```
6. **Open a Pull Request** against the `main` branch

---

## Code Standards

### Frontend (React / TypeScript)

```typescript
// Use functional components with typed props
interface Props {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  return (
    <div onClick={onClick}>
      {title}
    </div>
  );
};

export default MyComponent;
```

**Rules:**
- Always use TypeScript with strict mode enabled
- Use `React.FC<Props>` interface for typed components
- Follow the Atomic Design pattern: atoms → molecules → organisms → pages
- Use Tailwind CSS utility classes for styling
- Add Framer Motion animations for interactive elements
- Always handle loading, success, and error states in async UI

### Backend (Laravel)

```php
// Use controllers for business logic
public function index(Request $request): JsonResponse
{
    return response()->json([
        'data' => Service::paginate(15),
    ]);
}

// Validate using Form Requests
public function store(StoreProjectRequest $request): JsonResponse
{
    $project = Project::create($request->validated());
    return response()->json($project, 201);
}
```

**Rules:**
- Follow PSR-12 coding standards
- Use Form Requests for validation — never validate in controllers
- Use Eloquent resources (`JsonResource`) to transform API responses
- Write PHPDoc blocks for all public methods
- Add middleware for authentication and authorization checks

---

## Development Setup

See [INSTALL.md](INSTALL.md) for full setup instructions.

**Quick start:**

```bash
# Clone and install
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portofolio-neverland-studio
npm install
cd backend && composer install

# Environment
cp .env.example .env
cd backend && cp .env.example .env && php artisan key:generate

# Start development
npm run dev        # Frontend
php artisan serve  # Backend
```

---

## Review Process

1. A maintainer will review your PR within **1–3 business days**
2. You may be asked to make changes — please respond to feedback promptly
3. Once approved, your PR will be merged into `main`

---

## Priority Areas

We especially welcome contributions in:

- 🐛 **Bug fixes** — Any reported and confirmed bugs
- ⚡ **Performance** — Bundle size, query optimization, caching
- 🔒 **Security** — Vulnerability fixes, hardening
- 📖 **Documentation** — Improving guides and code comments
- ✅ **Tests** — Unit and feature test coverage for backend
- 🎨 **UI Polish** — Animation, accessibility, responsive improvements

---

## Questions?

Open a GitHub Discussion or email us at **Arlianto032@gmail.com**.
