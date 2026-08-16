# Apple Accessibility (a11y) & Haptics Guidelines

## 1. Accessibility First (a11y)

In Apple Human Interface Guidelines, accessibility is not a secondary add-on; it is an intrinsic core design requirement.

### A. Minimum Hit Targets
- **iOS / iPadOS (Touch)**: Minimum **44×44 pt** (`44px` on standard Web @1x baseline). Even if the visual icon is 20×20px, the clickable padding area must be at least 44×44px.
- **macOS (Pointer)**: Minimum **24×24 pt** (Standard controls: `28×28 pt`).
- **visionOS (Gaze)**: Minimum **60×60 pt**.

### B. Dynamic Type Support
- Text must be scalable without breaking layout or clipping.
- Use scalable rem-based typography and flex/grid containers that wrap gracefully when users increase font size.

### C. Color Contrast & Legibility
- **WCAG AA Standard**: Minimum contrast ratio of **4.5:1** for body text and **3.0:1** for large text (>= 18pt / 24px) against backgrounds.
- Never rely exclusively on color to convey critical status (always pair color with an icon or clear text label).

### D. Reduce Motion & Reduced Transparency
Respect user preferences when motion sickness or visual fatigue triggers are enabled:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .apple-glass-panel,
  .apple-material-ultrathin {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: var(--system-background) !important;
  }
}
```

---

## 2. Haptic Feedback Semantics (Taptic Engine)

Apple devices feature precision haptics that physically confirm actions.

| Haptic Type | Scenario | Native API (SwiftUI / UIKit) | Web API Trigger |
| :--- | :--- | :--- | :--- |
| **Selection** | Scrolling through picker wheels, tab switching | `UISelectionFeedbackGenerator().selectionChanged()` | `navigator.vibrate?.(10)` |
| **Light Impact** | Button press, toggle switch flip | `UIImpactFeedbackGenerator(style: .light).impactOccurred()` | `navigator.vibrate?.(15)` |
| **Medium Impact** | Drag and drop snap into position | `UIImpactFeedbackGenerator(style: .medium).impactOccurred()` | `navigator.vibrate?.(25)` |
| **Heavy Impact** | Hard limit reached, delete action confirmation | `UIImpactFeedbackGenerator(style: .heavy).impactOccurred()` | `navigator.vibrate?.(40)` |
| **Success** | Payment confirmed (Apple Pay), sync complete | `UINotificationFeedbackGenerator().notificationOccurred(.success)` | `navigator.vibrate?.([15, 30, 20])` |
| **Error / Warning**| Failed passcode entry, validation error | `UINotificationFeedbackGenerator().notificationOccurred(.error)` | `navigator.vibrate?.([30, 40, 30, 40, 50])` |
