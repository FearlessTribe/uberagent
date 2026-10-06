import styles from "./KollegenrundeCardPreview.module.css";

export type CardPreviewData = {
  name: string;
  category: string;
  offer: string;
  detail: string;
  photoUrl?: string | null;
  backTitle: string;
  duelTitle: string;
  duelBody: string;
  teamTitle: string;
  teamBody: string;
};

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <rect fill="#ddd6c8" width="800" height="500"/>
      <text x="400" y="250" text-anchor="middle" fill="#8a8378" font-family="Georgia,serif" font-size="28">Foto hier</text>
    </svg>`,
  );

export function KollegenrundeCardPreview({
  data,
  side = "front",
  className,
}: {
  data: CardPreviewData;
  side?: "front" | "back";
  className?: string;
}) {
  if (side === "back") {
    return (
      <article
        className={`${styles.cardBack} ${className ?? ""}`}
        aria-label={`Rückseite: ${data.backTitle.trim() || data.name || "Challenge"}`}
      >
        <h3 className={styles.backTitle}>
          {data.backTitle.trim() || "Challenge-Titel"}
        </h3>
        <div className={styles.backBlock}>
          <span className={styles.backLabel}>Kollegen Duell</span>
          <p className={styles.backHeading}>{data.duelTitle.trim() || "Duell-Titel"}</p>
          <p className={styles.backBody}>
            {data.duelBody.trim() || "Kurze Beschreibung des Duells."}
          </p>
        </div>
        <div className={styles.backBlock}>
          <span className={styles.backLabel}>Team Challenge</span>
          <p className={styles.backHeading}>{data.teamTitle.trim() || "Challenge-Titel"}</p>
          <p className={styles.backBody}>
            {data.teamBody.trim() || "Kurze Beschreibung der Team Challenge."}
          </p>
        </div>
        <div className={styles.backMark} aria-hidden="true">
          <span className={styles.backMarkEyes} />
          <span className={styles.backMarkSmile} />
        </div>
      </article>
    );
  }

  const name = data.name.trim() || "Dein Betrieb";
  const category = data.category.trim() || "KATEGORIE";
  const offer = data.offer.trim() || "Dein Teamvorteil";
  const detail = data.detail.trim() || "Für 4+ Personen";
  const photo = data.photoUrl || PLACEHOLDER;

  return (
    <article className={`${styles.card} ${className ?? ""}`} aria-label={`Kartenvorschau: ${name}`}>
      <header className={styles.meta}>
        <span className={styles.kicker}>Ulmer Team-Challenge</span>
        <span className={styles.category}>{category}</span>
      </header>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.photoWrap}>
        <img src={photo} alt="" draggable={false} />
      </div>
      <div className={styles.offer}>
        <span className={styles.offerLabel}>Vorteil</span>
        <p className={styles.offerText}>{offer}</p>
        <p className={styles.offerDetail}>{detail}</p>
      </div>
    </article>
  );
}
