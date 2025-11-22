#!/bin/bash

# Auto-checker script that validates the monorepo before Vercel deploy

REPO_ROOT="/home/tandy/dev/sugarstudio"
REPORT_FILE="$REPO_ROOT/monorepo_pre_deploy_report.log"
ENV_SHARED="$REPO_ROOT/.env.shared"
VERCEL_CONFIG="$REPO_ROOT/vercel.json"

echo "Monorepo Pre-Deployment Check Report" > $REPORT_FILE
echo "------------------------------------" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# --- Helper function for logging ---
log_status() {
    local status=$1
    local message=$2
    echo "$status $message" | tee -a $REPORT_FILE
}

# --- 1. Environment Variable Check ---
log_status "---" "1. Environment Variable Check"
ENV_CHECK_OK=true

# Check .env.shared exists
if [ ! -f "$ENV_SHARED" ]; then
    log_status "[✗]" "Error: .env.shared not found at $ENV_SHARED"
    ENV_CHECK_OK=false
else
    log_status "[✓]" ".env.shared found."

    # Check GOOGLE_API_KEY
    if grep -q "^GOOGLE_API_KEY=YOUR_KEY" "$ENV_SHARED"; then
        log_status "[✗]" "GOOGLE_API_KEY is a placeholder in .env.shared."
        ENV_CHECK_OK=false
    elif ! grep -q "^GOOGLE_API_KEY=" "$ENV_SHARED"; then
        log_status "[✗]" "GOOGLE_API_KEY is missing from .env.shared."
        ENV_CHECK_OK=false
    else
        log_status "[✓]" "GOOGLE_API_KEY found and not a placeholder."
    fi

    # Check GEMINI_API_KEY
    if grep -q "^GEMINI_API_KEY=YOUR_KEY" "$ENV_SHARED"; then
        log_status "[✗]" "GEMINI_API_KEY is a placeholder in .env.shared."
        ENV_CHECK_OK=false
    elif ! grep -q "^GEMINI_API_KEY=" "$ENV_SHARED"; then
        log_status "[✗]" "GEMINI_API_KEY is missing from .env.shared."
        ENV_CHECK_OK=false
    else
        log_status "[✓]" "GEMINI_API_KEY found and not a placeholder."
    fi

    # Check NEXTAUTH_SECRET
    if grep -q "^NEXTAUTH_SECRET=E19v7bIu43KDv6RiHfN2AbCDJv5zJmFs" "$ENV_SHARED" || grep -q "^NEXTAUTH_SECRET=YOUR_SECRET_HERE" "$ENV_SHARED"; then
        log_status "[✗]" "NEXTAUTH_SECRET is a placeholder in .env.shared."
        ENV_CHECK_OK=false
    elif ! grep -q "^NEXTAUTH_SECRET=" "$ENV_SHARED"; then
        log_status "[✗]" "NEXTAUTH_SECRET is missing from .env.shared."
        ENV_CHECK_OK=false
    else
        log_status "[✓]" "NEXTAUTH_SECRET found and not a placeholder."
    fi

    # Check DATABASE_URL and PRISMA_DATABASE_URL
    if ! grep -q "^DATABASE_URL=postgresql" "$ENV_SHARED"; then
        log_status "[✗]" "DATABASE_URL is missing or not a postgresql URL in .env.shared."
        ENV_CHECK_OK=false
    else
        log_status "[✓]" "DATABASE_URL found and is a postgresql URL."
    fi
    # Assume PRISMA_DATABASE_URL is same as DATABASE_URL for simplicity or check separately if needed
    if ! grep -q "^PRISMA_DATABASE_URL=" "$ENV_SHARED" && ! grep -q "^DATABASE_URL=" "$ENV_SHARED"; then
        log_status "[✗]" "PRISMA_DATABASE_URL or DATABASE_URL (as fallback) is missing from .env.shared."
        ENV_CHECK_OK=false
    else
        log_status "[✓]" "PRISMA_DATABASE_URL (or DATABASE_URL) found."
    fi

    # Run sync-envs
    log_status "---" "Running pnpm run sync-envs..."
    (cd "$REPO_ROOT" && pnpm run sync-envs >> $REPORT_FILE 2>&1)
    if [ $? -eq 0 ]; then
        log_status "[✓]" "pnpm run sync-envs completed."
    else
        log_status "[✗]" "pnpm run sync-envs failed. Check report file."
        ENV_CHECK_OK=false
    fi
fi
if $ENV_CHECK_OK; then log_status "[✓]" "Environment Variable Check PASSED."; else log_status "[✗]" "Environment Variable Check FAILED."; fi
echo "" >> $REPORT_FILE


