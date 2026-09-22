import styles from "./MaximDemoVideo.module.css";

/** Portrait Short / Hochkant-Embed – kein Autoplay. */
const VIDEO_SRC =
  "https://www.youtube-nocookie.com/embed/fRPebDfr8ig?rel=0&modestbranding=1&playsinline=1";

export function MaximDemoVideo({ className }: { className?: string }) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`.trim()}>
      <iframe
        className={styles.player}
        src={VIDEO_SRC}
        title="Maxim in Aktion – YouTube Video"
        width={315}
        height={560}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
