#!/usr/bin/env bash
cd "$(dirname "$0")"
date

echo "## Crash on errors ##"
set -e
set -u

npm ci
(npm start&)
cd generators
npm ci
cd ..
npm run generate
