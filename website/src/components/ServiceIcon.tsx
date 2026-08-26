interface ServiceIconProps {
  type: string;
  className?: string;
}

export function ServiceIcon({ type, className = "" }: ServiceIconProps) {
  const icons: Record<string, React.ReactNode> = {
    validate: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gtm: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 24L12 16L18 22L28 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    agents: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 28v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 14l6-2M24 20l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 5v6M16 21v6M5 16h6M21 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    train: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 24V10l10-4 10 4v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 14l10 4 10-4M16 18v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    mcp: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 9h4M9 14v4M23 14v4M16 18v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    revenue: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="10" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 16h8M8 20h6M8 24h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 8v4M22 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    vibe: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="21" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 24v-1.5a6 6 0 0112 0V24M15 24v-1.2a6 6 0 0112 0V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 4.5l.8 1.7 1.8.2-1.4 1.2.4 1.8L16 8.5l-1.6.9.4-1.8-1.4-1.2 1.8-.2L16 4.5z" fill="currentColor" />
      </svg>
    ),
    gifting: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="5" y="14" width="22" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 18h22M16 14v13" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 14c0-3 2.2-5 4.5-5 2.2 0 3.5 2 3.5 5M22 14c0-3-2.2-5-4.5-5C15.3 9 14 11 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    calc: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="8" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 17h2.5M14.75 17H17.5M19.5 17H22M10 21h2.5M14.75 21H17.5M19.5 21H22M10 25h2.5M14.75 25H17.5M19.5 25H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {icons[type] ?? icons.agents}
    </span>
  );
}
