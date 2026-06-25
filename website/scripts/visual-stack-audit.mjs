import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../.visual-audit");
const BASE = process.env.AUDIT_URL || "http://localhost:5173";
const TAG = process.env.AUDIT_TAG || "run";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function styleOf(el) {
  if (!el) return null;
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    tag: el.tagName,
    className: el.className?.toString?.().slice(0, 60),
    zIndex: s.zIndex,
    position: s.position,
    transform: s.transform,
    opacity: s.opacity,
    top: Math.round(r.top),
    height: Math.round(r.height),
  };
}

async function captureStack(page, sectionId, label) {
  return page.evaluate(({ sectionId, label }) => {
    const header = document.querySelector("header");
    const section = document.getElementById(sectionId);
    const firstCard = section?.querySelector(".reveal-stagger > *, button.card");
    const fn = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: el.className?.toString?.().slice(0, 60),
        zIndex: s.zIndex,
        position: s.position,
        transform: s.transform,
        opacity: s.opacity,
        top: Math.round(r.top),
        height: Math.round(r.height),
      };
    };
    return { label, header: fn(header), firstCard: fn(firstCard), scrollY: window.scrollY };
  }, { sectionId, label });
}

async function revealSequence(page, sectionId, prefix, issues) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ block: "start" });
  }, sectionId);
  await wait(50);

  for (const ms of [0, 200, 400, 800]) {
    await wait(ms === 0 ? 0 : 200);
    const name = `${TAG}-${prefix}-${ms}ms`;
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    const stack = await captureStack(page, sectionId, name);
    if (stack.firstCard?.transform && stack.firstCard.transform !== "none") {
      issues.push({ type: "reveal-transform-active", at: name, transform: stack.firstCard.transform });
    }
    const headerH = stack.header?.top != null && stack.header?.height
      ? stack.header.top + stack.header.height
      : 72;
    const cardTop = stack.firstCard?.top ?? 9999;
    if (
      stack.firstCard &&
      cardTop >= 0 &&
      cardTop < headerH &&
      parseFloat(stack.firstCard.opacity) > 0.3
    ) {
      const headerBg = await page.evaluate(() => getComputedStyle(document.querySelector("header")).backgroundColor);
      issues.push({ type: "card-near-nav", at: name, headerBg, cardTop });
    }
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const issues = [];
  const browser = await chromium.launch({ headless: true });

  // Desktop: services reveal
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dpage = await desktop.newPage();
  await dpage.goto(BASE, { waitUntil: "networkidle" });
  await wait(2000);

  await revealSequence(dpage, "services", "services-desktop", issues);

  // Modal during reveal
  await dpage.goto(BASE, { waitUntil: "networkidle" });
  await wait(1200);
  await dpage.evaluate(() => document.getElementById("services")?.scrollIntoView({ block: "start" }));
  await wait(100);
  await dpage.getByRole("button", { name: /AI GTM Engineering/i }).first().click({ timeout: 5000 }).catch(() => {});
  await wait(300);
  await dpage.screenshot({ path: path.join(OUT, `${TAG}-modal-during-reveal.png`) });
  const modalStack = await dpage.evaluate(() => {
    const o = document.querySelector('[class*="overlay"]');
    const s = o ? getComputedStyle(o) : null;
    return { portal: o?.parentElement?.tagName, position: s?.position, zIndex: s?.zIndex, bodyFixed: getComputedStyle(document.body).position };
  });
  if (modalStack.portal !== "BODY") issues.push({ type: "modal-not-portaled", modalStack });
  if (modalStack.bodyFixed !== "fixed") issues.push({ type: "scroll-not-locked", modalStack });

  // Projects reveal
  await dpage.goto(BASE, { waitUntil: "networkidle" });
  await wait(1200);
  await revealSequence(dpage, "projects", "projects-desktop", issues);

  // Hero parallax steps
  await dpage.goto(BASE, { waitUntil: "networkidle" });
  await wait(1200);
  for (const y of [0, 50, 100, 150, 200]) {
    await dpage.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await wait(100);
    await dpage.screenshot({ path: path.join(OUT, `${TAG}-hero-scroll-${y}.png`) });
  }

  await desktop.close();

  // Mobile menu over section
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mobile.newPage();
  await mpage.goto(BASE, { waitUntil: "networkidle" });
  await wait(2000);
  await mpage.evaluate(() => document.getElementById("services")?.scrollIntoView({ block: "start" }));
  await wait(500);
  await mpage.getByRole("button", { name: "Menü öffnen" }).click();
  await wait(500);
  await mpage.screenshot({ path: path.join(OUT, `${TAG}-mobile-menu-services.png`) });
  const menuZ = await mpage.evaluate(() => ({
    headerZ: getComputedStyle(document.querySelector("header")).zIndex,
    menuZ: getComputedStyle(document.getElementById("mobile-menu")).zIndex,
  }));
  if (parseInt(menuZ.headerZ) >= parseInt(menuZ.menuZ)) {
    issues.push({ type: "header-above-menu", menuZ });
  }

  await mobile.close();
  await browser.close();

  await writeFile(path.join(OUT, `${TAG}-issues.json`), JSON.stringify(issues, null, 2));
  console.log(`Audit [${TAG}] done. Issues: ${issues.length}`);
  console.log(JSON.stringify(issues, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
