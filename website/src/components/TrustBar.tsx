import { trustClients, trustTools } from "../data/marketing";
import styles from "./TrustBar.module.css";

function ToolIcon({ type }: { type: string }) {
  const common = { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true as const };
  switch (type) {
    case "salesforce":
      return (
        <svg {...common}>
          <path d="M5.2 10.2c-.9-.2-1.5-1-1.5-1.9 0-1.1.9-2 2-2 .3 0 .6.1.8.2C7 5.3 8 4.5 9.2 4.5c1.5 0 2.7 1.1 2.9 2.5.3-.1.6-.2 1-.2 1.2 0 2.1 1 2.1 2.2 0 1.2-1 2.2-2.2 2.2H5.6c-1.1 0-2-.7-2.2-1.7.5.2 1 .3 1.8.3z" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "hubspot":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 2.5v2.2M8 11.3v2.2M2.5 8h2.2M11.3 8h2.2M4.2 4.2l1.6 1.6M10.2 10.2l1.6 1.6M11.8 4.2l-1.6 1.6M5.8 10.2l-1.6 1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "claude":
      return (
        <svg {...common}>
          <path d="M8 2.5 3.5 13h2.2l.8-2.1h3l.8 2.1h2.2L8 2.5zm-.9 6.8L8 5.4l.9 3.9H7.1z" fill="currentColor" />
        </svg>
      );
    case "openai":
      return (
        <svg {...common}>
          <path d="M8 2.2c1.2 0 2.2.7 2.7 1.7.7-.3 1.6-.2 2.2.4.7.7.8 1.7.4 2.5 1 .5 1.6 1.5 1.6 2.6 0 1.2-.7 2.2-1.8 2.6.2.8 0 1.7-.6 2.3-.7.7-1.7.8-2.5.4-.5 1-1.5 1.7-2.7 1.7s-2.2-.7-2.7-1.7c-.8.3-1.8.2-2.5-.4-.7-.7-.8-1.6-.5-2.4C1.8 11.4 1.2 10.3 1.2 9c0-1.2.7-2.2 1.7-2.6-.3-.8-.1-1.8.6-2.4.6-.6 1.5-.8 2.3-.5C6.2 2.8 7.1 2.2 8 2.2z" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "n8n":
      return (
        <svg {...common}>
          <circle cx="4" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="5" r="1.6" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="11" r="1.6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5.6 7.4 10.4 5.6M5.6 8.6 10.4 10.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "mcp":
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <rect x="5.75" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "notion":
      return (
        <svg {...common}>
          <path d="M3.5 3.5h9v9h-9v-9z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 6h4M6 8.5h4M6 11h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "slack":
      return (
        <svg {...common}>
          <path d="M6 2.5v2.2H3.8a1.1 1.1 0 100 2.2H6v2.2a1.1 1.1 0 102.2 0V6.9h2.2a1.1 1.1 0 100-2.2H8.2V2.5a1.1 1.1 0 10-2.2 0z" stroke="currentColor" strokeWidth="1" />
          <path d="M10 9.1v2.2h2.2a1.1 1.1 0 110 2.2H10v2a1.1 1.1 0 11-2.2 0v-2H5.6a1.1 1.1 0 110-2.2h2.2V9.1a1.1 1.1 0 112.2 0z" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        </svg>
      );
    case "postgres":
      return (
        <svg {...common}>
          <ellipse cx="8" cy="4.5" rx="4.2" ry="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.8 4.5v5c0 1.1 1.9 2 4.2 2s4.2-.9 4.2-2v-5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.8 7c0 1.1 1.9 2 4.2 2s4.2-.9 4.2-2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "sap":
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="11" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
  }
}

export function TrustBar({ embedded = false }: { embedded?: boolean }) {
  const clientLoop = [...trustClients, ...trustClients];
  const toolLoop = [...trustTools, ...trustTools];
  const Tag = embedded ? "div" : "section";

  return (
    <Tag
      className={`${styles.section} ${embedded ? styles.embedded : ""}`}
      aria-label="Kundenprojekte und Integrationen"
    >
      <div className="container">
        <p className={styles.caption}>Kundenprojekte</p>
      </div>
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {clientLoop.map((client, i) => (
            <span key={`${client.name}-${i}`} className={styles.clientPill}>
              {client.logo ? (
                <img src={client.logo} alt="" className={styles.clientLogo} width={20} height={20} />
              ) : (
                <span className={styles.clientDot} aria-hidden="true" />
              )}
              {client.name}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <p className={styles.captionMuted}>Stack &amp; Integrationen</p>
      </div>
      <div className={`${styles.marquee} ${styles.marqueeMuted}`} aria-hidden="true">
        <div className={styles.track}>
          {toolLoop.map((tool, i) => (
            <span key={`${tool.name}-${i}`} className={styles.pill}>
              <span className={styles.icon}>
                <ToolIcon type={tool.icon} />
              </span>
              {tool.name}
            </span>
          ))}
        </div>
      </div>

      <ul className={`container ${styles.srOnly}`}>
        {trustClients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
        {trustTools.map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>
    </Tag>
  );
}
