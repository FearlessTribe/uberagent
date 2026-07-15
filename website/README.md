# überagent Website

Vite + React. Alles in diesem Ordner.

## AI Potenzial-Check → Notion

Leads landen in der Notion-Datenbank **AI Potenzial-Check Leads**.

### Einmaliges Setup

1. In Notion eine Seite anlegen (z. B. `überagent Leads`).
2. Oben rechts **Teilen / Connections** → Integration **überagent website** hinzufügen.
3. Page-URL kopieren und DB anlegen:

```bash
NOTION_TOKEN='…' node scripts/create-notion-db.mjs 'https://www.notion.so/…'
printf '%s' '<database-id>' | npx wrangler secret put NOTION_DATABASE_ID
```

Secrets (nie committen):

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

API-Route: `POST /api/potential-check`

## Lokal

```bash
npm install
npm run dev
```

Für lokale API-Tests: `website/.dev.vars` (gitignored) mit denselben Secrets.

## Cloudflare Workers (dein aktuelles Setup)

| Feld | Wert |
|------|------|
| Project name | `uberagent` |
| **Root directory** | `website` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| Node.js | `22` (Env: `NODE_VERSION=22`) |

**Build token:** Von Cloudflare automatisch gesetzt, wenn du GitHub verbindest — **nicht** manuell einfügen. Den JSON-Wert aus dem Dashboard nicht kopieren oder committen.

`wrangler.toml` liegt in `website/` und zeigt auf `dist/`.

## Cloudflare Pages (einfacher, falls du wechseln willst)

| Feld | Wert |
|------|------|
| Root directory | `website` |
| Build command | `npm run build` |
| Build output | `dist` |
| Deploy command | *(leer)* |

Kein Wrangler, kein Token.

## Manuell bauen

```bash
npm run build
npm run preview
```

Output liegt in `dist/`.
