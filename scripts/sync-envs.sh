#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHARED_ENV="$ROOT_DIR/.env.shared"

APPS=(
  "apps/website"
  "apps/knisoci"
  "apps/candyland"
  "apps/orchestrator"
)

if [[ ! -f "$SHARED_ENV" ]]; then
  echo "❌ .env.shared not found at $SHARED_ENV"
  exit 1
fi

echo "Syncing environment variables from .env.shared..."

for APP in "${APPS[@]}"; do
  APP_ENV="$ROOT_DIR/$APP/.env.local"
  echo "→ $APP"

  [[ -f "$APP_ENV" ]] || touch "$APP_ENV"
  cp "$APP_ENV" "$APP_ENV.bak"

  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue

    key="${line%%=*}"

    if ! grep -qE "^${key}=" "$APP_ENV"; then
      printf "%s\n" "$line" >> "$APP_ENV"
    fi
  done < "$SHARED_ENV"

done

echo "✓ Environment sync complete."
