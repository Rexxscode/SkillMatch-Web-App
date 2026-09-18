#!/usr/bin/env bash
set -euo pipefail

readonly APP_DIR="/var/www/skillmatch.rexxscode.com"

cd "$APP_DIR"
git fetch --quiet origin main
git merge --ff-only origin/main
npm ci --no-audit --no-fund
npm run build
pm2 reload ecosystem.config.cjs --only skillmatch-frontend --update-env
pm2 save

printf 'Skillmatch frontend deployment completed.\n'