# --- 2. KniSoci API Route Runtime Check ---
log_status "---" "2. KniSoci API Route Runtime Check"
KNISOCI_RUNTIME_CHECK_OK=true
KNISOCI_API_ROUTES=(
    "apps/knisoci/app/api/generate/brand-book/route.ts"
    "apps/knisoci/app/api/generate/brand-discovery/route.ts"
    "apps/knisoci/app/api/generate/brand-positioning-map/route.ts"
    "apps/knisoci/app/api/generate/color-palette/route.ts"
    "apps/knisoci/app/api/generate/consistency-checker/route.ts"
)
for route_file in "${KNISOCI_API_ROUTES[@]}"; do
    if [ ! -f "$REPO_ROOT/$route_file" ]; then
        log_status "[✗]" "KniSoci API file not found: $route_file"
        KNISOCI_RUNTIME_CHECK_OK=false
        continue
    fi
    if ! head -n 5 "$REPO_ROOT/$route_file" | grep -q "export const runtime = \"nodejs\";"; then
        log_status "[✗]" "Missing 'export const runtime = \"nodejs\";' in $route_file"
        KNISOCI_RUNTIME_CHECK_OK=false
    else
        log_status "[✓]" "'export const runtime = \"nodejs\";' found in $route_file"
    fi
done
if $KNISOCI_RUNTIME_CHECK_OK; then log_status "[✓]" "KniSoci API Route Runtime Check PASSED."; else log_status "[✗]" "KniSoci API Route Runtime Check FAILED."; fi
echo "" >> $REPORT_FILE


# --- 3. Candyland UI Dependency Check ---
log_status "---" "3. Candyland UI Dependency Check"
CANDYLAND_UI_CHECK_OK=true
CANDYLAND_PACKAGE_JSON="$REPO_ROOT/apps/candyland/package.json"
CANDYLAND_TSCONFIG="$REPO_ROOT/apps/candyland/tsconfig.json"

# Check @sugarstudio/ui in package.json
if grep -q "\"@sugarstudio/ui\"" "$CANDYLAND_PACKAGE_JSON"; then
    log_status "[✗]" "@sugarstudio/ui dependency still present in $CANDYLAND_PACKAGE_JSON"
    CANDYLAND_UI_CHECK_OK=false
else
    log_status "[✓]" "@sugarstudio/ui dependency not found in $CANDYLAND_PACKAGE_JSON"
fi

# Check for @sugarstudio/ui imports in source
if grep -Rq " @sugarstudio/ui" "$REPO_ROOT/apps/candyland" --exclude-dir=node_modules; then
    log_status "[✗]" "Lingering @sugarstudio/ui imports found in Candyland source files."
    grep -R " @sugarstudio/ui" "$REPO_ROOT/apps/candyland" --exclude-dir=node_modules | tee -a $REPORT_FILE
    CANDYLAND_UI_CHECK_OK=false
else
    log_status "[✓]" "No @sugarstudio/ui imports found in Candyland source files."
fi

# Check tsconfig paths
if [ ! -f "$CANDYLAND_TSCONFIG" ]; then
    log_status "[✗]" "Candyland tsconfig.json not found: $CANDYLAND_TSCONFIG"
    CANDYLAND_UI_CHECK_OK=false
else
    if ! jq '.compilerOptions.paths."@/*" | contains(["./*"])' "$CANDYLAND_TSCONFIG" | grep -q "true"; then
        log_status "[✗]" "Candyland tsconfig.json 'paths' for '@/*' is incorrect or missing."
        CANDYLAND_UI_CHECK_OK=false
    else
        log_status "[✓]" "Candyland tsconfig.json 'paths' for '@/*' is correct."
    fi
fi
if $CANDYLAND_UI_CHECK_OK; then log_status "[✓]" "Candyland UI Dependency Check PASSED."; else log_status "[✗]" "Candyland UI Dependency Check FAILED."; fi
echo "" >> $REPORT_FILE


# --- 4. Orchestrator Prisma Check ---
log_status "---" "4. Orchestrator Prisma Check"
ORCHESTRATOR_PRISMA_CHECK_OK=true
ORCHESTRATOR_PACKAGE_JSON="$REPO_ROOT/apps/orchestrator/package.json"
ORCHESTRATOR_SCHEMA="$REPO_ROOT/apps/orchestrator/prisma/schema.prisma"

if [ ! -f "$ORCHESTRATOR_PACKAGE_JSON" ]; then
    log_status "[✗]" "Orchestrator package.json not found: $ORCHESTRATOR_PACKAGE_JSON"
    ORCHESTRATOR_PRISMA_CHECK_OK=false
else
    # Check prisma:generate script
    if ! jq '.scripts."prisma:generate"' "$ORCHESTRATOR_PACKAGE_JSON" | grep -q "prisma generate --schema=./prisma/schema.prisma"; then
        log_status "[✗]" "'prisma:generate' script missing or incorrect in $ORCHESTRATOR_PACKAGE_JSON"
        ORCHESTRATOR_PRISMA_CHECK_OK=false
    else
        log_status "[✓]" "'prisma:generate' script found and correct."
    fi
    # Check build script modification
    if ! jq '.scripts.build' "$ORCHESTRATOR_PACKAGE_JSON" | grep -q "npm run prisma:generate && tsc -p tsconfig.json"; then
        log_status "[✗]" "'build' script not correctly modified in $ORCHESTRATOR_PACKAGE_JSON"
        ORCHESTRATOR_PRISMA_CHECK_OK=false
    else
        log_status "[✓]" "'build' script found and correct."
    fi
