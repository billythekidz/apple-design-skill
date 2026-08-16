#!/usr/bin/env node
/**
 * 🍎 Apple Design System & HIG Compliance Audit Tool
 * 
 * Capabilities:
 *  1. Codebase static scan with 0-100 Scoring Rubric & Anti-pattern detection
 *  2. Precise WCAG Contrast Ratio calculation (contrast <fgHex> <bgHex>)
 *  3. Tap Target sizing check (target <width> <height>)
 *  4. Batch JSON verification & Scorecard generation (batch <audit.json>)
 */

import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";

const TARGET_EXTENSIONS = new Set([".css", ".scss", ".html", ".tsx", ".jsx", ".vue", ".svelte", ".swift"]);

/* -------------------------------------------------------------------------- */
/*                          1. MATHEMATICAL HELPERS                           */
/* -------------------------------------------------------------------------- */

export function calculateLuminance(hex) {
  const cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length !== 6 && cleanHex.length !== 8) return 0;
  
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;

  const adjust = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
}

export function checkContrast(fgHex, bgHex) {
  const l1 = calculateLuminance(fgHex);
  const l2 = calculateLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Number(ratio.toFixed(2));
}

/* -------------------------------------------------------------------------- */
/*                          2. CODEBASE AUDIT RULES                           */
/* -------------------------------------------------------------------------- */

const HIG_RULES = [
  {
    id: "NO_PURPLE_ON_DARK",
    title: "Forbidden purple/violet accent on dark theme",
    deduction: 15,
    severity: "critical",
    test: (content) => {
      const lower = content.toLowerCase();
      return (
        (lower.includes("dark") || lower.includes("background: #000") || lower.includes("background: black")) &&
        (lower.includes("#7c3aed") || lower.includes("#8b5cf6") || lower.includes("#9333ea") || lower.includes("purple-600"))
      );
    },
    message: "Avoid generic neon purple-on-dark glow palettes. Use Apple System Blue (#0A84FF) or semantic system tint colors.",
    confidence: "🟢 Tool-verified"
  },
  {
    id: "HARSH_BLACK_SHADOW",
    title: "Harsh un-diffused box shadow",
    deduction: 10,
    severity: "warning",
    test: (content) => /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*(0\.[5-9]|1(\.0)?)\)/.test(content) && content.includes("box-shadow"),
    message: "Apple shadows use subtle multi-layered ambient diffusion (e.g. rgba(0,0,0,0.06) + rgba(0,0,0,0.03)).",
    confidence: "🟢 Tool-verified"
  },
  {
    id: "SMALL_TOUCH_TARGET",
    title: "Potentially undersized touch target (< 44pt)",
    deduction: 10,
    severity: "warning",
    test: (content) => {
      const lines = content.split("\n");
      for (const line of lines) {
        if ((line.includes("btn") || line.includes("button")) && !line.includes("-sm") && !line.includes("compact")) {
          const match = line.match(/height:\s*([0-3]?[0-9])px/);
          if (match) {
            const h = parseInt(match[1], 10);
            if (h > 0 && h < 44) return true;
          }
        }
      }
      return false;
    },
    message: "Apple HIG requires a minimum touch target size of 44×44 pt for buttons and controls to ensure thumb accuracy.",
    confidence: "🟢 Tool-verified"
  },
  {
    id: "LINEAR_EASING",
    title: "Generic non-physical easing used for UI transitions",
    deduction: 5,
    severity: "info",
    test: (content) => content.includes("transition:") && (content.includes("ease-in-out") || content.includes("linear")),
    message: "Apple uses spring physics or cubic-bezier(0.25, 1, 0.5, 1) instead of linear/ease-in-out for interactive UI elements.",
    confidence: "🟡 Needs device test"
  },
  {
    id: "GENERIC_FONT_FAMILY",
    title: "Missing Apple System font stack (-apple-system / SF Pro)",
    deduction: 5,
    severity: "info",
    test: (content, ext) => {
      if (ext !== ".css" && ext !== ".scss") return false;
      return content.includes("font-family") && !content.includes("-apple-system") && !content.includes("SF Pro");
    },
    message: "Include `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif` in primary font stacks.",
    confidence: "🟢 Tool-verified"
  }
];

/* -------------------------------------------------------------------------- */
/*                          3. SCANNING & BATCH MODES                         */
/* -------------------------------------------------------------------------- */

function scanDirectory(dir, issues = []) {
  try {
    const files = readdirSync(dir);
    for (const file of files) {
      if (file === "node_modules" || file === ".git" || file === "dist" || file === "build" || file === "product-team") continue;
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        scanDirectory(fullPath, issues);
      } else if (TARGET_EXTENSIONS.has(extname(file))) {
        auditFile(fullPath, issues);
      }
    }
  } catch (err) {
    // Ignore unreadable dirs
  }
  return issues;
}

function auditFile(filePath, issues) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const ext = extname(filePath);
    for (const rule of HIG_RULES) {
      if (rule.test(content, ext)) {
        issues.push({
          file: filePath,
          ruleId: rule.id,
          title: rule.title,
          message: rule.message,
          deduction: rule.deduction,
          severity: rule.severity,
          confidence: rule.confidence
        });
      }
    }
  } catch (err) {
    // Ignore read errors
  }
}

/* -------------------------------------------------------------------------- */
/*                             4. CLI DISPATCHER                              */
/* -------------------------------------------------------------------------- */

const args = process.argv.slice(2);
const command = args[0];

