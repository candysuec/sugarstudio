#!/bin/bash

# Define the path to the candyland app
CANDYLAND_PATH="/home/tandy/dev/sugarstudio/apps/candyland"
CANDYLAND_PACKAGE_JSON="$CANDYLAND_PATH/package.json"
REPORT_FILE="candyland_cleanup_report.log"

echo "Candyland Cleanup Script Report" > $REPORT_FILE
echo "------------------------------" >> $REPORT_FILE

echo "1. Checking for @sugarstudio/ui dependency in package.json..."
if grep -q "\"@sugarstudio/ui\"" "$CANDYLAND_PACKAGE_JSON"; then
    echo "[!] @sugarstudio/ui dependency found. Removing..." | tee -a $REPORT_FILE
    # Use jq to remove the dependency safely
    jq 'del(.dependencies."@sugarstudio/ui")' "$CANDYLAND_PACKAGE_JSON" > "$CANDYLAND_PACKAGE_JSON.tmp" && mv "$CANDYLAND_PACKAGE_JSON.tmp" "$CANDYLAND_PACKAGE_JSON"
    echo "    Removed @sugarstudio/ui from package.json." | tee -a $REPORT_FILE
else
    echo "[✓] @sugarstudio/ui dependency not found in package.json." | tee -a $REPORT_FILE
fi
echo "" >> $REPORT_FILE

echo "2. Scanning for @sugarstudio/ui imports in source files (excluding node_modules)..."
if grep -Rq " @sugarstudio/ui" "$CANDYLAND_PATH" --exclude-dir=node_modules; then
    echo "[!] @sugarstudio/ui imports found:" | tee -a $REPORT_FILE
    grep -R " @sugarstudio/ui" "$CANDYLAND_PATH" --exclude-dir=node_modules | tee -a $REPORT_FILE
else
    echo "[✓] No @sugarstudio/ui imports found in source files." | tee -a $REPORT_FILE
fi
echo "" >> $REPORT_FILE

echo "3. Scanning for placeholder components in app directory..."
if grep -Rq " Placeholder" "$CANDYLAND_PATH/app"; then
    echo "[✓] Placeholder components found (as expected after cleanup):" | tee -a $REPORT_FILE
    grep -R " Placeholder" "$CANDYLAND_PATH/app" | tee -a $REPORT_FILE
else
    echo "[!] No placeholder components found. This might indicate incomplete cleanup." | tee -a $REPORT_FILE
fi
echo "" >> $REPORT_FILE

echo "4. Running pnpm install to ensure dependencies are correctly resolved after changes..."
cd "$CANDYLAND_PATH"
rm -rf node_modules
pnpm install --no-frozen-lockfile >> "$REPORT_FILE" 2>&1
if [ $? -eq 0 ]; then
    echo "[✓] pnpm install completed successfully." | tee -a $REPORT_FILE
else
    echo "[!] pnpm install failed. Check report file for details." | tee -a $REPORT_FILE
fi
echo "" >> $REPORT_FILE

echo "5. Attempting to build Candyland locally..."
cd "$CANDYLAND_PATH"
pnpm run build >> "$REPORT_FILE" 2>&1
if [ $? -eq 0 ]; then
    echo "[✓] Candyland built successfully locally." | tee -a $REPORT_FILE
else
    echo "[!] Candyland build failed locally. Check report file for details." | tee -a $REPORT_FILE
fi
echo "" >> $REPORT_FILE

echo "Cleanup script finished. Check $REPORT_FILE for a full report."
