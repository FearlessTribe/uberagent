# überagent Website

Vite + React. Alles in diesem Ordner.

## Lokal

```bash
npm install
npm run dev
```

## Cloudflare Pages (empfohlen — am einfachsten)

**Wichtig:** Nutze **Pages**, nicht **Workers**. Bei Workers brauchst du Deploy-Commands, API-Tokens und Wrangler — unnötig für eine statische Site.

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Repo `uberagent` wählen
3. Nur diese Einstellungen:

| Feld | Wert |
|------|------|
| Production branch | `main` |
| **Root directory** | `website` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

Kein Deploy command. Kein API-Token. Kein Wrangler.

4. Save and Deploy

Falls du bereits ein **Workers**-Projekt hast: neues **Pages**-Projekt anlegen (oder in den Build-Einstellungen von Workers auf Pages wechseln, falls möglich).

## Manuell bauen

```bash
npm run build
npm run preview
```

Output liegt in `dist/`.
