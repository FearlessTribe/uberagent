import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useDocumentSeo } from "../hooks/useDocumentSeo";
import {
  KOLLEGENRUNDE_PATH,
  type KollegenrundeAudience,
} from "../hooks/useKollegenrundeRoute";
import { useOverlay } from "../context/OverlayContext";
import { CtaButton } from "./CtaButton";
import { ContactFooter } from "./ContactFooter";
import { KollegenrundeCardDesigner } from "./KollegenrundeCardDesigner";
import { StackedCards } from "./StackedCards";
import {
  DURATION,
  EASE,
  fadeUpItem,
  resolveVariants,
  slidePanel,
  staggerContainer,
  viewport,
} from "../motion";
import styles from "./UlmerKollegenrundePage.module.css";

const STRIPE_ORDER_URL =
  "https://buy.stripe.com/4gM7sMgcB7wx5QebWM4sE06";

const TEAM_HERO_POSTER = "/kollegenrunde/hero/poster.jpg";
const TEAM_HERO_VIDEOS = [
  "/kollegenrunde/hero/team-1.mp4",
  "/kollegenrunde/hero/team-2.mp4",
  "/kollegenrunde/hero/team-3.mp4",
  "/kollegenrunde/hero/team-4.mp4",
  "/kollegenrunde/hero/team-5.mp4",
] as const;

type ExampleCard = {
  id: string;
  name: string;
  front: string;
  back: string;
  frontAlt: string;
  backAlt: string;
};

const EXAMPLE_CARDS: ExampleCard[] = [
  {
    id: "escape",
    name: "Escape Studio Neu-Ulm",
    front: "/kollegenrunde/cards/escape-front.jpg",
    back: "/kollegenrunde/cards/escape-back.png",
    frontAlt: "Escape Studio Neu-Ulm, Vorderseite mit Vorteil",
    backAlt: "Team Challenge: Exit-Strategie",
  },
  {
    id: "pilz",
    name: "Pilz Workshop",
    front: "/kollegenrunde/cards/pilz-front.jpg",
    back: "/kollegenrunde/cards/pilz-back.png",
    frontAlt: "Pilz Workshop, Vorderseite mit Vorteil",
    backAlt: "Team Challenge: Mush love",
  },
  {
    id: "vogelsang",
    name: "Vogelsang Hausbrauerei",
    front: "/kollegenrunde/cards/vogelsang-front.jpg",
    back: "/kollegenrunde/cards/vogelsang-back.png",
    frontAlt: "Vogelsang Hausbrauerei, Vorderseite mit Vorteil",
    backAlt: "Team Challenge: Hochstapler-Pitch",
  },
  {
    id: "karaoke",
    name: "Karaoke Bar Ulm",
    front: "/kollegenrunde/cards/karaoke-front.jpg",
    back: "/kollegenrunde/cards/karaoke-back.png",
    frontAlt: "Karaoke Bar Ulm, Vorderseite mit Vorteil",
    backAlt: "Team Challenge: Office Star",
  },
  {
    id: "bowl",
    name: "Bowl24",
    front: "/kollegenrunde/cards/bowl-front.jpg",
    back: "/kollegenrunde/cards/bowl-back.png",
    frontAlt: "Bowl24, Vorderseite mit Vorteil",
    backAlt: "Team Challenge: Bowl Together Now",
  },
];

