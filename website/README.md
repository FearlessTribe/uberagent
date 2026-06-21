# überagent.com Website

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output: `website/dist/`

## Cloudflare Pages

From the **repository root** (recommended):

| Setting | Value |
|---------|-------|
| Root directory | *(leave empty / repo root)* |
| Build command | `npm run build` |
| **Deploy command** | **leave empty** |
| Build output directory | `website/dist` |
| Node.js version | `22` (optional env var `NODE_VERSION=22`) |

Cloudflare Pages uploads `website/dist` automatically after a successful build. **Do not** set a deploy command (`npm run deploy`, `npx wrangler deploy`, etc.) — that requires a separate API token and is not needed for static sites.

Remove `CLOUDFLARE_API_TOKEN` from the project environment variables unless you deploy manually with Wrangler.

Alternative — root directory `website`:

| Setting | Value |
|---------|-------|
| Root directory | `website` |
| Build command | `npm run build` |
| Deploy command | *(leave empty)* |
| Build output directory | `dist` |

Manual deploy (optional, local only):

```bash
npm run build
npx wrangler pages deploy website/dist --project-name=uberagent
```
