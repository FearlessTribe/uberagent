import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import styles from "./StackedCards.module.css";

interface StackedCardsProps {
  children: ReactNode;
  className?: string;
  /** Sticky top offset for the first card (usually nav height + gap). */
  offsetTop?: number;
  /** Extra sticky step per card so edges stay visible in the stack. */
  stackGap?: number;
}

interface StackedCardProps {
  children: ReactNode;
  index: number;
  total: number;
  offsetTop: number;
  stackGap: number;
  reduceMotion: boolean | null;
}

function StackedCard({
  children,
  index,
  total,
  offsetTop,
  stackGap,
  reduceMotion,
}: StackedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stickyTop = offsetTop + index * stackGap;
  const isLast = index === total - 1;
  /** Only cards that get covered by a later card recede. */
  const canRecede = index < total - 1;

  const { scrollY } = useScroll();
  const coverage = useMotionValue(0);

  useEffect(() => {
    if (!canRecede || reduceMotion) return;

    const update = () => {
      const el = ref.current;
      const card = cardRef.current;
      const next = el?.nextElementSibling as HTMLElement | null;
      if (!el || !next || !card) {
        coverage.set(0);
        return;
      }

      /*
       * Drive progress by how far the next card has climbed over this one.
       * 0 = next still below this card; 1 = next pinned on top (fully covering).
       */
      const cardH = card.getBoundingClientRect().height;
      const nextTop = next.getBoundingClientRect().top;
      const overlapStart = stickyTop + cardH * 0.92;
      const overlapEnd = stickyTop + stackGap;

      if (overlapStart <= overlapEnd) {
        coverage.set(nextTop <= overlapEnd ? 1 : 0);
        return;
      }

      const raw = (overlapStart - nextTop) / (overlapStart - overlapEnd);
      coverage.set(Math.min(1, Math.max(0, raw)));
    };

    update();
    const unsub = scrollY.on("change", update);
    window.addEventListener("resize", update);
    return () => {
      unsub();
      window.removeEventListener("resize", update);
    };
  }, [canRecede, reduceMotion, scrollY, stickyTop, stackGap, coverage]);

  /* 30px inset each side + progressive darkening */
  const sideInset = useTransform(coverage, [0, 1], [0, 30]);
  const width = useTransform(sideInset, (px) => `calc(100% - ${px * 2}px)`);
  const dimOpacity = useTransform(coverage, [0, 0.35, 1], [0, 0.32, 0.62]);

  const style = {
    ["--stack-top" as string]: `${stickyTop}px`,
    zIndex: index + 1,
  } as CSSProperties;

  if (reduceMotion) {
    return (
      <div
        ref={ref}
        className={`${styles.item} ${styles.itemStatic} ${isLast ? styles.itemLast : ""}`}
        style={style}
      >
        <div className={styles.card}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${styles.item} ${isLast ? styles.itemLast : ""}`}
      style={style}
    >
      <motion.div
        ref={cardRef}
        className={styles.card}
        style={
          canRecede
            ? { width, marginLeft: "auto", marginRight: "auto" }
            : undefined
        }
      >
        {children}
        {canRecede && (
          <motion.div
            className={styles.dim}
            style={{ opacity: dimOpacity }}
            aria-hidden
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Sticky stacked cards: each card pins under the nav while later cards
 * scroll over it. Needs an unclipped ancestor (no overflow/clip-path).
 */
export function StackedCards({
  children,
  className = "",
  offsetTop = 88,
  stackGap = 20,
}: StackedCardsProps) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children).filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className={`${styles.stack} ${className}`}>
      {items.map((child, index) => (
        <StackedCard
          key={
            isValidElement(child) && child.key != null
              ? String(child.key)
              : index
          }
          index={index}
          total={items.length}
          offsetTop={offsetTop}
          stackGap={stackGap}
          reduceMotion={reduceMotion}
        >
          {child}
        </StackedCard>
      ))}
    </div>
  );
}
