import { ScrollReveal } from "./ScrollReveal";
import styles from "./ChaosToStructure.module.css";

const accent = "#CC8066";
const chaos = "#c8503c";
const chaosDeep = "#8a3a2a";
const ink = "#111827";

export function ChaosToStructure() {
  return (
    <section className={styles.section} aria-labelledby="transform-heading">
      <div className="container">
        <ScrollReveal className={styles.header}>
          <h2 id="transform-heading" className={styles.headline}>
            Von <span className={styles.accent}>Chaos</span> zu Struktur
          </h2>
          <p className={styles.sub}>So transformieren wir Ihre Prozesse</p>
        </ScrollReveal>

        <ScrollReveal className={styles.artWrap}>
          <svg
            className={styles.svg}
            viewBox="0 0 1200 140"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="uaAiGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
                <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </radialGradient>
              <filter id="uaLogoGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <style>{`
              @keyframes uaChaosWiggle1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
              @keyframes uaChaosWiggle2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
              @keyframes uaChaosWiggle3 { 0%,100% { transform: translateY(2px); } 50% { transform: translateY(-3px); } }
              @keyframes uaChaosWiggle4 { 0%,100% { transform: translateY(-2px); } 50% { transform: translateY(3px); } }
              @keyframes uaChaosDraw { from { stroke-dashoffset: 1200; } to { stroke-dashoffset: 0; } }
              @keyframes uaRingRotate1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
              @keyframes uaRingRotate2 { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
              @keyframes uaLogoPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
              @keyframes uaGlowBreathe { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
              @keyframes uaOrderDraw { from { stroke-dashoffset: 560; } to { stroke-dashoffset: 0; } }
              @keyframes uaDotTravel {
                0% { transform: translateX(0); opacity: 0; }
                5% { opacity: 0.65; }
                95% { opacity: 0.65; }
                100% { transform: translateX(480px); opacity: 0; }
              }
              @keyframes uaArrowIn { 0%,80% { opacity: 0; } 100% { opacity: 0.55; } }
              .ua-c1 {
                stroke-dasharray: 1200;
                stroke-dashoffset: 1200;
                animation: uaChaosDraw 2s ease-out forwards, uaChaosWiggle1 4s ease-in-out infinite 2s;
              }
              .ua-c2 {
                stroke-dasharray: 1200;
                stroke-dashoffset: 1200;
                animation: uaChaosDraw 2.2s ease-out 0.2s forwards, uaChaosWiggle2 3.5s ease-in-out infinite 2.2s;
              }
              .ua-c3 {
                stroke-dasharray: 1200;
                stroke-dashoffset: 1200;
                animation: uaChaosDraw 2.4s ease-out 0.4s forwards, uaChaosWiggle3 5s ease-in-out infinite 2.4s;
              }
              .ua-c4 {
                stroke-dasharray: 1200;
                stroke-dashoffset: 1200;
                animation: uaChaosDraw 2.6s ease-out 0.6s forwards, uaChaosWiggle4 4.5s ease-in-out infinite 2.6s;
              }
              .ua-glow { animation: uaGlowBreathe 3s ease-in-out infinite; }
              .ua-ring1 {
                transform-origin: 600px 70px;
                animation: uaRingRotate1 20s linear infinite;
              }
              .ua-ring2 {
                transform-origin: 600px 70px;
                animation: uaRingRotate2 25s linear infinite;
              }
              .ua-core {
                transform-origin: 600px 70px;
                animation: uaLogoPulse 3s ease-in-out infinite;
              }
              .ua-order {
                stroke-dasharray: 560;
                stroke-dashoffset: 560;
                animation: uaOrderDraw 1.5s ease-out 2.5s forwards;
              }
              .ua-dot1 { animation: uaDotTravel 4s linear infinite 3.5s; }
              .ua-dot2 { animation: uaDotTravel 4s linear infinite 4.5s; }
              .ua-dot3 { animation: uaDotTravel 4s linear infinite 5.5s; }
              .ua-arrow { animation: uaArrowIn 3.5s ease-out forwards; }
              @media (prefers-reduced-motion: reduce) {
                .ua-c1, .ua-c2, .ua-c3, .ua-c4, .ua-glow, .ua-ring1, .ua-ring2,
                .ua-core, .ua-order, .ua-dot1, .ua-dot2, .ua-dot3, .ua-arrow {
                  animation: none !important;
                }
                .ua-c1, .ua-c2, .ua-c3, .ua-c4, .ua-order { stroke-dashoffset: 0; }
                .ua-arrow { opacity: 0.55; }
              }
            `}</style>

            <path
              className="ua-c1"
              d="M0 70 Q30 20 70 100 Q110 140 150 30 Q190 -20 230 90 Q270 150 310 40 Q350 -10 390 110 Q430 150 470 50 Q500 -10 530 80 Q545 120 550 65"
              stroke={chaos}
              strokeWidth="2"
              fill="none"
              opacity="0.35"
            />
            <path
              className="ua-c2"
              d="M0 80 Q50 150 110 20 Q170 -20 230 100 Q290 160 340 30 Q380 -20 420 120 Q450 150 490 40 Q520 -20 550 70"
              stroke={chaos}
              strokeWidth="1.5"
              fill="none"
              opacity="0.25"
            />
            <path
              className="ua-c3"
              d="M0 60 Q60 -10 130 130 Q190 160 250 20 Q300 -30 350 100 Q390 140 430 30 Q470 -10 510 90 Q535 120 550 68"
              stroke={chaos}
              strokeWidth="1"
              fill="none"
              opacity="0.2"
            />
            <path
              className="ua-c4"
              d="M20 90 Q90 130 150 60 Q210 10 270 110 Q320 140 370 50 Q410 0 460 80 Q500 110 550 70"
              stroke={chaosDeep}
              strokeWidth="1"
              fill="none"
              opacity="0.15"
            />

            <circle className="ua-glow" cx="600" cy="70" r="50" fill="url(#uaAiGlow)" />
            <circle
              className="ua-ring1"
              cx="600"
              cy="70"
              r="34"
              fill="none"
              stroke={accent}
              strokeWidth="0.8"
              opacity="0.22"
              strokeDasharray="8 12"
            />
            <circle
              className="ua-ring2"
              cx="600"
              cy="70"
              r="40"
              fill="none"
              stroke={accent}
              strokeWidth="0.5"
              opacity="0.14"
              strokeDasharray="4 16"
            />
            <circle
              className="ua-core"
              cx="600"
              cy="70"
              r="28"
              fill="white"
              stroke={ink}
              strokeWidth="2"
              filter="url(#uaLogoGlow)"
            />
            <image href="/logoblack.svg" x="586" y="56" width="28" height="28" />

            <path
              className="ua-order"
              d="M640 70 L1175 70"
              stroke={accent}
              strokeWidth="2.5"
              fill="none"
              opacity="0.5"
            />
            <circle className="ua-dot1" r="3.5" fill={accent} cx="660" cy="70" opacity="0" />
            <circle className="ua-dot2" r="2.5" fill={accent} cx="660" cy="70" opacity="0" />
            <circle className="ua-dot3" r="2" fill={accent} cx="660" cy="70" opacity="0" />
            <polygon className="ua-arrow" points="1185,70 1172,63 1172,77" fill={accent} />
          </svg>

          <div className={styles.labels}>
            <span>Manuell &amp; chaotisch</span>
            <span>Automatisiert &amp; strukturiert</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
