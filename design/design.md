# überagent Design System

Implementierung: `website/src/motion/tokens.ts`, `website/src/motion/presets.ts`, `website/src/motion/reduced.ts` · CSS-Variablen in `website/src/index.css`

---

## Motion Personality

Die Bewegung der Website wirkt wie ein präzises technisches System: ruhig, hochwertig, kontrolliert und intelligent. Animationen sollen nicht „unterhalten“, sondern Orientierung, Tiefe, Fokus und Wertigkeit erzeugen.

Der Stil ist:

* calm
* elegant
* precise
* premium
* technical
* restrained
* system-like
* fast but not nervous
* cinematic only in hero, scroll and storytelling sections

Motion darf die Seite veredeln, aber nie dominieren. Jede Bewegung braucht eine Funktion: Aufmerksamkeit lenken, Hierarchie erklären, Zustand verändern, räumliche Tiefe erzeugen oder Interaktion bestätigen.

---

## Avoid

Keine Animation darf nach Spielzeug, Template oder übermotiviertem SaaS-Marketing wirken.

Vermeiden:

* bouncy toy-like motion
* excessive parallax
* random particle chaos
* scroll-jacking
* long delays
* overanimated SaaS sections
* animations on every element
* dramatic rotations
* elastic overshoots
* confetti-like effects
* infinite movement in content areas
* animations that compete with reading
* motion without information value

---

## Core Principles

| Prinzip              | Umsetzung                                                                     |
| -------------------- | ----------------------------------------------------------------------------- |
| **Ruhe**             | Kurze Distanzen, geringe Amplituden, keine hektischen Richtungswechsel        |
| **Präzision**        | Klare Easing-Kurven, keine weichen Spielzeug-Springs                          |
| **Selektivität**     | Nur Hero, Section Headers, Cards, Modals, Navigation, Prozessflächen          |
| **Räumlichkeit**     | Bewegung erzeugt Tiefe durch Layer, Blur, Opacity und minimale Y-Verschiebung |
| **Systemhaftigkeit** | Alle Bewegungen kommen aus zentralen Presets                                  |
| **Lesbarkeit**       | Text erscheint ruhig, nicht spektakulär                                       |
| **Premium-Gefühl**   | Wenige, saubere Bewegungen statt viele kleine Effekte                         |
| **Performance**      | Nur `transform` und `opacity`; kein Layout-Thrashing                          |
| **Barrierefreiheit** | `useReducedMotion()` reduziert Bewegung auf Opacity oder Dauer 0              |

---

## Motion Language

Die Bewegungssprache besteht aus vier Grundmustern:

### 1. Reveal

Für Inhalte, die beim Scrollen sichtbar werden.

Charakter:

* `opacity: 0 → 1`
* `y: 16px → 0`
* optional `filter: blur(6px → 0px)` nur bei Hero oder großen Visuals
* keine X-Bewegung bei normalen Sections
* keine zufälligen Richtungen

Verwendung:

* Section Headlines
* Hero Copy
* Feature Cards
* Case Study Blocks
* Process Steps
* Trust Logos als Gruppe, nicht einzeln

---

### 2. Focus

Für Elemente, die interaktiv oder wichtig sind.

Charakter:

* minimale Skalierung
* leichte Schattenveränderung
* präziser Hover-State
* keine spielerische Bewegung

Beispiele:

* Button Hover: Pfeil bewegt sich `x: 3px`
* Card Hover: `y: -3px`, Shadow leicht intensiver
* Link Hover: Underline oder Gradient Sweep
* CTA Press: `scale: 0.985`

---

### 3. Transition

Für Zustandswechsel.

Charakter:

* Crossfade
* kurzer Y-Shift
* Scale nur sehr subtil
* kein Slide über große Distanzen

Verwendung:

* Modals
* Mobile Navigation
* Process Slider
* Tabs
* Case Study Wechsel
* Accordions

---

### 4. Ambient Motion

Für Hintergrund und Atmosphäre.

Charakter:

* sehr langsam
* kaum wahrnehmbar
* keine Ablenkung
* nur in Hero oder großen visuellen Bereichen

