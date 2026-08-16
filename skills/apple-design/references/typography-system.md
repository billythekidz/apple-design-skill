# Apple Typography System (San Francisco & New York)

## 1. The San Francisco Font Family

Apple uses the **San Francisco (SF)** font family across all platforms. SF is an optical-sizing sans-serif designed specifically for ultra-crisp legibility across Retina displays.

### Font Variants
- **SF Pro**: Primary typeface for iOS, iPadOS, macOS, and Web.
  - *SF Pro Display*: Optimized for sizes **20pt and larger**. Features tighter apertures and tighter letter-spacing.
  - *SF Pro Text*: Optimized for sizes **under 20pt**. Features wider apertures and larger x-height for extreme legibility at small sizes.
- **SF Compact**: Optimized for Apple Watch with flat vertical stems to maximize horizontal space.
- **SF Mono**: Fixed-width font for code, terminal output, and tabular data.
- **New York**: Apple's modern serif companion typeface.

---

## 2. Web Typography Font Stack

For web applications implementing Apple Design, use this standardized font stack:

```css
/* Standard Apple Sans Stack */
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Monospace Stack */
font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

/* Serif Stack */
font-family: "New York", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
```

---

## 3. Typographic Metrics & Optical Tracking Table

| Token Name | Font Size | Weight | Line Height | Letter Spacing (Tracking) | CSS `letter-spacing` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `font-large-title` | 34px / 2.125rem | Bold (700) | 41px (1.2) | -0.75px / -22‰ | `-0.022em` |
| `font-title-1` | 28px / 1.750rem | Bold (700) | 34px (1.21) | -0.56px / -20‰ | `-0.020em` |
| `font-title-2` | 22px / 1.375rem | Bold / SemiBold | 28px (1.27) | -0.40px / -18‰ | `-0.018em` |
| `font-title-3` | 20px / 1.250rem | SemiBold (600) | 25px (1.25) | -0.30px / -15‰ | `-0.015em` |
| `font-headline` | 17px / 1.0625rem | SemiBold (600) | 22px (1.29) | -0.20px / -12‰ | `-0.012em` |
| `font-body` | 17px / 1.0625rem | Regular (400) | 22px (1.29) | -0.17px / -10‰ | `-0.010em` |
| `font-callout` | 16px / 1.000rem | Regular (400) | 21px (1.31) | -0.13px / -8‰ | `-0.008em` |
| `font-subheadline`| 15px / 0.9375rem | Regular (400) | 20px (1.33) | -0.08px / -5‰ | `-0.005em` |
| `font-footnote` | 13px / 0.8125rem | Regular (400) | 18px (1.38) | 0.00px / 0‰ | `0.000em` |
| `font-caption-1` | 12px / 0.750rem | Regular (400) | 16px (1.33) | +0.06px / +5‰ | `+0.005em` |
| `font-caption-2` | 11px / 0.6875rem | Medium (500) | 13px (1.18) | +0.11px / +10‰ | `+0.010em` |

---

## 4. Advanced OpenType Features

For pixel-perfect typographic rendering on Apple displays:

```css
.apple-type-refined {
  /* Crisp anti-aliasing */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  
  /* OpenType features for SF Pro numbers */
  font-feature-settings: "cv01" on, "cv02" on, "tnum" on; /* proportional/tabular figures */
}
```

---

## 5. Dynamic Type Guidelines
- Always use relative units (`rem` or `em`) rooted in standard 16px baseline for web, allowing browser font scale adjustments.
- Never clamp body copy so small that it is unreadable (minimum readable web body size is 14px; default is 16px/17px).
