import styles from "./MaximDemoVideo.module.css";

const VIDEO_SRC = "/video/maxim-demo.mp4";
const POSTER_SRC = "/video/maxim-demo-poster.jpg";

export function MaximDemoVideo({ className }: { className?: string }) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`.trim()}>
      <video
        className={styles.player}
        controls
        playsInline
        preload="metadata"
        poster={POSTER_SRC}
        title="Maxim in Aktion"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Maxim-Demo-Video
      </video>
    </div>
  );
}
