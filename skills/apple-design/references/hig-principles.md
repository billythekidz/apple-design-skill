# Apple Human Interface Guidelines (HIG) Principles

## 1. The Trinity of Apple Design

### Clarity
Clarity is the foremost principle. Throughout the system, text is legible at every size, icons are precise and lucid, adornments are subtle and appropriate, and a heightened focus on functionality motivates the design. Negative space, color, fonts, graphics, and interface elements subtly highlight important content and convey interactivity.

- **Legibility Over Ornamentation**: Never sacrifice reading ease for aesthetic flourish.
- **Direct Manipulation**: Interfaces respond directly to user touch, gestures, or pointer movements with immediate visual and physical feedback.
- **Unambiguous Hierarchy**: The primary action or state on any screen must be immediately obvious within 500ms of viewing.

### Deference
Fluid motion and a crisp, beautiful interface help people understand and interact with content while never competing with it. Content typically fills the entire screen, while translucency and blurring hint at additional layers. Minimal use of bezels, gradients, and drop shadows keeps the interface light and airy.

- **Content-First Canvas**: Let photos, text, and rich data be the hero.
- **Dynamic Chrome**: Header bars, toolbars, and controls recede into frosted glass during scrolling or active immersion.
- **Adaptive Layouts**: Seamless transitions between Size Classes (Compact vs. Regular) across iPhone, iPad, Mac, and Vision Pro.

### Depth
Visual layers and realistic motion impart vitality and heighten delight. They facilitate understanding by giving the interface a palpable sense of physical space and hierarchy.

- **Z-Axis Hierarchy**:
  - Layer 0: Background Canvas (`--system-background`)
  - Layer 1: Grouped Cards & Lists (`--secondary-system-background` / `--secondary-grouped-background`)
  - Layer 2: Elevated Popovers & Modals (`--tertiary-system-background`)
  - Layer 3: Floating Chrome & Materials (`ultraThin` / `thin` blurred surfaces)
  - Layer 4: Global Overlays, Dynamic Island, System Alerts
- **Lighting & Specular Reflections**: Subtle 1px translucent borders (`rgba(255, 255, 255, 0.15)`) simulate light hitting the top edge of glass surfaces in Dark Mode.

---

## 2. Platform-Specific Design Nuances

| Platform | Primary Input | Spatial Context | Corner Radius Scale | Target Sizing |
| :--- | :--- | :--- | :--- | :--- |
| **iOS** | Multi-Touch (Direct) | Handheld / Dynamic Island | 10px - 28px (Squircle) | 44×44 pt minimum |
| **iPadOS** | Touch + Pencil + Trackpad | Tablet / Stage Manager | 12px - 32px | 44×44 pt (Touch) / 32×32 pt (Pointer) |
| **macOS** | Mouse / Trackpad / Keyboard | Desktop Windows & Menu Bar | 6px - 16px | 24×24 pt - 28×28 pt |
| **watchOS** | Digital Crown + Quick Taps | Glanceable Wrist OLED | 16px - 26px (Pill/Corner) | Full-width vertical cards |
| **visionOS** | Eye Gaze + Finger Pinch | Infinite 3D Spatial Canvas | 28px - 44px (Deep Glass) | 60×60 pt gaze targets |

---

## 3. Gestural Integrity
- **Predictable Physics**: Scrolling must include inertial deceleration and rubber-banding overscroll resistance.
- **Interactive Dismissal**: Modals and sheets must be swipeable to dismiss with velocity-aware spring return if cancelled.
- **Edge Swipe**: Preserve edge-swipe gestures for back navigation across all screen hierarchies.
