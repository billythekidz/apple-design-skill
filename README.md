<div align="center">

# 🍎 Apple Design Skill

**Apple Human Interface Guidelines (HIG) & Design System Skill for AI Coding Agents**

[![skills.sh](https://img.shields.io/badge/skills.sh-standard-blue?style=flat-square)](https://skills.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/billythekidz/apple-design-skill?style=flat-square)](https://github.com/billythekidz/apple-design-skill)

Trang bị toàn bộ triết lý thiết kế **Apple Human Interface Guidelines (HIG)**, hệ thống Typography SF Pro, Dynamic Colors, Frosted Glass Materials, Continuous Squircle Curves và Motion Springs cho mọi AI Coding Agent.

</div>

---

## ⚡ Giới thiệu ngắn gọn

**`apple-design-skill`** là gói kỹ năng mã nguồn mở theo chuẩn **`skills.sh` / Vercel Labs (`npx skills`)** giúp các AI Agent (Claude Code, Cursor, Copilot, Antigravity, Windsurf, Cline, v.v.) tự động nắm vững và áp dụng các tiêu chuẩn thiết kế đỉnh cao của Apple khi viết mã giao diện (Web, iOS, macOS, visionOS).

### ✨ Điểm nổi bật:
- 📖 **172 Tài liệu HIG chi tiết**: Toàn bộ tài liệu chính thức từ Apple Developer được chuyển đổi sang Markdown chuẩn, kèm **451+ hình ảnh minh họa Retina** lưu offline.
- 🎨 **Bộ Design Tokens & Components dựng sẵn**: CSS Variables, Tailwind CSS Preset, và các mẫu component (Nút bấm, Thẻ kính mờ, Inset Grouped, Segmented Controls).
- 🚫 **Loại bỏ Anti-Patterns**: Cấm màu tím trên nền đen, cấm bóng đổ đen đục, cấm bo góc sắc nhọn, cấm touch target < 44pt.
- 🔍 **Audit Tool tự động**: CLI tool tích hợp sẵn giúp kiểm tra mã nguồn xem có vi phạm chuẩn HIG hay không.

---

## 🚀 Hướng dẫn cài đặt (Installation)

Sử dụng lệnh tiêu chuẩn **`npx skills`**:

### 1. Cài đặt tự động cho TẤT CẢ Agents trong máy:
```bash
npx skills add billythekidz/apple-design-skill --all
```

### 2. Cài đặt Toàn cục (Global - dùng cho mọi workspace):
```bash
npx skills add billythekidz/apple-design-skill -g
```

### 3. Cài đặt cho từng Agent cụ thể:
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

## 💡 Hướng dẫn sử dụng (Usage)

Sau khi cài đặt, AI Agent sẽ tự động nhận diện kỹ năng này mỗi khi bạn yêu cầu thiết kế hoặc lập trình giao diện.

### Ví dụ Prompts mẫu:

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

---

## 📁 Cấu trúc thư mục

```text
apple-design-skill/
├── skills/
│   └── apple-design/
│       ├── SKILL.md                 # Quy tắc cốt lõi & Trigger định hướng cho Agent
│       ├── references/              # 172 tài liệu HIG chi tiết + INDEX.md + Thư mục ảnh offline
│       ├── assets/                  # apple-tokens.css, apple-components.css, tailwind preset, SwiftUI
│       └── scripts/                 # audit-apple-design.mjs, fetch-apple-hig.mjs
├── SKILL.md                         # Root skill definition
├── package.json
├── LICENSE                          # MIT License
└── README.md
```

---

## 📄 License

Phát hành theo giấy phép [MIT](LICENSE) bởi [@billythekidz](https://github.com/billythekidz).
