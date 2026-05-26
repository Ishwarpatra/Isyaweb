# Figma MCP Integration Guide for ISYA Web Portal

**Document Version:** 1.0  
**Date:** May 17, 2026  
**Purpose:** Detailed guide for integrating Figma designs with the ISYA codebase using Model Context Protocol (MCP)

---

## Table of Contents

1. [Figma File Structure](#1-figma-file-structure)
2. [Design Tokens in Figma](#2-design-tokens-in-figma)
3. [Component Setup](#3-component-setup)
4. [Figma-to-Code Workflow](#4-figma-to-code-workflow)
5. [Page Specifications](#5-page-specifications)
6. [Responsive Design Rules](#6-responsive-design-rules)
7. [Visual States & Interactions](#7-visual-states--interactions)
8. [Version Control & Handoff](#8-version-control--handoff)

---

## 1. Figma File Structure

### 1.1 Recommended Figma Organization

**File Name:** `ISYA Web Portal – Design System`

```
ISYA Web Portal (Main Design File)
│
├── 📱 01. Pages
│   ├── Landing Page
│   │   ├── Desktop (1280px)
│   │   ├── Tablet (768px)
│   │   └── Mobile (375px)
│   ├── Blog Segment
│   │   ├── Desktop
│   │   ├── Tablet
│   │   └── Mobile
│   ├── YT & Media Hub
│   │   ├── Desktop
│   │   ├── Tablet
│   │   └── Mobile
│   ├── Member Registration
│   ├── Member Login
│   ├── Member Community
│   ├── Admin Dashboard
│   │   ├── Desktop
│   │   └── Mobile (collapsed sidebar)
│   └── 404 / Error Pages
│
├── 🎨 02. Components Library
│   ├── Buttons
│   │   ├── Button / Primary / Default
│   │   ├── Button / Primary / Hover
│   │   ├── Button / Primary / Active
│   │   ├── Button / Primary / Disabled
│   │   ├── Button / Secondary
│   │   ├── Button / Tertiary
│   │   ├── Button / Ghost
│   │   ├── Button / Loading
│   │   └── Icon Button
│   │
│   ├── Cards
│   │   ├── Card / Blog / Default
│   │   ├── Card / Blog / Hover
│   │   ├── Card / Blog / Featured
│   │   ├── Card / Video / Default
│   │   ├── Card / Video / Hover
│   │   ├── Card / Pillar
│   │   └── Card / Analytics
│   │
│   ├── Forms
│   │   ├── Input / Text / Default
│   │   ├── Input / Text / Focus
│   │   ├── Input / Text / Filled
│   │   ├── Input / Text / Error
│   │   ├── Input / Text / Disabled
│   │   ├── Select / Default
│   │   ├── Select / Open
│   │   ├── Checkbox / Default
│   │   ├── Checkbox / Checked
│   │   ├── Checkbox / Disabled
│   │   ├── Radio Button / Default
│   │   ├── Radio Button / Selected
│   │   └── Form Group
│   │
│   ├── Navigation
│   │   ├── Header / Desktop
│   │   ├── Header / Mobile
│   │   ├── Sidebar / Expanded
│   │   ├── Sidebar / Collapsed
│   │   ├── Navigation Link / Default
│   │   ├── Navigation Link / Active
│   │   ├── Breadcrumb
│   │   └── Tab Navigation
│   │
│   ├── Media
│   │   ├── Audio Player / Podcast
│   │   ├── Video Player / Embedded
│   │   ├── Play Button / Overlay
│   │   └── Lightbox / Modal
│   │
│   ├── Modals & Overlays
│   │   ├── Modal / Auth
│   │   ├── Modal / Confirmation
│   │   ├── Modal / Alert
│   │   ├── Toast / Success
│   │   ├── Toast / Error
│   │   ├── Toast / Info
│   │   └── Loading Spinner
│   │
│   ├── Typography
│   │   ├── Heading / H1
│   │   ├── Heading / H2
│   │   ├── Heading / H3
│   │   ├── Heading / H4
│   │   ├── Body Text / Regular
│   │   ├── Body Text / Small
│   │   ├── Caption
│   │   ├── Link
│   │   └── Badge / Tag
│   │
│   ├── Sections
│   │   ├── Hero Section
│   │   ├── Pillar Grid
│   │   ├── Featured Article
│   │   ├── Blog Grid
│   │   ├── Video Grid
│   │   ├── Podcast List
│   │   └── Footer
│   │
│   └── Utilities
│       ├── Divider
│       ├── Spacer
│       ├── Icon / Set
│       ├── Avatar
│       └── Badge
│
├── 🌈 03. Design Tokens
│   ├── Colors
│   │   ├── Background
│   │   ├── Text
│   │   ├── Accents
│   │   ├── Semantic (Success, Error, Warning)
│   │   └── Borders
│   │
│   ├── Typography
│   │   ├── Font Scale
│   │   ├── Font Weights
│   │   ├── Line Heights
│   │   └── Letter Spacing
│   │
│   ├── Spacing
│   │   ├── Padding Scale
│   │   ├── Margin Scale
│   │   ├── Gap Scale
│   │   └── Border Radius
│   │
│   ├── Shadows
│   │   ├── Shadow / Small
│   │   ├── Shadow / Medium
│   │   ├── Shadow / Large
│   │   ├── Glow / Orange
│   │   ├── Glow / Pink
│   │   ├── Glow / Blue
│   │   └── Glow / Cyan
│   │
│   └── Effects
│       ├── Blur / Subtle
│       ├── Blur / Medium
│       ├── Blur / Heavy
│       └── Gradient / Rocket Trail
│
├── 🖼️ 04. Assets & Icons
│   ├── Logos
│   │   ├── ISYA Logo / Horizontal
│   │   ├── ISYA Logo / Vertical
│   │   ├── ISYA Logo / Icon Only
│   │   ├── ISYA Logo / Light
│   │   └── ISYA Logo / Dark
│   │
│   ├── Graphics
│   │   ├── Rocket / Full
│   │   ├── Rocket / Icon
│   │   ├── Stars
│   │   ├── Network Pattern
│   │   ├── Gradient Trails
│   │   └── Background Patterns
│   │
│   ├── Icons (32 icons)
│   │   ├── Menu
│   │   ├── Close
│   │   ├── Search
│   │   ├── User
│   │   ├── Settings
│   │   ├── Logout
│   │   ├── Home
│   │   ├── Blog
│   │   ├── Video
│   │   ├── Podcast
│   │   ├── Arrow Right
│   │   ├── Arrow Down
│   │   ├── Check
│   │   ├── Error
│   │   ├── Warning
│   │   └── [More icons...]
│   │
│   └── Photos (Placeholder / Sample)
│       ├── Hero Background
│       ├── Article Covers
│       └── Video Thumbnails
│
├── 📋 05. Documentation
│   ├── Color System
│   ├── Typography Scale
│   ├── Component Guidelines
│   ├── Accessibility Standards
│   ├── Responsive Breakpoints
│   ├── Spacing Grid
│   ├── Animation Specs
│   └── Brand Guidelines
│
└── 🔄 06. Archived / Deprecated
    ├── Old Button Variants
    ├── Unused Layouts
    └── Reference Designs
```

---

## 2. Design Tokens in Figma

### 2.1 Setting Up Figma Variables (Pro/Team)

**Color Variables:**

```
Colors
├── Background
│   ├── Primary (#000B1A)
│   ├── Surface (#0F1629)
│   └── Elevated (#111827)
├── Text
│   ├── Primary (#FFFFFF)
│   ├── Secondary (#B0B8C1)
│   └── Tertiary (#7A8894)
├── Accent
│   ├── Orange (#FFA500)
│   ├── Pink (#EC4899)
│   ├── Blue (#4A90E2)
│   ├── Cyan (#00D9FF)
│   └── Yellow (#FFD700)
└── Semantic
    ├── Success (#10B981)
    ├── Error (#EF4444)
    └── Warning (#F59E0B)
```

**Spacing Variables:**

```
Spacing
├── 2 (8px)
├── 3 (12px)
├── 4 (16px)
├── 6 (24px)
├── 8 (32px)
├── 10 (40px)
├── 12 (48px)
└── 16 (64px)
```

**Size Variables:**

```
Size
├── Radius / Small (8px)
├── Radius / Base (12px)
├── Radius / Large (16px)
└── Radius / Full (9999px)
```

### 2.2 Creating Color Styles

**Naming Convention:** `Category / Type / Variant`

```
Colors/
├── Background / Primary
├── Background / Surface
├── Background / Elevated
├── Text / Primary
├── Text / Secondary
├── Text / Tertiary
├── Accent / Orange
├── Accent / Orange / Bright
├── Accent / Pink
├── Accent / Pink / Bright
├── Accent / Blue
├── Accent / Blue / Bright
├── Accent / Cyan
├── Accent / Yellow
├── Border / Default
├── Border / Subtle
├── Semantic / Success
├── Semantic / Error
└── Semantic / Warning
```

### 2.3 Creating Typography Styles

**Naming Convention:** `Element / Size / Weight`

```
Typography/
├── Heading / H1 (48px / Bold)
├── Heading / H2 (36px / Bold)
├── Heading / H3 (30px / Semibold)
├── Heading / H4 (24px / Semibold)
├── Body / Regular (16px / Regular)
├── Body / Small (14px / Regular)
├── Caption (12px / Regular)
├── Button / Label (14px / Semibold)
├── Link / Default (16px / Regular)
└── Link / Small (14px / Regular)
```

---

## 3. Component Setup

### 3.1 Component Naming Convention

```
[Component Name] / [Variant] / [State]

Examples:
Button / Primary / Default
Button / Primary / Hover
Button / Primary / Disabled
Button / Secondary / Default
Card / Blog / Default
Card / Blog / Hover
Input / Text / Default
Input / Text / Focus
Input / Text / Error
Modal / Auth / Default
```

### 3.2 Essential Component Specifications

**Every component frame should include:**

1. **Name:** Clear, consistent naming
2. **Documentation:** Brief description of purpose
3. **Variants:** All state variations (default, hover, active, disabled, loading)
4. **Sizing Info:** Dimensions, padding, gap
5. **Colors:** Using color styles, not hex values
6. **Typography:** Using typography styles
7. **Interactions:** Hover effects, animations
8. **Responsive Notes:** How it adapts to different screens

### 3.3 Button Component Example

**Frame Setup:**

```
Button / Primary / Default
├── Background: Color / Accent / Orange
├── Padding: 16px (vertical) × 24px (horizontal)
├── Border Radius: 12px
├── Text: "Button Label" (Typography / Button / Label)
├── Shadow: Shadow / Base
└── State: Interactive

Variants:
├── Button / Primary / Hover
│   └── Background: Color / Accent / Orange / Bright
│   └── Shadow: Shadow / Medium + Glow / Orange
│
├── Button / Primary / Active
│   └── Background: Color / Accent / Orange (darker)
│   └── Transform: Scale 0.98
│
├── Button / Primary / Disabled
│   └── Opacity: 50%
│   └── Cursor: Not-allowed
│
└── Button / Primary / Loading
    └── Text: Hidden
    └── Show: Spinner icon
```

### 3.4 Card Component Example

**Frame Setup (Blog Card):**

```
Card / Blog / Default
├── Background: Color / Background / Surface
├── Border Radius: 16px
├── Shadow: Shadow / Base
├── Padding: 0 (image), 24px (content)
├── Components:
│   ├── Image (16:9 aspect)
│   ├── Category Tag
│   ├── Title (Typography / Heading / H3)
│   ├── Date & Author (Typography / Body / Small)
│   └── Description (Typography / Body / Regular)
└── Responsive: Full width on mobile, constrained on desktop

Variants:
├── Card / Blog / Hover
│   ├── Image: Scale 1.05
│   ├── Shadow: Shadow / Medium + Glow / Orange
│   └── Cursor: Pointer
│
└── Card / Blog / Featured
    ├── Width: 100% (full column width)
    ├── Height: 400px
    └── Layout: Horizontal (image left, content right)
```

---

## 4. Figma-to-Code Workflow

### 4.1 Design Context Export (Step 1)

**Using Figma MCP: `get_design_context`**

```javascript
// Fetch design specifications for a component
const buttonContext = await figma.getDesignContext({
  nodeId: "12345:6789"  // Button/Primary/Default node
});
```

**Expected Response:**

```json
{
  "nodeId": "12345:6789",
  "name": "Button/Primary/Default",
  "type": "COMPONENT",
  "description": "Primary call-to-action button for key actions",
  "properties": {
    "fill": {
      "type": "SOLID",
      "color": "#FFA500",
      "opacity": 1
    },
    "stroke": null,
    "strokeWidth": 0,
    "cornerRadius": 12,
    "padding": {
      "top": 16,
      "right": 24,
      "bottom": 16,
      "left": 24
    },
    "fontSize": 14,
    "fontWeight": 600,
    "lineHeight": 1.5,
    "letterSpacing": 0
  },
  "layout": {
    "layoutMode": "HORIZONTAL",
    "primaryAxisSize": "AUTO",
    "counterAxisSize": "FIXED",
    "spacing": 8,
    "paddingStart": 24,
    "paddingEnd": 24,
    "paddingTop": 16,
    "paddingBottom": 16
  },
  "variants": [
    {
      "name": "Hover",
      "properties": {
        "fill": { "color": "#FFB533" },
        "shadow": { "x": 0, "y": 4, "blur": 12, "spread": 0, "color": "rgba(255, 165, 0, 0.3)" }
      }
    },
    {
      "name": "Disabled",
      "properties": {
        "opacity": 0.5
      }
    }
  ],
  "documentation": {
    "guidelines": "Use for primary actions. Avoid multiple primary buttons in one section.",
    "accessibility": "Has built-in focus state. Support keyboard navigation (Tab, Enter, Space)."
  }
}
```

### 4.2 Component Code Generation (Step 2)

**Generated React/TypeScript Code:**

```typescript
// src/components/Button.tsx
import React, { ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  children: ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  state = 'default',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const buttonClass = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    state === 'disabled' || disabled ? styles['button--disabled'] : '',
    isLoading ? styles['button--loading'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading || state === 'disabled'}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? <span className={styles.spinner}></span> : children}
    </button>
  );
};

export default Button;
```

**Generated CSS Module:**

```css
/* src/components/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4) var(--spacing-6);
  border-radius: var(--radius-base);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  transition: all var(--transition-duration-base) var(--transition-easing-ease-in-out);
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.button:focus {
  outline: 2px solid var(--color-accent-blue);
  outline-offset: 2px;
}

/* Variant: Primary */
.button--primary {
  background-color: var(--color-accent-orange);
  color: var(--color-text-primary);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.15);
}

.button--primary:hover {
  background-color: var(--color-accent-orange-bright);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
  transform: translateY(-2px);
}

.button--primary:active {
  transform: scale(0.98);
}

/* Variant: Secondary */
.button--secondary {
  background-color: var(--color-accent-pink);
  color: var(--color-text-primary);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.15);
}

/* Variant: Ghost */
.button--ghost {
  background-color: transparent;
  color: var(--color-accent-blue);
  border: 1px solid var(--color-border);
}

.button--ghost:hover {
  background-color: var(--color-accent-blue);
  color: var(--color-text-primary);
}

/* Size: Small */
.button--sm {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-xs);
}

/* Size: Large */
.button--lg {
  padding: var(--spacing-6) var(--spacing-8);
  font-size: var(--font-size-base);
}

/* State: Disabled */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* State: Loading */
.button--loading {
  pointer-events: none;
}

.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 4.3 Code Connect Mapping (Step 3)

**Using Figma MCP: `add_code_connect_map`**

```typescript
// figma.config.ts
import { CodeConnect } from "@figma/code-connect";

// Map Figma Button component to React Button component
CodeConnect.figma(
  "https://www.figma.com/design/FILE_ID/ISYA?node-id=12345%3A6789"
)
  .react(Button, {
    variant: figma.enum("variant", {
      Primary: "primary",
      Secondary: "secondary",
      Tertiary: "tertiary",
      Ghost: "ghost"
    }),
    size: figma.enum("size", {
      Small: "sm",
      Medium: "md",
      Large: "lg"
    }),
    disabled: figma.boolean("Disabled"),
    children: figma.textContent("Label")
  })
  .example(props => (
    <Button variant="primary" size="md">
      Join the Community
    </Button>
  ))
  .documentation(
    "Primary call-to-action button for key user actions. Use sparingly—avoid multiple primary buttons in one section."
  );

export default CodeConnect;
```

### 4.4 Screenshot & Documentation (Step 4)

**Using Figma MCP: `get_screenshot`**

```javascript
// Generate component screenshots for documentation
const screenshots = {
  buttonPrimary: await figma.getScreenshot({
    nodeId: "12345:6789",
    format: "png",
    scale: 2
  }),
  cardBlog: await figma.getScreenshot({
    nodeId: "12345:7890",
    format: "png",
    scale: 2
  })
};

// Save for Storybook documentation
fs.writeFileSync("src/assets/components/button-primary.png", screenshots.buttonPrimary);
```

---

## 5. Page Specifications

### 5.1 Landing Page Layout

**Figma Frame:** `01. Pages / Landing Page / Desktop`

**Grid System:** 12-column layout, 1280px max-width

**Sections:**

```
Landing Page
├── Hero Section (height: 600px)
│   ├── Background: Gradient/Cosmic with rocket graphic
│   ├── Logo: ISYA Logo / Horizontal (180px width)
│   ├── Headline: "Join the Community" (Typography / H1)
│   │   └── Gradient text: Orange → Pink
│   ├── Subheadline: "Connecting youth to space exploration"
│   ├── CTA Group:
│   │   ├── Button / Primary: "Join the Community"
│   │   └── Button / Secondary: "Explore Initiatives"
│   └── Alignment: Center, padded vertically
│
├── Pillar Grid Section (padding: 80px 0)
│   ├── Section Title: "Our Mission" (Typography / H2)
│   ├── Grid: 3 columns, gap 32px
│   │   ├── Card / Pillar (Education)
│   │   │   ├── Icon: 🎓 (3rem)
│   │   │   ├── Title: "Education"
│   │   │   └── Description: Text
│   │   ├── Card / Pillar (Collaboration)
│   │   └── Card / Pillar (Innovation)
│   └── Responsive: 1 column on mobile, 2 on tablet
│
└── Footer
    ├── Links: Home, Blog, About, Contact
    ├── Copyright: "© 2026 ISYA"
    └── Alignment: Center
```

### 5.2 Blog Segment Layout

**Figma Frame:** `01. Pages / Blog Segment / Desktop`

**Layout Structure:**

```
Blog Segment
├── Header Section
│   ├── Title: "Latest News & Updates" (Typography / H1)
│   └── Subtitle: "Discover the latest from ISYA"
│
├── Featured Article (1 column, full width)
│   └── Card / Blog / Featured
│       ├── Image: 16:9 aspect ratio, 400px height
│       ├── Title: Large headline
│       ├── Date & Author
│       └── Category Tag
│
├── Article Grid (3 columns, gap 24px)
│   ├── Card / Blog / Default
│   ├── Card / Blog / Default
│   └── Card / Blog / Default
│
└── Pagination
    ├── Previous Button
    ├── Page Numbers (1 2 3 ... 10)
    └── Next Button
```

### 5.3 YT & Media Hub Layout

**Figma Frame:** `01. Pages / YT & Media Hub / Desktop`

**Layout Structure:**

```
YT & Media Hub
├── Videos Section
│   ├── Section Title: "Featured Videos"
│   ├── Grid: 3 columns, gap 24px
│   │   ├── Card / Video / Default
│   │   │   ├── Thumbnail: 16:9 aspect, 300px height
│   │   │   ├── Play Button Overlay: 64px circular
│   │   │   ├── Title: "Video Title"
│   │   │   └── Duration Badge: "12:45"
│   │   ├── Card / Video / Default
│   │   └── Card / Video / Default
│   └── Responsive: 2 columns (tablet), 1 column (mobile)
│
├── Podcasts Section
│   ├── Section Title: "Featured Podcasts"
│   ├── List View (single column)
│   │   ├── Podcast Item
│   │   │   ├── Cover Image: 60px square
│   │   │   ├── Title: "Episode Name"
│   │   │   ├── Duration: "45:30"
│   │   │   └── Audio Player: Inline controls
│   │   ├── Podcast Item
│   │   └── Podcast Item
│   └── Height per item: 80px
│
└── Initiatives Section
    ├── Grid: 2 columns
    └── Card / Initiative
        ├── Icon
        ├── Title
        └── Description
```

### 5.4 Admin Dashboard Layout

**Figma Frame:** `01. Pages / Admin Dashboard / Desktop`

**Layout Structure:**

```
Admin Dashboard
├── Sidebar (fixed, 250px width)
│   ├── ISYA Logo (small, 40px)
│   ├── Navigation Links
│   │   ├── Link / Active: Dashboard
│   │   ├── Link: User Directory
│   │   ├── Link: Content Manager
│   │   └── Link: Analytics
│   └── Bottom: Profile / Logout
│
├── Main Content Area (scrollable)
│   ├── Top Bar (sticky)
│   │   ├── Breadcrumb
│   │   └── User Profile + Settings
│   │
│   ├── Page Title & Description
│   │
│   └── Content Grid
│       ├── Analytics Cards (3 columns)
│       │   └── Card / Analytics
│       │       ├── Title: "Total Members"
│       │       ├── Number: "1,234"
│       │       └── Trend: "+12% this month"
│       │
│       └── Data Table
│           ├── Column Headers
│           ├── Data Rows (height: 56px each)
│           └── Actions (Edit, Delete)
│
└── Responsive: Sidebar collapses to hamburger menu on tablet/mobile
```

---

## 6. Responsive Design Rules

### 6.1 Breakpoints & Layouts

**Desktop-First Approach:**

```
Breakpoints (in Figma frames):
├── Desktop: 1280px (main design)
├── Laptop: 1024px (adjustments)
├── Tablet: 768px (2-column layouts)
├── Mobile Large: 480px (optimizations)
└── Mobile Small: 375px (minimal layout)
```

**Create Figma frames for each:**

```
01. Pages / Landing Page /
├── Desktop (1280px)
├── Tablet (768px)
└── Mobile (375px)

01. Pages / Blog Segment /
├── Desktop (1280px)
├── Tablet (768px)
└── Mobile (375px)

[Repeat for all pages]
```

### 6.2 Component Responsive Behavior

**Grid Layouts:**

```
Desktop:  3 columns, gap 24px
Tablet:   2 columns, gap 20px
Mobile:   1 column, gap 16px
```

**Typography Scaling:**

```
Desktop:  H1 = 48px, Body = 16px
Tablet:   H1 = 40px, Body = 15px
Mobile:   H1 = 32px, Body = 14px
```

**Padding/Margin:**

```
Desktop:  Horizontal padding 80px, gap 32px
Tablet:   Horizontal padding 40px, gap 24px
Mobile:   Horizontal padding 16px, gap 16px
```

**Navigation:**

```
Desktop:  Sidebar 250px fixed, visible
Tablet:   Sidebar 250px, visible
Mobile:   Sidebar hidden, hamburger menu, full-screen overlay on open
```

---

## 7. Visual States & Interactions

### 7.1 Interactive State Specifications

**Hover States:**

```
Component / Hover
├── Buttons: Brightness +10%, Shadow elevation
├── Links: Underline appears, color brightens
├── Cards: Scale 1.02, shadow elevation, image zoom 1.05
└── Form Inputs: Border color changes to accent blue
```

**Focus States (Keyboard Navigation):**

```
Component / Focus
├── All interactive elements: 2px solid outline (--color-accent-blue)
├── Outline offset: 2px
├── No outline for mouse-only browsers (`:focus-visible`)
└── All form inputs: Blue border + glow effect
```

**Active States:**

```
Component / Active
├── Buttons: Scale 0.98 (pressed effect)
├── Navigation Links: Bold, colored underline
├── Tabs: Colored bottom border
└── Toggle: Switched position
```

**Disabled States:**

```
Component / Disabled
├── Opacity: 50%
├── Cursor: not-allowed
├── No hover effects
└── Color: Grayed out
```

**Loading States:**

```
Component / Loading
├── Buttons: Spinner icon inside, text hidden
├── Input: Loading skeleton
├── Page: Overlay with spinner centered
└── Animation: Continuous spin, 600ms per rotation
```

### 7.2 Animation Specifications

**Documented in Figma (under 03. Design Tokens / Effects):**

```
Animations
├── Fade In: 300ms ease-out (pages, modals)
├── Slide Up: 300ms ease-out (toasts, dropdowns)
├── Scale: 300ms ease-in-out (buttons on click)
├── Zoom: 300ms ease-out (image hover)
└── Spin: 600ms linear infinite (loading spinner)
```

**Documented in CSS:**

```css
/* Transition defaults */
--transition-duration-fast: 150ms;
--transition-duration-base: 300ms;
--transition-duration-slow: 500ms;

/* Use sparingly */
--transition-base: all 300ms ease-in-out;

/* Don't over-animate */
- Never animate more than 2-3 properties
- Avoid animations < 150ms (feels janky)
- Avoid animations > 500ms (feels slow)
```

---

## 8. Version Control & Handoff

### 8.1 Pre-Handoff Checklist

Before passing designs to development team:

```
✅ Figma File Organization
  [ ] All pages created and named consistently
  [ ] All components properly organized in library
  [ ] No duplicate components or frames
  [ ] Unused artboards archived in 06. Archived folder

✅ Design Tokens
  [ ] All colors use color styles (no hardcoded hex)
  [ ] All typography uses typography styles
  [ ] All spacing uses consistent grid (4px base)
  [ ] Variables created for colors, sizing, spacing

✅ Components
  [ ] All variants created (default, hover, active, disabled, loading)
  [ ] All components have descriptions
  [ ] Component properties documented
  [ ] All components use design tokens

✅ Pages
  [ ] Desktop, tablet, mobile variants created
  [ ] All responsive breakpoints specified
  [ ] Page layouts consistent with grid system
  [ ] All interactive elements specified

✅ Documentation
  [ ] Design system specs documented
  [ ] Color palette documented with use cases
  [ ] Typography scale documented
  [ ] Spacing grid explained
  [ ] Animation specs documented
  [ ] Accessibility notes added

✅ Assets
  [ ] All icons exported at 2x scale
  [ ] Logo variants prepared (light, dark, horizontal, vertical)
  [ ] High-res images provided
  [ ] SVG assets prepared for export

✅ Code Connect
  [ ] Code Connect mappings created
  [ ] React component links added
  [ ] Storybook links documented
  [ ] Example code provided for complex components

✅ Handoff
  [ ] Figma file shared with development team
  [ ] Read-only access granted to team members
  [ ] Design specs document shared
  [ ] Figma MCP integration configured
  [ ] Storybook setup ready
  [ ] Design tokens exported to JSON
```

### 8.2 Figma Export Setup

**Exportable Assets:**

```
Assets to Export (for developers):

Icons/
├── 32×32 PNG (@ 1x and @ 2x)
├── SVG (scalable, preferred)
└── Sprite sheet option

Logos/
├── Horizontal (PNG + SVG)
├── Vertical (PNG + SVG)
├── Icon only (PNG + SVG)
└── Favicon sizes (16×16, 32×32, 64×64)

Graphics/
├── Rocket graphic (SVG)
├── Stars & network pattern (SVG)
├── Gradient trails (CSS or SVG)
└── Background patterns (PNG or SVG)

Components/
├── Component screenshots for documentation
├── Interactive states (hover, focus, disabled)
└── All component variants
```

### 8.3 Design Tokens Export (JSON)

**Export from Figma to JSON:**

```json
{
  "colors": {
    "background": {
      "primary": "#000B1A",
      "surface": "#0F1629"
    },
    "text": {
      "primary": "#FFFFFF",
      "secondary": "#B0B8C1"
    },
    "accent": {
      "orange": "#FFA500",
      "pink": "#EC4899",
      "blue": "#4A90E2",
      "cyan": "#00D9FF"
    }
  },
  "typography": {
    "fontFamily": {
      "primary": "Inter"
    },
    "fontSize": {
      "h1": 48,
      "h2": 36,
      "h3": 30,
      "body": 16,
      "small": 14,
      "caption": 12
    },
    "fontWeight": {
      "regular": 400,
      "semibold": 600,
      "bold": 700
    }
  },
  "spacing": {
    "2": 8,
    "3": 12,
    "4": 16,
    "6": 24,
    "8": 32
  }
}
```

### 8.4 Deployment Instructions

**For Development Team:**

```bash
# 1. Install Figma MCP dependencies
npm install @figma/code-connect figma

# 2. Configure Figma API access
export FIGMA_FILE_KEY="your-file-key"
export FIGMA_ACCESS_TOKEN="your-access-token"

# 3. Fetch design context for components
npm run design:sync

# 4. Generate components from design
npm run components:generate

# 5. Setup Code Connect
npm run code-connect:setup

# 6. Start Storybook
npm run storybook
```

---

## Additional Resources

- **Figma File:** [Share Link]
- **Design System Docs:** `/docs/design-system.md`
- **Component Storybook:** `http://localhost:6006`
- **Token Reference:** `/src/tokens/`
- **CSS Variables:** `/src/styles/variables.css`

---

**Document maintained by:** ISYA Design Team  
**Last updated:** May 17, 2026  
**Status:** Active & Ready for Development
