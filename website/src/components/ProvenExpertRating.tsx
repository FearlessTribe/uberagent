import { useEffect } from "react";
import styles from "./ProvenExpertRating.module.css";

const SCRIPT_SRC =
  "https://www.provenexpert.com/widget/richsnippet.js?u=242AjOUA1xGBl8zZjywojAKZjDGpiyGB&v=2";

/** ProvenExpert serves the snippet with max-age=86400, so bust the cache once per day. */
function dailyCacheKey() {
  return new Date().toISOString().slice(0, 10);
}

export function ProvenExpertRating() {
  useEffect(() => {
    if (document.querySelector(`script[data-pe-richsnippet="1"]`)) return;

    const script = document.createElement("script");
    script.src = `${SCRIPT_SRC}&cb=${dailyCacheKey()}`;
    script.async = true;
    script.dataset.peRichsnippet = "1";
    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={`pe-richsnippets ${styles.widget}`} />
    </div>
  );
}
