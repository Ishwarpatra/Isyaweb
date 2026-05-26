# ISYA Web Portal - Design System Implementation Summary

**Project:** International Space Youth Association (ISYA) Web Portal  
**Document Type:** Design System Overview & Quick Reference  
**Version:** 1.0  
**Date:** May 17, 2026  
**Prepared for:** Frontend Engineering Team & Design Team

---

## 📋 Document Overview

This package contains **three comprehensive documents** for implementing the ISYA Web Portal design system with Figma MCP integration:

### Document 1: **CLAUDE.md** (Main Design System Rules)
- **Purpose:** Foundational design system specifications
- **Contents:**
  - Design token definitions (colors, typography, spacing, shadows, transitions)
  - Component library architecture with code examples
  - Tech stack specifications (React, Tailwind CSS)
  - Asset management guidelines
  - Project structure recommendations
  - Styling methodology (CSS Modules, Tailwind)
- **Audience:** Developers, designers, frontend leads
- **Use Case:** Day-to-day reference for component development

### Document 2: **FIGMA_MCP_INTEGRATION_GUIDE.md** (Design-to-Code Workflow)
- **Purpose:** Detailed guide for Figma design integration via MCP
- **Contents:**
  - Figma file organization & component structure
  - Design tokens setup in Figma (variables, styles)
  - Component naming conventions
  - Step-by-step Figma-to-code workflow with MCP
  - Page-by-page design specifications
  - Responsive design rules & breakpoints
  - Visual states and interaction specifications
  - Version control and handoff checklist
- **Audience:** Design leads, frontend engineers, design systems managers
- **Use Case:** Implementing Figma designs in code, managing design-to-dev handoff

### Document 3: **This Summary** (Quick Reference)
- **Purpose:** High-level overview and navigation guide
- **Contents:** Key specifications, color palette, typography scale, quick links
- **Audience:** All team members
- **Use Case:** Quick lookups during development

---

## 🎨 Design System at a Glance

### Brand Visual Identity

**ISYA Logo:** Cosmic rocket graphic with network nodes, vibrant gradient trail  
**Theme:** Modern, clean, space-exploration inspired  
**Inspiration:** Whimsical CSS, NASA aesthetics  
**Dark Mode:** True dark mode design (no light theme planned)

### Color Palette (Extracted from Logo)

| Color | Hex Code | Usage | Purpose |
|-------|----------|-------|---------|
| **Space Navy (Primary BG)** | `#000B1A` | Full-page backgrounds | Deep cosmic backdrop |
| **Dark Slate (Surface)** | `#0F1629` | Cards, modals, containers | Subtle elevation |
| **Cosmic Orange** | `#FFA500` | Primary CTAs, rocket highlights | Warm, action-oriented |
| **Golden Yellow** | `#FFD700` | Success, star accents | Optimism, discovery |
| **Nebula Pink** | `#EC4899` | Gradient trails, secondary CTAs | Vibrant, dynamic |
| **Stellar Blue** | `#4A90E2` | Links, network nodes | Trust, exploration |
| **Cyan** | `#00D9FF` | Interactive highlights | Futuristic energy |
| **White (Text)** | `#FFFFFF` | Primary text | Maximum contrast |
| **Soft Gray (Secondary Text)** | `#B0B8C1` | Subtitles, secondary info | Readable, not dominant |

### Gradient Combinations

```css
/* Primary Gradient - Rocket Flame */
background: linear-gradient(135deg, #FFA500, #EC4899);

/* Extended Trail - Orange to Yellow to Pink */
background: linear-gradient(90deg, #FFA500, #FFD700, #EC4899);

/* Tech Accent - Blue to Cyan */
background: linear-gradient(135deg, #4A90E2, #00D9FF);

/* Cosmic Background */
background: linear-gradient(135deg, #000B1A 0%, #0F1629 50%, #1a2a4a 100%);
```

### Typography Scale

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|-------------|-------|
| **H1** | 48px | Bold (700) | 1.2 | Hero titles, page headings |
| **H2** | 36px | Bold (700) | 1.2 | Section titles |
| **H3** | 30px | Semibold (600) | 1.2 | Subsection titles |
| **H4** | 24px | Semibold (600) | 1.2 | Card titles, emphasis |
| **Body** | 16px | Regular (400) | 1.5 | Main content text |
| **Small** | 14px | Regular (400) | 1.5 | Secondary text, labels |
| **Caption** | 12px | Regular (400) | 1.5 | Metadata, timestamps |
| **Button** | 14px | Semibold (600) | 1.5 | Button labels |

**Font Family:** Inter (primary), system fonts fallback

### Spacing Scale (4px base unit)

