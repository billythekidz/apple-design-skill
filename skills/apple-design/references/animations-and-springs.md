# Apple Motion & Spring Physics Guide

## 1. Principles of Apple Motion

In Apple's ecosystem, interface animations are modeled after **real-world Newtonian physics** rather than arbitrary cubic bezier curves.

- **Continuity**: An element never stops abruptly. If interrupted midway by a user gesture, the velocity carries over smoothly without jarring jumps.
- **Responsiveness**: Interactive gestures (touches, drags) lock 1:1 to finger movement without input lag.
- **Restraint**: Animations serve to orient the user within spatial depth, not to show off flashy transitions.

---

## 2. Spring Physics Parameters

In SwiftUI / UIKit / Web Physics Engines, springs are defined by:
- **Mass ($m$)**: Heaviness of the object (default ~ `1.0`).
- **Stiffness ($k$)**: Tensional pull toward target (values: `100` to `500`).
- **Damping ($c$)**: Friction reducing oscillation (values: `20` to `40`).
- **Damping Ratio ($\zeta$)**:
  - $\zeta < 1.0$: Underdamped (bouncy)
  - $\zeta = 1.0$: Critically damped (smooth, no overshoot)
  - $\zeta > 1.0$: Overdamped (sluggish)

---

## 3. Standard Apple Spring Presets & Equivalencies

| Scenario | SwiftUI Specification | Framer Motion (React) | CSS Cubic-Bezier Approx |
| :--- | :--- | :--- | :--- |
| **Interactive Tap / Press** | `.spring(response: 0.3, dampingFraction: 0.7)` | `{ type: "spring", stiffness: 400, damping: 30 }` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| **Modal Sheet Presentation** | `.spring(response: 0.45, dampingFraction: 0.85)` | `{ type: "spring", stiffness: 280, damping: 28 }` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| **Bouncy Toggle / Selection**| `.spring(response: 0.35, dampingFraction: 0.6)` | `{ type: "spring", stiffness: 350, damping: 20 }` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| **Smooth Content Expansion** | `.spring(response: 0.5, dampingFraction: 0.9)` | `{ type: "spring", stiffness: 200, damping: 25 }` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 4. Code Implementation Examples

### CSS Implementation
```css
:root {
  --apple-ease-interactive: cubic-bezier(0.25, 1, 0.5, 1);
  --apple-ease-sheet: cubic-bezier(0.32, 0.72, 0, 1);
  --apple-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --apple-duration-fast: 0.2s;
  --apple-duration-normal: 0.35s;
  --apple-duration-sheet: 0.5s;
}

/* Button Tap Feedback */
.apple-button-interactive {
  transition: transform var(--apple-duration-fast) var(--apple-ease-interactive),
              opacity var(--apple-duration-fast) ease,
              background-color var(--apple-duration-fast) ease;
}

.apple-button-interactive:active {
  transform: scale(0.965);
  opacity: 0.9;
}

/* Fluid Sheet Modal */
.apple-sheet-enter {
  transform: translateY(100%);
  transition: transform var(--apple-duration-sheet) var(--apple-ease-sheet);
}

.apple-sheet-enter-active {
  transform: translateY(0%);
}
```

### Framer Motion / Web Animations (React)
```tsx
import { motion } from "framer-motion";

export const AppleSpringCard = ({ children }) => (
  <motion.div
    whileHover={{ y: -2, transition: { duration: 0.2, ease: "easeOut" } }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className="apple-card"
  >
    {children}
  </motion.div>
);
```

### SwiftUI Implementation
```swift
struct AppleInteractiveCard: View {
    @State private var isPressed = false
    
    var body: some View {
        RoundedRectangle(cornerRadius: 16, style: .continuous)
            .fill(Color(.secondarySystemGroupedBackground))
            .scaleEffect(isPressed ? 0.97 : 1.0)
            .animation(.spring(response: 0.3, dampingFraction: 0.7), value: isPressed)
    }
}
```