Verwendung:

* dezente Gradient-Orbs
* technische Linien
* Grid-Layer
* Soft Glow
* Hero Background
* System Diagram Layers

Ambient Motion darf nie aussehen wie Partikel-Spielerei. Sie soll eher wie ein hochwertiges Interface unter Glas wirken.

---

## Timing Rules

| Kontext             |     Dauer |
| ------------------- | --------: |
| Hover               | 160–220ms |
| Tap / Press         |  80–140ms |
| Small UI transition | 200–320ms |
| Card reveal         | 360–480ms |
| Section reveal      | 450–600ms |
| Hero reveal         | 650–850ms |
| Modal enter         | 280–360ms |
| Modal exit          | 180–260ms |
| Background ambient  |    12–28s |

Regel: Je näher an UI, desto schneller. Je näher an Storytelling, desto langsamer. Je mehr Text, desto weniger Bewegung.

---

## Easing Rules

Primäre Easing-Kurve:

```ts
EASE.outExpo = 'cubic-bezier(0.16, 1, 0.3, 1)'
```

Verwendung:

* Hero Entrance
* Section Reveal
* Cards
* Modals
* Panels

Sekundäre Easing-Kurve:

```ts
EASE.outSmooth = 'cubic-bezier(0.4, 0, 0.2, 1)'
```

Verwendung:

* Hover States
* Buttons
* Links
* Small UI

Keine Standard-Browser-Easing wie `ease`, `ease-in-out` oder zufällige Spring-Werte verwenden.

Springs nur für Interaktion, nicht für Seitenaufbau.

```ts
SPRING.precise = {
  type: 'spring',
  stiffness: 420,
  damping: 42,
  mass: 0.8
}
```

Keine Springs mit sichtbarem Bounce.

---

## Distance Rules

| Element            |              Bewegung |
| ------------------ | --------------------: |
| Kleine UI-Elemente |                 4–8px |
| Cards              |                8–16px |
| Section Headers    |               16–24px |
| Hero Text          |               20–32px |
| Panels / Modals    |               12–24px |
| Background Layer   | 24–80px, sehr langsam |

Maximale normale Reveal-Distanz: `24px`.

Nur Hero-Visuals dürfen bis `40px` Bewegung haben.

Keine großen Slides von links/rechts, außer Mobile Navigation oder bewusstes Panel-Verhalten.

---

## Opacity Rules

Opacity ist der wichtigste Premium-Motion-Parameter.

Empfohlene Starts:

```ts
Section text: opacity 0 → 1
Cards:        opacity 0 → 1
Hero items:   opacity 0 → 1
Modals:       opacity 0 → 1
Overlay:      opacity 0 → 0.72
```

Für hochwertige Reveals kann Blur ergänzt werden:

```ts
filter: 'blur(8px)' → 'blur(0px)'
```

Blur nur verwenden bei:

* Hero
* großen Visuals
* Modals
* Premium Feature Panels

Nicht verwenden bei langen Fließtexten, Tabellen oder kleinen Labels.

---

## Stagger Rules

Stagger erzeugt Rhythmus, darf aber nicht wie eine Präsentation wirken.

| Kontext       |               Stagger |
| ------------- | --------------------: |
| Hero Items    |                  80ms |
| Section Cards |                  60ms |
| Process Steps |                  70ms |
| Menu Items    |                  50ms |
| Logos         |                  35ms |
| Long Lists    | maximal erste 6 Items |

Keine Stagger-Animation für jedes kleine Tag, Icon oder Textfragment.

Maximale Stagger-Gesamtdauer pro Block: `400ms`.

---

## Hero Motion

Der Hero ist der einzige Bereich, der cinematic wirken darf.

Erlaubt:

* gestaffeltes Fade-up
* dezenter Blur-In
* langsame Background-Orbs
* Grid-Layer mit minimaler Bewegung
* dezente Lichtkante auf Primary CTA
* Scroll-Fade-out des Hero Visuals
* leichte perspektivische Tiefe bei großen Mockups

Nicht erlaubt:

