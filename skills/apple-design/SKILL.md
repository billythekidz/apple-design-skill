---
name: apple-design
description: Complete Apple Human Interface Guidelines (HIG) and Apple Design System standard. Use when designing, building, or reviewing UI/UX for iOS, iPadOS, macOS, watchOS, visionOS, or Apple-styled web and mobile applications.
version: 1.0.0
license: MIT
author: apple-design-skill
tags:
  - design-system
  - apple
  - hig
  - swiftui
  - ios
  - macos
  - visionos
  - web-design
  - ui-ux
---

# Apple Design System & Human Interface Guidelines (HIG)

This skill equips AI coding agents with the exact principles, visual specifications, component architectures, typography metrics, color tokens, and motion curves defined by **Apple's Human Interface Guidelines (HIG)** across iOS, iPadOS, macOS, watchOS, visionOS, and modern Apple-grade Web UI.

---

## 1. Core Design Philosophy

Apple interfaces are built upon three primary pillars:

1. **Clarity**:
   - Text is legible at every size; icons are precise, distinct, and universally understood.
   - Adornments are subtle and purposeful. Content always takes visual priority over decorative Chrome.
   - Negative space (whitespace) provides breathing room and clarifies visual hierarchy.

2. **Deference**:
   - Fluid motion, translucent materials, and crisp typography elevate content without competing with it.
   - Backgrounds defer to content; chrome recedes when the user is engaged in primary tasks (e.g. navigation bars collapse or blur seamlessly on scroll).

3. **Depth**:
   - Distinct visual layers, realistic lighting, specular highlights, and physical spring physics convey spatial hierarchy and tactile realism.
   - Elevations and materials communicate interactive affordances without harsh dropped shadows or abrasive outlines.

---

## 2. Universal Apple Design Tenets & Critical Rules

### 🚫 Forbidden Anti-Patterns (Never Do These)
- **NO Purple/Violet On Dark Themes**: Never use purple fonts or violet accent buttons on dark backgrounds.
- **NO Harsh Drop Shadows**: Never use dense black un-diffused box shadows (`box-shadow: 0 4px 10px rgba(0,0,0,0.5)`). Use multi-layered ambient diffusion (`box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)`).
- **NO Sharp / Geometric Corners**: Never leave interactive controls, cards, or inputs with 0px radius or arbitrary non-continuous corners.
- **NO Untracked Large Typography**: Never render large headings (>24px) without tight letter-spacing (-0.02em to -0.03em / -0.5px to -1.2px).
- **NO Non-Standard Touch Targets**: Never create clickable elements smaller than 44×44 pt (iOS standard) or 28×28 pt (macOS compact pointer).
- **NO Plain Static CSS Transitions**: Never use `ease-in-out` for physical UI interactions; always use fluid spring physics or Apple easing curves.

---

## 3. Visual Foundations

