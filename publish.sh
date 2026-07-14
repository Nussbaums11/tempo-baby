#!/usr/bin/env bash
#
# publish.sh <slug>
#
# Publie un article Tempo déjà rédigé (draft:true) : passe draft:false,
# date published/updated au jour même, vérifie le build, commit et push.
# À lancer APRÈS relecture. Un seul geste pour Sandra.
#
# Usage : ./publish.sh train-du-sommeil-bebe
#
set -euo pipefail

SLUG="${1:-}"
if [ -z "$SLUG" ]; then
  echo "Usage : ./publish.sh <slug>   (ex : ./publish.sh train-du-sommeil-bebe)"
  exit 1
fi

DIR="$(cd "$(dirname "$0")" && pwd)"
FILE="$DIR/src/content/articles/$SLUG.mdx"
TODAY="$(date +%Y-%m-%d)"

if [ ! -f "$FILE" ]; then
  echo "❌ Article introuvable : $FILE"
  exit 1
fi

if ! grep -qE '^draft:[[:space:]]*true' "$FILE"; then
  echo "⚠️  $SLUG n'est pas en draft:true (déjà publié ?). Rien à faire."
  exit 1
fi

echo "→ Passage draft:false + dates au $TODAY sur $SLUG"
perl -0pi -e "s/^draft:[ \t]*true[ \t]*\$/draft: false/m" "$FILE"
perl -0pi -e "s/^updated:.*\$/updated: $TODAY/m" "$FILE"
if ! grep -qE '^published:' "$FILE"; then
  perl -0pi -e "s/^(updated:.*)\$/\$1\npublished: $TODAY/m" "$FILE"
fi

echo "→ Build de vérification"
npm run build

echo "→ Commit + push"
git add "$FILE"
git commit -m "Publie $SLUG"
git push origin main

echo "✅ $SLUG publié et poussé. Cloudflare va déployer, puis vérifie le 200 en prod."
