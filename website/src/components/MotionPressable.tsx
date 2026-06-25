import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { pressableHover, pressableTap } from "../motion";

interface MotionPressableProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  "aria-haspopup"?: "dialog" | boolean;
  "aria-label"?: string;
}

export function MotionPressable({
  children,
  className = "",
  onClick,
  onMouseMove,
  ...aria
}: MotionPressableProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <button type="button" className={className} onClick={onClick} onMouseMove={onMouseMove} {...aria}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      onMouseMove={onMouseMove}
      whileHover={pressableHover}
      whileTap={pressableTap}
      {...aria}
    >
      {children}
    </motion.button>
  );
}
