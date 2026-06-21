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

Output: `dist/`

## Cloudflare Pages

From the **repository root** (recommended):

| Setting | Value |
|---------|-------|
| Root directory | *(leave empty / repo root)* |
| Build command | `npm run build` |
| Build output directory | `website/dist` |
| Node.js version | `20` (env var `NODE_VERSION=20`) |

Alternative — root directory `website`:

| Setting | Value |
|---------|-------|
| Root directory | `website` |
| Build command | `npm run build` |
| Build output directory | `dist` |

The repo includes `wrangler.toml` with `pages_build_output_dir = "website/dist"`.
