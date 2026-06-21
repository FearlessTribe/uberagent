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
    mcp: (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="18" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="18" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 9h4M9 14v4M23 14v4M16 18v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {icons[type] ?? icons.agents}
    </span>
  );
}
