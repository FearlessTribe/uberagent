import styles from "./MaximDemoVideo.module.css";

const VIDEO_SRC = "/video/maxim-demo.mp4";

export function MaximDemoVideo({ className }: { className?: string }) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`.trim()}>
      <video
        className={styles.player}
        src={VIDEO_SRC}
        controls
        playsInline
        preload="metadata"
        title="Maxim in Aktion"
      >
        Maxim-Demo-Video
      </video>
    </div>
  );
}
