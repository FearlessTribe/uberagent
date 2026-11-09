import { useState } from "react";
import { Modal } from "./Modal";
import styles from "./ImpressumModal.module.css";

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabId = "pflicht" | "hinweise";

function ProtectedText({
  src,
  className,
  width,
  height,
}: {
  src: string;
  className?: string;
  width: number;
  height: number;
}) {
  return (
    <img
      className={className}
      src={src}
      alt=""
      width={width}
      height={height}
      decoding="async"
      draggable={false}
    />
  );
}

export function ImpressumModal({ isOpen, onClose }: ImpressumModalProps) {
  const [tab, setTab] = useState<TabId>("pflicht");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Impressum" eyebrow="Rechtliches">
      <div className={styles.wrap}>
        <div className={styles.tabs} role="tablist" aria-label="Impressum-Bereiche">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "pflicht"}
            className={`${styles.tab} ${tab === "pflicht" ? styles.tabActive : ""}`}
            onClick={() => setTab("pflicht")}
          >
            Pflichtangaben
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "hinweise"}
            className={`${styles.tab} ${tab === "hinweise" ? styles.tabActive : ""}`}
            onClick={() => setTab("hinweise")}
          >
            Rechtliche Hinweise
          </button>
        </div>

        {tab === "pflicht" ? (
          <div className={styles.content}>
            <p className={styles.kicker}>Pflichtangaben gemäß § 5 TMG</p>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Betreiber und Kontakt</h3>
              <ProtectedText
                src="/images/impressum-adresse.jpg"
                className={styles.addressImage}
                width={1152}
                height={864}
              />
              <a className={styles.mail} href="mailto:info@supragent.net">
                info@supragent.net
              </a>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Vertretung</h3>
              <p className={styles.text}>
                Die Gesellschaft in Gründung wird vertreten durch:
              </p>
              <ProtectedText
                src="/images/impressum-name.jpg"
                className={styles.nameImage}
                width={1280}
                height={720}
              />
              <p className={styles.note}>
                Registereintragung und Umsatzsteuer-ID folgen mit Abschluss der Gründung.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                Verantwortlicher für journalistisch-redaktionelle Inhalte gem. § 18 Abs. 2 MStV
              </h3>
              <ProtectedText
                src="/images/impressum-name.jpg"
                className={styles.nameImage}
                width={1280}
                height={720}
              />
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Bilder und Grafiken</h3>
              <p className={styles.text}>
                Angaben zur Quelle verwendeter Bilder und Grafiken:
              </p>
              <ul className={styles.list}>
                <li>Eigene Aufnahmen und Grafiken von supragent</li>
                <li>
                  <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
                    Unsplash
                  </a>
                </li>
                <li>
                  <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">
                    Pexels
                  </a>
                </li>
              </ul>
            </section>
          </div>
        ) : (
          <div className={styles.content}>
            <p className={styles.kicker}>Rechtliche Hinweise</p>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>1. Haftungsbeschränkung</h3>
              <p className={styles.text}>
                Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Der Anbieter
                übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der
                bereitgestellten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr
                des Nutzers. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors
                und nicht immer die Meinung des Anbieters wieder. Mit der reinen Nutzung der Website des
                Anbieters kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>2. Externe Links</h3>
              <p className={styles.text}>
                Diese Website enthält Verknüpfungen zu Websites Dritter („externe Links“). Diese
                Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der
                erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob
                etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich.
                Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf
                die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass
                sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine
                ständige Kontrolle dieser externen Links ist für den Anbieter ohne konkrete Hinweise auf
                Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden derartige externe
                Links unverzüglich gelöscht.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>3. Urheber- und Leistungsschutzrechte</h3>
              <p className={styles.text}>
                Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und
                Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht
                zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder
                jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung,
                Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder
                anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als
                solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte
                oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von
                Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist
                erlaubt. Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher
                Erlaubnis zulässig.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>4. Datenschutz</h3>
              <p className={styles.text}>
                Informationen zur Verarbeitung personenbezogener Daten erhalten Sie auf Anfrage unter{" "}
                <a href="mailto:info@supragent.net">info@supragent.net</a>. Soweit auf dieser Website
                Formulare genutzt werden, erfolgt die Verarbeitung zum Zweck der Kontaktaufnahme und
                Angebotserstellung.
              </p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>5. Besondere Nutzungsbedingungen</h3>
              <p className={styles.text}>
                Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten
                Nummern 1. bis 4. abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen.
                In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
              </p>
            </section>
          </div>
        )}
      </div>
    </Modal>
  );
}