* übertriebene Parallax Layer
* aggressive Partikel
* permanente CTA-Pulse
* zufällige Linienanimationen
* Typing-Effekte für zentrale Headline

Hero Ablauf:

1. Background erscheint zuerst ruhig.
2. Eyebrow / Label erscheint.
3. Headline erscheint mit geringem Y-Shift.
4. Subheadline folgt.
5. CTA-Gruppe folgt.
6. Visual / System Panel erscheint zuletzt.
7. Ambient Motion läuft sehr langsam weiter.

Hero Text darf nie einzeln pro Wort animiert werden, außer bei sehr kurzen Claim-Akzenten.

---

## Section Motion

Normale Sections sind ruhig.

Erlaubt:

* Section Header reveal
* Karten-Grid als Gruppe
* leichte Hover-Zustände
* Diagramm-Layer gestaffelt
* Prozessschritte nacheinander, aber kurz

Nicht erlaubt:

* jedes Paragraph einzeln
* jedes Icon einzeln
* lange Stagger-Sequenzen
* Scroll-Scrubbing in Standardbereichen

Standard Section Pattern:

```ts
Header: fadeUp
Subcopy: fadeUp, delay +80ms
Grid: staggerContainer
Cards: fadeUpItem
```

Nach dem Reveal bleibt die Section statisch, außer bei Hover oder bewusstem Ambient-Layer.

---

## Card Motion

Cards sollen sich hochwertig und „materialartig“ verhalten.

Default Hover:

```ts
hover: {
  y: -3,
  scale: 1.005,
  transition: { duration: 0.22, ease: EASE.outSmooth }
}
```

Default Tap:

```ts
tap: {
  scale: 0.985,
  transition: { duration: 0.1 }
}
```

Premium Card Hover darf zusätzlich enthalten:

* Border leicht heller
* Shadow minimal stärker
* Gradient Edge leicht sichtbar
* Icon Background leicht intensiver
* CTA Arrow `x: 3px`

Nicht erlaubt:

* Card kippt stark
* Card springt
* Card rotiert
* Glow wird grell
* Hover verändert Layout

---

## Button Motion

Buttons sind präzise, nicht verspielt.

Primary Button:

* Hover: leichte Helligkeit
* Arrow: `x: 3px`
* Tap: `scale: 0.985`
* Transition: 160–220ms

Secondary Button:

* Border wird etwas heller
* Background minimal sichtbarer
* Kein großer Glow

Keine permanent pulsierenden Buttons. CTA darf nur im Hero eine sehr dezente Lichtkante haben.

---

## Navigation Motion

Desktop Navigation:

* keine großen Animationen
* Links mit ruhigem Hover
* Active State klar und direkt
* Header darf beim Scrollen minimal kompakter werden

Mobile Navigation:

* Panel slide-in von rechts
* Overlay fade
* Links gestaffelt
* Close Button ohne Rotationsexzess

Mobile Menu Pattern:

```ts
Overlay: opacity 0 → 1
Panel: x 24px → 0
Links: opacity 0, y 8px → opacity 1, y 0
```

---

## Modal Motion

Modals wirken wie präzise Systemflächen.

Enter:

```ts
Overlay: opacity 0 → 1
Dialog: opacity 0 → 1, scale 0.98 → 1, y 12 → 0
```

Exit:

```ts
Dialog: opacity 1 → 0, scale 1 → 0.985, y 0 → 8
Overlay: opacity 1 → 0
```

Regeln:

* kein Bounce
* kein langer Slide
* Content im Modal nicht einzeln animieren
* Fokus liegt auf Dialogfläche
* Hintergrund wird ruhig abgedunkelt oder leicht geblurrt

---

## Process Slider Motion

Der Prozess-Slider darf technischer wirken als normale Content Sections.

Erlaubt:

* Crossfade zwischen Panels
* leichte Y-Bewegung
* Step Indicator mit ruhigem Active-State
* Progress Line mit Scale-X
* technische Diagramm-Layer nacheinander

Nicht erlaubt:

