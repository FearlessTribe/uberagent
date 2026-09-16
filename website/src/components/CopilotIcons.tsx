import type { ReactNode } from "react";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

/** Custom Copilot-inspired mark — not an official Microsoft logo. */
export function CopilotMark({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="copilotMarkGrad" x1="4" y1="4" x2="28" y2="28">
          <stop offset="0%" stopColor="var(--color-primary-light, #e0a080)" />
          <stop offset="100%" stopColor="var(--color-primary, #cc8066)" />
        </linearGradient>
      </defs>
      {/* Soft orb */}
      <circle cx="16" cy="16" r="13" fill="url(#copilotMarkGrad)" opacity="0.22" />
      {/* Infinity / ribbon — Copilot-adjacent silhouette */}
      <path
        d="M9.2 16c0-2.4 1.9-4.3 4.3-4.3 1.5 0 2.8.8 3.5 2 .7-1.2 2-2 3.5-2 2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3c-1.5 0-2.8-.8-3.5-2-.7 1.2-2 2-3.5 2-2.4 0-4.3-1.9-4.3-4.3Z"
        fill="none"
        stroke="url(#copilotMarkGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13.5" cy="16" r="1.6" fill="url(#copilotMarkGrad)" />
      <circle cx="18.5" cy="16" r="1.6" fill="url(#copilotMarkGrad)" />
    </svg>
  );
}

export type CopilotIconId =
  | "workflow"
  | "approval"
  | "tenant"
  | "target"
  | "clock"
  | "credits"
  | "shield"
  | "founder"
  | "platform"
  | "decline"
  | "inbox"
  | "triage"
  | "handoff"
  | "done"
  | "talk"
  | "blueprint"
  | "key"
  | "sprint"
  | "care"
  | "check"
  | "cross"
  | "document"
  | "receipt";

export function CopilotIcon({
  id,
  className,
}: {
  id: CopilotIconId;
  className?: string;
}) {
  switch (id) {
    case "workflow":
      return (
        <Svg className={className}>
          <circle cx="6" cy="6" r="2" {...stroke} />
          <circle cx="18" cy="12" r="2" {...stroke} />
          <circle cx="6" cy="18" r="2" {...stroke} />
          <path d="M8 6h6a4 4 0 014 4v0M8 18h6a4 4 0 004-4v0" {...stroke} />
        </Svg>
      );
    case "approval":
      return (
        <Svg className={className}>
          <path d="M12 3 5 7v5c0 4.2 3 7.4 7 8.5 4-1.1 7-4.3 7-8.5V7l-7-4Z" {...stroke} />
          <path d="m9 12 2 2 4-4" {...stroke} />
        </Svg>
      );
    case "tenant":
      return (
        <Svg className={className}>
          <path d="M4 20V8l8-4 8 4v12" {...stroke} />
          <path d="M9 20v-6h6v6M4 12h16" {...stroke} />
        </Svg>
      );
    case "target":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <circle cx="12" cy="12" r="4" {...stroke} />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "clock":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="M12 8v4.5l3 2" {...stroke} />
        </Svg>
      );
    case "credits":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="M12 7v10M9.5 9.5c.6-1 1.5-1.5 2.5-1.5 1.4 0 2.5.8 2.5 2s-1.1 2-2.5 2c-1.4 0-2.5.8-2.5 2s1.1 2 2.5 2c1 0 1.9-.5 2.5-1.5" {...stroke} />
        </Svg>
      );
    case "shield":
      return (
        <Svg className={className}>
          <path d="M12 3 5 7v5c0 4.2 3 7.4 7 8.5 4-1.1 7-4.3 7-8.5V7l-7-4Z" {...stroke} />
          <path d="M12 10v4M12 16.5v.5" {...stroke} />
        </Svg>
      );
    case "founder":
      return (
        <Svg className={className}>
          <circle cx="12" cy="8" r="3.5" {...stroke} />
          <path d="M5 19v-1a5 5 0 0110 0v1" {...stroke} />
          <path d="M17 12l2 2 3-3" {...stroke} />
        </Svg>
      );
    case "platform":
      return (
        <Svg className={className}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" {...stroke} />
          <rect x="13" y="4" width="7" height="7" rx="1.5" {...stroke} />
          <rect x="4" y="13" width="7" height="7" rx="1.5" {...stroke} />
          <path d="M16 16h4M18 14v4" {...stroke} />
        </Svg>
      );
    case "decline":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="M9 9l6 6M15 9l-6 6" {...stroke} />
        </Svg>
      );
    case "inbox":
      return (
        <Svg className={className}>
          <path d="M4 6h16v12H4z" {...stroke} />
          <path d="M4 9l8 5 8-5" {...stroke} />
        </Svg>
      );
    case "triage":
      return (
        <Svg className={className}>
          <path d="M4 6h16M4 12h10M4 18h6" {...stroke} />
          <circle cx="18" cy="12" r="2" {...stroke} />
          <circle cx="14" cy="18" r="2" {...stroke} />
        </Svg>
      );
    case "handoff":
      return (
        <Svg className={className}>
          <path d="M8 12h8M12 8l4 4-4 4" {...stroke} />
          <circle cx="6" cy="12" r="2" {...stroke} />
          <circle cx="18" cy="12" r="2" {...stroke} />
        </Svg>
      );
    case "done":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="m8.5 12 2.5 2.5 4.5-5" {...stroke} />
        </Svg>
      );
    case "talk":
      return (
        <Svg className={className}>
          <path d="M5 6h10a2 2 0 012 2v5a2 2 0 01-2 2H9l-4 3V8a2 2 0 012-2Z" {...stroke} />
          <path d="M17 10h2a2 2 0 012 2v5l-3-2h-3" {...stroke} />
        </Svg>
      );
    case "blueprint":
      return (
        <Svg className={className}>
          <path d="M8 3h7l4 4v14H8z" {...stroke} />
          <path d="M15 3v5h5M11 13h6M11 17h4" {...stroke} />
        </Svg>
      );
    case "key":
      return (
        <Svg className={className}>
          <circle cx="8" cy="12" r="3.5" {...stroke} />
          <path d="M11.5 12H20v3M17 12v3" {...stroke} />
        </Svg>
      );
    case "sprint":
      return (
        <Svg className={className}>
          <path d="M5 16c3-6 6-9 14-10" {...stroke} />
          <path d="M15 5l4 1-1 4" {...stroke} />
          <path d="M5 19h14" {...stroke} />
        </Svg>
      );
    case "care":
      return (
        <Svg className={className}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10Z" {...stroke} />
        </Svg>
      );
    case "check":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="m8.5 12 2.5 2.5 4.5-5" {...stroke} />
        </Svg>
      );
    case "cross":
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <path d="M9 9l6 6M15 9l-6 6" {...stroke} />
        </Svg>
      );
    case "document":
      return (
        <Svg className={className}>
          <path d="M8 3h7l4 4v14H8z" {...stroke} />
          <path d="M15 3v5h5M11 13h6M11 17h6" {...stroke} />
        </Svg>
      );
    case "receipt":
      return (
        <Svg className={className}>
          <path d="M6 4h12v16H6z" {...stroke} />
          <path d="M9 9h6M9 13h6M9 17h4" {...stroke} />
        </Svg>
      );
    default:
      return null;
  }
}
