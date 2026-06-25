import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../.visual-audit");
const BASE = process.env.AUDIT_URL || "http://localhost:5173";
const TAG = process.env.AUDIT_TAG || "interaction";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const WARP_RGB = { r: 204, g: 128, b: 102 };

function isWarpPixel(r, g, b) {
  return r > 160 && r < 240 && g > 90 && g < 170 && b > 70 && b < 140;
}

async function sampleWarpBleed(page, selector) {
  return page.evaluate(({ selector, warp }) => {
    const layer = document.querySelector(selector);
    if (!layer) return { error: "no-layer" };
    const layerRect = layer.getBoundingClientRect();
    const cards = [...document.querySelectorAll("#services button.card, #services .serviceCard")];
    let bleedPixels = 0;
    const samples = [];

    for (const card of cards) {
      const cardRect = card.getBoundingClientRect();
      const cx = Math.floor(cardRect.left + cardRect.width / 2);
      const cy = Math.floor(cardRect.top + cardRect.height / 2);
      const el = document.elementFromPoint(cx, cy);
      if (!el) continue;
      const onCard = card.contains(el);
      if (!onCard) {
        samples.push({ cx, cy, tag: el.tagName, className: el.className?.toString?.().slice(0, 40) });
      }
    }

    const canvas = document.createElement("canvas");
    const w = Math.min(window.innerWidth, 1440);
    const h = Math.min(window.innerHeight, 900);
    canvas.width = w;
    canvas.height = h;
    return { layerFound: true, samples, bleedPixels };
  }, { selector, warp: WARP_RGB });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const issues = [];
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await page.goto(BASE, { waitUntil: "networkidle" });
  await wait(2000);

  // Scroll bleed through services
  const servicesTop = await page.evaluate(() => document.getElementById("services")?.offsetTop ?? 0);
  for (let y = 0; y <= servicesTop + 400; y += 50) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await wait(80);
    await page.screenshot({ path: path.join(OUT, `${TAG}-scroll-${y}.png`) });
    const warpInContent = await page.evaluate(() => {
      const content = document.querySelector("#services .layer-content, #services [class*='content']");
      const bg = document.querySelector("#services .layer-bg, #services [class*='layerBg']");
      if (!content || !bg) return { ok: true };
      const beams = document.querySelectorAll('[class*="transform-3d"], [class*="Beam"]');
      return { beamCount: beams.length, bgChildInContent: content.querySelector('[class*="warp"]') !== null };
    });
    if (warpInContent.bgChildInContent) {
      issues.push({ type: "warp-in-content-layer", scrollY: y });
    }
  }

  // Hover each service card while scrolled to services
  await page.evaluate(() => document.getElementById("services")?.scrollIntoView({ block: "start" }));
  await wait(500);
  const cards = page.locator("#services button.card, #services button[class*='serviceCard']");
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    await cards.nth(i).hover();
    await wait(200);
    await page.screenshot({ path: path.join(OUT, `${TAG}-hover-card-${i}.png`) });
    const cardOpacity = await cards.nth(i).evaluate((el) => getComputedStyle(el).opacity);
    if (parseFloat(cardOpacity) < 0.95) {
      issues.push({ type: "card-low-opacity-on-hover", index: i, opacity: cardOpacity });
    }
  }

  // Modal during scroll
  await page.goto(BASE, { waitUntil: "networkidle" });
  await wait(1200);
  await page.evaluate(() => {
    window.scrollTo(0, document.getElementById("services")?.offsetTop ?? 0);
  });
  await wait(100);
  page.evaluate(() => window.scrollBy(0, 200));
  await page.getByRole("button", { name: /AI GTM Engineering/i }).first().click({ timeout: 5000 });
  await wait(600);
  await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
  await page.screenshot({ path: path.join(OUT, `${TAG}-modal-during-scroll.png`) });
  const modalState = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const overlay = dialog?.parentElement;
    return {
      portal: overlay?.parentElement?.tagName,
      bodyFixed: getComputedStyle(document.body).position,
      headerZ: getComputedStyle(document.querySelector("header")).zIndex,
      overlayZ: overlay ? getComputedStyle(overlay).zIndex : null,
      dialogOpen: !!dialog,
    };
  });
  if (modalState.portal !== "BODY") issues.push({ type: "modal-not-portaled", modalState });
  if (modalState.bodyFixed !== "fixed") issues.push({ type: "scroll-not-locked", modalState });
  if (parseInt(modalState.overlayZ) <= parseInt(modalState.headerZ)) {
    issues.push({ type: "modal-below-nav", modalState });
  }

  await page.keyboard.press("Escape");
  await wait(400);

  // Mobile menu over services
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await wait(1500);
  await page.evaluate(() => document.getElementById("services")?.scrollIntoView({ block: "start" }));
  await wait(400);
  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await wait(500);
  await page.screenshot({ path: path.join(OUT, `${TAG}-mobile-menu.png`) });
  const menuZ = await page.evaluate(() => ({
    headerZ: getComputedStyle(document.querySelector("header")).zIndex,
    menuZ: getComputedStyle(document.getElementById("mobile-menu")).zIndex,
  }));
  if (parseInt(menuZ.headerZ) >= parseInt(menuZ.menuZ)) {
    issues.push({ type: "header-above-menu", menuZ });
  }

  await browser.close();
  await writeFile(path.join(OUT, `${TAG}-issues.json`), JSON.stringify(issues, null, 2));
  console.log(`Interaction audit [${TAG}]: ${issues.length} issues`);
  console.log(JSON.stringify(issues, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