* horizontales Karussell-Gewackel
* Drag-Spielerei
* Autoplay ohne Nutzerkontrolle
* große Parallax-Effekte

Panel Transition:

```ts
exit:  { opacity: 0, y: -8, filter: 'blur(4px)' }
enter: { opacity: 1, y: 0,  filter: 'blur(0px)' }
```

---

## Scroll Motion

Scroll Motion darf nur Orientierung und Tiefe erzeugen.

Erlaubt:

* `whileInView`
* einmaliges Reveal
* dezente Hero-Fade-States
* leichte Progress-Indikatoren
* sticky Storytelling Sections mit kontrollierter Bewegung

Nicht erlaubt:

* Scroll-Jacking
* blockierte Scroll-Geschwindigkeit
* komplexe Scrubbing-Animationen in Standardsections
* Motion, die Lesefluss unterbricht

Scroll Reveal sollte einmalig sein:

```ts
viewport: {
  once: true,
  amount: 0.25
}
```

Hero darf beim Scrollen leicht ausblenden:

```ts
opacity: 1 → 0.4
y: 0 → -32
scale: 1 → 0.985
```

---

## Ambient Background Rules

Ambient Backgrounds sind erlaubt, aber nur als leiser Tiefenraum.

Erlaubt:

* langsame Gradient-Orbs
* sehr dezente Noise-Textur
* feines Grid
* technische Linien
* Glow hinter großen Cards
* radial light falloff

Nicht erlaubt:

* chaotische Partikel
* starke Bewegung hinter Text
* blinkende Punkte
* hohe Kontraste
* dauerhaft animierte Icons
* mehrere konkurrierende Hintergrundsysteme

Ambient Motion Dauer:

```ts
12s–28s
```

Amplitude:

```ts
translate: 20–60px
scale: 1 → 1.04
opacity: 0.18 → 0.28
```

Hinter Textbereichen muss Ambient Motion nahezu statisch wirken.

---

## Technical Diagram Motion

Technische Diagramme dürfen intelligenter wirken als normale UI.

Geeignet für:

* AI Agent Flow
* MCP Integration
* GTM System
* Data Enrichment Pipeline
* CRM → Analysis → Outreach
* System Architecture

Motion-Ideen:

* Nodes erscheinen nacheinander
* Linien zeichnen sich mit `scaleX`
* Datenpunkte fließen sehr subtil
* aktive Verbindung pulsiert minimal
* Panels wechseln mit Crossfade
* Status Badges erscheinen präzise

Regeln:

* Diagramm erklärt den Prozess
* Animation zeigt Ursache → Wirkung
* Keine reine Dekoration
* Bewegung stoppt oder beruhigt sich nach 1–2 Durchläufen
* Loop nur extrem langsam und subtil

---

## Premium Details

Kleine Details, die die Seite hochwertiger wirken lassen:

### 1. Gradient Edge Reveal

Cards bekommen beim Hover eine sehr feine leuchtende Kante.

```css
.card::before {
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out-smooth);
}

.card:hover::before {
  opacity: 1;
}
```

### 2. CTA Arrow Shift

Pfeile bewegen sich nur minimal.

```css
.button:hover .arrow {
  transform: translateX(3px);
}
```

### 3. Active Step Line

Prozesslinien animieren mit `scaleX`.

```css
transform-origin: left;
transform: scaleX(var(--progress));
```

### 4. Soft Blur Entrance

Nur für große Premium-Flächen.

```ts
initial: { opacity: 0, y: 18, filter: 'blur(8px)' }
animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
```

### 5. Glass Panel Settle

Große Panels erscheinen minimal verkleinert.

```ts
initial: { opacity: 0, scale: 0.985, y: 16 }
animate: { opacity: 1, scale: 1, y: 0 }
```

---

## Motion Tokens