if (command === "contrast") {
  const fg = args[1];
  const bg = args[2];
  if (!fg || !bg) {
    console.log("Usage: node audit-apple-design.mjs contrast <fgHex> <bgHex>");
    console.log("Example: node audit-apple-design.mjs contrast '#8E8E93' '#FFFFFF'");
    process.exit(1);
  }
  const ratio = checkContrast(fg, bg);
  const passedAA = ratio >= 4.5;
  const passedLarge = ratio >= 3.0;
  console.log(`\n🔍 [Apple HIG Contrast Checker]`);
  console.log(`- Foreground: ${fg}`);
  console.log(`- Background: ${bg}`);
  console.log(`- Contrast Ratio: ${ratio}:1`);
  console.log(`- WCAG AA (Normal Text >= 4.5:1): ${passedAA ? "🟢 PASSED" : "🔴 FAILED"}`);
  console.log(`- WCAG AA (Large Text >= 3.0:1):  ${passedLarge ? "🟢 PASSED" : "🔴 FAILED"}`);
  if (!passedAA) {
    console.log(`\n💡 Tip: Use Apple semantic color (.secondaryLabel) or darken text to >= #6E6E73 on white.`);
  }
  process.exit(0);
}

if (command === "target") {
  const w = parseInt(args[1], 10);
  const h = parseInt(args[2], 10);
  if (isNaN(w) || isNaN(h)) {
    console.log("Usage: node audit-apple-design.mjs target <widthPt> <heightPt>");
    console.log("Example: node audit-apple-design.mjs target 32 32");
    process.exit(1);
  }
  const passed = w >= 44 && h >= 44;
  console.log(`\n📐 [Apple HIG Touch Target Checker]`);
  console.log(`- Dimensions: ${w}×${h} pt`);
  console.log(`- Apple HIG 44×44pt Requirement: ${passed ? "🟢 PASSED" : "🔴 FAILED"}`);
  if (!passed) {
    console.log(`\n💡 Tip: Keep the visible glyph small but expand the hit testing region to at least 44×44pt using padding or contentShape.`);
  }
  process.exit(0);
}

if (command === "batch") {
  const jsonPath = args[1];
  if (!jsonPath) {
    console.log("Usage: node audit-apple-design.mjs batch <audit.json>");
    process.exit(1);
  }
  try {
    const data = JSON.parse(readFileSync(jsonPath, "utf-8"));
    let score = 100;
    const violations = [];
    
    for (const check of data.checks || []) {
      if (check.type === "contrast") {
        const ratio = checkContrast(check.fg, check.bg);
        if (ratio < 4.5) {
          violations.push(`[Contrast] Ratio ${ratio}:1 fails for "${check.name || "element"}" (needs >= 4.5:1)`);
          score -= 10;
        }
      } else if (check.type === "target") {
        if (check.w < 44 || check.h < 44) {
          violations.push(`[Touch Target] ${check.w}×${check.h} pt is under 44×44 pt minimum for "${check.name || "element"}"`);
          score -= 10;
        }
      }
    }
    score = Math.max(0, score);
    console.log(JSON.stringify({ score, rating: score >= 85 ? "App Store Ready" : score >= 70 ? "Needs Polish" : "High Risk", violations }, null, 2));
    process.exit(0);
  } catch (err) {
    console.error("Error reading batch JSON file:", err.message);
    process.exit(1);
  }
}

/* -------------------------------------------------------------------------- */
/*                       5. DEFAULT CODEBASE SCANNER                          */
/* -------------------------------------------------------------------------- */

const targetPath = command && !command.startsWith("-") ? command : process.cwd();

console.log("\n🍎 ==================================================");
console.log("   APPLE HIG COMPLIANCE AUDIT & SCORING ENGINE");
console.log("==================================================\n");
console.log(`📁 Scanning workspace: ${targetPath}\n`);

const issues = scanDirectory(targetPath);
let score = 100;

for (const issue of issues) {
  score -= issue.deduction;
}
score = Math.max(0, score);

let ratingBadge = "🟢 85-100: App Store Ready (Ship)";
let summaryStatus = "READY TO SHIP";

if (score < 70) {
  ratingBadge = "🔴 <70: High Risk (Systematic Rework Required)";
  summaryStatus = "HIGH RISK";
} else if (score < 85) {
  ratingBadge = "🟡 70-84: Needs Polish (Fix Before Release)";
  summaryStatus = "NEEDS POLISH";
}

console.log("--------------------------------------------------");
console.log(`🏆 HIG Compliance Score: ${score} / 100 [${summaryStatus}]`);
console.log(`📊 Rating Tier:         ${ratingBadge}`);
console.log("--------------------------------------------------\n");

if (issues.length === 0) {
  console.log("✨ Outstanding! No Apple HIG violations or anti-patterns detected.\n");
  process.exit(0);
}

console.log(`⚠️ Found ${issues.length} recommendation(s):\n`);

issues.forEach((issue, idx) => {
  const icon = issue.severity === "critical" ? "🔴" : issue.severity === "warning" ? "🟡" : "ℹ️";
  console.log(`${idx + 1}. ${icon} [${issue.ruleId}] -${issue.deduction} pts: ${issue.title}`);
  console.log(`   📂 File:       ${issue.file}`);
  console.log(`   💡 Fix:        ${issue.message}`);
  console.log(`   🏷️ Confidence: ${issue.confidence}\n`);
});

process.exit(0);
