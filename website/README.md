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
| **Deploy command** | `npm run deploy` |
| Build output directory | `website/dist` |
| Node.js version | `20` (env var `NODE_VERSION=20`) |

**Important:** Do not use `npx wrangler deploy` — this is a static Pages site. Use `npm run deploy` (`wrangler pages deploy`) instead.

Alternative — root directory `website`:

| Setting | Value |
|---------|-------|
| Root directory | `website` |
| Build command | `npm run build` |
| Deploy command | *(leave empty — Pages uploads `dist` automatically)* |
| Build output directory | `dist` |

The repo includes `wrangler.toml` with `pages_build_output_dir = "website/dist"`.
