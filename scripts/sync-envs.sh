#!/bin/bash

# This script syncs environment variables from .env.shared to app-specific .env.local files.

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

# Read shared variables into an associative array
declare -A SHARED_VARS
while IFS='=' read -r key value; do
  if [[ ! -z "$key" && "$key" != "#"* ]]; then
    SHARED_VARS["$key"]="$value"
  fi
done < "$SHARED_ENV"

# Loop through each app
for APP in "${APPS[@]}"; do
  APP_DIR="apps/$APP"
  APP_ENV_LOCAL="$APP_DIR/.env.local"
  APP_ENV_TEMP="$APP_DIR/.env.local.tmp"

  echo "Processing $APP_DIR..."

  # Create the app's .env.local if it doesn't exist
  if [ ! -f "$APP_ENV_LOCAL" ]; then
    touch "$APP_ENV_LOCAL"
    echo "Created $APP_ENV_LOCAL"
  fi

  # Read existing app-specific variables into an associative array
  declare -A APP_VARS
  while IFS='=' read -r key value; do
    if [[ ! -z "$key" && "$key" != "#"* ]]; then
      APP_VARS["$key"]="$value"
    fi
  done < "$APP_ENV_LOCAL"

  # Merge shared variables into app variables, prioritizing shared
  for key in "${!SHARED_VARS[@]}"; do
    APP_VARS["$key"]="${SHARED_VARS["$key"]}"
  done

  # Write merged variables to a temporary file
  > "$APP_ENV_TEMP" # Clear temp file
  for key in "${!APP_VARS[@]}"; do
    echo "${key}=${APP_VARS["$key"]}" >> "$APP_ENV_TEMP"
  done

  # Replace the original .env.local with the merged content
  mv "$APP_ENV_TEMP" "$APP_ENV_LOCAL"
  echo "Synced environment variables for $APP_DIR"

done

echo "Environment variable sync complete."
