<div align="center">

# 🍎 Apple Design Skill

**Apple Human Interface Guidelines (HIG) & Design System Skill for AI Coding Agents**

[![skills.sh](https://img.shields.io/badge/skills.sh-standard-blue?style=flat-square)](https://skills.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/billythekidz/apple-design-skill?style=flat-square)](https://github.com/billythekidz/apple-design-skill)

[English](README.md) | **Tiếng Việt**

---

Trang bị toàn bộ triết lý thiết kế **Apple Human Interface Guidelines (HIG)**, hệ thống Typography SF Pro, Dynamic Colors, Frosted Glass Materials, Continuous Squircle Curves và Motion Springs cho mọi AI Coding Agent.

</div>

---

## ⚡ Giới thiệu ngắn gọn

**`apple-design-skill`** là gói kỹ năng mã nguồn mở theo chuẩn **`skills.sh` / Vercel Labs (`npx skills`)** giúp các AI Agent (Claude Code, Antigravity, Codex, Cursor, GitHub Copilot, Windsurf, Cline, Roo-Code, v.v.) tự động nắm vững và áp dụng các tiêu chuẩn thiết kế đỉnh cao của Apple khi viết mã giao diện (Web, iOS, macOS, visionOS).

### ✨ Điểm nổi bật:
- 📖 **172 Tài liệu HIG chi tiết**: Toàn bộ tài liệu chính thức từ Apple Developer được chuyển đổi sang Markdown chuẩn, kèm **451+ hình ảnh minh họa Retina** lưu offline.
- 🎨 **Bộ Design Tokens & Components dựng sẵn**: CSS Variables, Tailwind CSS Preset, và các mẫu component (Nút bấm, Thẻ kính mờ, Inset Grouped, Segmented Controls).
- 🚫 **Loại bỏ Anti-Patterns**: Cấm màu tím trên nền đen, cấm bóng đổ đen đục, cấm bo góc sắc nhọn, cấm touch target < 44pt.
- 🔍 **Audit Tool tự động**: CLI tool tích hợp sẵn giúp kiểm tra mã nguồn, tính tương phản màu WCAG, kiểm tra kích thước vùng chạm và chấm điểm theo thang điểm 0–100.

---

## 🚀 Hướng dẫn cài đặt Toàn cục (Global Scope)

Cài đặt ở phạm vi toàn cục (`-g`) để kỹ năng có hiệu lực ngay lập tức trên **tất cả dự án và thư mục làm việc** của bạn.

### 🌟 Cách nhanh nhất: Cài đặt cho TẤT CẢ Agents cùng lúc
```bash
npx skills add billythekidz/apple-design-skill --all -g
```

---

### 📦 Cài đặt chi tiết cho từng AI Agent (Global Scope)

#### 1. Claude Code
Cài đặt vào thư mục cấu hình toàn cục của Claude Code (`~/.claude/skills/apple-design`):
```bash
npx skills add billythekidz/apple-design-skill -a claude-code -g
```
*Cách clone git thủ công (nếu không dùng npx):*
```bash
# macOS / Linux
git clone https://github.com/billythekidz/apple-design-skill.git ~/.claude/skills/apple-design

# Windows (PowerShell)
git clone https://github.com/billythekidz/apple-design-skill.git $HOME\.claude\skills\apple-design
```

#### 2. Google Antigravity / Gemini CLI
Cài đặt vào thư mục kĩ năng toàn cục của Google Antigravity (`~/.gemini/antigravity-cli/skills/apple-design`):
```bash
npx skills add billythekidz/apple-design-skill -a antigravity -g
```
*Cách clone git thủ công:*
```bash
# macOS / Linux
git clone https://github.com/billythekidz/apple-design-skill.git ~/.gemini/antigravity-cli/skills/apple-design

# Windows (PowerShell)
git clone https://github.com/billythekidz/apple-design-skill.git $HOME\.gemini\antigravity-cli\skills\apple-design
```

#### 3. OpenAI Codex (Codex CLI)
Cài đặt vào kho kỹ năng toàn cục của Codex (`~/.codex/skills/apple-design`):
```bash
npx skills add billythekidz/apple-design-skill -a codex -g
```
*Cách clone git thủ công:*
```bash
# macOS / Linux
git clone https://github.com/billythekidz/apple-design-skill.git ~/.codex/skills/apple-design

# Windows (PowerShell)
git clone https://github.com/billythekidz/apple-design-skill.git $HOME\.codex\skills\apple-design
```

#### 4. Các trợ lý AI khác (Cursor, Copilot, Windsurf, Cline)
```bash
# Cursor
npx skills add billythekidz/apple-design-skill -a cursor -g

# GitHub Copilot CLI / Extension
npx skills add billythekidz/apple-design-skill -a copilot -g

# Windsurf / Cline / Roo-Code
npx skills add billythekidz/apple-design-skill -a windsurf -g
```

---

## 🎯 2 Chế độ hoạt động (Operational Modes)

### Mode 1 — Thiết kế & Lập trình từ đầu (Design from Scratch)
- **Kiến trúc điều hướng**: Sử dụng mô hình chuẩn của Apple (iOS Bottom Tab Bar, iPadOS Sidebar, macOS Split View, visionOS Ornaments).
- **Lưới 8pt & Bo góc liên tục**: Ép lưới 8pt không gian và đường cong Squircle G2 (`corner-smoothing: 60%`).
- **Typography & Màu sắc Dynamic**: Sử dụng font SF Pro với tracking chuẩn quang học, tự động đổi màu theo Light/Dark OLED mode.
- **Hiệu ứng vật lý chân thực**: Áp dụng Apple spring physics (`cubic-bezier(0.25, 1, 0.5, 1)`) và phản hồi xúc giác `:active { transform: scale(0.97); }`.

### Mode 2 — Quét & Chấm điểm chuẩn HIG (Apple HIG Compliance Audit)
- **Quét tự động**: Quét dự án CSS/HTML/TSX/JSX/Swift và chấm điểm từ **0–100** (trừ 10 điểm cho mỗi vi phạm).
- **Đo lường chính xác**: Tính toán tỉ lệ tương phản màu WCAG AA và kích thước vùng bấm tối thiểu 44×44 pt.
- **Đánh giá độ tin cậy**: Phân loại kết quả rõ ràng (`🟢 Tool-verified`, `🟡 Needs device test`, `🔴 Assumed`).

---

## 💡 Hướng dẫn sử dụng & Prompts mẫu

- **Tạo giao diện Web phong cách Apple:**
  > *"Tạo một landing page giới thiệu sản phẩm mang phong cách Apple HIG với typography SF Pro, hiệu ứng Frosted Glass và nút bấm Spring active."*

- **Thiết kế iOS Settings View:**
  > *"Viết giao diện Settings cho app iOS theo đúng mẫu Inset Grouped List chuẩn với icon squircle và switch toggles."*

- **Thiết kế Spatial UI cho visionOS:**
  > *"Chuyển đổi component thẻ này sang phong cách visionOS Glass Material với độ dày mỏng và viền specular highlight."*

- **Review và Audit giao diện:**
  > *"Kiểm tra lại giao diện này theo chuẩn Apple HIG về độ tương phản, khoảng cách 8pt grid và touch target 44pt."*

---

## 🛠️ Bộ công cụ CLI & Audit Engine

```bash
# 1. Quét tự động & Chấm điểm 0–100 toàn bộ dự án:
npm run audit

# 2. Kiểm tra tỉ lệ tương phản màu chuẩn WCAG AA:
node skills/apple-design/scripts/audit-apple-design.mjs contrast "#8E8E93" "#FFFFFF"

# 3. Kiểm tra kích thước vùng chạm (Touch Target >= 44x44pt):
node skills/apple-design/scripts/audit-apple-design.mjs target 32 32

# 4. Kiểm tra hàng loạt qua file JSON (Batch verification):
node skills/apple-design/scripts/audit-apple-design.mjs batch audit.json

# 5. Cập nhật / tải lại toàn bộ 172 tài liệu & 451 hình ảnh HIG từ Apple CDN:
npm run fetch-hig
```

### 📋 Mẫu báo cáo đánh giá (Scorecard Template):
Tham khảo mẫu báo cáo đánh giá 5 trụ cột chuẩn Apple tại [`skills/apple-design/templates/apple-hig-audit-scorecard.md`](skills/apple-design/templates/apple-hig-audit-scorecard.md).

#### Thang điểm:
- 🟢 **90 – 100 pts: Ship (Sẵn sàng phát hành)** — Đạt chuẩn xuất sắc của Apple HIG.
- 🟡 **70 – 89 pts: Cần sửa trước khi release (Fix before release)** — Cần khắc phục một số lỗi nhỏ trước khi đưa lên App Store.
- 🔴 **< 70 pts: Cần thiết kế lại (Systematic redesign)** — Vi phạm nghiêm trọng về tính tiếp cận hoặc kiến trúc giao diện.

---

## 📁 Cấu trúc thư mục

```text
apple-design-skill/
├── skills/
│   └── apple-design/
│       ├── SKILL.md                 # Quy tắc cốt lõi & Trigger định hướng cho Agent
│       ├── references/              # 172 tài liệu HIG chi tiết + INDEX.md + Thư mục ảnh offline
│       ├── assets/                  # apple-tokens.css, apple-components.css, tailwind preset, SwiftUI
│       ├── templates/               # apple-hig-audit-scorecard.md
│       └── scripts/                 # audit-apple-design.mjs, fetch-apple-hig.mjs
├── .github/
│   └── workflows/
│       └── update-hig.yml           # Workflow đồng bộ tự động hàng tuần từ Apple Developer CDN
├── SKILL.md                         # Root skill definition
├── package.json
├── LICENSE                          # MIT License
├── README.md                        # English documentation
└── README.vi.md                     # Vietnamese documentation
```

---

## 📄 License

Phát hành theo giấy phép [MIT](LICENSE) bởi [@billythekidz](https://github.com/billythekidz).
