#!/usr/bin/env node
/**
 * Apple Design System Compliance Audit Tool
 * Scans CSS, HTML, TSX, JSX, and Vue files for Apple HIG violations and anti-patterns.
 */

import { readdirSync, statSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";

const TARGET_EXTENSIONS = new Set([".css", ".scss", ".html", ".tsx", ".jsx", ".vue", ".svelte"]);

const HIG_RULES = [
  {
    id: "NO_PURPLE_ON_DARK",
    title: "Forbidden purple/violet accent on dark theme",
    test: (content) => {
      const lower = content.toLowerCase();
      return (
        (lower.includes("dark") || lower.includes("background: #000") || lower.includes("background: black")) &&
        (lower.includes("#7c3aed") || lower.includes("#8b5cf6") || lower.includes("#9333ea") || lower.includes("purple-600"))
      );
    },
    message: "Avoid generic purple-on-dark glow palettes. Use Apple System Blue (#0A84FF) or semantic system tint colors.",
    severity: "warning"
  },
  {
    id: "HARSH_BLACK_SHADOW",
    title: "Harsh un-diffused box shadow",
    test: (content) => /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*(0\.[5-9]|1(\.0)?)\)/.test(content) && content.includes("box-shadow"),
    message: "Apple shadows use subtle multi-layered ambient diffusion (e.g. rgba(0,0,0,0.06) + rgba(0,0,0,0.03)).",
    severity: "warning"
  },
  {
    id: "GENERIC_FONT_FAMILY",
    title: "Missing Apple System font stack (-apple-system / SF Pro)",
    test: (content, ext) => {
      if (ext !== ".css" && ext !== ".scss") return false;
      return content.includes("font-family") && !content.includes("-apple-system") && !content.includes("SF Pro");
    },
    message: "Always include `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif` in primary font stacks.",
    severity: "info"
  },
  {
    id: "SMALL_TOUCH_TARGET",
    title: "Potentially undersized touch targets (< 44px)",
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
    message: "iOS HIG requires a minimum touch target size of 44×44 pt for buttons and interactive controls (except compact modifier variants).",
    severity: "warning"
  },
  {
    id: "LINEAR_EASING",
    title: "Generic non-physical easing used for UI transitions",
    test: (content) => content.includes("transition:") && (content.includes("ease-in-out") || content.includes("linear")),
    message: "Apple uses spring physics or cubic-bezier(0.25, 1, 0.5, 1) instead of linear/ease-in-out for interactive UI elements.",
    severity: "info"
  }
];

function scanDirectory(dir, issues = []) {
  try {
    const files = readdirSync(dir);
    for (const file of files) {
      if (file === "node_modules" || file === ".git" || file === "dist" || file === "build") continue;
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
          severity: rule.severity
        });
      }
    }
  } catch (err) {
    // Ignore read errors
  }
}

console.log("\n🍎 [Apple Design System HIG Audit Tool]");
console.log("------------------------------------------");

const targetPath = process.argv[2] || process.cwd();
console.log(`Auditing workspace: ${targetPath}\n`);

const results = scanDirectory(targetPath);

if (results.length === 0) {
  console.log("✨ Perfect! No Apple HIG violations or anti-patterns detected.\n");
  process.exit(0);
}

console.log(`⚠️ Found ${results.length} recommendation(s):\n`);
for (const issue of results) {
  const icon = issue.severity === "warning" ? "⚠️" : "ℹ️";
  console.log(`${icon} [${issue.ruleId}] ${issue.title}`);
  console.log(`   File: ${issue.file}`);
  console.log(`   Tip:  ${issue.message}\n`);
}

process.exit(0);
