# Apple Components & Layout Architecture

## 1. Grid, Spacing & Layout Rules

Apple interfaces utilize an **8-point spatial grid** for margins, paddings, and component sizing, with **4-point micro-increments** for tight controls.

| Token | Dimension | Common Usage |
| :--- | :--- | :--- |
| `space-1` | 4px | Icon-to-text micro gap, compact badge padding |
| `space-2` | 8px | Segmented control padding, button icon gap, row vertical margin |
| `space-3` | 12px | List item vertical padding, card inner gutter |
| `space-4` | 16px | Standard screen margin (iOS), card internal padding, list row horizontal padding |
| `space-5` | 20px | Inset grouped list side margins on larger displays |
| `space-6` | 24px | Section separation, modal title bottom margin |
| `space-8` | 32px | Major section vertical gaps |
| `space-12`| 48px | Hero header top padding |

---

## 2. Corner Radii & Superellipse Continuity

Avoid standard sharp border radii. Apple uses continuous squircle curvature:

```
R = Scale Factor × Base Sizing
```

- **Capsule / Pill**: `border-radius: 9999px` (Search bars, status pills, filter chips)
- **Buttons**: `border-radius: 12px` (Regular) / `8px` (Small)
- **List Cards & Form Groups**: `border-radius: 16px` to `20px`
- **Floating Modals & Sheets**: `border-radius: 28px` to `36px`
- **Dynamic Island / Vision Panels**: `border-radius: 36px` to `44px`

---

## 3. Core Component Specifications

### A. Apple Buttons (4 Standard Variants)

1. **Filled (Prominent Action)**
   - Background: `var(--system-blue)`
   - Color: `#FFFFFF`
   - Height: `44px` (regular) / `32px` (compact) / `50px` (prominent large)
   - Border Radius: `12px` / Capsule `9999px`
   - Font: SF Pro Text `17px SemiBold`
   - Active state: `transform: scale(0.97); filter: brightness(0.92);`

2. **Tinted (Secondary Action)**
   - Background: `rgba(0, 122, 255, 0.12)` (Light) / `rgba(10, 132, 255, 0.20)` (Dark)
   - Color: `var(--system-blue)`
   - Height: `44px`

3. **Gray (Tertiary Action)**
   - Background: `var(--quaternary-system-fill)`
   - Color: `var(--label-primary)`
   - Height: `44px`

4. **Plain (Border-less Navigation / Toolbar)**
   - Background: `transparent`
   - Color: `var(--system-blue)`
   - Padding: `8px 12px`

---

### B. Segmented Control
- Height: `32px` to `36px`
- Track: Background `var(--tertiary-system-fill)`, border radius `8px` to `10px`, padding `2px`
- Thumb (Active Item):
  - Light mode: `#FFFFFF`, `box-shadow: 0 2px 6px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.04)`
  - Dark mode: `var(--tertiary-system-background)`, `box-shadow: 0 2px 8px rgba(0,0,0,0.4)`
- Interaction: Smooth horizontal translation with interactive spring physics.

---

### C. Inset Grouped List (Apple Settings Pattern)
- Container: Background `var(--system-grouped-background)`
- Grouped Card: Background `var(--secondary-grouped-background)`, `border-radius: 16px`, `margin: 0 16px 24px 16px`
- Row Height: `44px` minimum
- Row Layout:
  - Leading: SF Symbol in colored squircle background (`28×28px`, `border-radius: 7px`)
  - Title: SF Pro Text `17px Regular`, `color: var(--label-primary)`
  - Trailing: Detail label (`var(--label-secondary)`) + Disclosure chevron (`chevron.right` icon)
- Separator: `0.5px solid var(--separator)` indented to align with the text (`margin-left: 56px`), never crossing full-width under leading icons.

---

### D. Navigation Bar with Collapsible Large Title
1. **Initial State (At scroll top)**:
   - Header is transparent or blend.
   - Large Title: `34px Bold` rendered in the page body flow.
2. **Scrolled State (When content scrolls under navigation)**:
   - Nav bar background engages ultra-thin frosted glass blur.
   - Large Title fades out smoothly with upward translation.
   - Inline Title (`17px SemiBold`) fades into the center of the 44px top bar.
   - Bottom hairline border `0.5px solid var(--separator)` appears.

---

### E. Sheet / Modal (Apple Inset Bottom Sheet)
- Bottom Sheet Detents:
  - **Medium**: Expands to `50vh` with swipe gesture.
  - **Large**: Expands to `92vh` with top `10px` gap revealing parent card scaled to `0.94` scale.
- Drag Indicator (Grabber Pill):
  - Width: `36px`, Height: `5px`, Radius: `2.5px`, Color: `var(--tertiary-label)`.
  - Position: Centered `8px` from top of sheet.
