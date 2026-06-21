# überagent Website

Vite + React. Alles in diesem Ordner.

## Lokal

```bash
npm install
npm run dev
```

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
