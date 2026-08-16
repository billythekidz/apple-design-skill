# Apple Color Palette & Translucent Materials

## 1. System Colors (Light vs. Dark Appearance)

Apple defines dynamic tint colors that subtly boost brightness and luma in dark mode to prevent visual fatigue and ensure optimal contrast against pure OLED blacks (`#000000`) and dark grays (`#1C1C1E`).

| Semantic Color | Light Mode (Hex / RGB) | Dark Mode (Hex / RGB) | Typical Role |
| :--- | :--- | :--- | :--- |
| **System Blue** | `#007AFF` `rgb(0, 122, 255)` | `#0A84FF` `rgb(10, 132, 255)` | Primary actions, links, active selections |
| **System Green** | `#34C759` `rgb(52, 199, 89)` | `#30D158` `rgb(48, 209, 88)` | Success, positive trends, completed status |
| **System Indigo**| `#5856D6` `rgb(88, 86, 214)` | `#5E5CE6` `rgb(94, 92, 230)` | Brand elements, featured items |
| **System Orange**| `#FF9500` `rgb(255, 149, 0)` | `#FF9F0A` `rgb(255, 159, 10)` | Warnings, highlights, in-progress tags |
| **System Pink** | `#FF2D55` `rgb(255, 45, 85)` | `#FF375F` `rgb(255, 55, 95)` | Health, favorites, media tags |
| **System Purple**| `#AF52DE` `rgb(175, 82, 222)` | `#BF5AF2` `rgb(191, 90, 242)` | Special actions, badges |
| **System Red** | `#FF3B30` `rgb(255, 59, 48)` | `#FF453A` `rgb(255, 69, 58)` | Errors, destructive actions, alarms |
| **System Teal** | `#5AC8FA` `rgb(90, 200, 250)` | `#64D2FF` `rgb(100, 210, 255)` | Secondary accents, tools |
| **System Yellow**| `#FFCC00` `rgb(255, 204, 0)` | `#FFD60A` `rgb(255, 214, 10)` | Ratings, stars, warnings |

---

## 2. System Grays & Hierarchical Labels

| Semantic Token | Light Mode Value | Dark Mode Value | Usage Context |
| :--- | :--- | :--- | :--- |
| **Label (Primary)** | `#000000` `rgba(0, 0, 0, 1)` | `#FFFFFF` `rgba(255, 255, 255, 1)` | Primary headlines, titles, active text |
| **Secondary Label** | `rgba(60, 60, 67, 0.60)` | `rgba(235, 235, 245, 0.60)` | Subtitles, secondary metadata, timestamps |
| **Tertiary Label** | `rgba(60, 60, 67, 0.30)` | `rgba(235, 235, 245, 0.30)` | Placeholder text, disabled labels, icons |
| **Quaternary Label** | `rgba(60, 60, 67, 0.18)` | `rgba(235, 235, 245, 0.16)` | Decorative watermarks, subtle dividers |
| **System Gray 1** | `#8E8E93` | `#8E8E93` | Base neutral gray |
| **System Gray 2** | `#AEAEB2` | `#636366` | Secondary neutral fill |
| **System Gray 3** | `#C7C7CC` | `#48484A` | Subtle border and element stroke |
| **System Gray 4** | `#D1D1D6` | `#3A3A3C` | Container backgrounds |
| **System Gray 5** | `#E5E5EA` | `#2C2C2E` | Card surface in grouped views |
| **System Gray 6** | `#F2F2F7` | `#1C1C1E` | Canvas surface in grouped views |

---

## 3. Background Elevation Hierarchy

Apple uses hierarchical canvas layers to establish z-depth without harsh borders:

### Light Mode Hierarchy:
- **Base Canvas**: `#FFFFFF` (Standard) or `#F2F2F7` (Grouped / Inset views)
- **Secondary Surface (Cards / Grouped Rows)**: `#FFFFFF` on `#F2F2F7` background
- **Tertiary Surface (Floating Popovers / Modals)**: `#FFFFFF` with soft diffused shadow (`0 12px 36px rgba(0,0,0,0.1)`)

### Dark Mode Hierarchy:
- **Base Canvas**: `#000000` (Pure OLED black)
- **Secondary Surface (Elevated Content / Cards)**: `#1C1C1E` (Dark Charcoal)
- **Tertiary Surface (Modals / Popovers)**: `#2C2C2E` (Elevated Slate)
- **Quaternary Surface (Inputs / Internal Wells)**: `#3A3A3C`

---

## 4. Materials & Blurs (Frosted Glass / Vibrancy)

Apple materials provide context by allowing content behind to bleed through gracefully.

```css
/* Standard Apple Material Blur Presets */

/* Ultra-Thin: Suitable for top navigation bars and bottom tab bars */
--material-ultra-thin-light: rgba(255, 255, 255, 0.72);
--material-ultra-thin-dark: rgba(28, 28, 30, 0.75);

/* Thin: Suitable for sidebars, context menus, and small overlays */
--material-thin-light: rgba(255, 255, 255, 0.82);
--material-thin-dark: rgba(36, 36, 38, 0.85);

/* Regular: Suitable for sheets, floating panels, and action sheets */
--material-regular-light: rgba(245, 245, 247, 0.90);
--material-regular-dark: rgba(44, 44, 46, 0.90);

/* Thick: Suitable for modals with high contrast requirements */
--material-thick-light: rgba(255, 255, 255, 0.96);
--material-thick-dark: rgba(50, 50, 52, 0.96);
```

### CSS Implementation Recipe for Frosted Glass:
```css
.apple-glass-panel {
  background: var(--material-ultra-thin-light);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04),
              0 1px 2px rgba(0, 0, 0, 0.02);
}

@media (prefers-color-scheme: dark), [data-theme="dark"] {
  .apple-glass-panel {
    background: var(--material-ultra-thin-dark);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.36),
                0 1px 0 rgba(255, 255, 255, 0.08) inset;
  }
}
```
