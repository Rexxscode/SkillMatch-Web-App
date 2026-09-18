#!/usr/bin/env bash
set -euo pipefail

readonly APP_DIR="/var/www/api-skillmatch.rexxscode.com"

cd "$APP_DIR"
git fetch --quiet origin main
git merge --ff-only origin/main
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction

# The repository has no package-lock.json, so npm ci cannot be used.
npm install --ignore-scripts --no-audit --no-fund
npm run build

php artisan migrate --force --no-interaction
php artisan l5-swagger:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache

chown -R ubuntu:www-data storage bootstrap/cache
chmod -R u=rwX,g=rwX,o= storage bootstrap/cache
sudo /bin/systemctl reload php8.3-fpm

printf 'Skillmatch API deployment completed.\n'
