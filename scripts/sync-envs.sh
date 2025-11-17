#!/bin/bash

# This script syncs environment variables from .env.shared to app-specific .env.local files.
# It ensures that app-specific variables in .env.local override shared variables,
# and performs variable expansion. Each .env.local file becomes self-contained.

# Define the path to the shared .env file
SHARED_ENV=".env.shared"

# Define the applications that need .env.local files
APPS=("website" "knisoci" "candyland" "orchestrator")

echo "Syncing environment variables from $SHARED_ENV to app-specific .env.local files..."

# Check if the shared .env file exists
if [ ! -f "$SHARED_ENV" ]; then
  echo "Error: $SHARED_ENV not found. Please create it."
  exit 1
fi

# Loop through each app
for APP in "${APPS[@]}"; do
  APP_DIR="apps/$APP"
  APP_ENV_LOCAL="$APP_DIR/.env.local"
  APP_ENV_TEMP="$APP_DIR/.env.local.tmp"

  echo "Processing $APP_DIR..."

  # Start a subshell to manage environment variables for this app
  (
    # Load shared variables first
    set -a # Automatically export all variables
    source "$SHARED_ENV"
    set +a # Stop automatically exporting

    # Load app-specific variables, allowing them to override shared ones
    if [ -f "$APP_ENV_LOCAL" ]; then
      set -a
      source "$APP_ENV_LOCAL"
      set +a
    fi

    # Write all currently active environment variables to a temporary file
    # Filter out shell-internal variables and functions, and only include relevant ones
    # Also, ensure variables are expanded
    env | grep -E '^(SUPABASE_|NEXTAUTH_|GOOGLE_|OPENAI_|GEMINI_|NOTION_|DATABASE_|LOG_|ENVIRONMENT_|ENV_MODE_|APP_BASE_URL|PORT|NEXT_PUBLIC_)' | while IFS='=' read -r key value; do
      # Ensure the value is properly quoted if it contains spaces or special characters
      echo "${key}=\"${value}\"" >> "$APP_ENV_TEMP"
    done

  ) # End of subshell

  # Replace the original .env.local with the merged and expanded content
  mv "$APP_ENV_TEMP" "$APP_ENV_LOCAL"
  echo "Synced environment variables for $APP_DIR"

done

echo "Environment variable sync complete."