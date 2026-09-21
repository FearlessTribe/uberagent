import styles from "./MaximDemoVideo.module.css";

const VIDEO_SRC = "https://www.youtube-nocookie.com/embed/fRPebDfr8ig";

export function MaximDemoVideo({ className }: { className?: string }) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`.trim()}>
      <iframe
        src={VIDEO_SRC}
        title="Maxim in Aktion – YouTube Video"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
