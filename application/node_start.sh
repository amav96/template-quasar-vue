#!/bin/sh

set -e

echo 'Installing deps and run'
npm install && npm run dev

# ignorar error y levantar npm con
# docker-compose run --rm --service-ports npm_smart npm run watch