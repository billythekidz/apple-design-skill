# 🍎 Apple HIG Audit Scorecard

**Product / App Name:** [Name]  
**Target Platform:** [iOS / iPadOS / macOS / visionOS / watchOS]  
**Auditor / Agent:** [Name / Agent]  
**Date:** YYYY-MM-DD  
**Status:** [🟢 App Store Ready / 🟡 Needs Polish / 🔴 High Risk]  

---

## 1. Visual Design & Aesthetic (0–20 pts)
**Section Score:** `/20`

- [ ] **Liquid Glass & Materials**: Translucency hierarchy is applied appropriately (Ultra-thin / Thin / Thick) without cluttering content legibility.
- [ ] **Typography**: Uses San Francisco (`SF Pro`, `SF Compact`, `SF Mono`) or `New York` with proper tracking, line-height, and semantic text hierarchy (`Large Title`, `Title 1-3`, `Headline`, `Body`, `Caption`).
- [ ] **Semantic Color Palette**: Supports Dynamic Light & Dark (OLED black) modes using semantic labels (`label`, `secondaryLabel`, `systemBackground`, `systemBlue`). Avoids generic harsh gradients or cliché "purple on dark" tropes.
- [ ] **Spacing & 8pt Grid**: Layout conforms to consistent 8pt / 16pt / 24pt rhythm with continuous squircle corners.

**Findings & Notes:**
> *[Add specific findings here]*

---

## 2. Navigation & Layout (0–20 pts)
**Section Score:** `/20`

- [ ] **Platform-Native Navigation**: Uses native paradigms (iOS Bottom Tab Bars, iPadOS Collapsible Sidebars, macOS Split Views & Menus, visionOS Ornaments).
- [ ] **Thumb Reachability**: (iOS) Primary interactive controls and destructive actions are ergonomically placed in the reachable bottom half.
- [ ] **Safe Area & Inset Compliance**: UI preserves safe zones around Dynamic Island, Home Indicator, and device curved bezels.
- [ ] **Visual Deference & Breathing Room**: Content remains the primary focus with balanced whitespace and unobtrusive chrome.

**Findings & Notes:**
> *[Add specific findings here]*

---

## 3. Accessibility & Ergonomics (0–30 pts)
**Section Score:** `/30`

- [ ] **Touch Target Sizing**: All buttons, links, and interactive elements meet or exceed **44×44 pt** (visionOS: 60×60 pt).
- [ ] **Color Contrast (WCAG AA)**: Text meets minimum **4.5:1** contrast for normal text and **3:1** for large text against underlying backgrounds / blurred glass.
- [ ] **Dynamic Type & Scaling**: Typography scales fluidly with system accessibility text sizes without clipping or overlapping.
- [ ] **Screen Reader (VoiceOver)**: Interactive elements have descriptive labels, traits, and contextual hints.

**Findings & Notes:**
> *[Add specific findings here]*

---

## 4. Interaction & Motion Physics (0–20 pts)
**Section Score:** `/20`

- [ ] **Spring Dynamics**: Animations utilize realistic spring curves (`cubic-bezier(0.25, 1, 0.5, 1)`) rather than linear or abrupt `ease-in-out` transitions.
- [ ] **Tactile Haptics**: Subtle haptic feedback accompanies primary confirmations, selections, and state changes.
- [ ] **Interactive Feedback**: Buttons and cards exhibit responsive active/pressed scale down (`scale(0.97)`) and highlight states.

**Findings & Notes:**
> *[Add specific findings here]*

---

## 5. Platform Features & Intelligence (0–10 pts)
**Section Score:** `/10`

- [ ] **Native Integration**: Leverages system capabilities (Dynamic Island, Live Activities, Widgets, Apple Pay, Context Menus).
- [ ] **Apple Intelligence / GenAI Clarity**: AI-generated responses are distinguished with clear provenance, confidence indicators, and human-in-the-loop controls.
- [ ] **Keyboard & Shortcuts**: (macOS/iPadOS) Complete keyboard shortcut mapping for primary workflows.

**Findings & Notes:**
> *[Add specific findings here]*

---

## 🏆 Final HIG Compliance Score: `/100`

### Rating Tiers:
- 🟢 **85 – 100 pts: App Store Ready** — Compliant with Apple HIG standards. Ready for release.
- 🟡 **70 – 84 pts: Needs Polish** — Structurally sound, but contains minor contrast, touch-target, or visual violations that should be resolved before release.
- 🔴 **< 70 pts: High Risk** — Critical violations detected (accessibility failures, non-native patterns). Requires systematic redesign.

---

## 📋 Prioritized Action Items

| Priority | Issue Description | Recommendation | Confidence |
| :--- | :--- | :--- | :--- |
| **High** | *e.g. Close button target 32×32pt* | *Expand hit testing area to 44×44pt via padding/contentShape* | 🟢 Tool-verified |
| **Medium** | *e.g. Caption contrast on translucent card* | *Darken text to #6E6E73 or use .secondaryLabel with vibrancy* | 🟢 Tool-verified |
| **Low** | *e.g. Motion duration feels sluggish* | *Switch transition curve to spring cubic-bezier(0.25, 1, 0.5, 1)* | 🟡 Device test |

*Confidence Tags: 🟢 Tool-verified | 🟡 Needs device test | 🔴 Assumed*
