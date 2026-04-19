#!/bin/bash
# ============================================================
# 🚀 DEPLOY — Portfolio
# Build en local sur le Mac → envoi direct sur Oracle
# Usage : ./deploy.sh "message du commit"
# ============================================================

MSG=${1:-"deploy $(date '+%Y-%m-%d %H:%M')"}
SERVER="ubuntu@141.253.127.90"
KEY="$HOME/Downloads/ssh-key-2026-04-18.key"

echo ""
echo "╔════════════════════════════════╗"
echo "║   🚀 Déploiement en cours...   ║"
echo "╚════════════════════════════════╝"
echo ""

# ── 1. Build local (sur le Mac) ──────────────────────────
echo "🔨 Build local..."
npm run build
if [ $? -ne 0 ]; then
  echo "   ❌ Erreur de build ! Déploiement annulé."
  exit 1
fi
echo "   ✅ Build OK"
echo ""

# ── 2. Push vers GitHub (code source) ────────────────────
echo "📦 Push GitHub..."
git add .
git commit -m "$MSG" 2>/dev/null || echo "   (rien à committer)"
git push origin main
echo "   ✅ GitHub OK"
echo ""

# ── 3. Envoi du dossier dist/ vers le serveur via rsync ──
echo "📡 Envoi du frontend vers Oracle..."
rsync -avz --delete \
  -e "ssh -i $KEY" \
  dist/ \
  $SERVER:/var/www/portfolio/dist/
echo "   ✅ Frontend envoyé"
echo ""

echo "╔════════════════════════════════╗"
echo "║   ✅ Déploiement terminé !     ║"
echo "║   🌐 https://rberthier.fr      ║"
echo "╚════════════════════════════════╝"
echo ""