const HERO = {
  kunden: {
    image: TEAM_HERO_POSTER,
    alt: "Team unterwegs, gemeinsames Erlebnis",
    kicker: "Team Challenge · Ulm & Neu-Ulm",
    title: (
      <>
        Kurz-Events für euer Team. Fertig in der{" "}
        <span className="em">Box</span>
      </>
    ),
    lead:
      "Mittagstische, Restaurants und kleine Team-Events mit exklusiven Vorteilen. Mehrere kurze Termine statt eines teuren Groß-Events.",
    stats: "Erste Ausgabe · limitiert · 4 bis 10 Personen · Ulm & Neu-Ulm",
    cta: "Jetzt bestellen",
    ctaHref: STRIPE_ORDER_URL,
  },
  anbieter: {
    image: "/kollegenrunde/hero-anbieter.jpg",
    alt: "Gäste und Service in einem Restaurant",
    kicker: "Team Challenge für Partner",
    title: (
      <>
        Volles Haus, zu Zeiten die du{" "}
        <span className="em">festlegst</span>
      </>
    ),
    lead:
      "Unternehmen kaufen die Box. Teams wählen eine Karte und kommen gemeinsam zu dir. Kostenlose Sichtbarkeit bei lokalen Firmen-Teams.",
    stats: "Erste Ausgabe · limitiert · Schriftliche Konditionen · QR vor Ort",
    cta: "Partnerangebot besprechen",
    ctaHref: "#partner",
  },
} as const;

const kundenBenefits = [
  {
    title: "30 exklusive Vorteile",
    text: "Mittagstische, Restaurants und kleine Team-Events: lokal, klar und sofort einlösbar.",
    icon: "tag" as const,
  },
  {
    title: "Kurz statt groß",
    text: "Mehrere kleine Termine statt eines teuren Offsites. Rituale, die im Alltag bleiben.",
    icon: "calendar" as const,
  },
  {
    title: "Einfach organisiert",
    text: "Karte wählen, Termin finden, Vorteil nutzen. Kein App-Zwang, kein Planungsmarathon.",
    icon: "check" as const,
  },
  {
    title: "Team, das zusammenhält",
    text: "Regelmäßige gemeinsame Events stärken Kollegialität nachhaltiger als seltene Groß-Events.",
    icon: "people" as const,
  },
];

const anbieterBenefits = [
  {
    title: "Gruppenbuchungen von Firmen",
    text: "Teams kommen gemeinsam: planbare Gruppenbesuche statt Einzelgäste.",
    icon: "people" as const,
  },
  {
    title: "Kostenlose Werbung",
    text: "Deine Karte landet in Boxen bei Ulmer Firmen. Keine Aufnahmegebühr, kein Risiko.",
    icon: "spark" as const,
  },
  {
    title: "Je besser der Vorteil, desto mehr Buchungen",
    text: "Stärkere Angebote werden öfter gewählt. Du steuerst Nachfrage über den Rabatt.",
    icon: "tag" as const,
  },
  {
    title: "Zeiten, die du festlegst",
    text: "Kapazität und Ausschlusstage schriftlich vorab. Du bleibst Herr über deinen Tisch.",
    icon: "calendar" as const,
  },
];

type RankingTab = "Alle" | "Tech" | "Gastronomie" | "Handwerk" | "Weststadt";

const RANKING_TABS: RankingTab[] = ["Alle", "Tech", "Gastronomie", "Handwerk", "Weststadt"];

const RANKING_ROWS: {
  team: string;
  company: string;
  points: number;
  tabs: RankingTab[];
}[] = [
  { team: "Die Escape-Profis", company: "softgarden Ulm", points: 1280, tabs: ["Alle", "Tech"] },
  { team: "Schlemmerbande", company: "Ratiopharm", points: 1195, tabs: ["Alle", "Gastronomie"] },
  { team: "Weststadt Wölfe", company: "Handwerk Ulm Nord", points: 1142, tabs: ["Alle", "Handwerk", "Weststadt"] },
  { team: "Bowl Brothers", company: "Zollern Digital", points: 1088, tabs: ["Alle", "Tech"] },
  { team: "Karaoke Kings", company: "Sparkasse Neu-Ulm", points: 1010, tabs: ["Alle", "Weststadt"] },
  { team: "Pilzplausch", company: "Culinaria GmbH", points: 976, tabs: ["Alle", "Gastronomie"] },
];