```ts
// website/src/motion/tokens.ts

export const DURATION = {
  instant: 0,
  tap: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.55,
  hero: 0.75,
  modal: 0.35,
  ambient: 18
} as const

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  outSmooth: [0.4, 0, 0.2, 1],
  inOutSmooth: [0.65, 0, 0.35, 1]
} as const

export const STAGGER = {
  section: 0.06,
  hero: 0.08,
  menu: 0.05,
  logos: 0.035
} as const

export const DISTANCE = {
  micro: 4,
  small: 8,
  normal: 16,
  section: 24,
  hero: 32
} as const

export const SPRING = {
  precise: {
    type: 'spring',
    stiffness: 420,
    damping: 42,
    mass: 0.8
  },
  stiff: {
    type: 'spring',
    stiffness: 520,
    damping: 48,
    mass: 0.75
  }
} as const
```

CSS-Variablen in `index.css` bleiben die Quelle für reine CSS-Transitions:

```css
:root {
  --duration-tap: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 550ms;
  --duration-hero: 750ms;
  --duration-modal: 350ms;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1);
}
```

---

## Presets

| Preset             | Verwendung                  |
| ------------------ | --------------------------- |
| `fadeUp`           | Einzelnes Scroll-Reveal     |
| `fadeBlurUp`       | Premium Hero / große Panels |
| `staggerContainer` | Karten-Grids, Listen        |
| `fadeUpItem`       | Items innerhalb von Grids   |
| `heroContainer`    | Hero-Sequenz                |
| `heroItem`         | Hero Copy, CTA, Visual      |
| `modalOverlay`     | Modal Background            |
| `modalDialog`      | Modal Enter/Exit            |
| `slidePanel`       | Prozess-Karussell, Tabs     |
| `menuContainer`    | Mobile Navigation           |
| `menuItem`         | Mobile Nav Links            |
| `pressableHover`   | Buttons, Cards              |
| `pressableTap`     | Buttons, Cards              |
| `ambientOrb`       | Hero Background             |
| `lineDraw`         | technische Diagramme        |
| `progressScale`    | Step Lines / Progress       |

---

## Example Presets

```ts
// website/src/motion/presets.ts

import type { Variants } from 'framer-motion'
import { DURATION, EASE, STAGGER, DISTANCE, SPRING } from './tokens'

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: DISTANCE.normal
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.outExpo
    }
  }
}

export const fadeBlurUp: Variants = {
  hidden: {
    opacity: 0,
    y: DISTANCE.section,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.hero,
      ease: EASE.outExpo
    }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.section,
      delayChildren: 0.05
    }
  }
}

export const fadeUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: DISTANCE.small
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.outExpo
    }
  }
}

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.hero,
      delayChildren: 0.08
    }
  }
}

export const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: DISTANCE.hero,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.hero,
      ease: EASE.outExpo
    }
  }
}

export const modalOverlay: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.fast,
      ease: EASE.outSmooth
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.fast,
      ease: EASE.outSmooth
    }
  }
}

export const modalDialog: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    y: 12,
    filter: 'blur(6px)'
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.modal,
      ease: EASE.outExpo
    }
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    y: 8,
    filter: 'blur(4px)',
    transition: {
      duration: DURATION.fast,
      ease: EASE.outSmooth
    }
  }
}

export const slidePanel: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.normal,
      ease: EASE.outExpo
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(4px)',
    transition: {
      duration: DURATION.fast,
      ease: EASE.outSmooth
    }
  }
}

export const menuContainer: Variants = {
  hidden: {
    opacity: 0,
    x: 24
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.outExpo,
      staggerChildren: STAGGER.menu
    }
  },
  exit: {
    opacity: 0,
    x: 16,
    transition: {
      duration: DURATION.fast,
      ease: EASE.outSmooth
    }
  }
}

export const menuItem: Variants = {
  hidden: {
    opacity: 0,
    y: 8
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.fast,
      ease: EASE.outExpo
    }
  }
}

export const pressableHover = {
  y: -2,
  scale: 1.005,
  transition: {
    duration: DURATION.fast,
    ease: EASE.outSmooth
  }
}

export const pressableTap = {
  scale: 0.985,
  transition: {
    duration: DURATION.tap,
    ease: EASE.outSmooth
  }
}

export const lineDraw: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.outExpo
    }
  }
}
```

---

## Reduced Motion

Reduced Motion ist Pflicht.