```
2px   (0.5 units)  → Minimal gaps
4px   (1 unit)     → xs spacing
8px   (2 units)    → sm spacing
12px  (3 units)    → sm+ spacing
16px  (4 units)    → base spacing
24px  (6 units)    → md spacing
32px  (8 units)    → lg spacing
48px  (12 units)   → xl spacing
64px  (16 units)   → 2xl spacing
```

### Border & Radius

```
Radius:
- Small: 8px (minor elements)
- Base: 12px (buttons, inputs, cards)
- Large: 16px (large cards)
- Full: 9999px (badges, pills)

Border:
- Thin: 1px (standard borders)
- Base: 2px (emphasized borders)
```

### Shadows & Glows

| Shadow | CSS | Usage |
|--------|-----|-------|
| **Small** | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| **Base** | `0 4px 6px rgba(0,0,0,0.1)` | Standard cards |
| **Medium** | `0 10px 15px rgba(0,0,0,0.2)` | Hovered cards |
| **Large** | `0 20px 25px rgba(0,0,0,0.3)` | Modals |
| **Glow Orange** | `0 0 20px rgba(255,165,0,0.3)` | Orange accents |
| **Glow Pink** | `0 0 20px rgba(236,72,153,0.3)` | Pink accents |
| **Glow Blue** | `0 0 20px rgba(74,144,226,0.3)` | Blue accents |

### Transitions & Animations

```
Duration:
- Fast: 150ms (micro-interactions)
- Base: 300ms (hover states, transitions)
- Slow: 500ms (page transitions, modals)

Easing: ease-in-out (default)

Common Animations:
- Hover: All properties, 300ms ease-in-out
- Glow effect: Orange/pink on hover
- Image zoom: 1.05 scale on card hover
- Button press: 0.98 scale on click
```

---

## 🧩 Core Components

### Buttons (4 Variants)

```
Primary:   Orange background, white text, pink glow on hover
Secondary: Pink background, white text
Tertiary:  Blue background, white text
Ghost:     Transparent, blue border, filled on hover
```

**States:** Default, Hover, Active, Disabled, Loading  
**Sizes:** Small (12px), Medium (14px), Large (16px)  
**Padding:** 16px v × 24px h (base size)  

### Cards (Multiple Types)

**Blog Card (Featured):**
- Dimensions: Full width, 400px height (desktop)
- Image: 16:9 aspect ratio
- Content: Title, date, author, category tag
- Hover: Image zoom 1.05, shadow elevation, glow effect

**Blog Card (Grid):**
- Dimensions: 300px width, 300px height
- Image: 16:9 aspect ratio
- Content: Title, metadata
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)

**Video Card:**
- Dimensions: Thumbnail grid, 250px height
- Play button overlay: 64px circular, appears on hover
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)

**Pillar Card:**
- Dimensions: Flexible, grid-based
- Content: Icon, title, description
- Grid: 3 columns (desktop), 1 (mobile)

### Forms

**Input Fields:**
- Height: 44px
- Padding: 12px (vertical), 16px (horizontal)
- Border radius: 12px
- States: Default (gray border), Focus (blue border + glow), Error (red border), Disabled (grayed)