function shuffleVideos(list: readonly string[]): string[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function TeamsHeroMedia({ reduce }: { reduce: boolean | null }) {
  const [playlist] = useState(() => shuffleVideos(TEAM_HERO_VIDEOS));
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    if (reduce) return;
    refs.current.forEach((video, index) => {
      if (!video || index === active) return;
      video.pause();
    });
    const video = refs.current[active];
    if (!video) return;
    video.currentTime = 0;
    const play = () => {
      void video.play().catch(() => undefined);
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });
    return () => video.removeEventListener("loadeddata", play);
  }, [active, reduce]);

  if (reduce) {
    return (
      <img
        className={styles.heroImage}
        src={TEAM_HERO_POSTER}
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={styles.heroMedia} aria-hidden="true">
      <img className={styles.heroPoster} src={TEAM_HERO_POSTER} alt="" />
      {playlist.map((src, index) => {
        const isActive = index === active;
        return (
          <motion.video
            key={src}
            ref={(el) => {
              refs.current[index] = el;
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
              }
            }}
            className={styles.heroVideo}
            src={src}
            muted
            playsInline
            autoPlay={isActive}
            loop={false}
            preload={isActive || index === (active + 1) % playlist.length ? "auto" : "metadata"}
            tabIndex={-1}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1.06 : 1,
            }}
            transition={{
              opacity: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: isActive ? 16 : 1.15, ease: "linear" },
            }}
            onEnded={() => {
              if (!isActive) return;
              setActive((prev) => (prev + 1) % playlist.length);
            }}
          />
        );
      })}
    </div>
  );
}

const kundenSteps = [
  { title: "Drei Karten wählen", text: "Worauf die Runde Lust hat.", icon: "cards" as const },
  { title: "Abstimmen", text: "Termin finden, Organisator wechselt.", icon: "vote" as const },
  { title: "Reservieren", text: "Falls die Karte das braucht.", icon: "calendar" as const },
  { title: "Einlösen", text: "Hin, Vorteil nutzen, fertig.", icon: "check" as const },
];

const anbieterSteps = [
  { title: "Passung prüfen", text: "Passt Angebot und Teamgröße?", icon: "sliders" as const },
  { title: "Schriftlich vereinbaren", text: "Leistung, Zeiten, Einlösung.", icon: "calendar" as const },
  { title: "Karte freigeben", text: "Druck und Online-Eintrag.", icon: "cards" as const },
  { title: "Besuch & QR prüfen", text: "Team kommt, QR vom Set einmal scannen.", icon: "qr" as const },
];

const kundenFaqs = [
  {
    q: "Ist das Erlebnis schon in der Box enthalten?",
    a: "Nein. Die Box enthält die Vorteile auf den Karten. Eintritt, Speisen und Kurse zahlt ihr zusätzlich, außer die Karte sagt etwas anderes.",
  },
  {
    q: "Was sind die zwei Challenges pro Kurz-Event?",
    a: "Intern: Kollegen Duell: ein Gewinner im Team, mit Leaderboard innerhalb eurer Runde. Extern: Team Challenge: euer messbarer Score tritt gegen alle anderen Ulmer Teams an.",
  },
  {
    q: "Müssen immer alle mitkommen?",
    a: "Nein. Ihr bleibt in der angegebenen Gruppengröße, die Teilnahme ist freiwillig.",
  },
  {
    q: "Wie oft kann eine Karte eingelöst werden?",
    a: "Jeder Gutschein einmal pro Box als gemeinsamer Besuch. Details stehen auf der Karte.",
  },
  {
    q: "Brauchen wir eine App?",
    a: "Nein. Die mobile Website reicht für Infos und Buchung.",
  },
  {
    q: "Wann können wir bestellen?",
    a: "Sofort über den Bestell-Button. Die erste Ausgabe ist limitiert.",
  },
  {
    q: "Warum nicht einfach ein großes Event?",
    a: "Weil Vertrauen im Alltag entsteht. Mehrere kurze, gemeinsame Events schaffen Rituale. Regelmäßige, einfache Teamaktivitäten stärken Kollegialität nachhaltiger als seltene Groß-Events.",
  },
];