Regeln:

* Keine Y-Bewegung
* Kein Blur
* Kein Parallax
* Keine Ambient Loops
* Dauer auf 0 oder maximal 100ms
* State Changes bleiben sichtbar über Opacity

Beispiel:

```ts
const shouldReduceMotion = useReducedMotion()

const variants = shouldReduceMotion
  ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } }
    }
  : fadeUp
```

---

## Performance Rules

Animationen dürfen nur folgende Properties verwenden:

```css
transform
opacity
filter /* sparsam */
```

Vermeiden:

```css
top
left
width
height
margin
padding
box-shadow animation
background-position animation
```

Weitere Regeln:

* Große Listen nicht vollständig animieren
* `will-change` nur gezielt und temporär
* Keine schweren Blur-Effekte auf großen Fullscreen-Flächen
* Keine dauerhaft laufenden Animationen außerhalb Hero
* Mobile zuerst testen
* Animierte SVG-Linien nur sparsam
* Hintergrundanimationen dürfen keine CPU-lastigen Canvas-Spielereien sein

---

## Section-Specific Rules

### Hero

Motion-Level: high
Ziel: Eindruck, Tiefe, Vertrauen

Erlaubt:

* Cinematic entrance
* Ambient background
* System diagram reveal
* CTA polish
* Scroll fade

---

### Problem Section

Motion-Level: low
Ziel: Schärfe, Klarheit

Erlaubt:

* Headline reveal
* 3 Pain Cards staggered
* keine dekorative Bewegung

---

### Solution Section

Motion-Level: medium
Ziel: Systemlogik zeigen

Erlaubt:

* Diagramm-Reveal
* Nodes nacheinander
* Verbindungen zeichnen
* kurze aktive Datenfluss-Bewegung

---

### Services Section

Motion-Level: medium
Ziel: Wertigkeit und Vergleichbarkeit

Erlaubt:

* Cards staggered
* Hover Lift
* feine Gradient Edge
* kein Icon-Gewackel

---

### Case Study Section

Motion-Level: medium-high
Ziel: Transformation zeigen

Erlaubt:

* Before/After Crossfade
* KPI Counter nur sehr kurz
* Prozesspanel-Wechsel
* keine übertriebenen Count-Up-Zahlen

---

### Process Section

Motion-Level: medium
Ziel: Vertrauen durch Struktur

Erlaubt:

* Step Progress
* Active Panel Transition
* Line Draw
* gestaffelte Inhalte

---

### CTA Section

Motion-Level: medium
Ziel: Fokus und Abschluss

Erlaubt:

* ruhiger Fade-up
* dezenter Glow
* Arrow Shift
* keine Pulsanimation

---

### Footer

Motion-Level: none
Ziel: Ruhe

Erlaubt:

* einfache Hover-States
* keine Reveals notwendig

---

## Motion Budget

Pro Viewport maximal:

* 1 primäre Animation
* 1 unterstützende Animation
* 1 optionaler Hover-State
* kein dauerhaft konkurrierender Loop

Eine Section gilt als überanimiert, wenn beim Scrollen mehr als drei Dinge gleichzeitig passieren.

---

## Final Quality Checklist

Vor Merge prüfen:

* Wirkt die Animation hochwertig oder nach Template?
* Unterstützt die Bewegung Verständnis oder nur Dekoration?
* Sind Distanzen klein genug?
* Gibt es irgendwo Bounce?
* Gibt es Animationen auf zu vielen kleinen Elementen?
* Ist Hero deutlich stärker als normale Sections?
* Sind normale Sections ruhig genug?
* Funktioniert Reduced Motion vollständig?
* Läuft Mobile flüssig?
* Werden nur `transform`, `opacity` und sparsam `filter` animiert?
* Gibt es keine Scroll-Jacking-Effekte?
* Ist jede Animation aus einem zentralen Preset ableitbar?

Grundregel: Wenn eine Animation auffällt, aber nichts erklärt, wird sie entfernt. Wenn sie Orientierung, Tiefe oder Wertigkeit erzeugt, bleibt sie.