**Labels:**
- Font size: 14px
- Font weight: Medium (500)
- Color: White (#FFFFFF)
- Spacing below: 8px

**Checkboxes & Radio:**
- Size: 20px × 20px
- Border radius: 4px (checkbox), full (radio)
- Color: Orange when checked

### Navigation

**Header (Desktop):**
- Logo: Left side, 40px width
- Navigation links: Center/right
- User profile: Right side

**Sidebar (Admin):**
- Width: 250px (fixed, collapsible on mobile)
- Background: Primary navy
- Links: Padding 16px, hover background = surface color
- Active state: Bold + orange left border

**Mobile Navigation:**
- Hamburger menu (3-line icon)
- Full-screen overlay when opened
- Slide from left, semi-transparent backdrop

### Modals & Overlays

**Structure:**
- Overlay: Semi-transparent dark (80% opacity)
- Content: Surface color background, max-width 500px
- Shadow: Large shadow
- Animation: Fade in + slight scale (300ms)

**Close button:** Top-right corner, accessible via ESC key

### Media Players

**Audio Player (Podcast):**
- Controls: Play/pause, progress bar, time display
- Inline: Embedded in list items
- Height: 60px

**Video Player:**
- YouTube embed: iframe with responsive padding
- Lightbox: Full modal, 16:9 aspect ratio, centered
- Play button overlay: 64px, appears on hover

---

## 📄 Page Specifications

### 1. Landing Page

**Hero Section:**
- Height: 600px (desktop), 400px (mobile)
- Content: Logo (180px), headline (H1, gradient text), subheading, 2 CTAs
- Background: Cosmic gradient + rocket graphic
- CTA buttons: Side-by-side (desktop), stacked (mobile)

**Pillar Grid:**
- 3 columns, gap 32px (desktop)
- 2 columns (tablet), 1 column (mobile)
- Cards: Pillar card component with icon, title, description

**Footer:**
- Links: Home, Blog, About, Contact
- Copyright text
- Centered alignment

### 2. Blog Segment

**Featured Article:**
- 1 card, full width
- Image: 400px height, 16:9 ratio
- Content: Title, date, author, category tag
- Position: Top of page

**Article Grid:**
- 3 columns, gap 24px (desktop)
- 2 columns (tablet), 1 column (mobile)
- Blog card components

**Pagination:**
- Bottom of page
- Page numbers: 1 2 3 ... 10
- Previous/Next buttons

### 3. YT & Media Hub

**Videos Section:**
- 3-column grid (desktop), 2 (tablet), 1 (mobile)
- Video card components with play overlay
- Gap: 24px

**Podcasts Section:**
- Single column list
- Audio player inline
- Row height: 80px each

**Initiatives Section:**
- 2-column grid
- Initiative cards with icons and descriptions

### 4. Member Registration

**Form Layout:**
- Centered, max-width 500px
- Dark background with light blur
- Fields: Full name, email, password, age/grade, interest (dropdown)
- Checkboxes: Terms of service, newsletter opt-in
- Button: "Register" (full width, primary)
- Field spacing: 24px

### 5. Member Login

**Form Layout:**
- Centered, max-width 500px
- Fields: Email, password
- Links: "Forgot password?"
- Buttons: Login (primary), SSO options (secondary)

### 6. Member Community

**Content:**
- User dashboard
- Members directory/list
- Community posts/discussions
- (Specs to be finalized)

### 7. Admin Dashboard

**Layout:**
- Sidebar: Fixed 250px, dark background
- Main content: Scrollable area with padding
- Sticky header: Breadcrumb, user profile

**Features:**
- User Directory: Approve/ban members
- Content Manager: Manage blog posts, videos
- Analytics: Total members, active initiatives, engagement

**Responsive:**
- Desktop: Sidebar visible
- Tablet/Mobile: Hamburger menu, sidebar hidden

---

## 🎯 Quick Implementation Guide

### For New Developers

1. **Read CLAUDE.md first** - Understand the design system foundations
2. **Reference FIGMA_MCP_INTEGRATION_GUIDE.md** - Learn how designs map to code
3. **Use Tailwind CSS** - Leverage the custom color/spacing configurations
4. **Follow naming conventions** - Component names, CSS class names, file organization
5. **Use design tokens** - Never hardcode colors; use CSS variables
6. **Test responsiveness** - Always test at mobile (375px), tablet (768px), desktop (1280px)

### For Designers

1. **Organize Figma file** - Follow the recommended structure in this doc
2. **Use design tokens** - Color styles, typography styles, variables
3. **Create all variants** - Default, hover, active, disabled, loading states
4. **Document interactions** - Animation timings, hover effects, transitions
5. **Export assets** - Icons, logos, graphics in SVG and PNG formats
6. **Set up Code Connect** - Map Figma components to React components

### For Design System Managers

1. **Maintain consistency** - Regular audits of component library
2. **Version control** - Keep design tokens in sync with code
3. **Document changes** - Update CLAUDE.md when adding new tokens or components
4. **Gather feedback** - Regular sync between design and engineering teams
5. **Evolve thoughtfully** - Changes to core system should be planned, not ad-hoc

---

## 🔗 File Structure Reference

```
project-root/
├── docs/
│   ├── CLAUDE.md                        (Main design system rules)
│   ├── FIGMA_MCP_INTEGRATION_GUIDE.md   (Figma-to-code workflow)
│   └── design-system-summary.md         (This file)
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── Button.stories.tsx
│   │   ├── Card/
│   │   ├── Form/
│   │   └── [Other components]
│   │
│   ├── styles/
│   │   ├── variables.css               (Design tokens)
│   │   ├── globals.css                 (Global styles)
│   │   └── themes.css                  (Theme definitions)
│   │
│   ├── tokens/
│   │   ├── colors.json                 (Color definitions)
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   └── shadows.json
│   │
│   ├── assets/
│   │   ├── icons/
│   │   ├── logos/
│   │   └── graphics/
│   │
│   └── pages/
│       ├── landing/
│       ├── blog/
│       ├── media/
│       └── admin/
│
├── .figma/
│   └── code-connect.ts                 (Figma MCP configuration)
│
├── tailwind.config.js                  (Tailwind CSS configuration)
├── tsconfig.json
└── package.json
```

---

## 🚀 Development Workflow

### Setting Up

```bash
# 1. Clone repo and install dependencies
git clone [repo]
cd isya-web-portal
npm install

# 2. Setup environment variables
cp .env.example .env.local
# Add FIGMA_FILE_KEY and FIGMA_ACCESS_TOKEN

# 3. Install Figma CLI tools
npm install --save-dev @figma/code-connect figma

# 4. Sync design tokens from Figma
npm run design:sync

# 5. Start development server
npm run dev

# 6. Open Storybook in another terminal
npm run storybook
```

### Daily Development

```bash
# Check design specs in Figma before coding
# Reference CLAUDE.md for token values
# Use Storybook to test components in isolation
npm run storybook

# Run development server
npm run dev

# Build and test
npm run build
npm run test
```

### Component Creation Checklist

- [ ] Design component in Figma with all variants
- [ ] Export design context from Figma using MCP
- [ ] Create React component with TypeScript
- [ ] Apply design tokens (colors, spacing, typography)
- [ ] Create CSS module or Tailwind styles
- [ ] Add all state variants (hover, focus, disabled, loading)
- [ ] Test responsiveness (mobile, tablet, desktop)
- [ ] Add accessibility features (ARIA, semantic HTML)
- [ ] Create Storybook stories with examples
- [ ] Document component in README or JSDoc
- [ ] Link to Figma design via Code Connect
- [ ] Get code review before merging

---

## 📊 Responsive Breakpoints

```css
Mobile:     320px - 640px   (xs, sm)
Tablet:     641px - 1024px  (md, lg)
Desktop:    1025px+         (xl, 2xl)

Common breakpoints in code:
@media (min-width: 375px)   /* Mobile start */
@media (min-width: 768px)   /* Tablet start */
@media (min-width: 1024px)  /* Desktop start */
@media (min-width: 1280px)  /* Large desktop */
```

**Layout Adjustments:**

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Grid (3-col) | 1 col | 2 col | 3 col |
| Sidebar | Hidden (menu) | Visible | Visible |
| Hero height | 400px | 500px | 600px |
| Padding | 16px | 40px | 80px |
| Typography | -2px | -1px | base |

---

## 🎓 Learning Resources

### Design System Concepts
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) - Methodology
- [Design Tokens](https://www.designtokens.org/) - Token standards
- [Web Accessibility](https://www.w3.org/WAI/) - WCAG guidelines

### Tools & Technologies
- [Figma](https://www.figma.com) - Design tool
- [Figma MCP](https://github.com/figma/code-connect) - Design-to-code integration
- [React](https://react.dev) - UI framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Storybook](https://storybook.js.org) - Component library

### ISYA Specific
- [ISYA Organization](https://www.isya.org) - Official website
- [NASA](https://www.nasa.gov) - Inspiration for content
- [Whimsical](https://whimsical.com) - Design inspiration

---

## 👥 Team Contacts

| Role | Contact | Responsibilities |
|------|---------|------------------|
| Design Lead | [Name] | Design direction, Figma specs |
| Frontend Lead | [Name] | Engineering, component architecture |
| Design System Manager | [Name] | Token maintenance, documentation |
| QA Lead | [Name] | Testing, accessibility, responsiveness |

---

## 📝 Document Maintenance

| Document | Frequency | Owner | Last Updated |
|----------|-----------|-------|--------------|
| CLAUDE.md | Quarterly | Design System Manager | May 17, 2026 |
| FIGMA_MCP_INTEGRATION_GUIDE.md | As needed | Design Lead + Frontend Lead | May 17, 2026 |
| design-system-summary.md | Monthly | Design System Manager | May 17, 2026 |

---

## ✅ Sign-Off & Approval

**Prepared by:** Frontend Engineering Team  
**Reviewed by:** [Design Lead Name]  
**Approved by:** [Project Manager Name]  
**Date:** May 17, 2026  
**Version:** 1.0  
**Status:** ✅ Ready for Implementation

---

## 📚 Additional Resources

- **Figma Design File:** [Share link to be added]
- **Storybook:** [URL to be added when deployed]
- **Component Library:** [NPM package link if applicable]
- **Design Tokens JSON:** `/src/tokens/` directory
- **CSS Variables:** `/src/styles/variables.css`

---

**Remember:** This design system is a living document. As the project evolves, these specifications should be updated to reflect new decisions and learnings.

**Questions?** Refer to CLAUDE.md for technical details or FIGMA_MCP_INTEGRATION_GUIDE.md for design-to-code workflows.
