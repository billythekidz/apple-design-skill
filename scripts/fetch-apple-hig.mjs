#!/usr/bin/env node
/**
 * Apple Human Interface Guidelines (HIG) Scraper & Markdown Generator CLI
 * 
 * Fetches the entire official Apple HIG documentation from:
 * https://developer.apple.com/design/human-interface-guidelines
 * 
 * - Multi-level parallel BFS discovery of all 170+ HIG documentation pages
 * - Parses DocC JSON AST into clean, high-fidelity GitHub Flavored Markdown
 * - Downloads all referenced images locally into references/images/<slug>/
 * - Preserves typography, callouts, tables, lists, and cross-references
 * - Organizes pages into structured .md files in the references folder
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base URLs
const BASE_DATA_URL = "https://developer.apple.com/tutorials/data";
const HIG_ENTRY_PATH = "/design/human-interface-guidelines";
const DEFAULT_OUT_DIR = join(__dirname, "../skills/apple-design/references");

// Parse CLI Arguments
const args = process.argv.slice(2);
function getArg(flag, defaultValue) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  return defaultValue;
}

const OUT_DIR = getArg("--out", DEFAULT_OUT_DIR);
const CONCURRENCY = parseInt(getArg("--concurrency", "8"), 10);
const SKIP_IMAGES = args.includes("--skip-images");
const LIMIT = parseInt(getArg("--limit", "0"), 10);

console.log("\n🍎 [Apple HIG Documentation Crawler & Markdown CLI]");
console.log("=================================================");
console.log(`Output Directory : ${OUT_DIR}`);
console.log(`Concurrency      : ${CONCURRENCY}`);
console.log(`Download Images  : ${!SKIP_IMAGES}`);
if (LIMIT > 0) console.log(`Limit Pages      : ${LIMIT}`);
console.log("=================================================\n");

// Ensure output directories exist
mkdirSync(OUT_DIR, { recursive: true });
const IMAGES_DIR = join(OUT_DIR, "images");
if (!SKIP_IMAGES) mkdirSync(IMAGES_DIR, { recursive: true });

// HTTP Fetch Helper with Retry
async function fetchWithRetry(url, retries = 3, isBinary = false) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": isBinary ? "image/*,*/*" : "application/json,text/plain,*/*"
        }
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      return isBinary ? Buffer.from(await res.arrayBuffer()) : await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
  return null;
}

// Download image helper
const downloadedImages = new Map();

async function downloadImage(remoteUrl, pageSlug, rawIdentifier) {
  if (SKIP_IMAGES) return remoteUrl;
  if (!remoteUrl) return "";

  let fullUrl = remoteUrl;
  if (!fullUrl.startsWith("http")) {
    if (fullUrl.startsWith("/")) {
      fullUrl = "https://developer.apple.com/tutorials" + fullUrl;
    } else {
      fullUrl = "https://developer.apple.com/" + fullUrl;
    }
  }

  if (downloadedImages.has(fullUrl)) {
    return downloadedImages.get(fullUrl);
  }

  try {
    const pageImageFolder = join(IMAGES_DIR, pageSlug);
    mkdirSync(pageImageFolder, { recursive: true });

    let fileName = basename(new URL(fullUrl).pathname);
    if (!fileName || fileName.length > 80) {
      fileName = (rawIdentifier || "image") + ".png";
    }
    fileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

    const localFilePath = join(pageImageFolder, fileName);
    const relativeMarkdownPath = `./images/${pageSlug}/${fileName}`;

    if (!existsSync(localFilePath)) {
      const buffer = await fetchWithRetry(fullUrl, 2, true);
      if (buffer) {
        writeFileSync(localFilePath, buffer);
      }
    }

    downloadedImages.set(fullUrl, relativeMarkdownPath);
    return relativeMarkdownPath;
  } catch (err) {
    return fullUrl;
  }
}

// Inline Content Renderer
async function renderInline(items, refs, pageSlug) {
  if (!items || !Array.isArray(items)) return "";
  const renderedParts = [];

  for (const item of items) {
    if (item.type === "text") {
      renderedParts.push(item.text);
    } else if (item.type === "codeVoice") {
      renderedParts.push("`" + item.code + "`");
    } else if (item.type === "strong") {
      const inner = await renderInline(item.inlineContent, refs, pageSlug);
      renderedParts.push(`**${inner}**`);
    } else if (item.type === "emphasis") {
      const inner = await renderInline(item.inlineContent, refs, pageSlug);
      renderedParts.push(`*${inner}*`);
    } else if (item.type === "link") {
      const label = (await renderInline(item.inlineContent, refs, pageSlug)) || item.title || item.destination;
      renderedParts.push(`[${label}](${item.destination})`);
    } else if (item.type === "reference") {
      const ref = refs?.[item.identifier];
      const title = ref?.title || (await renderInline(item.inlineContent, refs, pageSlug)) || item.identifier;
      const destUrl = ref?.url ? (ref.url.startsWith("http") ? ref.url : `https://developer.apple.com${ref.url}`) : item.identifier;
      renderedParts.push(`[${title}](${destUrl})`);
    } else if (item.type === "image") {
      const ref = refs?.[item.identifier];
      const rawUrl = ref?.variants?.[0]?.url || "";
      const altText = ref?.alt || item.identifier || "Apple HIG Illustration";
      const localUrl = await downloadImage(rawUrl, pageSlug, item.identifier);
      renderedParts.push(`\n\n![${altText}](${localUrl})\n\n`);
    }
  }

  return renderedParts.join("");
}

// Block Element Renderer
async function renderBlock(block, refs, pageSlug) {
  if (!block) return "";

  if (block.type === "paragraph") {
    const inline = await renderInline(block.inlineContent, refs, pageSlug);
    return inline ? `${inline}\n\n` : "";
  }

  if (block.type === "heading") {
    const level = block.level || 2;
    const hashes = "#".repeat(level);
    return `${hashes} ${block.text}\n\n`;
  }

  if (block.type === "unorderedList") {
    let listMd = "";
    for (const item of block.items || []) {
      let itemContent = "";
      for (const c of item.content || []) {
        itemContent += await renderBlock(c, refs, pageSlug);
      }
      listMd += `- ${itemContent.trim()}\n`;
    }
    return listMd ? `${listMd}\n` : "";
  }

  if (block.type === "orderedList") {
    let listMd = "";
    let idx = 1;
    for (const item of block.items || []) {
      let itemContent = "";
      for (const c of item.content || []) {
        itemContent += await renderBlock(c, refs, pageSlug);
      }
      listMd += `${idx}. ${itemContent.trim()}\n`;
      idx++;
    }
    return listMd ? `${listMd}\n` : "";
  }

  if (block.type === "codeListing") {
    const code = Array.isArray(block.code) ? block.code.join("\n") : (block.code || "");
    const syntax = block.syntax || "";
    return `\`\`\`${syntax}\n${code}\n\`\`\`\n\n`;
  }

  if (block.type === "aside" || block.type === "callout") {
    const style = (block.style || "NOTE").toUpperCase();
    let asideContent = "";
    for (const c of block.content || []) {
      asideContent += await renderBlock(c, refs, pageSlug);
    }
    return `> [!${style}]\n> ${asideContent.trim().split("\n").join("\n> ")}\n\n`;
  }

  if (block.type === "table") {
    let tableMd = "";
    if (block.header && block.header.length > 0) {
      const headers = [];
      for (const h of block.header) {
        let cellText = "";
        for (const c of h.content || []) {
          cellText += (await renderBlock(c, refs, pageSlug)).trim();
        }
        headers.push(cellText || " ");
      }
      tableMd += `| ${headers.join(" | ")} |\n`;
      tableMd += `| ${headers.map(() => "---").join(" | ")} |\n`;
    }
    for (const row of block.rows || []) {
      const cells = [];
      for (const cell of row) {
        let cellText = "";
        for (const c of cell.content || []) {
          cellText += (await renderBlock(c, refs, pageSlug)).trim();
        }
        cells.push(cellText.replace(/\n/g, " ") || " ");
      }
      tableMd += `| ${cells.join(" | ")} |\n`;
    }
    return tableMd ? `${tableMd}\n` : "";
  }

  if (block.type === "termList") {
    let termMd = "";
    for (const item of block.items || []) {
      let termText = (await renderInline(item.term?.inlineContent, refs, pageSlug)).trim();
      let defText = "";
      for (const c of item.definition?.content || []) {
        defText += (await renderBlock(c, refs, pageSlug)).trim();
      }
      termMd += `**${termText}**\n: ${defText}\n\n`;
    }
    return termMd;
  }

  return "";
}

// Convert DocC Page JSON to Full Markdown Document
async function convertDoccToMarkdown(data, pageUrl) {
  const pageSlug = pageUrl.split("/").filter(Boolean).pop() || "index";
  const title = data.metadata?.title || "Human Interface Guidelines";
  const refs = data.references || {};

  let md = `# ${title}\n\n`;

  // Abstract / Intro
  if (data.abstract && data.abstract.length > 0) {
    const abstractText = await renderInline(data.abstract, refs, pageSlug);
    md += `> ${abstractText.trim()}\n\n`;
  }

  // Source Metadata
  md += `**Source**: [Apple Developer Documentation - ${title}](https://developer.apple.com${pageUrl})\n\n---\n\n`;

  // Primary Content Sections
  for (const section of data.primaryContentSections || []) {
    if (section.kind === "content" && section.content) {
      for (const block of section.content) {
        md += await renderBlock(block, refs, pageSlug);
      }
    }
  }

  // Topic Sections / Related Guidelines
  if (data.topicSections && data.topicSections.length > 0) {
    for (const topicSec of data.topicSections) {
      const secTitle = topicSec.title || "Topics & Related Guidelines";
      md += `## ${secTitle}\n\n`;
      for (const id of topicSec.identifiers || []) {
        const ref = refs[id];
        if (ref) {
          const refTitle = ref.title || id;
          const refUrl = ref.url ? (ref.url.startsWith("http") ? ref.url : `https://developer.apple.com${ref.url}`) : id;
          const abstract = ref.abstract ? (await renderInline(ref.abstract, refs, pageSlug)).trim() : "";
          md += `- **[${refTitle}](${refUrl})**${abstract ? ` - ${abstract}` : ""}\n`;
        }
      }
      md += "\n";
    }
  }

  // See Also Sections
  if (data.seeAlsoSections && data.seeAlsoSections.length > 0) {
    for (const seeAlso of data.seeAlsoSections) {
      md += `## ${seeAlso.title || "See Also"}\n\n`;
      for (const id of seeAlso.identifiers || []) {
        const ref = refs[id];
        if (ref) {
          const refTitle = ref.title || id;
          const refUrl = ref.url ? (ref.url.startsWith("http") ? ref.url : `https://developer.apple.com${ref.url}`) : id;
          md += `- [${refTitle}](${refUrl})\n`;
        }
      }
      md += "\n";
    }
  }

  return { md, pageSlug, title };
}

// Parallel BFS Discovery of all Apple HIG pages
async function discoverAllPages() {
  const visited = new Set();
  const discoveredPages = new Map();
  let currentBatch = [HIG_ENTRY_PATH];
  let level = 0;

  while (currentBatch.length > 0) {
    const nextBatch = [];
    const promises = currentBatch.map(async (url) => {
      if (visited.has(url)) return;
      visited.add(url);
      try {
        const dataUrl = `${BASE_DATA_URL}${url}.json`;
        const data = await fetchWithRetry(dataUrl);
        if (!data) return;

        discoveredPages.set(url, {
          url,
          title: data.metadata?.title || url,
          data
        });

        const topicRefs = Object.values(data.references || {}).filter(
          (r) => r.type === "topic" && r.url?.startsWith(HIG_ENTRY_PATH)
        );

        for (const t of topicRefs) {
          if (!visited.has(t.url)) {
            nextBatch.push(t.url);
          }
        }
      } catch (err) {}
    });

    await Promise.all(promises);
    currentBatch = Array.from(new Set(nextBatch)).filter((u) => !visited.has(u));
    level++;
  }

  return Array.from(discoveredPages.values());
}

// Concurrency Pool Runner
async function runConcurrentPool(items, limit, workerFn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++;
      const item = items[currentIndex];
      try {
        const res = await workerFn(item, currentIndex, items.length);
        results[currentIndex] = res;
      } catch (err) {
        console.error(`❌ Error processing ${item?.url}:`, err.message);
        results[currentIndex] = null;
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

// Main Execution
async function main() {
  const startTime = Date.now();
  console.log("🔍 Scanning Apple HIG hierarchy with parallel BFS...");

  const discoveredPages = await discoverAllPages();
  console.log(`✅ Discovered ${discoveredPages.length} HIG documentation pages.\n`);

  let pagesToProcess = discoveredPages;
  if (LIMIT > 0) {
    pagesToProcess = pagesToProcess.slice(0, LIMIT);
    console.log(`⚡ Processing ${pagesToProcess.length} pages (--limit ${LIMIT})...\n`);
  }

  let completedCount = 0;

  await runConcurrentPool(pagesToProcess, CONCURRENCY, async (pageInfo, idx, total) => {
    const { url, data } = pageInfo;
    const { md, pageSlug, title } = await convertDoccToMarkdown(data, url);

    const outFileName = `${pageSlug}.md`;
    const outFilePath = join(OUT_DIR, outFileName);

    writeFileSync(outFilePath, md, "utf-8");
    completedCount++;

    const progress = `[${completedCount}/${total}]`.padStart(9);
    console.log(`${progress} 📄 Saved: ${outFileName.padEnd(35)} (${title})`);
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n=================================================");
  console.log(`🎉 Completed HIG Scraping in ${durationSec}s!`);
  console.log(`📁 Total Markdown Pages Generated : ${completedCount}`);
  console.log(`🖼️ Total Images Downloaded       : ${downloadedImages.size}`);
  console.log(`📂 Output Directory               : ${OUT_DIR}`);
  console.log("=================================================\n");
}

main().catch((err) => {
  console.error("Fatal Error:", err);
  process.exit(1);
});