fi
if [ ! -f "$ORCHESTRATOR_SCHEMA" ]; then
    log_status "[✗]" "Orchestrator Prisma schema.prisma not found: $ORCHESTRATOR_SCHEMA"
    ORCHESTRATOR_PRISMA_CHECK_OK=false
else
    log_status "[✓]" "Orchestrator Prisma schema.prisma found."
fi
if $ORCHESTRATOR_PRISMA_CHECK_OK; then log_status "[✓]" "Orchestrator Prisma Check PASSED."; else log_status "[✗]" "Orchestrator Prisma Check FAILED."; fi
echo "" >> $REPORT_FILE


# --- 5. Top-Level vercel.json Check ---
log_status "---" "5. Top-Level vercel.json Check"
VERCEL_CONFIG_CHECK_OK=true

if [ ! -f "$VERCEL_CONFIG" ]; then
    log_status "[✗]" "Top-level vercel.json not found at $VERCEL_CONFIG"
    VERCEL_CONFIG_CHECK_OK=false
else
    log_status "[✓]" "Top-level vercel.json found."
    # Basic structural check
    if ! jq '.builds' "$VERCEL_CONFIG" | grep -q "."; then
        log_status "[✗]" "'builds' section missing or empty in vercel.json."
        VERCEL_CONFIG_CHECK_OK=false
    fi
    if ! jq '.functions' "$VERCEL_CONFIG" | grep -q "."; then
        log_status "[✗]" "'functions' section missing or empty in vercel.json."
        VERCEL_CONFIG_CHECK_OK=false
    fi
    if ! jq '.installCommand' "$VERCEL_CONFIG" | grep -q "."; then
        log_status "[✗]" "'installCommand' missing in vercel.json."
        VERCEL_CONFIG_CHECK_OK=false
    fi
    if ! jq '.buildCommand' "$VERCEL_CONFIG" | grep -q "."; then
        log_status "[✗]" "'buildCommand' missing in vercel.json."
        VERCEL_CONFIG_CHECK_OK=false
    fi
    # Check specific orchestrator function runtime
    if ! jq '.functions."apps/orchestrator/api/**/*".runtime' "$VERCEL_CONFIG" | grep -q "nodejs20.x"; then
        log_status "[✗]" "Orchestrator function runtime in vercel.json not set to nodejs20.x."
        VERCEL_CONFIG_CHECK_OK=false
    fi
fi
if $VERCEL_CONFIG_CHECK_OK; then log_status "[✓]" "Top-Level vercel.json Check PASSED."; else log_status "[✗]" "Top-Level vercel.json Check FAILED."; fi
echo "" >> $REPORT_FILE


# --- 6. Local Build Simulation ---
log_status "---" "6. Local Build Simulation"
LOCAL_BUILD_OK=true

APPS=("website" "knisoci" "candyland")
for app in "${APPS[@]}"; do
    log_status "---" "Attempting local build for $app..."
    (cd "$REPO_ROOT" && pnpm --filter "$app" run build >> "$REPORT_FILE" 2>&1)
    if [ $? -eq 0 ]; then
        log_status "[✓]" "Local build for $app PASSED."
    else
        log_status "[✗]" "Local build for $app FAILED. Check $REPORT_FILE for details."
        LOCAL_BUILD_OK=false
    fi
done
if $LOCAL_BUILD_OK; then log_status "[✓]" "Local Build Simulation PASSED."; else log_status "[✗]" "Local Build Simulation FAILED."; fi
echo "" >> $REPORT_FILE


# --- Final Summary ---
echo "------------------------------------" >> $REPORT_FILE
echo "Monorepo Pre-Deployment Check Summary" >> $REPORT_FILE
echo "------------------------------------" >> $REPORT_FILE
if $ENV_CHECK_OK && $KNISOCI_RUNTIME_CHECK_OK && $CANDYLAND_UI_CHECK_OK && $ORCHESTRATOR_PRISMA_CHECK_OK && $VERCEL_CONFIG_CHECK_OK && $LOCAL_BUILD_OK; then
    log_status "[✓]" "ALL MONOREPO PRE-DEPLOYMENT CHECKS PASSED. Ready for Vercel deployment!"
else
    log_status "[✗]" "SOME MONOREPO PRE-DEPLOYMENT CHECKS FAILED. Review the report above."
fi
echo "" >> $REPORT_FILE
echo "Full report available in $REPORT_FILE"
