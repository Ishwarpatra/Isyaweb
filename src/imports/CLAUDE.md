# ISYA Web Portal Design System Rules (CLAUDE.md)

**Project:** International Space Youth Association (ISYA) Web Portal  
**Document Version:** 1.0  
**Last Updated:** May 17, 2026  
**Purpose:** Comprehensive design system specification for frontend development and Figma MCP integration

---

## Table of Contents

1. [Design Token Definitions](#1-design-token-definitions)
2. [Component Library Architecture](#2-component-library-architecture)
3. [Frameworks & Tech Stack](#3-frameworks--tech-stack)
4. [Asset Management & CDN](#4-asset-management--cdn)
5. [Icon System](#5-icon-system)
6. [Styling Approach](#6-styling-approach)
7. [Project Structure](#7-project-structure)
8. [Figma MCP Integration Guide](#8-figma-mcp-integration-guide)

---

## 1. Design Token Definitions

### 1.1 Color Tokens

**Token Format:** CSS Custom Properties (recommended) or Design Token JSON (Design Tokens Format)

**Visual Reference:** Colors extracted directly from the ISYA logo featuring the rocket graphic with cosmic background, network nodes, and vibrant gradient trail.

```css
/* Global Color Tokens - Extracted from ISYA Logo */
:root {
  /* Primary Background (Deep Navy/Space Black - ISYA logo background) */
  --color-bg-primary: #000B1A;
  --color-bg-primary-alt: #0B0F19;
  
  /* Surface/Card Background (Darker navy for elevation) */
  --color-bg-surface: #0F1629;
  --color-bg-surface-alt: #111827;
  
  /* Accent Gradient Stops (The "Rocket Trail" - Logo inspired) */
  --color-accent-orange: #FFA500;      /* Warm golden-orange (rocket flame) */
  --color-accent-orange-bright: #FFB533; /* Brighter orange accent */
  --color-accent-yellow: #FFD700;      /* Golden yellow (star/sun highlights) */
  --color-accent-pink: #EC4899;        /* Vibrant magenta-pink (gradient trail) */
  --color-accent-pink-bright: #FF1493; /* Deep pink accent */
  --color-accent-blue: #4A90E2;        /* Sky blue (network nodes) */
  --color-accent-blue-bright: #5BA3F5; /* Brighter stellar blue */
  --color-accent-cyan: #00D9FF;        /* Cyan/light blue (accent highlights) */
  
  /* Typography Colors */
  --color-text-primary: #FFFFFF;       /* Pure white (ISYA text in logo) */
  --color-text-secondary: #B0B8C1;     /* Soft gray-blue (secondary text) */
  --color-text-tertiary: #7A8894;      /* Muted gray (captions, metadata) */
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: --color-accent-blue;
  
  /* Border & Divider (Subtle on dark background) */
  --color-border: rgba(74, 144, 226, 0.2);      /* Blue-tinted border */
  --color-divider: rgba(255, 255, 255, 0.08);   /* Subtle white divider */
  --color-border-subtle: rgba(255, 255, 255, 0.05);
  
  /* Network/Node Colors (for accent patterns) */
  --color-node-primary: #4A90E2;       /* Blue node */
  --color-node-secondary: #FFB533;     /* Orange node */
  --color-node-accent: #EC4899;        /* Pink node */
}
```

**Color Application Rules:**

| Token | Usage | Hex Value | Purpose |
|-------|-------|-----------|---------|
| `--color-bg-primary` | Page backgrounds, full-viewport elements | `#000B1A` | Deep space backdrop |
| `--color-bg-surface` | Cards, modals, elevated containers | `#0F1629` | Subtle elevation |
| `--color-accent-orange` | Primary CTAs, rocket/launch highlights | `#FFA500` | Warm energy, action |
| `--color-accent-yellow` | Star accents, success indicators | `#FFD700` | Optimism, discovery |
| `--color-accent-pink` | Gradient trails, secondary CTAs | `#EC4899` | Vibrant, dynamic |
| `--color-accent-blue` | Links, network nodes, tertiary CTAs | `#4A90E2` | Trust, exploration |
| `--color-accent-cyan` | Highlights, interactive accents | `#00D9FF` | Futuristic, energy |
| `--color-text-primary` | Headings, body text, high contrast | `#FFFFFF` | Maximum readability |
| `--color-text-secondary` | Subtext, secondary information | `#B0B8C1` | Readable, not dominant |

**Gradient Combinations (Rocket Trail Effects):**

```css
/* Orange → Pink (Primary gradient - rocket flame) */
background: linear-gradient(135deg, #FFA500, #EC4899);

/* Orange → Yellow → Pink (Extended trail) */
background: linear-gradient(90deg, #FFA500, #FFD700, #EC4899);

/* Blue → Cyan (Network/tech accent) */
background: linear-gradient(135deg, #4A90E2, #00D9FF);

/* Multi-color cosmic gradient (Hero sections) */
background: linear-gradient(135deg, #000B1A 0%, #0F1629 50%, #1a2a4a 100%);
```

### 1.2 Typography Tokens

```css
:root {
  /* Font Family Stack */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-mono: 'Courier New', monospace;
  
  /* Font Scales */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.05em;
}
```

**Typography Usage:**

| Element | Font Size | Font Weight | Line Height |
|---------|-----------|-------------|------------|
| H1 (Hero Title) | `--font-size-5xl` | `--font-weight-bold` | `--line-height-tight` |
| H2 (Section Title) | `--font-size-4xl` | `--font-weight-bold` | `--line-height-tight` |
| H3 (Subsection) | `--font-size-3xl` | `--font-weight-semibold` | `--line-height-tight` |
| Body Text | `--font-size-base` | `--font-weight-normal` | `--line-height-normal` |
| Small Text/Caption | `--font-size-sm` | `--font-weight-normal` | `--line-height-normal` |
| Button Label | `--font-size-sm` | `--font-weight-semibold` | `--line-height-normal` |

### 1.3 Spacing Tokens

```css
:root {
  /* Spacing Scale (4px base unit) */
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
}
```

**Spacing Rules:**

- **Padding (Internal Spacing):** Containers use `--spacing-4` to `--spacing-8`
- **Margin (External Spacing):** Sections use `--spacing-12` to `--spacing-24`
- **Gap (Grid/Flex):** Grid columns use `--spacing-4` to `--spacing-6`

### 1.4 Border & Radius Tokens

```css
:root {
  /* Border Radius (Soft, rounded corners as per brand) */
  --radius-sm: 8px;
  --radius-base: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
  
  /* Border Width */
  --border-width-thin: 1px;
  --border-width-base: 2px;
  --border-width-thick: 3px;
}
```

**Application Rules:**

- Cards and containers: `--radius-base` (12px) or `--radius-lg` (16px)
- Buttons and input fields: `--radius-base` (12px)
- Badges and pills: `--radius-full` (9999px)

### 1.5 Shadow & Elevation Tokens

```css
:root {
  /* Subtle, glowing shadows using accent colors */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-base: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 15px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.3);
  
  /* Glow Effects (Accent color based) */
  --glow-orange: 0 0 20px rgba(249, 115, 22, 0.3);     /* Cosmic Orange */
  --glow-pink: 0 0 20px rgba(236, 72, 153, 0.3);       /* Nebula Pink */
  --glow-blue: 0 0 20px rgba(59, 130, 246, 0.3);       /* Stellar Blue */
  --glow-subtle: 0 0 10px rgba(249, 115, 22, 0.15);    /* Subtle glow */
}
```

**Elevation Usage:**

| Component | Shadow | Glow |
|-----------|--------|------|
| Card (resting) | `--shadow-base` | None |
| Card (hover) | `--shadow-md` | `--glow-subtle` |
| CTA Button (resting) | None | `--glow-subtle` (pink) |
| CTA Button (hover) | `--shadow-md` | `--glow-pink` |
| Modal/Overlay | `--shadow-lg` | None |

### 1.6 Transition & Animation Tokens

```css
:root {
  /* Duration Tokens */
  --transition-duration-fast: 150ms;
  --transition-duration-base: 300ms;
  --transition-duration-slow: 500ms;
  
  /* Easing Functions */
  --transition-easing-ease-in-out: ease-in-out;
  --transition-easing-ease-out: ease-out;
  --transition-easing-ease-in: ease-in;
  
  /* Composite Transition */
  --transition-base: all var(--transition-duration-base) var(--transition-easing-ease-in-out);
}
```

**Animation Rules:**

- **Hover States:** Use `--transition-base` (300ms ease-in-out) for all interactive elements
- **Page Transitions:** Use `--transition-duration-slow` (500ms) for route changes
- **Micro-interactions:** Use `--transition-duration-fast` (150ms) for small state changes

---

## 2. Component Library Architecture

### 2.1 Core Component Inventory

All components should be built with semantic HTML, accessibility (a11y), and responsive design in mind.

#### **2.1.1 Buttons**

```jsx
/* Button Component Pattern */
<button 
  className="btn btn--primary"
  aria-label="Action description"
>
  Join the Community
</button>

/* Variants:
   - Primary (Cosmic Orange accent)
   - Secondary (Nebula Pink accent)
   - Tertiary (Stellar Blue accent)
   - Ghost (transparent with border)
   - Disabled (opacity-reduced, cursor-not-allowed)
*/
```

**Button Styling Rules:**

- **Padding:** `--spacing-4` (vert) × `--spacing-6` (horiz)
- **Border Radius:** `--radius-base` (12px)
- **Font Weight:** `--font-weight-semibold` (600)
- **Transitions:** `--transition-base`
- **Hover Glow:** Primary button → `--glow-pink`

#### **2.1.2 Cards**

```jsx
<article className="card">
  <img src="cover.jpg" alt="Article cover" className="card__image" />
  <div className="card__content">
    <span className="card__tag">Mission Update</span>
    <h3 className="card__title">Article Title</h3>
    <div className="card__meta">
      <time>May 17, 2026</time>
      <span>Author Name</span>
    </div>
  </div>
</article>

/* Styling:
   - Background: --color-bg-surface
   - Padding: --spacing-6
   - Border Radius: --radius-lg (16px)
   - Shadow: --shadow-base
   - Hover Shadow: --shadow-md + --glow-subtle
*/
```

**Card Content Rules:**

- **Image Ratio:** 16:9 (landscape)
- **Image Hover Effect:** Scale 1.05 + brightness increase
- **Title Lines:** Max 2-3 lines (text-overflow: ellipsis)

#### **2.1.3 Forms & Input Fields**

```jsx
<form className="form">
  <div className="form-group">
    <label htmlFor="name" className="form__label">Full Name</label>
    <input 
      id="name" 
      type="text" 
      className="form__input"
      placeholder="Enter your full name"
      required
    />
  </div>
  
  <div className="form-group">
    <label htmlFor="interest" className="form__label">Area of Interest</label>
    <select id="interest" className="form__select">
      <option>Select an option...</option>
      <option>Astrophysics</option>
      <option>Engineering</option>
      <option>Data Science</option>
    </select>
  </div>
  
  <div className="form-group form-group--checkbox">
    <input type="checkbox" id="terms" className="form__checkbox" />
    <label htmlFor="terms">I agree to the Terms of Service</label>
  </div>
</form>

/* Styling:
   - Input Background: --color-bg-surface
   - Input Border: 1px solid --color-border
   - Border Radius: --radius-base (12px)
   - Focus State: Border --color-accent-blue + --glow-blue
   - Padding: --spacing-3 (vert) × --spacing-4 (horiz)
*/
```

**Form Rules:**

- **Label Font Weight:** `--font-weight-medium` (500)
- **Label Color:** `--color-text-primary`
- **Input Transition:** `--transition-duration-fast`
- **Validation States:** Success (green), Error (red), Warning (orange)

#### **2.1.4 Modals & Overlays**

```jsx
<div className="modal" role="dialog" aria-labelledby="modal-title">
  <div className="modal__overlay"></div>
  <div className="modal__content">
    <button className="modal__close" aria-label="Close modal">&times;</button>
    <h2 id="modal-title">Modal Title</h2>
    {/* Modal body content */}
  </div>
</div>

/* Styling:
   - Overlay Background: rgba(0, 0, 0, 0.7)
   - Content Background: --color-bg-surface
   - Shadow: --shadow-lg
   - Animation: Fade + slight zoom (300ms ease-out)
*/
```

#### **2.1.5 Navigation & Sidebar**

```jsx
/* Admin Sidebar Navigation */
<nav className="sidebar" aria-label="Main navigation">
  <ul className="sidebar__nav">
    <li>
      <a href="/admin/dashboard" className="sidebar__link sidebar__link--active">
        Dashboard
      </a>
    </li>
    <li>
      <a href="/admin/users" className="sidebar__link">
        User Directory
      </a>
    </li>
    <li>
      <a href="/admin/content" className="sidebar__link">
        Content Manager
      </a>
    </li>
  </ul>
</nav>

/* Styling:
   - Background: --color-bg-primary
   - Link Hover: Background --color-bg-surface + Border-left --color-accent-orange
   - Width: 250px (desktop), collapsed on mobile
   - Fixed positioning or sticky scroll
*/
```

#### **2.1.6 Media Player Components**

```jsx
/* Audio Player (Podcast) */
<div className="audio-player">
  <button className="audio-player__play" aria-label="Play">▶</button>
  <input 
    type="range" 
    className="audio-player__progress"
    aria-label="Playback progress"
  />
  <span className="audio-player__time">3:45 / 45:00</span>
</div>

/* Video Thumbnail with Play Overlay */
<div className="video-card">
  <img src="thumbnail.jpg" alt="Video title" className="video-card__image" />
  <button className="video-card__play" aria-label="Play video">▶</button>
</div>

/* YouTube Lightbox Modal */
<div className="lightbox">
  <iframe 
    className="lightbox__iframe"
    src="https://www.youtube.com/embed/{VIDEO_ID}"
    frameborder="0"
    allowFullScreen
  ></iframe>
</div>
```

**Media Rules:**

- **Play Button:** Centered, circular, `--color-accent-orange` background
- **Play Button Opacity:** 0 (resting) → 1 (hover) with `--transition-fast`
- **Video Grid:** 3 columns (desktop), 2 (tablet), 1 (mobile)
- **Podcast List:** Single column with alternating row backgrounds

#### **2.1.7 Hero Section**

```jsx
<section className="hero">
  <div className="hero__background">
    {/* Cosmic background image or gradient */}
  </div>
  <div className="hero__content">
    <img src="isya-logo.svg" alt="ISYA" className="hero__logo" />
    <h1 className="hero__title">
      Join the <span className="gradient-text">Community</span>
    </h1>
    <p className="hero__subtitle">Connecting youth to space exploration</p>
    <div className="hero__actions">
      <button className="btn btn--primary">Join the Community</button>
      <button className="btn btn--secondary">Explore Initiatives</button>
    </div>
  </div>
</section>

/* Styling:
   - Background: Dark cosmic image or --color-bg-primary with subtle gradient
   - Gradient Text: Linear gradient from --color-accent-orange → --color-accent-pink
   - Content Alignment: Center, max-width 800px
   - Title Font Size: --font-size-5xl
   - Subtitle Font Size: --font-size-xl
   - Padding: --spacing-20 (vertical)
*/
```

#### **2.1.8 Grid Components (3-Column Pillar Layout)**

```jsx
<section className="pillar-grid">
  <div className="pillar-card">
    <div className="pillar-card__icon">🎓</div>
    <h3 className="pillar-card__title">Education</h3>
    <p className="pillar-card__description">
      Learn about space exploration...
    </p>
  </div>
  {/* Repeat for Collaboration, Innovation */}
</section>

/* Styling:
   - Grid: display: grid; grid-template-columns: repeat(3, 1fr);
   - Gap: --spacing-8
   - Card Padding: --spacing-6
   - Icon Size: 3rem
   - Responsive: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
*/
```

### 2.2 Component Documentation Standards

Every component should have a storybook entry with:

```markdown
## Component: Button

**Purpose:** Primary interactive element for user actions.

**Variants:**
- Primary (default)
- Secondary
- Tertiary
- Ghost
- Disabled

**Props:**
- `variant`: enum (primary, secondary, tertiary, ghost, disabled)
- `size`: enum (sm, md, lg)
- `disabled`: boolean
- `onClick`: function
- `children`: ReactNode

**Accessibility:**
- Always include `aria-label` for icon-only buttons
- Use semantic `<button>` elements
- Support keyboard navigation (Tab, Enter, Space)

**Examples:**
See Storybook at: `http://localhost:6006/?path=/story/buttons--primary`
```

---

## 3. Frameworks & Tech Stack

### 3.1 Frontend Framework

**Primary:** React 18.x (or Next.js 14.x for SSR/SSG)

**Rationale:**
- Component-based architecture aligns with design system
- Rich ecosystem for state management
- Strong TypeScript support

**Setup:**

```bash
# Create React App (or Next.js)
npx create-react-app isya-web-portal --template typescript
# OR
npx create-next-app@latest isya-web-portal --typescript
```

### 3.2 Styling & CSS Framework

**Primary:** Tailwind CSS (recommended) or CSS Modules + custom CSS

**Tailwind Configuration:**

```js
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds (cosmic)
        "isya-bg-primary": "#000B1A",
        "isya-bg-surface": "#0F1629",
        
        // Accent colors (rocket trail inspired)
        "isya-orange": "#FFA500",
        "isya-orange-bright": "#FFB533",
        "isya-yellow": "#FFD700",
        "isya-pink": "#EC4899",
        "isya-pink-bright": "#FF1493",
        "isya-blue": "#4A90E2",
        "isya-blue-bright": "#5BA3F5",
        "isya-cyan": "#00D9FF",
        
        // Text colors
        "isya-text-primary": "#FFFFFF",
        "isya-text-secondary": "#B0B8C1",
        "isya-text-tertiary": "#7A8894",
      },
      borderRadius: {
        base: "12px",
        lg: "16px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-orange": "0 0 20px rgba(255, 165, 0, 0.3)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.3)",
        "glow-blue": "0 0 20px rgba(74, 144, 226, 0.3)",
        "glow-cyan": "0 0 20px rgba(0, 217, 255, 0.3)",
      },
      backgroundImage: {
        "rocket-trail": "linear-gradient(135deg, #FFA500, #EC4899)",
        "rocket-extended": "linear-gradient(90deg, #FFA500, #FFD700, #EC4899)",
        "tech-accent": "linear-gradient(135deg, #4A90E2, #00D9FF)",
        "cosmic": "linear-gradient(135deg, #000B1A 0%, #0F1629 50%, #1a2a4a 100%)",
      },
    },
  },
};
```

**Alternative