<div align="center">

# 🍎 Apple Design Skill

**Apple Human Interface Guidelines (HIG) & Design System Skill for AI Coding Agents**

[![skills.sh](https://img.shields.io/badge/skills.sh-standard-blue?style=flat-square)](https://skills.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/billythekidz/apple-design-skill?style=flat-square)](https://github.com/billythekidz/apple-design-skill)

**English** | [Tiếng Việt](README.vi.md)

---

Equip any AI Coding Agent with official **Apple Human Interface Guidelines (HIG)**, SF Pro typography scale, Dynamic OLED colors, Frosted Glass materials, continuous squircle curvature, and authentic spring motion physics.

</div>

---

## ⚡ Overview

**`apple-design-skill`** is an open-standard agent skill built on the **`skills.sh` / Vercel Labs (`npx skills`)** specification. It enables AI coding assistants (Claude Code, Cursor, GitHub Copilot, Google Antigravity, Windsurf, Cline, Roo-Code, etc.) to accurately design, implement, and audit Apple-grade interfaces across Web, iOS, iPadOS, macOS, watchOS, and visionOS.

### ✨ Highlights:
- 📖 **172 Complete HIG Reference Docs**: Official Apple Developer guidelines converted into clean Markdown with **451+ local Retina illustrations**.
- 🎨 **Code-Ready Design Tokens & Presets**: CSS Variables, Tailwind CSS Preset, and pre-built components (Filled/Tinted Buttons, Frosted Glass Cards, Inset Grouped Lists, Segmented Controls, Sheets).
- 🚫 **Strict Anti-Pattern Enforcement**: Eliminates cliché tropes (e.g. purple-on-dark neon glow, harsh undiffused shadows, touch targets < 44pt).
- 🔍 **Automated 0–100 HIG Audit Engine**: Built-in CLI tool for codebase linting, WCAG relative luminance contrast calculation, touch target verification, and structured scorecard generation.

---

## 🚀 Installation

Install via standard **`npx skills`**:

### 1. Install for ALL configured AI Agents on your machine:
```bash
npx skills add billythekidz/apple-design-skill --all
```

### 2. Global Installation (available across all workspaces):
```bash
npx skills add billythekidz/apple-design-skill -g
```

### 3. Install for a specific AI Agent:
```bash
# Claude Code
npx skills add billythekidz/apple-design-skill -a claude-code

# Cursor
npx skills add billythekidz/apple-design-skill -a cursor

# GitHub Copilot
npx skills add billythekidz/apple-design-skill -a copilot

# Google Antigravity / Gemini CLI
npx skills add billythekidz/apple-design-skill -a antigravity

# Windsurf / Cline / Roo-Code
npx skills add billythekidz/apple-design-skill -a windsurf
```

---

## 🎯 Operational Modes

AI Agents equipped with this skill operate in two primary workflows:

### Mode 1 — Design & Build from Scratch
- **Platform Navigation**: Selects native paradigms (iOS Bottom Tab Bars, iPadOS Sidebars, macOS Split Views, visionOS Ornaments).
- **Spatial Grid & Corners**: Enforces 8pt layout grid with continuous G2 squircle corners (`corner-smoothing: 60%`).
- **Typography & Color**: Applies SF Pro optical sizing with tight letter-spacing and dynamic semantic labels (`label`, `secondaryLabel`, `systemBackground`).
- **Tactile Motion**: Uses Apple spring curves (`cubic-bezier(0.25, 1, 0.5, 1)`) with `:active { transform: scale(0.97); }` feedback.

### Mode 2 — Apple HIG Compliance Audit & Scoring
- **Automated Scanning**: Scans CSS/HTML/TSX/JSX/Swift codebases and calculates a **0–100 score** with a `-10 pts per violation` rubric.
- **Precision Validation**: Computes exact WCAG contrast ratios and 44×44pt touch-target compliance.
- **Confidence Tagging**: Classifies findings with `🟢 Tool-verified`, `🟡 Needs device test`, or `🔴 Assumed`.

---

## 💡 Prompt Examples

- **Web Landing Page:**
  > *"Build a modern product landing page following Apple HIG aesthetics with SF Pro typography, frosted glass header, and spring active buttons."*

- **iOS Settings View:**
  > *"Create an iOS Settings screen using the standard Inset Grouped List pattern with squircle icon containers and switch toggles."*

- **visionOS Spatial UI:**
  > *"Design a visionOS floating glass panel with subtle specular borders, ornaments, and gaze hover states."*

- **Design Audit & Review:**
  > *"Audit this screen against Apple HIG for color contrast, 44pt tap targets, 8pt spacing grid, and dark mode accessibility."*

---

## 🛠️ CLI & Audit Engine

Zero-dependency CLI tool built into the package:

```bash
# 1. Full codebase scan & 0-100 score generation:
npm run audit

# 2. Check WCAG AA/AAA color contrast ratio:
node skills/apple-design/scripts/audit-apple-design.mjs contrast "#8E8E93" "#FFFFFF"

# 3. Validate touch target size (44x44 pt minimum):
node skills/apple-design/scripts/audit-apple-design.mjs target 32 32

# 4. Run batch JSON checks:
node skills/apple-design/scripts/audit-apple-design.mjs batch audit.json

# 5. Fetch / update all 172 documentation pages and 451 images from Apple CDN:
npm run fetch-hig
```

### 📋 Audit Scorecard Template:
Use the standard 5-pillar evaluation scorecard at [`skills/apple-design/templates/apple-hig-audit-scorecard.md`](skills/apple-design/templates/apple-hig-audit-scorecard.md).

#### Rating Tiers:
- 🟢 **90 – 100 pts: Ship** — Certified Apple HIG compliance. Ready for App Store submission.
- 🟡 **70 – 89 pts: Fix Before Release** — Structurally compliant, but minor contrast or touch target violations must be resolved.
- 🔴 **< 70 pts: Systematic Redesign** — Significant accessibility or platform architectural violations detected.

---

## 📁 Repository Structure

```text
apple-design-skill/
├── skills/
│   └── apple-design/
│       ├── SKILL.md                 # Core instructions & trigger rules for AI agents
│       ├── references/              # 172 comprehensive HIG markdown docs + INDEX.md + local images
│       ├── assets/                  # apple-tokens.css, apple-components.css, tailwind preset, SwiftUI
│       ├── templates/               # apple-hig-audit-scorecard.md
│       └── scripts/                 # audit-apple-design.mjs, fetch-apple-hig.mjs
├── SKILL.md                         # Root skill definition for single-skill discovery
├── package.json                     # NPM manifest & CLI binaries
├── LICENSE                          # MIT License
├── README.md                        # English documentation
└── README.vi.md                     # Vietnamese documentation
```

---

## 📄 License

Released under the [MIT License](LICENSE) by [@billythekidz](https://github.com/billythekidz).
