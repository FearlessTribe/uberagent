import { Children, type ElementType, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeUp,
  fadeUpItem,
  resolveVariants,
  staggerContainer,
  viewport,
} from "../motion";

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
} as const;

const MAX_STAGGER_ITEMS = 6;

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
    const items = Children.toArray(children).slice(0, MAX_STAGGER_ITEMS);
    const rest = Children.toArray(children).slice(MAX_STAGGER_ITEMS);

    return (
      <MotionTag
        className={className}
        variants={resolveVariants(reduce, staggerContainer)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {items.map((child, i) => (
          <motion.div key={i} className="reveal-item" variants={fadeUpItem}>
            {child}
          </motion.div>
        ))}
        {rest.map((child, i) => (
          <div key={`static-${i}`} className="reveal-item">
            {child}
          </div>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={resolveVariants(reduce, fadeUp)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </MotionTag>
  );
}
