import { Children, type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  fadeUpItem,
  staggerContainer,
  viewport,
} from "../motion";

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
} as const;

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  as?: keyof typeof motionTags;
}

export function ScrollReveal({
  children,
  className = "",
  stagger = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[Tag];

  if (reduce) {
    const PlainTag = Tag as ElementType;
    return <PlainTag className={className}>{children}</PlainTag>;
  }

  if (stagger) {
    return (
      <MotionTag
        className={className}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {Children.map(children, (child, i) => (
          <motion.div key={i} className="reveal-item" variants={fadeUpItem}>
            {child}
          </motion.div>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  );
}
