#!/usr/bin/env bash
set -euo pipefail

# A custom CLOUDFLARE_API_TOKEN with insufficient Pages permissions overrides
# Cloudflare's built-in CI credentials and causes auth error 10000.
if [ -n "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "Warning: unsetting CLOUDFLARE_API_TOKEN so Pages CI can use built-in auth."
  unset CLOUDFLARE_API_TOKEN
fi

BRANCH="${CF_PAGES_BRANCH:-main}"

exec wrangler pages deploy website/dist \
  --project-name=uberagent \
  --branch="$BRANCH" \
  --commit-dirty=true
