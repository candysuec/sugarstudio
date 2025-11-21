#!/bin/bash
echo "🔧 SugarStudio Website Auto-Fix Script Starting..."
ROOT_DIR="$(pwd)"

######################################
# 1. Create required folders
######################################
echo "📁 Ensuring required folders exist..."
mkdir -p apps/website/components/ui
mkdir -p apps/website/components/layout
mkdir -p apps/website/lib

######################################
# 2. Create lib/utils.ts if missing
######################################
UTILS_FILE="apps/website/lib/utils.ts"

if [ ! -f "$UTILS_FILE" ]; then
  echo "🆕 Creating utils.ts"
  cat <<EOF > $UTILS_FILE
export function cn(...classes: (string | null | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
EOF
else
  echo "✔ utils.ts already exists"
fi

######################################
# 3. Fix invalid imports inside the website
######################################
echo "🔍 Fixing invalid imports in apps/website..."

# Fix 'ui' imports
grep -rl "from 'ui'" apps/website | while read -r file; do
  echo "➡ Rewriting bad 'ui' import: $file"
  sed -i "s/from 'ui'/from '@\/components\/ui\/button'/g" "$file"
done

# Fix broken spaced import for utils
grep -rl "' @/lib/utils'" apps/website | while read -r file; do
  echo "➡ Fixing spaced @/lib/utils import: $file"
  sed -i "s/' @\/lib\/utils'/'@\/lib\/utils'/g" "$file"
done

######################################
# 4. Fix @sugarstudio/ui shared package
######################################
echo "📦 Fixing packages/ui..."

# Ensure package.json exists
if [ ! -f "packages/ui/package.json" ]; then
  echo "🆕 Creating packages/ui/package.json"
  cat <<EOF > packages/ui/package.json
{
  "name": "@sugarstudio/ui",
  "version": "0.1.0",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "peerDependencies": {
    "react": ">=18.0.0",
    "next": ">=13.0.0"
  }
}
EOF
else
  echo "✔ packages/ui/package.json exists"
fi

# Remove broken export (BrandBookExporter)
INDEX_FILE="packages/ui/src/index.ts"
if [ -f "$INDEX_FILE" ]; then
  echo "🧹 Removing broken BrandBookExporter export"
  sed -i "/BrandBookExporter/d" "$INDEX_FILE"
fi

######################################
# 5. Fix 'ui' imports inside packages/ui
######################################
echo "🔧 Fixing invalid imports in packages/ui..."
grep -rl "from 'ui'" packages/ui | while read -r file; do
  echo "➡ Rewriting bad 'ui' import in package: $file"
  sed -i "s/from 'ui'/from '@sugarstudio\/ui'/g" "$file"
done

######################################
# 6. Ensure pnpm-workspace.yaml has correct paths
######################################
echo "📝 Validating pnpm-workspace.yaml..."
if ! grep -q "packages/*" pnpm-workspace.yaml; then
  echo "  - packages/*" >> pnpm-workspace.yaml
fi

######################################
# 7. FIX tsconfig.json alias (SAFE VERSION)
######################################
echo "🛠 Fixing tsconfig.json alias paths safely..."

TSCONFIG="apps/website/tsconfig.json"

# If alias missing, remove entire "paths" block and recreate
if ! grep -q '"@/*"' "$TSCONFIG"; then
  echo "➡ Resetting paths block in tsconfig.json"

  # 1. Remove existing paths block
  sed -i '/"paths": {/,/},/d' "$TSCONFIG"

  # 2. Insert new correct block AFTER "baseUrl"
  sed -i '/"baseUrl": "."/a \
    "paths": {\n      "@/*": ["./*"]\n    },' "$TSCONFIG"
fi

######################################
# 8. Clean install
######################################
echo "📦 Cleaning node_modules and reinstalling..."
rm -rf node_modules
rm -rf pnpm-lock.yaml

pnpm install --no-frozen-lockfile

######################################
# 9. Build test
######################################
echo "🚀 Running Next.js build test..."
pnpm --filter website run build

echo "🎉 Auto-fix script completed successfully!"
