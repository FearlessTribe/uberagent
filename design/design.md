# überagent Design System – Motion

Motion-Richtlinien für [überagent.com](https://überagent.com). Technische Tokens leben in `website/src/motion/`.

## Motion Personality

The motion style is:

- calm
- elegant
- precise
- premium
- technical
- restrained
- system-like
- fast but not nervous
- cinematic only in hero/scroll sections

### Avoid

- bouncy toy-like motion
- excessive parallax
- random particle chaos
- scroll-jacking
- long delays
- overanimated SaaS sections
- animations on every element

---

## Prinzipien

| Prinzip | Umsetzung |
|---------|-----------|
| **Ruhe** | Kurze Distanzen (12–24px), keine Overshoot-Springs |
| **Präzision** | `ease-out-expo`, steife Springs (`damping: 38+`) |
| **Tempo** | 200–550ms für UI, Hero bis 750ms |
| **Selektivität** | Nur Sektions-Header, Karten, Modals, Hero – nicht jedes Label |
| **Systemhaft** | Einheitliche Presets aus `motion/presets.ts` |
| **Barrierefrei** | `useReducedMotion()` – Animationen auf Dauer 0 |

## Wann animieren

| Bereich | Erlaubt | Stil |
|---------|---------|------|
| **Hero** | Ja | Cinematic: gestaffeltes Fade-up, Scroll-Fade-out |
| **Sektionen** | Header + Listen | `ScrollReveal` mit Fade-up |
| **Karten** | Hover/Tap | `y: -2`, `scale: 0.99` – dezent |
| **Modals** | Enter/Exit | Scale 0.98→1, Overlay-Fade |
| **Navigation** | Mobile-Menü | Slide-in Panel, gestaffelte Links |
| **Prozess-Slider** | Panel-Wechsel | Crossfade + leichter Y-Shift |
| **CTAs** | Hover/Tap | Pfeil-Shift via CSS, leichter Press |

## Wann nicht animieren

- Footer-Copyright, statische Labels
- Hintergrund-Orbs (bereits ambient, kein zusätzliches Motion)
- Tabellen, lange Fließtexte in Modals
- Jedes Icon oder Tag einzeln

---

## Tokens

```ts
// website/src/motion/tokens.ts
DURATION.fast    = 0.2s   // Hover, Exit
DURATION.normal  = 0.4s   // Standard UI
DURATION.slow    = 0.55s  // Scroll-Reveal
DURATION.hero    = 0.75s  // Hero-Eintritt
DURATION.modal   = 0.35s  // Modal

EASE.outExpo     = cubic-bezier(0.16, 1, 0.3, 1)
EASE.outSmooth   = cubic-bezier(0.4, 0, 0.2, 1)

STAGGER.section  = 60ms
STAGGER.hero     = 80ms
STAGGER.menu     = 50ms
```

CSS-Variablen in `index.css` (`--duration-*`, `--ease-*`) bleiben die Quelle für reine CSS-Transitions.

---

## Presets

| Preset | Verwendung |
|--------|------------|
| `fadeUp` | Einzelnes Scroll-Reveal |
| `staggerContainer` + `fadeUpItem` | Karten-Grids, Listen |
| `heroContainer` + `heroItem` | Hero-Sektion |
| `modalOverlay` + `modalDialog` | Modal Enter/Exit |
| `slidePanel` | Prozess-Karussell, ProcessSlider |
| `menuContainer` + `menuItem` | Mobile Navigation |
| `pressableHover` / `pressableTap` | Buttons, Karten |

---

## Implementierung

```tsx
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { fadeUp, transitions } from "../motion";

// Scroll reveal
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
/>

// Modal exit
<AnimatePresence>
  {isOpen && (
    <motion.div variants={modalOverlay} initial="hidden" animate="visible" exit="exit" />
  )}
</AnimatePresence>
```

### Reduced Motion

```tsx
const reduce = useReducedMotion();
if (reduce) return <div>{children}</div>;
```

Global: `prefers-reduced-motion` in `index.css` setzt CSS-Animationen auf ~0ms.

---

## Bibliothek

- **Motion** (`motion/react`) – primäre Animations-API
- **CSS** – Hover-States, Hamburger, Ambient-Orbs
- Kein GSAP, kein Scroll-Jacking, kein Parallax außer Hero-Opacity-Fade

---

## Checkliste für neue Komponenten

- [ ] Preset aus `motion/presets.ts` statt Inline-Werte
- [ ] `useReducedMotion()` bei Entrance-Animationen
- [ ] Nur `opacity`, `transform` (x/y/scale) animieren
- [ ] `AnimatePresence` + `key` bei Exit-Animationen
- [ ] Kein Bounce (`damping < 30` vermeiden)
- [ ] Stagger ≤ 80ms, Delay ≤ 100ms
