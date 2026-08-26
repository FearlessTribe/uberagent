import {
  Children,
  isValidElement,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import styles from "./TypedHeadline.module.css";

const TYPE_MS = 42;
const TYPE_START_MS = 220;

type SegmentKind = "text" | "em" | "mark";

interface Segment {
  kind: SegmentKind;
  text: string;
}

function flattenHeadline(node: ReactNode, kind: SegmentKind = "text", out: Segment[] = []): Segment[] {
  Children.forEach(node, (child) => {
    if (child == null || typeof child === "boolean") return;

    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      if (!text) return;
      const last = out[out.length - 1];
      if (last && last.kind === kind) last.text += text;
      else out.push({ kind, text });
      return;
    }

    if (!isValidElement<{ className?: string; children?: ReactNode }>(child)) return;

    const className = typeof child.props.className === "string" ? child.props.className : "";
    const nextKind: SegmentKind =
      child.type === "em" || className.split(/\s+/).includes("em")
        ? "em"
        : className.split(/\s+/).includes("mark")
          ? "mark"
          : kind;

    flattenHeadline(child.props.children, nextKind, out);
  });

  return out;
}

function renderSegments(segments: Segment[]) {
  return segments.map((segment, index) => {
    if (segment.kind === "em") {
      return (
        <em key={`${segment.kind}-${index}`}>{segment.text}</em>
      );
    }
    if (segment.kind === "mark") {
      return (
        <span key={`${segment.kind}-${index}`} className="mark">
          {segment.text}
        </span>
      );
    }
    return <span key={`${segment.kind}-${index}`}>{segment.text}</span>;
  });
}

function sliceSegments(segments: Segment[], chars: number): Segment[] {
  const sliced: Segment[] = [];
  let remaining = chars;

  for (const segment of segments) {
    if (remaining <= 0) break;
    const take = Math.min(remaining, segment.text.length);
    if (take > 0) sliced.push({ kind: segment.kind, text: segment.text.slice(0, take) });
    remaining -= take;
  }

  return sliced;
}

interface TypedHeadlineProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export function TypedHeadline({
  children,
  className = "",
  as: Tag = "h3",
  id,
}: TypedHeadlineProps) {
  const reduce = useReducedMotion();
  const segments = flattenHeadline(children);
  const fullText = segments.map((s) => s.text).join("");
  const length = fullText.length;
  const [chars, setChars] = useState(reduce ? length : 0);

  useEffect(() => {
    if (reduce) {
      setChars(length);
      return;
    }

    setChars(0);
    let i = 0;
    let timeout = 0;

    const tick = () => {
      i += 1;
      setChars(i);
      if (i >= length) return;
      const next = fullText[i - 1] === " " ? 18 : TYPE_MS;
      timeout = window.setTimeout(tick, next);
    };

    timeout = window.setTimeout(tick, TYPE_START_MS);
    return () => window.clearTimeout(timeout);
  }, [fullText, length, reduce]);

  const typedSegments = sliceSegments(segments, chars);
  const typedDone = chars >= length;
  const classes = [styles.headline, className].filter(Boolean).join(" ");

  return (
    <Tag id={id} className={classes}>
      <span className={styles.measure} aria-hidden="true">
        {renderSegments(segments)}
      </span>
      <span className={styles.live} aria-hidden="true">
        {renderSegments(typedSegments)}
        <span className={`${styles.caret} ${typedDone ? styles.caretDone : ""}`} />
      </span>
      <span className={styles.srOnly}>{fullText}</span>
    </Tag>
  );
}
