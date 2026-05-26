
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

## Recent Improvements (May 2026)

### ✅ Accessibility & UX Fixes
- **Route Matching Fixed**: Exact path matching prevents false highlights (`/community` no longer highlights for `/community-guidelines`)
- **Keyboard Navigation**: Added `:focus-visible` states to all buttons and nav links
- **Mobile Menu Semantics**: Dialog role, aria-modal, proper screen reader support
- **WCAG Text Readability**: Fixed micro-text (0.65rem → 12px minimum, follows WCAG AA standards)
- **Form Buttons**: CTA buttons now keyboard accessible with visible focus indicators

### ✅ Type Safety & Architecture
- **TypeScript Strict Mode**: Full type checking enabled via `tsconfig.json`
- **useScrollReveal Hook**: Eliminated type casting hacks with proper `RefObject<T>` return type
- **Path Aliases**: Configured for cleaner imports (`@components/*`, `@pages/*`, `@hooks/*`)

### ✅ Design System
- **Tailwind Config**: Centralized design tokens (colors, spacing, typography, animations)
- **Semantic Palette**: Primary (orange), secondary (pink), accent (blue), dark theme
- **Animation Definitions**: pulse-glow, float, gradient-shift for consistent motion

### ✅ Configuration & Security
- **Environment Variables**: `.env.example` template for API configuration
- **Git Security**: `.gitignore` prevents secrets/build artifacts from repo
- **Build System**: Fixed JSX parsing (routes.ts → routes.tsx)

## Pages & Features

| Page | Status | Description |
|------|--------|-------------|
| **Landing** | ✅ Working | Hero with starfield canvas, mission briefing, telemetry counters |
| **Blog** | 🚧 Structure ready | Blog post listing (needs API integration) |
| **Media** | 🚧 Structure ready | Media gallery (needs asset optimization) |
| **Community** | 🚧 Structure ready | Community discussion board (needs backend) |
| **Admin** | 🚧 Structure ready | Admin dashboard (needs authorization) |
| **Login** | 🚧 Form ready | Authentication (needs validation UI) |
| **Register** | 🚧 Form ready | User registration (needs validation UI) |

## Technology Stack

### Frontend
- **React 18** - UI library
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety (strict mode)
- **Vite** - Fast build tool
- **Lucide React** - Icon library

### UI Components
- **shadcn/ui** - Accessible component primitives
- **React Hook Form** - Form management
- **Recharts** - Data visualization (ready, not integrated)
- **Embla Carousel** - Carousel component (ready, not integrated)
- **Sonner** - Toast notifications (ready, not integrated)

### Performance & Analytics
- **Framer Motion** - Smooth animations
- **React Intersection Observer** - Lazy loading
- **Canvas-Confetti** - Celebration effects (ready, not integrated)

## Critical Next Steps (Before Production)

See **[REMEDIATION_ROADMAP.md](./REMEDIATION_ROADMAP.md)** for a comprehensive 4-week production readiness plan.

### Tier 1: Must Fix This Week
- [ ] Error Boundaries (prevent white-screen crashes)
- [ ] Form Validation UI (Login/Register error feedback)
- [ ] API Error Handling (graceful failure states)
- [ ] Backend API Design (endpoint documentation)

### Tier 2: Critical UX
- [ ] Image Optimization (lazy loading, srcSet, WebP)
- [ ] Auth Token Security (httpOnly cookies, not localStorage)
- [ ] SEO Meta Tags (social preview, structured data)
- [ ] Empty States (no data = user-friendly fallback)

### Tier 3: Performance
- [ ] Bundle Analysis (target main.js < 300KB)
- [ ] Code Splitting (lazy-load pages)
- [ ] Remove Unused Dependencies (clean up node_modules)
- [ ] GPU Animations (transform/opacity only)

### Tier 4: Accessibility (WCAG AA)
- [ ] Color Contrast Audit (4.5:1 minimum)
- [ ] ARIA Labels (icons, live regions)
- [ ] Keyboard Tab Order (logical flow)
- [ ] Screen Reader Testing

### Tier 5: Operations
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Error Tracking (Sentry)
- [ ] Performance Monitoring (Web Vitals)
- [ ] Automated Testing (unit, e2e)

## Environment Configuration

Create a `.env.local` file (copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
VITE_ENABLE_ADMIN_PANEL=false
VITE_ENABLE_COMMUNITY_FEATURES=true
```

## Git Workflow

All changes are committed file-wise with descriptive messages:

```bash
# View commit history
git log --oneline

# Key commits:
# 709de64 chore: TypeScript strict mode + .gitignore
# 946f7b5 chore: Tailwind design tokens
# 1f2861b refactor: JSX file naming (routes.tsx)
# 81bb529 fix: Navbar accessibility & route matching
# 5c095ff fix: LandingPage accessibility & readability  
# 1cd49cc fix: useScrollReveal type safety
# 8de21b9 docs: Remediation roadmap
```

## Known Issues & Limitations

- **Not Production-Ready**: Missing error handling, validation UI, API integration
- **Admin Dashboard**: Structure exists but authorization not implemented
- **Real-Time Features**: ETS Workspace requires WebSocket setup (not implemented)
- **Dark Mode**: Theme CSS exists but switcher not integrated
- **Analytics**: No error tracking or performance monitoring

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes with TypeScript strict mode
3. Test accessibility: Tab navigation, screen reader, color contrast
4. Commit with clear messages: `git commit -m "fix: describe change"`
5. Follow the remediation roadmap for new features

## Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Accessibility**: WCAG 2.1 AA minimum, keyboard navigation required
- **Testing**: All interactive components need tests (to be added)
- **Performance**: No bundle bloat, lazy-load by default
- **Commits**: Clear, file-wise commits with detailed descriptions

## Deployment

See [REMEDIATION_ROADMAP.md](./REMEDIATION_ROADMAP.md#tier-5-operations--deployment) for production deployment checklist.

## License

See [LICENSE.md](./ATTRIBUTIONS.md) for details.

## Resources

- **Design System**: https://www.figma.com/design/4xy1nuo8yjTpOXO5SQdC5d/Design-System-Creation
- **Component Library**: shadcn/ui (https://ui.shadcn.com)
- **TypeScript Docs**: https://www.typescriptlang.org
- **Tailwind Docs**: https://tailwindcss.com
- **React Router Docs**: https://reactrouter.com
- **WCAG Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Last Updated**: May 26, 2026 | **Status**: Foundation-level (pre-MVP) | **Target**: Production-ready by June 30, 2026

  