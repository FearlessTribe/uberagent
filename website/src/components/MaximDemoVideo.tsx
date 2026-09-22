import { useCallback } from "react";
import styles from "./MaximDemoVideo.module.css";

const VIDEO_SRC = "/video/maxim-demo.mp4";
const POSTER_SRC = "/video/maxim-demo-poster.jpg";
/** Opening frames are blank white; land on the first readable still. */
const START_AT = 1.2;

export function MaximDemoVideo({ className }: { className?: string }) {
  const handleLoadedMetadata = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      if (video.currentTime < START_AT) {
        video.currentTime = START_AT;
      }
    },
    [],
  );

  return (
    <div className={`${styles.frame} ${className ?? ""}`.trim()}>
      <video
        className={styles.player}
        controls
        playsInline
        preload="auto"
        poster={POSTER_SRC}
        title="Maxim in Aktion"
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={`${VIDEO_SRC}#t=${START_AT}`} type="video/mp4" />
        Maxim-Demo-Video
      </video>
    </div>
  );
}
