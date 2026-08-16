import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { painPoints } from "../data/marketing";
import { fadeUpItem, resolveVariants, staggerContainer, viewport } from "../motion";
import styles from "./PainPoints.module.css";

/** Color map from aiwon: #0a0a0a → ink, #1a9d5c → primary */
const ink = "#111827";
const accent = "#CC8066";
const accentSoft = "rgba(204,128,102,0.14)";
const accentMid = "rgba(204,128,102,0.22)";

function ManualVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 280 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes zfMinute { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes zfHour { from { transform: rotate(0deg); } to { transform: rotate(30deg); } }
          @keyframes zfFloat1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes zfFloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
          @keyframes zfFloat3 { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(5px); } }
          @keyframes zfSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes zfPulseRing { 0% { r: 62; opacity: 0.3; } 100% { r: 78; opacity: 0; } }
          .zf-minute { transform-origin: 140px 95px; animation: zfMinute 3s linear infinite; }
          .zf-hour { transform-origin: 140px 95px; animation: zfHour 3s linear infinite; }
          .zf-task1 { animation: zfFloat1 2.5s ease-in-out infinite; }
          .zf-task2 { animation: zfFloat2 3s ease-in-out infinite; }
          .zf-task3 { animation: zfFloat3 2.8s ease-in-out infinite; }
          .zf-repeat { transform-origin: 220px 168px; animation: zfSpin 3s linear infinite; }
          .zf-pulse { animation: zfPulseRing 2s ease-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .zf-minute, .zf-hour, .zf-task1, .zf-task2, .zf-task3, .zf-repeat, .zf-pulse { animation: none !important; }
          }
        `}</style>
        <circle className="zf-pulse" cx="140" cy="95" fill="none" stroke={ink} strokeWidth="1" />
        <circle cx="140" cy="95" r="62" fill="white" stroke={ink} strokeWidth="2.5" />
        <line x1="140" y1="36" x2="140" y2="48" stroke={ink} strokeWidth="2.5" />
        <line x1="140" y1="142" x2="140" y2="154" stroke={ink} strokeWidth="2.5" />
        <line x1="81" y1="95" x2="93" y2="95" stroke={ink} strokeWidth="2.5" />
        <line x1="187" y1="95" x2="199" y2="95" stroke={ink} strokeWidth="2.5" />
        <line x1="165" y1="39" x2="163" y2="47" stroke={ink} strokeWidth="1" opacity="0.4" />
        <line x1="184" y1="53" x2="179" y2="59" stroke={ink} strokeWidth="1" opacity="0.4" />
        <line x1="115" y1="39" x2="117" y2="47" stroke={ink} strokeWidth="1" opacity="0.4" />
        <line x1="96" y1="53" x2="101" y2="59" stroke={ink} strokeWidth="1" opacity="0.4" />
        <line className="zf-hour" x1="140" y1="95" x2="140" y2="60" stroke={ink} strokeWidth="3.5" strokeLinecap="round" />
        <line className="zf-minute" x1="140" y1="95" x2="172" y2="78" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="140" cy="95" r="5" fill={ink} />
        <circle cx="140" cy="95" r="2.5" fill={accent} />
        <g className="zf-task1">
          <rect x="18" y="142" width="60" height="30" rx="8" fill="white" stroke={ink} strokeWidth="1.5" />
          <line x1="26" y1="153" x2="58" y2="153" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="162" x2="48" y2="162" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="zf-task2">
          <rect x="24" y="177" width="60" height="30" rx="8" fill="white" stroke={ink} strokeWidth="1.5" />
          <line x1="32" y1="188" x2="64" y2="188" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="197" x2="52" y2="197" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="zf-task3">
          <rect x="198" y="148" width="60" height="30" rx="8" fill="white" stroke={ink} strokeWidth="1.5" />
          <line x1="206" y1="159" x2="240" y2="159" stroke={ink} strokeWidth="2" strokeLinecap="round" />
          <line x1="206" y1="168" x2="228" y2="168" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className="zf-repeat">
          <path d="M212 160 A10 10 0 1 1 228 160" stroke={ink} strokeWidth="1.5" fill="none" />
          <polygon points="228,160 224,154 232,157" fill={ink} />
          <path d="M228 176 A10 10 0 1 1 212 176" stroke={ink} strokeWidth="1.5" fill="none" />
          <polygon points="212,176 216,182 208,179" fill={ink} />
        </g>
        <text
          x="220"
          y="198"
          textAnchor="middle"
          fill={ink}
          fontSize="8"
          fontWeight="600"
          fontFamily="sans-serif"
          opacity="0.5"
        >
          repeat
        </text>
      </svg>
    </div>
  );
}

function ChaosVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 280 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes dcDrift1 { 0%,100% { transform: translate(0,0); } 25% { transform: translate(6px,-5px); } 50% { transform: translate(-4px,7px); } 75% { transform: translate(5px,3px); } }
          @keyframes dcDrift2 { 0%,100% { transform: translate(0,0); } 25% { transform: translate(-5px,6px); } 50% { transform: translate(7px,-4px); } 75% { transform: translate(-3px,-6px); } }
          @keyframes dcDrift3 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(8px,4px); } 66% { transform: translate(-6px,-5px); } }
          @keyframes dcQPulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.7; } }
          @keyframes dcBarGlitch { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.6); } }
          @keyframes dcLineDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -20; } }
          .dc-bars { animation: dcDrift1 5s ease-in-out infinite; }
          .dc-line { animation: dcDrift2 4.5s ease-in-out infinite; }
          .dc-bar-a { transform-origin: 64px 170px; animation: dcBarGlitch 2.5s ease-in-out infinite; }
          .dc-bar-b { transform-origin: 116px 170px; animation: dcBarGlitch 3s ease-in-out 0.5s infinite; }
          .dc-poly { animation: dcLineDash 1.5s linear infinite; }
          .dc-q1 { animation: dcQPulse 2.5s ease-in-out infinite; }
          .dc-q2 { animation: dcQPulse 2.5s ease-in-out 0.8s infinite; }
          .dc-q3 { animation: dcQPulse 2.5s ease-in-out 1.5s infinite; }
          .dc-chip-a { animation: dcDrift3 6s ease-in-out infinite; }
          .dc-chip-b { animation: dcDrift1 5s ease-in-out 1s infinite; }
          .dc-chip-c { animation: dcDrift2 4.5s ease-in-out 2s infinite; }
          .dc-pie { animation: dcDrift3 6s ease-in-out 0.5s infinite; }
          @media (prefers-reduced-motion: reduce) {
            .dc-bars, .dc-line, .dc-bar-a, .dc-bar-b, .dc-poly, .dc-q1, .dc-q2, .dc-q3, .dc-chip-a, .dc-chip-b, .dc-chip-c, .dc-pie { animation: none !important; }
          }
        `}</style>
        <g className="dc-bars">
          <rect x="28" y="118" width="20" height="52" rx="4" fill={accentSoft} stroke={ink} strokeWidth="1.5" />
          <rect
            className="dc-bar-a"
            x="54"
            y="90"
            width="20"
            height="80"
            rx="4"
            fill={accentMid}
            stroke={ink}
            strokeWidth="1.5"
          />
          <rect x="80" y="132" width="20" height="38" rx="4" fill="rgba(204,128,102,0.1)" stroke={ink} strokeWidth="1.5" />
          <rect
            className="dc-bar-b"
            x="106"
            y="78"
            width="20"
            height="92"
            rx="4"
            fill="rgba(204,128,102,0.15)"
            stroke={accent}
            strokeWidth="1.5"
          />
        </g>
        <g className="dc-line">
          <polyline
            className="dc-poly"
            points="145,65 163,45 183,72 203,35 223,55 250,28"
            stroke={ink}
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 5"
          />
          <circle cx="145" cy="65" r="4" fill="white" stroke={ink} strokeWidth="2" />
          <circle cx="183" cy="72" r="4" fill="white" stroke={accent} strokeWidth="2" />
          <circle cx="223" cy="55" r="4" fill="white" stroke={ink} strokeWidth="2" />
        </g>
        <text className="dc-q1" x="155" y="118" fill={ink} fontSize="30" fontWeight="900" fontFamily="sans-serif">
          ?
        </text>
        <text className="dc-q2" x="218" y="96" fill={accent} fontSize="22" fontWeight="900" fontFamily="sans-serif">
          ?
        </text>
        <text
          className="dc-q3"
          x="125"
          y="90"
          fill={ink}
          fontSize="18"
          fontWeight="900"
          fontFamily="sans-serif"
          opacity="0.5"
        >
          ?
        </text>
        <line x1="118" y1="145" x2="145" y2="126" stroke={ink} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
        <line x1="165" y1="135" x2="198" y2="150" stroke={ink} strokeWidth="1.5" strokeDasharray="3 4" opacity="0.4" />
        <g className="dc-chip-a">
          <rect x="36" y="36" width="40" height="22" rx="11" fill={ink} />
          <text x="56" y="51" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="monospace">
            42%
          </text>
        </g>
        <g className="dc-chip-b">
          <rect x="198" y="153" width="40" height="22" rx="11" fill={accent} />
          <text x="218" y="168" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="monospace">
            17k
          </text>
        </g>
        <g className="dc-chip-c">
          <rect x="112" y="170" width="40" height="22" rx="11" fill={ink} />
          <text x="132" y="185" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="monospace">
            89
          </text>
        </g>
        <g className="dc-pie">
          <path d="M234 148 L234 122 A26 26 0 0 1 256 140 Z" fill={accentMid} stroke={accent} strokeWidth="1.5" />
          <path d="M234 148 L256 140 A26 26 0 0 1 247 168 Z" fill={accentSoft} stroke={ink} strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

function GapVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 280 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="uaCompGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={ink} />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
          <linearGradient id="uaGapFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <style>{`
          @keyframes wbDraw { from { stroke-dashoffset: 500; } to { stroke-dashoffset: 0; } }
          @keyframes wbYou { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
          @keyframes wbFadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes wbPop { 0% { transform: scale(0); } 70% { transform: scale(1.25); } 100% { transform: scale(1); } }
          @keyframes wbDotPing { 0% { r: 5; opacity: 0.8; } 100% { r: 16; opacity: 0; } }
          @keyframes wbGapPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
          @keyframes wbGapBreathe { 0%,100% { opacity: 0.06; } 50% { opacity: 0.14; } }
          @keyframes wbCountUp { 0% { opacity: 0; transform: translateY(4px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes wbSpeedDash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -16; } }
          @keyframes wbAIPulse { 0%,100% { filter: none; } 50% { filter: drop-shadow(0 0 6px rgba(204,128,102,0.7)); } }
          @keyframes wbDuPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
          @keyframes wbAIRide {
            0% { transform: translate(50px, 128px); }
            18% { transform: translate(88px, 100px); }
            36% { transform: translate(128px, 68px); }
            54% { transform: translate(168px, 36px); }
            70% { transform: translate(200px, 12px); }
            82% { transform: translate(220px, -8px); }
            90% { transform: translate(235px, -18px); opacity: 1; }
            96% { opacity: 0; transform: translate(245px, -26px); }
            97% { opacity: 0; transform: translate(50px, 128px); }
            100% { opacity: 1; transform: translate(50px, 128px); }
          }
          .wb-gap-fill { animation: wbFadeIn 1.5s ease-out 1s both, wbGapBreathe 3s ease-in-out infinite 2.5s; }
          .wb-you-line {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
            animation: wbYou 1.5s ease-out 0.3s forwards;
          }
          .wb-comp-line {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: wbDraw 2s cubic-bezier(0.25,0.1,0.25,1) 0.5s forwards;
          }
          .wb-speed {
            animation: wbSpeedDash 0.8s linear infinite 2.5s;
          }
          .wb-dot-a { transform-origin: 85px 155px; animation: wbPop 0.4s ease-out 1s both; }
          .wb-dot-b { transform-origin: 125px 130px; animation: wbPop 0.4s ease-out 1.3s both; }
          .wb-dot-c { transform-origin: 165px 98px; animation: wbPop 0.4s ease-out 1.6s both; }
          .wb-dot-d { transform-origin: 205px 55px; animation: wbPop 0.4s ease-out 1.9s both; }
          .wb-ping { animation: wbDotPing 2.5s ease-out infinite 2s; }
          .wb-ai { animation: wbAIRide 4s cubic-bezier(0.4,0,0.2,1) infinite 2.5s, wbAIPulse 2s ease-in-out infinite 2.5s; }
          .wb-gap-line { animation: wbGapPulse 1.5s ease-in-out infinite 2s; }
          .wb-gap-badge { transform-origin: 205px 108px; animation: wbPop 0.5s ease-out 2.2s both; }
          .wb-you-label {
            transform-origin: 238px 174px;
            animation: wbCountUp 0.5s ease-out 1.5s both, wbDuPulse 2s ease-in-out infinite 2.5s;
          }
          .wb-comp-label { animation: wbCountUp 0.5s ease-out 2.5s both; }
          .wb-axis { animation: wbFadeIn 1s ease-out 0.5s both; }
          @media (prefers-reduced-motion: reduce) {
            .wb-gap-fill, .wb-you-line, .wb-comp-line, .wb-speed, .wb-dot-a, .wb-dot-b, .wb-dot-c, .wb-dot-d,
            .wb-ping, .wb-ai, .wb-gap-line, .wb-gap-badge, .wb-you-label, .wb-comp-label, .wb-axis {
              animation: none !important;
            }
            .wb-you-line, .wb-comp-line { stroke-dashoffset: 0; }
          }
        `}</style>

        <line x1="30" y1="180" x2="255" y2="180" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="30" y1="145" x2="255" y2="145" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="30" y1="110" x2="255" y2="110" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="30" y1="75" x2="255" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
        <line x1="30" y1="40" x2="255" y2="40" stroke="#f3f4f6" strokeWidth="0.5" />

        <path
          className="wb-gap-fill"
          d="M35 165 Q85 155 125 130 Q165 98 205 55 L245 25 L245 165 L225 163 L175 160 L125 164 L75 161 L35 163 Z"
          fill="url(#uaGapFill)"
        />

        <path
          className="wb-you-line"
          d="M35 163 L75 161 L125 164 L175 160 L225 163"
          stroke="#d1d5db"
          strokeWidth="2"
          fill="none"
        />

        <path
          className="wb-comp-line"
          d="M35 165 Q85 155 125 130 Q165 98 205 55 L245 25"
          stroke="url(#uaCompGrad)"
          strokeWidth="3"
          fill="none"
        />

        <path
          className="wb-speed"
          d="M35 165 Q85 155 125 130 Q165 98 205 55 L245 25"
          stroke={accent}
          strokeWidth="1"
          fill="none"
          opacity="0.35"
          strokeDasharray="4 12"
        />

        <circle className="wb-dot-a" cx="85" cy="155" r="4" fill="white" stroke={ink} strokeWidth="2" />
        <circle className="wb-dot-b" cx="125" cy="130" r="4" fill="white" stroke={ink} strokeWidth="2" />
        <circle className="wb-dot-c" cx="165" cy="98" r="4" fill="white" stroke={accent} strokeWidth="2" />
        <circle className="wb-dot-d" cx="205" cy="55" r="5" fill="white" stroke={accent} strokeWidth="2.5" />
        <circle className="wb-ping" cx="205" cy="55" fill="none" stroke={accent} strokeWidth="1" />

        <g className="wb-ai">
          <rect x="-20" y="-12" width="40" height="24" rx="12" fill={accent} />
          <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" fontFamily="sans-serif">
            AI
          </text>
        </g>

        <line
          className="wb-gap-line"
          x1="205"
          y1="55"
          x2="205"
          y2="162"
          stroke={ink}
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        <circle className="wb-gap-line" cx="205" cy="162" r="3" fill={ink} />

        <g className="wb-gap-badge">
          <rect x="190" y="98" width="30" height="20" rx="10" fill={ink} />
          <text x="205" y="112" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="sans-serif">
            GAP
          </text>
        </g>

        <g className="wb-you-label">
          <rect x="222" y="165" width="32" height="18" rx="9" fill={ink} />
          <text x="238" y="178" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            Sie
          </text>
        </g>

        <g className="wb-comp-label">
          <text x="245" y="22" textAnchor="end" fill={accent} fontSize="8" fontWeight="700" fontFamily="sans-serif">
            Wettbewerber
          </text>
        </g>

        <text
          className="wb-axis"
          x="140"
          y="198"
          textAnchor="middle"
          fill="#d1d5db"
          fontSize="8"
          fontFamily="sans-serif"
        >
          Zeit →
        </text>
      </svg>
    </div>
  );
}

const visuals = {
  manual: ManualVisual,
  chaos: ChaosVisual,
  gap: GapVisual,
};

export function PainPoints() {
  const reduce = useReducedMotion();

  return (
    <section className={`section ${styles.section}`} aria-labelledby="pain-heading">
      <div className={styles.gradient} aria-hidden="true" />
      <div className="container">
        <ScrollReveal className={`sectionStart ${styles.header}`}>
          <span className="eyebrow">Das Problem</span>
          <h2 id="pain-heading" className="display-md">
            Kennen Sie das?
          </h2>
          <p className={styles.sub}>
            Viele Unternehmen wissen, dass AI wichtig ist – aber nicht, wo sie anfangen
            sollen.
          </p>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          variants={resolveVariants(reduce, staggerContainer)}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={viewport}
        >
          {painPoints.map((pain) => {
            const Visual = visuals[pain.visual];
            return (
              <motion.article
                key={pain.id}
                className={styles.card}
                variants={resolveVariants(reduce, fadeUpItem)}
              >
                <Visual />
                <span className={styles.label}>{pain.label}</span>
                <h3 className={styles.title}>{pain.title}</h3>
                <p className={styles.body}>{pain.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
