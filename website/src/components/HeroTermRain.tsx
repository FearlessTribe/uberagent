import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "../motion";
import styles from "./HeroTermRain.module.css";

const TERMS = [
  "uberagent",
  "MCP",
  "RAG",
  "LLM",
  "API",
  "CRM",
  "ERP",
  "CMS",
  "GTM",
  "ICP",
  "SQL",
  "Sales Agent",
  "ETL",
  "QA",
  "SLA",
  "ROI",
  "ARR",
  "MQL",
  "HITL",
  "Agent",
  "Agents",
  "Workflow",
  "Routing",
  "Scoring",
  "Handoff",
  "Triage",
  "Enrich",
  "Outreach",
  "Pipeline",
  "Audit",
  "OAuth",
  "RevenueAgent",
  "Tools",
  "Guardrail",
  "Context",
  "Prompt",
  "Eval",
  "Memory",
  "Signal",
  "RevOps",
  "n8n",
  "Claude",
  "Slack",
  "Notion",
  "SAP",
  "HubSpot",
  "Salesforce",
  "OpenAI",
  "Postgres",
  "System",
  "Prozess",
  "Freigabe",
  "Opportunity",
] as const;

const TRAIL = "rgba(25, 28, 33, 0.12)";
const MUTED_A = "rgba(255, 255, 255, 0.24)";
const MUTED_B = "rgba(255, 255, 255, 0.12)";
const MUTED_C = "rgba(148, 163, 184, 0.2)";
const ACCENT_A = "rgba(232, 168, 146, 0.48)";
const ACCENT_B = "rgba(204, 128, 102, 0.36)";
const FONT = '"JetBrains Mono", ui-monospace, monospace';

function pickTerm() {
  return TERMS[(Math.random() * TERMS.length) | 0];
}

function pickHead() {
  const roll = Math.random();
  if (roll < 0.14) return ACCENT_A;
  if (roll < 0.24) return ACCENT_B;
  if (roll < 0.52) return MUTED_A;
  if (roll < 0.76) return MUTED_C;
  return MUTED_B;
}

function layoutForWidth(width: number, denser = false) {
  if (width < 640) {
    return {
      fontSize: denser ? 12 : 11,
      stride: denser ? 28 : 32,
      stepMs: denser ? 112 : 122,
      activeChance: denser ? 0.56 : 0.46,
    };
  }
  if (width < 960) {
    return {
      fontSize: denser ? 13 : 12,
      stride: denser ? 24 : 28,
      stepMs: denser ? 102 : 110,
      activeChance: denser ? 0.62 : 0.52,
    };
  }
  return {
    fontSize: denser ? 14 : 13,
    stride: denser ? 22 : 26,
    stepMs: denser ? 92 : 102,
    activeChance: denser ? 0.66 : 0.56,
  };
}

export function HeroTermRain({
  variant = "page",
  quiet = false,
}: {
  variant?: "page" | "section";
  quiet?: boolean;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const denser = variant === "section";

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const drops: number[] = [];
    const active: boolean[] = [];
    let dpr = 1;
    let cssW = 0;
    let cssH = 0;
    let fontSize = denser ? 14 : 13;
    let stride = denser ? 22 : 26;
    let stepMs = denser ? 92 : 102;
    let activeChance = denser ? 0.66 : 0.56;
    let visible = true;
    let raf = 0;
    let last = 0;
    let stopped = false;

    const applyFont = () => {
      ctx.font = `500 ${fontSize}px ${FONT}`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
    };

    let lastW = 0;
    let lastH = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(rect.width));
      const nextH = Math.max(1, Math.round(rect.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nextW === lastW && nextH === lastH && nextDpr === dpr && drops.length > 0) {
        return false;
      }

      cssW = nextW;
      cssH = nextH;
      dpr = nextDpr;
      lastW = nextW;
      lastH = nextH;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const layout = layoutForWidth(cssW, denser);
      fontSize = layout.fontSize;
      stride = layout.stride;
      stepMs = layout.stepMs;
      activeChance = layout.activeChance;
      applyFont();

      const columns = Math.max(1, Math.floor(cssW / stride));
      drops.length = columns;
      active.length = columns;
      for (let i = 0; i < columns; i += 1) {
        active[i] = Math.random() < activeChance;
        drops[i] = Math.random() * (cssH / fontSize);
      }
      return true;
    };

    const fillField = () => {
      ctx.fillStyle = "rgba(25, 28, 33, 0.22)";
      ctx.fillRect(0, 0, cssW, cssH);
      for (let i = 0; i < 26; i += 1) tick();
    };

    const tick = () => {
      ctx.fillStyle = TRAIL;
      ctx.fillRect(0, 0, cssW, cssH);
      applyFont();

      for (let i = 0; i < drops.length; i += 1) {
        if (!active[i]) continue;
        ctx.fillStyle = pickHead();
        ctx.fillText(pickTerm(), i * stride, drops[i] * fontSize);
        drops[i] += 1;
        if (drops[i] * fontSize > cssH && Math.random() > 0.965) {
          drops[i] = 0;
          active[i] = Math.random() < activeChance;
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, cssW, cssH);
      applyFont();
      ctx.globalAlpha = 0.4;
      const stepY = fontSize * 2.8;
      for (let y = 10; y < cssH; y += stepY) {
        for (let i = 0; i < drops.length; i += 1) {
          if (!active[i] || ((i * 17 + y) | 0) % 4 === 0) continue;
          ctx.fillStyle = pickHead();
          ctx.fillText(pickTerm(), i * stride + ((i * 13) % 7), y);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (stopped) return;
      raf = window.requestAnimationFrame(loop);
      if (!visible || document.visibilityState !== "visible") return;
      if (now - last < stepMs) return;
      last = now;
      tick();
    };

    const start = () => {
      resize();
      if (reduce) {
        drawStatic();
        return;
      }
      fillField();
      last = performance.now();
      raf = window.requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => {
      if (!resize()) return;
      if (reduce) {
        drawStatic();
        return;
      }
      fillField();
    });
    ro.observe(wrap);

    let cancelled = false;
    const fonts = document.fonts;
    const ready = fonts?.ready ?? Promise.resolve();
    void ready.then(() => {
      if (!cancelled) start();
    });

    return () => {
      cancelled = true;
      stopped = true;
      window.cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [denser, reduce]);

  return (
    <motion.div
      ref={wrapRef}
      className={`${styles.wrap} ${variant === "section" ? styles.wrapSection : ""}`}
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.hero, ease: EASE.outExpo }}
    >
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${variant === "section" ? styles.canvasSection : ""} ${quiet ? styles.canvasQuiet : ""}`}
      />
    </motion.div>
  );
}
