import { Lottie } from "lottie-react";
import { useReducedMotion } from "motion/react";

interface AgentLottieProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  /** When false, show static poster (side cards in carousel). */
  playing?: boolean;
}

export function AgentLottie({
  src,
  poster,
  alt,
  className,
  playing = true,
}: AgentLottieProps) {
  const reduce = useReducedMotion();
  const shouldPlay = playing && !reduce;

  if (!shouldPlay) {
    return (
      <img
        src={poster}
        alt={alt}
        className={className}
        width={420}
        height={420}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <Lottie
      src={src}
      loop
      autoplay
      className={className}
      aria-label={alt}
      role="img"
    />
  );
}
