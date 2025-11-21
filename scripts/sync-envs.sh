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

echo "Syncing environment variables from .env.shared to app-specific .env.local files..."

for APP in "${APPS[ @]}"; do
  APP_ENV="$ROOT_DIR/$APP/.env.local"
  APP_NAME="$(basename "$APP")"

  echo "Processing $APP..."

  # Ensure .env.local exists
  if [[ ! -f "$APP_ENV" ]]; then
    touch "$APP_ENV"
  fi

  # Keep a backup
  cp "$APP_ENV" "$APP_ENV.bak"

  # Merge: for each VAR=value in .env.shared, add to .env.local only if VAR is missing
  while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip comments and blank lines
    if [[ -z "$line" ]] || [[ "$line" =~ ^[[:space:]]*# ]]; then
      continue
    fi

    # Extract VAR name
    var_name="${line%%=*}"

    # Skip broken lines
    if [[ -z "$var_name" ]]; then
      continue
    fi

    # If variable is not already defined in app's .env.local, append it
    if ! grep -qE "^${var_name}=" "$APP_ENV"; then
      echo "$line" >> "$APP_ENV"
    fi
  done < "$SHARED_ENV"

  echo "Synced environment variables for $APP"
done

echo "Environment variable sync complete."