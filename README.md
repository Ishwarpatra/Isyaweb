
  # ISYA Web Portal - Space Science Community Platform

A modern, accessible web platform for the International Space Youth Alliance (ISYA), enabling young scientists, engineers, and dreamers to collaborate on space exploration research and education.

**Live Design System**: https://www.figma.com/design/4xy1nuo8yjTpOXO5SQdC5d/Design-System-Creation

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm 8+ (or npm/yarn)

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:5173)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Monorepo Strategy & Workspace Design

The `pnpm-workspace.yaml` is initialized at the root of the repository as part of the architecture roadmap. While the application currently operates as a single root package (`.`), it is designed to scale into a multi-package monorepo:
1. **Shared Design System**: Future separation of Tailwind design tokens and UI components into a `@isya/design-system` package.
2. **Shared Telemetry Types**: Extraction of WebSocket and Recharts signal models into `@isya/telemetry-types` for synchronization with backend nodes.
3. **Command Line Utilities**: Extraction of administrative scripts into `@isya/cli-terminal`.

---

## Project Structure

```
Isyaweb/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── layout/       # Nav, Footer, Root layout
│   │   │   ├── ui/           # shadcn/ui component library
│   │   │   └── figma/        # Figma-integrated components
│   │   ├── pages/            # Route pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── routes.tsx        # Route definitions
│   │   └── App.tsx           # Root component
│   ├── imports/              # Design tokens, guides
│   └── styles/               # Global CSS, Tailwind, theme
├── tailwind.config.ts        # Tailwind design tokens
├── tsconfig.json             # TypeScript strict mode config
├── vite.config.ts            # Vite build config
├── .env.example              # Environment variables template
├── REMEDIATION_ROADMAP.md    # Production readiness guide
└── .gitignore                # Git exclusion rules
```

## Recent Improvements (June 2026)

### ✅ Production Backend & Database Persistence (Phase 0 & 1)
- **Real Database Integration**: Replaced client mock utilities with a PostgreSQL database schema mapping users, blog posts, and comments with index query optimizations.
- **Secure Authentication Handshake**: Configured session management utilizing JWT signatures returned in the headers and injected as `httpOnly` secure cookies with `SameSite=Strict` flags.
- **REST Telemetry API**: Developed routes supporting relational SQL data fetching, server-side keyword searches, paginations, and secure comment inserts.
- **Interactive OpenAPI Specification**: Configured live API documentation using Swagger UI hosted locally at `/api-docs`.

### ✅ Automated Testing & Quality Gates (Phase 2)
- **Vitest Test Suite**: Configured Vitest + React Testing Library and JSDOM environments for high-fidelity hook and page testing.
- **Unit & Integration Tests**: Wrote tests covering `useAuth.tsx` (session verification on mount, correct logins), `useApi.ts` (network query retries on server errors, abort locks, direct returns on client 4xx errors), and `BlogPage.test.tsx` (loaders, records grids, and empty states).
- **Global Mocking Setup**: Mocked browser API structures like `IntersectionObserver` to allow React scroll-reveal hooks to execute cleanly in test runners.

### ✅ Frontend Performance & Asset Optimizations (Phase 2)
- **Asset Code Splitting**: Managed bundle configurations in `vite.config.ts` to separate dependencies (`vendor-react`, `vendor-charts`, `vendor-ui`, and `vendor-date` for date-fns) keeping core scripts under a strict 100KB budget.
- **Optimized Hero & Card Media**: Set up width constraints (`fallbackWidth={600/1200}`) and lazy-loading for Unsplash images, improving Core Web Vitals (Largest Contentful Paint).

### ✅ Accessibility & UX Compliance
- **Route Matching Fixed**: Exact path matching prevents false highlights (`/community` no longer highlights for `/community-guidelines`).
- **Keyboard Navigation**: Added `:focus-visible` states to all buttons and nav links.
- **Mobile Menu Semantics**: Dialog role, aria-modal, and proper screen reader support.
- **WCAG Text Readability**: Fixed micro-text (0.65rem → 12px minimum, follows WCAG AA standards).
- **Form Buttons**: CTA buttons now keyboard accessible with visible focus indicators.

---

## Technology Stack

### Frontend
- **React 18** - UI library
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety (strict mode)
- **Vite** - Fast build tool
- **Vitest & RTL** - Testing environment
- **Lucide React** - Icon library

### Backend & Database
- **Node.js & Express** - Application layer
- **PostgreSQL 15** - Persistent storage
- **Docker Compose** - Local database containerization
- **jsonwebtoken & bcryptjs** - Session encryption & password hashing
- **helmet** - Strict HTTP headers (CSP configuration)
- **express-rate-limit** - DDoS & brute force protection

---

## Environment Configuration

Create a `.env.local` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

Create a `.env` file in the `isyaweb-backend` root:

```env
PORT=3000
DATABASE_URL=postgresql://isya_user:isya_password@localhost:5432/isya_portal
JWT_SECRET=your-secure-secret-here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## Git Workflow & Commits

All changes are committed file-wise with descriptive messages:

```bash
# View commit history
git log --oneline
```

---

## Known Issues & Limitations

- **Real-Time Features**: ETS Workspace requires WebSocket setup (not implemented).
- **Dark Mode**: Theme CSS exists but switcher not integrated.
- **Sentry Integration**: Missing error tracking and live APM monitoring.

---

## Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types.
- **Accessibility**: WCAG 2.1 AA minimum, keyboard navigation required.
- **Testing**: All core custom hooks and list pages are verified through Vitest suites.
- **Performance**: Dynamic chunking enabled, bundles are optimized, and assets lazy-loaded.

---

## License

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for details.

---

**Last Updated**: June 2, 2026 | **Status**: Phase 1 & 2 Complete (Production-Ready) | **Target**: Staging Deployment and CI checks.

  