### A. Typography System (San Francisco & New York)
- **Primary Interface Font**: SF Pro (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif`)
- **Monospace Font**: SF Mono (`ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`)
- **Serif Font**: New York (`"New York", ui-serif, Georgia, Cambria, serif`)

#### Typographic Scale & Optical Sizing Rules:
| Style | Size (pt/px) | Weight | Line Height | Tracking / Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Large Title** | 34px | Bold (700) | 41px | `-0.022em (-0.75px)` |
| **Title 1** | 28px | Bold / SemiBold | 34px | `-0.020em (-0.56px)` |
| **Title 2** | 22px | Bold / SemiBold | 28px | `-0.018em (-0.40px)` |
| **Title 3** | 20px | SemiBold (600) | 25px | `-0.015em (-0.30px)` |
| **Headline** | 17px | SemiBold (600) | 22px | `-0.012em (-0.20px)` |
| **Body** | 17px | Regular (400) | 22px | `-0.010em (-0.17px)` |
| **Callout** | 16px | Regular (400) | 21px | `-0.008em (-0.13px)` |
| **Subheadline** | 15px | Regular (400) | 20px | `-0.005em (-0.08px)` |
| **Footnote** | 13px | Regular (400) | 18px | `0.000em (0.00px)` |
| **Caption 1** | 12px | Regular (400) | 16px | `0.005em (+0.06px)` |
| **Caption 2** | 11px | Regular / Medium | 13px | `0.010em (+0.11px)` |

> *Rule of thumb: Sizes >= 20px use **SF Pro Display** with tighter tracking; sizes < 20px use **SF Pro Text** with neutral to open tracking for readability.*

---

### B. Dynamic Color System (Light & Dark Mode)
Always use semantic color tokens that dynamically adapt between light and dark appearances:

```css
:root {
  /* System Backgrounds */
  --system-background: #FFFFFF;
  --secondary-system-background: #F2F2F7;
  --tertiary-system-background: #FFFFFF;
  --system-grouped-background: #F2F2F7;
  --secondary-grouped-background: #FFFFFF;
  
  /* System Labels */
  --label-primary: #000000;
  --label-secondary: rgba(60, 60, 67, 0.60);
  --label-tertiary: rgba(60, 60, 67, 0.30);
  --label-quaternary: rgba(60, 60, 67, 0.18);
  
  /* System Fills & Separators */
  --system-fill: rgba(120, 120, 128, 0.20);
  --secondary-system-fill: rgba(120, 120, 128, 0.16);
  --tertiary-system-fill: rgba(118, 118, 128, 0.12);
  --quaternary-system-fill: rgba(116, 116, 128, 0.08);
  --separator: rgba(60, 60, 67, 0.29);
  --opaque-separator: #C6C6C8;

  /* Accent Tint Colors */
  --system-blue: #007AFF;
  --system-green: #34C759;
  --system-indigo: #5856D6;
  --system-orange: #FF9500;
  --system-pink: #FF2D55;
  --system-purple: #AF52DE;
  --system-red: #FF3B30;
  --system-teal: #5AC8FA;
  --system-yellow: #FFCC00;
}

@media (prefers-color-scheme: dark), [data-theme="dark"] {
  :root {
    /* System Backgrounds */
    --system-background: #000000;
    --secondary-system-background: #1C1C1E;
    --tertiary-system-background: #2C2C2E;
    --system-grouped-background: #000000;
    --secondary-grouped-background: #1C1C1E;

    /* System Labels */
    --label-primary: #FFFFFF;
    --label-secondary: rgba(235, 235, 245, 0.60);
    --label-tertiary: rgba(235, 235, 245, 0.30);
    --label-quaternary: rgba(235, 235, 245, 0.16);

    /* System Fills & Separators */
    --system-fill: rgba(120, 120, 128, 0.36);
    --secondary-system-fill: rgba(120, 120, 128, 0.32);
    --tertiary-system-fill: rgba(118, 118, 128, 0.24);
    --quaternary-system-fill: rgba(118, 118, 128, 0.18);
    --separator: rgba(84, 84, 88, 0.65);
    --opaque-separator: #38383A;

    /* Accent Tint Colors (Elevated Luma in Dark) */
    --system-blue: #0A84FF;
    --system-green: #30D158;
    --system-indigo: #5E5CE6;
    --system-orange: #FF9F0A;
    --system-pink: #FF375F;
    --system-purple: #BF5AF2;
    --system-red: #FF453A;
    --system-teal: #64D2FF;
    --system-yellow: #FFD60A;
  }
}
```

---

### C. Materials, Translucency & Specular Glass

Apple materials blur underlying content to create visual grounding while maintaining vibrancy:

```css
/* Authentic Apple Ultra-Thin Frosted Glass Material */
.apple-material-ultrathin {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(190%);
  -webkit-backdrop-filter: blur(20px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
}

@media (prefers-color-scheme: dark), [data-theme="dark"] {
  .apple-material-ultrathin {
    background: rgba(28, 28, 30, 0.75);
    backdrop-filter: blur(25px) saturate(190%);
    -webkit-backdrop-filter: blur(25px) saturate(190%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 1px 3px rgba(255, 255, 255, 0.05) inset;
  }
}
```

---

### D. Continuous Curvature (Squircle / iOS Superellipse)
Apple uses smooth continuous curvature (`G2 continuity`) rather than sharp circular arcs:

- **Buttons & Small Controls**: `10px` to `12px` (Capsule: `9999px`)
- **Cards & Content Blocks**: `16px` to `20px`
- **Modals & Floating Sheets**: `24px` to `32px`
- **visionOS Windows & Ornaments**: `30px` to `44px`
- **CSS Smoothing Property**: `corner-smoothing: 60%;` (when supported) or SVG continuous superellipse masks.

---

## 4. Standard Apple Components & Specs

### 1. Apple Buttons
- **Filled Prominent**: Full accent background (`--system-blue`), white text, bold weight, spring tap press (`scale(0.97)`).
- **Tinted**: 15% opacity accent background, 100% accent text.
- **Gray**: `--quaternary-system-fill` background, primary label text.
- **Plain**: No background, accent colored text, subtle underline on focus.

### 2. Segmented Control
- Background: `--tertiary-system-fill` with `8px` squircle padding.
- Selected Pill: White background in light mode (`rgba(255,255,255,1)` with `0 2px 6px rgba(0,0,0,0.12)` shadow), `--tertiary-system-background` in dark mode.
- Transition: Smooth spring translation on active tab change.

### 3. Inset Grouped List (Settings Pattern)
- Outer container margin: `16px` left/right.
- Inner row height: `44px` minimum.
- Row separation: `0.5px` border indented by `16px` + leading icon width.
- Accessory indicators: Subtle disclosure chevron (`SF Symbol: chevron.right`) in `--label-tertiary`.

### 4. Navigation Bar & Large Title
- Compact view: `44px` height with centered Title (`17px SemiBold`).
- Expanded view: `52px` Large Title (`34px Bold`), collapses seamlessly into inline title upon scroll offset > 50px.
- Background: Transparent at scroll origin; transitions to ultra-thin blurred material when content scrolls beneath.

---

## 5. Animation Physics (Apple Spring Curves)

Never use linear or standard ease curves for interactive UI. Use authentic Apple spring physics:

### Spring Parameters Reference:
- **Interactive / Tap feedback**: `mass: 1, stiffness: 350, damping: 35` (CSS approx: `cubic-bezier(0.25, 1, 0.5, 1)`)
- **Sheet Presentation / Modal Slide**: `mass: 1.2, stiffness: 280, damping: 28` (CSS approx: `cubic-bezier(0.32, 0.72, 0, 1)`)
- **Snappy Switch / Toggle**: `mass: 0.8, stiffness: 450, damping: 30`
- **Bounce / Delight**: `mass: 1, stiffness: 200, damping: 15`

```css
/* Apple Native Motion Classes */
.apple-spring-interactive {
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.25s ease;
}

.apple-spring-interactive:active {
  transform: scale(0.965);
}

.apple-spring-sheet {
  transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1),
              opacity 0.4s ease;
}
```

---

## 6. Implementation Workflow for AI Agents

When asked to generate UI or write code in Apple style:

1. **Step 1: Check Hierarchy & Layout**:
   - Apply standard 8pt grid spacing (8px, 16px, 24px, 32px, 48px).
   - Ensure 44pt minimum touch targets.

2. **Step 2: Apply Typography Tokens**:
   - Use `-apple-system` font stack with corresponding tracking and weights.

3. **Step 3: Theme & Material Grounding**:
   - Implement both Light and Dark mode variables.
   - Use frosted glass backdrop filters for headers, navigation bars, and floating controls.

4. **Step 4: Micro-interactions & Haptic Delight**:
   - Add `:active { transform: scale(0.97); }` with spring curves on all interactive controls.
   - Add hover elevation and cursor pointer on desktop environments.

5. **Step 5: Verify Accessibility**:
   - Ensure text contrast meets WCAG AA (minimum 4.5:1 for body, 3:1 for large text).
   - Support `prefers-reduced-motion` to disable bouncy animations.

---

## 7. Bundled Resources & Full Apple HIG Library

This skill includes **172 complete official Apple Human Interface Guidelines** documentation pages with **451+ local Retina illustrations** in the `references/` directory:

- **[Master HIG Documentation Catalog (INDEX.md)](references/INDEX.md)**: Full searchable index of all 172 guideline topics.
- **Foundations**: [Accessibility](references/accessibility.md), [App Icons](references/app-icons.md), [Color](references/color.md), [Dark Mode](references/dark-mode.md), [Layout](references/layout.md), [Materials](references/materials.md), [Motion](references/motion.md), [Typography](references/typography.md), [Right to Left](references/right-to-left.md).
- **Components**: [Buttons](references/buttons.md), [Segmented Controls](references/segmented-controls.md), [Toggles](references/toggles.md), [Pickers](references/pickers.md), [Sliders](references/sliders.md), [Sheets](references/sheets.md), [Popovers](references/popovers.md), [Alerts](references/alerts.md), [Tab Bars](references/tab-bars.md), [Sidebars](references/sidebars.md), [Navigation & Search](references/navigation-and-search.md), [Toolbars](references/toolbars.md), [Lists & Tables](references/lists-and-tables.md).
- **Platforms**: [Designing for iOS](references/designing-for-ios.md), [Designing for macOS](references/designing-for-macos.md), [Designing for iPadOS](references/designing-for-ipados.md), [Designing for visionOS](references/designing-for-visionos.md), [Designing for watchOS](references/designing-for-watchos.md), [Designing for tvOS](references/designing-for-tvos.md), [Designing for Games](references/designing-for-games.md).
- **Technologies & Patterns**: [Generative AI](references/generative-ai.md), [Live Activities](references/live-activities.md), [SF Symbols](references/sf-symbols.md), [Apple Pay](references/apple-pay.md), [Widgets](references/widgets.md), [Spatial Layout](references/spatial-layout.md), [Augmented Reality](references/augmented-reality.md).
- **Developer Assets & Presets**:
  - `assets/apple-tokens.css`: Complete CSS variable design token stylesheet.
  - `assets/apple-components.css`: Ready-to-use CSS components (Buttons, Glass cards, Segmented, Sheets).
  - `assets/tailwind.preset.apple.js`: Tailwind configuration preset.
  - `assets/swiftui-cheat-sheet.md`: Idiomatic SwiftUI patterns.
- **CLI Automation Tools**:
  - `npm run audit`: Scans codebases for Apple HIG violations and anti-patterns.
  - `npm run fetch-hig`: Fetches/updates the entire Apple HIG documentation and illustrations from Apple CDN.

