import { useScrollReveal } from "../hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "div" | "section" | "article" | "ul";
}

export function ScrollReveal({
  children,
  className = "",
  stagger = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  const classes = [
    stagger ? "reveal-stagger" : "reveal",
    visible ? "visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref as React.Ref<never>} className={classes}>
      {children}
    </Tag>
  );
}
