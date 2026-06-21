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

From the **repository root**:

| Setting | Value |
|---------|-------|
| Root directory | *(leave empty / repo root)* |
| Build command | `npm run build` |
| **Deploy command** | `npm run deploy` |
| Build output directory | `website/dist` |
| Node.js version | `22` (`NODE_VERSION=22`) |

### Auth error 10000?

If deploy fails with `Authentication error [code: 10000]`, **delete** the `CLOUDFLARE_API_TOKEN` environment variable from the Cloudflare project settings. A custom token with wrong permissions blocks Cloudflare's built-in Pages CI auth. The deploy script also unsets it automatically when present.

The API token is only needed for manual deploys from your machine:

```bash
npm run build
CLOUDFLARE_API_TOKEN=your_token npm run deploy
```

For manual deploys, create a token with **Cloudflare Pages → Edit** permission at https://dash.cloudflare.com/profile/api-tokens
