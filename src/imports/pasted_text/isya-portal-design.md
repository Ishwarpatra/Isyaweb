UI/UX Architecture & Design Specification

Project: International Space Youth Association (ISYA) Web Portal
Document Type: Design & Functional Blueprint
Version: 1.1 (Updated with Animation Specifications)
Date: May 19, 2026

1.0 Purpose and Scope

This document outlines the User Interface (UI) and User Experience (UX) specifications for the ISYA Web Portal. It dictates the design language, structural layout, and functional requirements for all primary segments, ensuring a cohesive, modern, and accessible experience.

2.0 Global Design System (Whimsical CSS Inspiration)

The global design system is heavily inspired by modern, clean CSS frameworks (similar to Whimsical) to ensure high readability and a professional yet engaging aesthetic, while utilizing the color palette from the official ISYA logo.

2.1 Color Palette

Primary Background: Deep Space Navy (#0B0F19) - Extracted from the logo background.

Surface Backgrounds: Dark Slate (#111827) - For cards and elevated containers.

Accent Gradients (The "Rocket Trail"): * Cosmic Orange (#F97316)

Nebula Pink (#EC4899)

Stellar Blue (#3B82F6)

Typography: High-contrast White (#FFFFFF) for primary text, Soft Gray (#9CA3AF) for secondary text.

2.2 Component Styling Rules

Borders & Radii: Soft, rounded corners (border-radius: 12px to 16px) on all cards, buttons, and input fields.

Shadows: Subtle, glowing drop-shadows using the accent colors to signify interactivity (e.g., a faint pink glow on the primary call-to-action button).

Transitions: Smooth, 300ms ease-in-out transitions for all hover states (buttons, links, card elevations).

2.3 Advanced Animation & Interaction Specifications (The "Cool" Factor)

To achieve a modern, highly engaging, and "animative" feel, developers must implement the following CSS motion guidelines. All animations should feel fluid, space-themed (floating, glowing), and responsive.

2.3.1 Hero Section & Ambient Animations:

Gradient Breathing: The background aurora/gradient blobs behind the hero section must use a continuous keyframe animation (@keyframes pulse-glow) that slowly scales (from 1.0 to 1.1) and shifts opacity (from 40% to 60%) over an 8-second infinite loop to make the background feel "alive."

Zero-Gravity Float: The primary ISYA rocket graphic or floating elements must utilize a continuous transform: translateY animation (e.g., moving up and down by 15px over a 4-second ease-in-out infinite loop).

2.3.2 Micro-Interactions (Buttons & Links):

Magnetic Glow: Primary gradient buttons must feature an animated background. On hover, the background-position of the linear gradient should shift to create a shimmering effect (background-size: 200% auto; animation: gradient-shift 3s linear infinite).

Tactile Feedback: All buttons must scale down slightly on active click (transform: scale(0.95)) to provide a tactile "press" sensation.

Outer Glow: On hover, primary buttons should project an outer box-shadow that matches the gradient, expanding outwards (box-shadow: 0 0 20px rgba(236, 72, 153, 0.5)).

2.3.3 Scroll Reveals & Page Entrances:

Staggered Fade-Up: Elements should not simply appear. As the user scrolls, sections must enter the viewport using an Intersection Observer. They should start at opacity: 0 and transform: translateY(30px), transitioning to opacity: 1 and translateY(0) over 700ms using a cubic-bezier(0.16, 1, 0.3, 1) easing function.

Sequential Loading: Grid items (like the Blog cards or Media thumbnails) should load sequentially with a 100ms delay between each card to create a cascading entrance effect.

2.3.4 Media & Card Hover States (NASA-Style Grid):

Parallax Image Zoom: When hovering over a blog or video card, the internal image must scale up (transform: scale(1.08)) over 500ms, while the outer card container retains overflow: hidden.

Elevation Lift: The card itself should lift off the page on hover (transform: translateY(-8px)) while increasing the opacity of its drop-shadow to simulate depth against the dark background.

3.0 Segment Specifications

3.1 Landing Page

Objective: Hook the user, explain ISYA's mission, and drive registration.

Hero Section: * Centralized ISYA logo or Rocket graphic (Implement the Zero-Gravity Float animation here).

Bold, gradient-text headline with a typing or staggered reveal entrance.

Primary Call-to-Action (CTA): "Join the Community" (Routes to Registration).

Secondary CTA: "Explore Initiatives" (Routes to Media/YT).

Overview Section: A 3-column grid highlighting core pillars (Education, Collaboration, Innovation) using modern iconography. (Implement Staggered Fade-Up on scroll).

3.2 Blog Segment (NASA-Inspired)

Objective: Present articles, research, and news in a highly structured, authoritative format.

Layout: Masonry or rigid grid layout (e.g., 1 featured article spanning the top, followed by a 3-column grid for older posts).

Card Anatomy:

High-quality cover image (16:9 ratio) with Parallax Image Zoom on hover.

Category Tag (e.g., "Mission Update", "Astrophysics").

Bold Title (Sans-serif).

Date and Author Name.

3.3 YT & Media Contents Hub

Objective: House multimedia content (Podcasts, YouTube videos, Interactive Initiatives).

Video Section: * Grid of video thumbnails.

Play button overlay that scales in (transform: scale(0) to scale(1)) on hover.

Clicking a card opens a cinematic modal/lightbox to play the embedded YouTube iframe with a smooth backdrop blur fade-in.

Podcast Section: * List view (rows instead of columns).

Inline audio player controls (Play, Pause, Progress Bar).

Episode title and brief show notes snippet.

3.4 Identity & Access Management (IAM)

Objective: Secure, frictionless user onboarding and authentication.

Member Registration:

Clean, centered form over a dark, blurred cosmic background (Implement Gradient Breathing in the background).

Fields: Full Name, Email, Password, Age/Grade, Area of Interest (Dropdown).

Checkboxes for Terms of Service and Newsletter opt-in.

Member Login:

Minimalist form: Email, Password.

"Forgot Password" workflow link.

Option for Single Sign-On (SSO) via Google/Microsoft (Recommended for students).

3.5 Administrative Mode

Objective: Secure dashboard for ISYA staff to manage the platform.

Access: Gated behind Role-Based Access Control (RBAC). Only users with 'Admin' flags can view this route.

Layout: Sidebar navigation (left) with a main data view area (right).

Features:

User Directory (Approve/Ban members).

Content Manager (Draft/Publish Blogs and YT links).

Analytics Overview (Total members, active initiatives).

4.0 Document Control & Next Steps

Review: Management to review Section 3.0 to ensure all required data points are captured in the forms, and Section 2.3 for animation constraints.

Handoff: Once approved, this document will be passed to the Front-End Engineering team to begin component construction based on the defined CSS constraints.