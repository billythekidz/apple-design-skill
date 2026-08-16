# Apple Spatial Computing & visionOS Design Guidelines

## 1. Core visionOS Spatial Principles

Spatial computing in visionOS breaks past 2D rectangular screen boundaries into unbounded 3D space while anchoring interfaces to the user's natural physical environment.

### 1. Glass Material (The Foundation of visionOS)
- Windows in visionOS do not have opaque backgrounds. They are constructed entirely from dynamic translucent **Glass**.
- The glass material automatically absorbs dynamic lighting from the physical surroundings, casting subtle shadows in real space and reacting dynamically to light sources.
- **Rule**: Never use solid black or fully opaque cards for primary windows in visionOS.

```css
/* Web approximation of visionOS Glass material */
.visionos-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px) saturate(160%) brightness(110%);
  -webkit-backdrop-filter: blur(40px) saturate(160%) brightness(110%);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25),
              0 1px 0 rgba(255, 255, 255, 0.3) inset;
  border-radius: 36px;
}
```

---

## 2. Spatial Interaction: Gaze and Pinch

- **Eye Tracking + Tap**: Users look directly at an interactive control (eyes become the cursor) and tap thumb and index finger together to click.
- **Hover Effect (Gaze Highlight)**:
  - When the user looks at an element, it glows subtly with a translucent specular wash (`rgba(255, 255, 255, 0.15)`) and slightly scales forward on the Z-axis (`translateZ(4px)`).
  - Target Sizing: Minimum hit target in visionOS is **60×60 pt** to accommodate natural micro-saccades of the human eye.

---

## 3. Ornaments and Volumetric UI

- **Ornaments**: Controls or toolbars that float slightly in front of or anchored below the main window (e.g. Tab Bars floating outside the window bottom).
- **Depth Layers**:
  - Main Window Canvas: $Z = 0$
  - Active Content Cards: $Z = +8\text{px}$
  - Floating Toolbars / Ornaments: $Z = +16\text{px}$
  - Modal Sheets & Confirmations: $Z = +32\text{px}$