const anbieterFaqs = [
  {
    q: "Muss ich hohe Rabatte geben?",
    a: "Nein. Ein klares Extra oder eine Zusatzleistung reicht oft besser als ein großer Rabatt. Je klarer und wertiger der Vorteil, desto höher der Anreiz für Teams, und desto größer die Chance, mit aufs erste Deck zu kommen.",
  },
  {
    q: "Kann ich Einlösungen spontan ablehnen?",
    a: "Nein bei bestätigter Reservierung. Ausschlusstage und Kapazität legen wir vorher fest.",
  },
  {
    q: "Sind Gästezahlen garantiert?",
    a: "Nein, keine feste Abnahmegarantie. Wir verkaufen die Box an Ulmer Firmen. Wie oft Teams bei dir einlösen, hängt davon ab, wie viele Boxen verkauft werden und welche Karten die Teams wählen. Du siehst echte Nachfrage statt leerer Versprechen. Kapazität und Zeiten legst du vorher fest.",
  },
  {
    q: "Was muss mein Team vor Ort tun?",
    a: "Set prüfen, QR-Code scannen, Vorteil gewähren. Der Scan entwertet das Set digital, Kopien greifen nicht. Kurze Anleitung inklusive.",
  },
];

function Icon({
  name,
  className,
}: {
  name:
    | "cards"
    | "vote"
    | "calendar"
    | "check"
    | "sliders"
    | "spark"
    | "box"
    | "people"
    | "store"
    | "qr"
    | "tag"
    | "trophy"
    | "bot";
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "cards":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="11" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 5h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "vote":
      return (
        <svg {...common}>
          <path d="M8 11v8M12 7v12M16 13v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 19h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="m8.5 12.2 2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M4 7h10M18 7h2M4 17h2M10 17h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="7" r="2.25" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="17" r="2.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3.5v3M12 17.5v3M4.8 6.2l2.1 2.1M17.1 15.7l2.1 2.1M3.5 12h3M17.5 12h3M4.8 17.8l2.1-2.1M17.1 8.3l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "box":
      return (
        <svg {...common}>
          <path d="M4 8.5 12 4l8 4.5v9L12 22l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M4 8.5 12 13l8-4.5M12 13v9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="9.2" r="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4.5 18.2c.4-2.8 2.4-4.4 4.5-4.4s4.1 1.6 4.5 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M13.8 13.9c1.5-.3 3.3.7 3.7 3.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "store":
      return (
        <svg {...common}>
          <path d="M4.5 10.5 6 6.5h12l1.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M5 10.5h14v8.5H5V10.5Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 19V14h4v5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "qr":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 14h2.5v2.5H14V14Zm3.5 0H20v6h-6v-2.5h3.5V14Z" fill="currentColor" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path
            d="M4.5 12.5 12 5h5.5A1.5 1.5 0 0 1 19 6.5V12l-7.5 7.5a1.5 1.5 0 0 1-2.1 0L4.5 14.6a1.5 1.5 0 0 1 0-2.1Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="15.2" cy="8.8" r="1.2" fill="currentColor" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...common}>
          <path
            d="M8 5h8v2.5a4 4 0 0 1-8 0V5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 6.5H5.5A2 2 0 0 0 5.8 10M16 6.5h2.5A2 2 0 0 1 18.2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 14.5h4M12 14.5V17M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <rect x="5" y="8" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 5v3M9.5 13h.01M14.5 13h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 16.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function AudienceToggle({
  audience,
  onChange,
}: {
  audience: KollegenrundeAudience;
  onChange: (next: KollegenrundeAudience) => void;
}) {
  return (
    <div className={styles.audienceToggle} role="tablist" aria-label="Zielgruppe">
      <button
        type="button"
        role="tab"
        aria-selected={audience === "kunden"}
        className={`${styles.audienceTab} ${audience === "kunden" ? styles.audienceTabActive : ""}`}
        onClick={() => onChange("kunden")}
      >
        <Icon name="people" className={styles.tabIcon} />
        Für Teams
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={audience === "anbieter"}
        className={`${styles.audienceTab} ${audience === "anbieter" ? styles.audienceTabActive : ""}`}
        onClick={() => onChange("anbieter")}
      >
        <Icon name="store" className={styles.tabIcon} />
        Für Erlebnisanbieter
      </button>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <p className={styles.sectionEyebrow}>{eyebrow}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {text ? <p className={styles.sectionLead}>{text}</p> : null}
    </div>
  );
}

function FlipExampleCard({
  card,
  index,
}: {
  card: ExampleCard;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);

  const flipped = pinned || hovering;

  return (
    <motion.div
      className={`${styles.flipScene} ${flipped ? styles.flipSceneOpen : ""}`}
      initial={reduce ? false : { opacity: 0, y: 32, rotateZ: -3.5 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateZ: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: DURATION.slow,
        ease: EASE.outExpo,
        delay: Math.min(index, 4) * 0.07,
      }}
      onMouseEnter={() => {
        if (!reduce) setHovering(true);
      }}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        type="button"
        className={`${styles.flipCard} ${flipped ? styles.flipCardOpen : ""}`}
        onClick={() => setPinned((prev) => !prev)}
        aria-pressed={flipped}
        aria-label={`${card.name}: Karte wenden`}
      >
        <div
          className={styles.flipInner}
          style={
            reduce
              ? undefined
              : {
                  transform: flipped
                    ? "rotateY(180deg) translateY(-6px)"
                    : "rotateY(0deg)",
                }
          }
        >
          <div
            className={styles.flipFace}
            style={reduce && flipped ? { display: "none" } : undefined}
          >
            <img src={card.front} alt={card.frontAlt} draggable={false} />
            <span className={styles.flipShine} aria-hidden="true" />
            <span className={styles.flipPeek} aria-hidden="true">
              Challenge
            </span>
          </div>
          <div
            className={`${styles.flipFace} ${styles.flipFaceBack}`}
            style={reduce && !flipped ? { display: "none" } : undefined}
          >
            <img src={card.back} alt={card.backAlt} draggable={false} />
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function ExampleCardStack() {
  return (
    <div className={styles.stackWrap}>
      <StackedCards className={styles.stack} offsetTop={112} stackGap={20}>
        {EXAMPLE_CARDS.map((card, index) => (
          <FlipExampleCard key={card.id} card={card} index={index} />
        ))}
      </StackedCards>
      <p className={styles.stackHint}>
        Hover oder tippen · Vorderseite Vorteil, Rückseite Challenge
      </p>
    </div>
  );
}

function FaqAccordion({
  items,
  headingId,
}: {
  items: { q: string; a: string }[];
  headingId: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <SectionHead eyebrow="FAQ" title={<span id={headingId}>Häufige Fragen</span>} />
      <div className={styles.faqList}>
        {items.map((item, index) => {
          const panelId = `${baseId}-panel-${index}`;
          const isOpen = open === index;
          return (
            <div key={item.q} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
              <h3>
                <button
                  type="button"
                  className={styles.faqButton}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqChevron} aria-hidden="true" />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                hidden={!isOpen}
                className={styles.faqPanel}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RankingPreview() {
  const [tab, setTab] = useState<RankingTab>("Alle");
  const rows = RANKING_ROWS.filter((row) => row.tabs.includes(tab)).slice(0, 5);

  return (
    <div className={styles.rankingBoard}>
      <div className={styles.rankingTabs} role="tablist" aria-label="Ranking-Filter">
        {RANKING_TABS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={`${styles.rankingTab} ${tab === item ? styles.rankingTabActive : ""}`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <table className={styles.rankingTable}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">Punkte</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.team} className={index === 0 ? styles.rankingRowTop : undefined}>
              <td>{index + 1}</td>
              <td>
                <div className={styles.rankingTeam}>
                  <strong>{row.team}</strong>
                  <span>{row.company}</span>
                </div>
              </td>
              <td>{row.points.toLocaleString("de-DE")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.rankingNote}>
        Beispiel-Ranking · Stadtweit, nach Branche und Stadtteil. Echte Scores nach dem Start.
      </p>
    </div>
  );
}

function KundenContent() {
  const reduce = useReducedMotion();
  const item = resolveVariants(reduce, fadeUpItem);
  const container = resolveVariants(reduce, staggerContainer);

  return (
    <>
      <section className={styles.section}>
        <SectionHead
          eyebrow="Vorteile"
          title={
            <>
              Was euer Team davon{" "}
              <span className="em">hat</span>
            </>
          }
          text="Eine Box, viele kurze Anlässe: Vorteile vor Ort, einfache Organisation, nachhaltiger Team-Effekt."
        />
        <motion.div
          className={styles.benefitGrid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {kundenBenefits.map((benefit) => (
            <motion.article key={benefit.title} className={styles.benefitCard} variants={item}>
              <span className={styles.benefitIconWrap}>
                <Icon name={benefit.icon} className={styles.benefitIcon} />
              </span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Challenges"
          title={
            <>
              Pro Kurz-Event zwei Challenges:{" "}
              <span className="em">intern</span> und{" "}
              <span className="em">extern</span>
            </>
          }
          text="Auf jeder Karte stehen zwei Aufgaben. Intern wetteifert ihr unter euch. Extern messt ihr euch mit ganz Ulm."
        />
        <div className={styles.challengeGrid}>
          <article className={styles.challengeCard}>
            <p className={styles.challengeEyebrow}>Intern · Kollegen Duell</p>
            <h3>Wer ist der Krasseste im Team?</h3>
            <p>
              Eine Person setzt sich durch und landet im Leaderboard eurer Runde. Fördert gesunden
              Wettbewerb, hält die Rivalität spielerisch und macht jedes Event persönlich.
            </p>
          </article>
          <article className={styles.challengeCard}>
            <p className={styles.challengeEyebrow}>Extern · Team Challenge</p>
            <h3>Wer ist das krasseste Team in Ulm?</h3>
            <p>
              Messbarer Score, vergleichbar mit anderen Firmen-Teams: stadtweit, nach Branche und
              Stadtteil. So wird aus eurem Kurz-Event ein Stadtwettbewerb.
            </p>
            <p className={styles.challengePrize}>
              <Icon name="bot" className={styles.benefitIcon} />
              <span>
                Gewinn: Ruhm, Ehre und ein kostenloser AI-Mitarbeiter, der euer Team entlastet.
              </span>
            </p>
          </article>
        </div>
        <RankingPreview />
      </section>

      <section className={styles.stackSection}>
        <div className={styles.stackCopy}>
          <SectionHead
            eyebrow="Beispielkarten"
            title={
              <>
                30 exklusive Rabatte für euer{" "}
                <span className="em">Team</span>
              </>
            }
          />
          <p className={styles.planNote}>
            Erste Ausgabe limitiert. Weniger als ein großes Offsite, mehr kurze Events. Partnerliste
            vor dem Verkaufsstart.
          </p>
          <CtaButton href={STRIPE_ORDER_URL} size="md" surface="on-light">
            Jetzt bestellen
          </CtaButton>
        </div>
        <div className={styles.stackStage}>
          <ExampleCardStack />
        </div>
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Ablauf"
          title={
            <>
              So wird aus einer Karte ein{" "}
              <span className="em">Termin</span>
            </>
          }
        />
        <motion.ol
          className={styles.stepGrid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {kundenSteps.map((step, i) => (
            <motion.li key={step.title} className={styles.stepCard} variants={item}>
              <span className={styles.stepIconWrap}>
                <Icon name={step.icon} className={styles.stepIcon} />
              </span>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <FaqAccordion items={kundenFaqs} headingId="kunden-faq" />

      <section className={styles.ctaSection} id="bestellen">
        <div className={styles.ctaCopy}>
          <p className={styles.sectionEyebrow}>Bestellen</p>
          <h2>Die erste Ulmer Team Challenge beginnt mit euch</h2>
          <p>Erste Ausgabe limitiert. Sichert euch euer Set jetzt.</p>
        </div>
        <CtaButton href={STRIPE_ORDER_URL} size="md" surface="accent">
          Jetzt bestellen
        </CtaButton>
      </section>
    </>
  );
}

function AnbieterContent() {
  const reduce = useReducedMotion();
  const item = resolveVariants(reduce, fadeUpItem);
  const container = resolveVariants(reduce, staggerContainer);
  const { openService, openKollegenrunde, openLaurens } = useOverlay();

  return (
    <>
      <section className={styles.section}>
        <SectionHead
          eyebrow="Vorteile"
          title={
            <>
              Warum sich die Partnerschaft für dich{" "}
              <span className="em">lohnt</span>
            </>
          }
          text="Kein Risiko, keine Gebühr: kostenlose Werbung bei Ulmer Firmen-Teams. Je besser dein Vorteil, desto öfter wirst du gewählt."
        />
        <motion.div
          className={styles.benefitGrid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {anbieterBenefits.map((benefit) => (
            <motion.article key={benefit.title} className={styles.benefitCard} variants={item}>
              <span className={styles.benefitIconWrap}>
                <Icon name={benefit.icon} className={styles.benefitIcon} />
              </span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className={styles.stackSection}>
        <div className={styles.stackCopy}>
          <SectionHead
            eyebrow="Beispielvorteile"
            title={
              <>
                30 exklusive Rabatte für Ulmer{" "}
                <span className="em">Teams</span>
              </>
            }
          />
          <p className={styles.planNote}>
            Erste Ausgabe limitiert. Vorteil schriftlich vor dem Druck vereinbaren. Jedes Set mit
            Verifizierungs-QR.
          </p>
          <CtaButton href="#partner" size="md" surface="on-light">
            Partnergespräch anfragen
          </CtaButton>
        </div>
        <div className={styles.stackStage}>
          <ExampleCardStack />
        </div>
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Ablauf"
          title={
            <>
              So läuft die{" "}
              <span className="em">Zusammenarbeit</span>
            </>
          }
        />
        <motion.ol
          className={styles.stepGrid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {anbieterSteps.map((step, i) => (
            <motion.li key={step.title} className={styles.stepCard} variants={item}>
              <span className={styles.stepIconWrap}>
                <Icon name={step.icon} className={styles.stepIcon} />
              </span>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <section className={styles.section}>
        <SectionHead
          eyebrow="Sicherheit"
          title={
            <>
              Jede Karte ist{" "}
              <span className="em">geschützt</span>
            </>
          }
          text="Fotos oder Screenshots reichen nicht. Jedes Set hat einen eigenen Verifizierungs-QR. Einmal eingelöst, digital entwertet."
        />
        <div className={styles.securityGrid}>
          <article className={styles.securityCard}>
            <span className={styles.securityIconWrap}>
              <Icon name="qr" className={styles.securityIcon} />
            </span>
            <h3>Einmaliger QR pro Set</h3>
            <p>
              Jedes Kartenset trägt einen eigenen Code. Ohne gültigen Scan keine Einlösung.
            </p>
          </article>
          <article className={styles.securityCard}>
            <span className={styles.securityIconWrap}>
              <Icon name="check" className={styles.securityIcon} />
            </span>
            <h3>Digital entwertet</h3>
            <p>
              Nach dem Scan gilt der Vorteil für dieses Set als eingelöst. Kopien und Mehrfachnutzung fallen sofort auf.
            </p>
          </article>
          <article className={styles.securityCard}>
            <span className={styles.securityIconWrap}>
              <Icon name="spark" className={styles.securityIcon} />
            </span>
            <h3>Prüfung in Sekunden</h3>
            <p>
              Team kommt, du scannst, Vorteil gewähren. Kein Papierchaos, kein Rätselraten am Tresen.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHead eyebrow="Konditionen" title="Erste Ausgabe: klar und schlank" />
        <div className={styles.termsCard}>
          <ul>
            <li>
              <Icon name="spark" className={styles.termsIcon} />
              <span>Erste Ausgabe limitiert</span>
            </li>
            <li>
              <Icon name="check" className={styles.termsIcon} />
              <span>Keine Aufnahmegebühr, kein Risiko</span>
            </li>
            <li>
              <Icon name="check" className={styles.termsIcon} />
              <span>Keine zusätzliche Provision auf Gutscheinbesuche</span>
            </li>
            <li>
              <Icon name="qr" className={styles.termsIcon} />
              <span>Jedes Set hat einen Verifizierungs-QR: einmal prüfen, Vorteil gewähren</span>
            </li>
            <li>
              <Icon name="spark" className={styles.termsIcon} />
              <span>Kostenlose Sichtbarkeit bei lokalen Firmen-Teams</span>
            </li>
          </ul>
        </div>
        <CtaButton href="#partner" size="md" surface="on-light">
          Partnergespräch anfragen
        </CtaButton>
      </section>

      <FaqAccordion items={anbieterFaqs} headingId="anbieter-faq" />

      <section className={`${styles.ctaSection} ${styles.ctaSectionDesigner}`} id="partner">
        <div className={styles.ctaCopy}>
          <p className={styles.sectionEyebrow}>Karten-Designer</p>
          <h2>Gestalte eure Teamkarte</h2>
          <p>
            Name, Vorteil und Foto, live wie die Beispielkarten. Einreichen mit Captcha, wir melden
            uns zum Partnergespräch.
          </p>
        </div>
        <KollegenrundeCardDesigner />
      </section>

      <div className={styles.pageFooter}>
        <ContactFooter
          onOpenService={openService}
          onOpenLaurens={openLaurens}
          onOpenKollegenrunde={openKollegenrunde}
        />
      </div>
    </>
  );
}

interface UlmerKollegenrundePageProps {
  audience: KollegenrundeAudience;
  onAudienceChange: (next: KollegenrundeAudience) => void;
  onClose: () => void;
}

export function UlmerKollegenrundePage({
  audience,
  onAudienceChange,
  onClose,
}: UlmerKollegenrundePageProps) {
  const reduce = useReducedMotion();
  const panel = resolveVariants(reduce, slidePanel);
  const hero = HERO[audience];

  useDocumentSeo({
    title:
      audience === "anbieter"
        ? "Ulmer Team Challenge für Erlebnisanbieter | supragent"
        : "Ulmer Team Challenge für Teams | supragent",
    description:
      audience === "anbieter"
        ? "Partnerseite für Gastronomie und Erlebnisanbieter in Ulm und Neu-Ulm: Team Challenge, klare Konditionen und gemeinsame Ausflüge."
        : "Die Ulmer Team Challenge für Teams: Kurz-Events aus der Box, exklusive Vorteile und Challenges in Ulm und Neu-Ulm.",
    canonical: `${window.location.origin}${KOLLEGENRUNDE_PATH}?fuer=${audience}`,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className={styles.page}>
      <nav className={styles.topNav} aria-label="Brotkrumen">
        <button type="button" className={styles.back} onClick={onClose}>
          supragent Home
        </button>
        <span aria-hidden="true">/</span>
        <span>Ulmer Team Challenge</span>
      </nav>

      <header className={`${styles.hero} ${audience === "kunden" ? styles.heroTeams : ""}`}>
        <AnimatePresence mode="wait">
          {audience === "kunden" ? (
            <motion.div
              key="teams-video"
              className={styles.heroMediaWrap}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <TeamsHeroMedia reduce={reduce} />
            </motion.div>
          ) : (
            <motion.img
              key={hero.image}
              className={styles.heroImage}
              src={hero.image}
              alt={hero.alt}
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
        <div
          className={`${styles.heroScrim} ${audience === "kunden" ? styles.heroScrimDeep : ""}`}
          aria-hidden="true"
        />
        <div className={styles.heroInner}>
          <AudienceToggle audience={audience} onChange={onAudienceChange} />
          <AnimatePresence mode="wait">
            <motion.div
              key={audience}
              className={styles.heroCopy}
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className={styles.heroKicker}>{hero.kicker}</p>
              <h1 className={styles.heroTitle}>{hero.title}</h1>
              <p className={styles.heroLead}>{hero.lead}</p>
              <p className={styles.heroStats}>{hero.stats}</p>
              <CtaButton href={hero.ctaHref} size="md" surface="accent">
                {hero.cta}
              </CtaButton>
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            className={styles.panel}
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {audience === "kunden" ? <KundenContent /> : <AnbieterContent />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
