import {
  AppWindow,
  BadgeCheck,
  CalendarHeart,
  Gift,
  Hand,
  RefreshCw,
  Store,
  TreePine,
  Wallet,
  Waves,
} from "lucide-react";
import styles from "./GiftingMarks.module.css";

const GIFTING_CRMS = [
  { name: "HubSpot", market: "Marketplace", src: "/logos/hubspot.svg", available: true },
  { name: "Salesforce", market: "AppExchange", src: "/logos/salesforce.svg", available: false },
  { name: "Pipedrive", market: "Marketplace", src: "/logos/pipedrive.svg", available: false },
  { name: "Dynamics", market: "AppSource", src: "/logos/dynamics.svg", available: false },
] as const;

const GLYPHS = {
  store: Store,
  wallet: Wallet,
  calendar: CalendarHeart,
  gift: Gift,
  check: BadgeCheck,
  refresh: RefreshCw,
  window: AppWindow,
  wave: Waves,
  tree: TreePine,
  hand: Hand,
} as const;

export type GiftingGlyphName = keyof typeof GLYPHS;

export function GiftingCrmLogos({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className={`${styles.crmLogos} ${tone === "dark" ? styles.dark : ""}`}>
      {GIFTING_CRMS.map((crm) => (
        <li
          key={crm.name}
          className={`${styles.crmBrand} ${crm.available ? "" : styles.crmSoon}`}
          aria-label={crm.available ? crm.name : `${crm.name}, coming soon`}
          tabIndex={crm.available ? undefined : 0}
        >
          <img src={crm.src} alt="" width={72} height={22} />
          <span className={styles.crmName}>{crm.name}</span>
          <span className={styles.crmMarket}>{crm.market}</span>
          {!crm.available && (
            <span className={styles.crmSoonHint} aria-hidden="true">
              Coming soon
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function GiftingGlyph({
  name,
  onDark = false,
}: {
  name: GiftingGlyphName;
  onDark?: boolean;
}) {
  const Icon = GLYPHS[name];
  return (
    <span className={`${styles.glyph} ${onDark ? styles.glyphOnDark : ""}`} aria-hidden="true">
      <Icon size={16} strokeWidth={1.6} />
    </span>
  );
}
