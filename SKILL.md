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
    --system-background: #000000;
    --secondary-system-background: #1C1C1E;
    --tertiary-system-background: #2C2C2E;
    --label-primary: #FFFFFF;
    --label-secondary: rgba(235, 235, 245, 0.60);
    --label-tertiary: rgba(235, 235, 245, 0.30);
    --system-blue: #0A84FF;
    --system-green: #30D158;
    --system-indigo: #5E5CE6;
    --system-orange: #FF9F0A;
    --system-red: #FF453A;
  }
}
```

---

### C. Materials, Translucency & Continuous Curvature

```css
/* Authentic Apple Frosted Glass */
.apple-glass {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(190%);
  -webkit-backdrop-filter: blur(20px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

@media (prefers-color-scheme: dark), [data-theme="dark"] {
  .apple-glass {
    background: rgba(28, 28, 30, 0.75);
    backdrop-filter: blur(25px) saturate(190%);
    -webkit-backdrop-filter: blur(25px) saturate(190%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
}
```

---

## 4. Animation Physics (Apple Spring Curves)

```css
.apple-spring-interactive {
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s ease;
}
.apple-spring-interactive:active {
  transform: scale(0.965);
}
```

---

## 5. References & Bundled Assets

This skill includes **172 complete official Apple Human Interface Guidelines** documentation pages with **451+ local illustrations**:
- **[Master HIG Catalog (INDEX.md)](skills/apple-design/references/INDEX.md)**: Searchable index of all 172 guideline topics.
- `skills/apple-design/references/` (172 `.md` files + local images).
- `skills/apple-design/assets/apple-tokens.css`: Core CSS design tokens.
- `skills/apple-design/assets/apple-components.css`: Pre-built Apple HIG CSS components.
- `skills/apple-design/assets/tailwind.preset.apple.js`: Tailwind CSS preset.
- `skills/apple-design/assets/swiftui-cheat-sheet.md`: Idiomatic SwiftUI patterns.
- `npm run audit`: Automated Apple HIG compliance audit tool.
- `npm run fetch-hig`: Tool to re-fetch/update documentation and images from Apple.

