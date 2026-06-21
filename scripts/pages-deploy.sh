#!/usr/bin/env bash
set -euo pipefail

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN is required."
  echo "Create a token with 'Workers Scripts: Edit' permission:"
  echo "https://dash.cloudflare.com/profile/api-tokens"
  exit 1
fi

exec wrangler deploy
