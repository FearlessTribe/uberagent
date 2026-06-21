# überagent.com Website

## Local development

```bash
cd website && npm install && npm run dev
```

## Production build

From repo root:

```bash
npm run build
```

Output: `website/dist/`

## Cloudflare Workers (static assets)

This project deploys as a **Worker with static assets** (not `wrangler pages deploy`).

| Setting | Value |
|---------|-------|
| Root directory | *(repo root)* |
| Build command | `npm run build` |
| **Deploy command** | `npm run deploy` |
| Node.js version | `22` (`NODE_VERSION=22`) |

`wrangler.toml` points assets at `./website/dist` with SPA fallback.

### API token

Set `CLOUDFLARE_API_TOKEN` in Cloudflare project environment variables with:

- **Workers Scripts → Edit**
- **Account → Read** (optional but recommended)

Do **not** use a Pages-only token — deploy uses `wrangler deploy`, not `pages deploy`.

Create token: https://dash.cloudflare.com/profile/api-tokens → **Edit Cloudflare Workers** template.

### Manual deploy

```bash
npm run build
CLOUDFLARE_API_TOKEN=your_token npm run deploy
```
