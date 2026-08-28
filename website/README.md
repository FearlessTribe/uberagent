# uberagent Website

Vite + React. Alles in diesem Ordner.

## AI Potenzial-Check → Notion

Leads landen in der Notion-Datenbank **AI Potenzial-Check Leads**.

### Einmaliges Setup

1. In Notion eine Seite anlegen (z. B. `uberagent Leads`).
2. Oben rechts **Teilen / Connections** → Integration **uberagent website** hinzufügen.
3. Page-URL kopieren und DB anlegen:

```bash
NOTION_TOKEN='…' node scripts/create-notion-db.mjs 'https://www.notion.so/…'
printf '%s' '<database-id>' | npx wrangler secret put NOTION_DATABASE_ID
```

Secrets (nie committen):

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

API-Route: `POST /api/potential-check`

## Kalkulationscheck → Notion

Leads landen in der Notion-Datenbank **Kalkulationscheck Leads** (separat vom Potenzial-Check).

Datenbank-ID (in `wrangler.toml`): `19cf29fd-2ffb-44f8-a8a2-b32d5d1c2441`

Falls neu anlegen:

```bash
NOTION_TOKEN='…' node scripts/create-kalkulationscheck-notion-db.mjs
```

Danach die Datenbank mit der Integration **uberagent website** verbinden (Teilen → Connections).

API-Route: `POST /api/kalkulations-check` (`stage: contact` | `complete`)

## Lokal

```bash
npm install
npm run dev
```

`npm run dev` leitet `/api` standardmäßig an den **deployten Worker** weiter (Secrets liegen dort). Kein lokaler Worker nötig.

**Lokalen Worker testen** (z. B. Worker-Code ändern):

1. `cp .dev.vars.example .dev.vars` und `NOTION_TOKEN` eintragen (von [notion.so/my-integrations](https://www.notion.so/my-integrations) → Integration **uberagent website**).
2. Terminal 1: `npm run dev:worker`
3. Terminal 2: `npm run dev:local-api`

## Cloudflare Workers (dein aktuelles Setup)

| Feld | Wert |
|------|------|
| Project name | `uberagent` |
| **Root directory** | `website` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| Node.js | `22` (Env: `NODE_VERSION=22`) |

**Build token:** Von Cloudflare automatisch gesetzt, wenn du GitHub verbindest. **Nicht** manuell einfügen. Den JSON-Wert aus dem Dashboard nicht kopieren oder committen.

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
