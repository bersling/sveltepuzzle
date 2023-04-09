#!/usr/bin/env bash
cd "$(dirname "$0")"
date

echo "## Crash on errors ##"
set -e
set -u

# Use correct node version
export NVM_DIR=~/.nvm;
source $NVM_DIR/nvm.sh;
nvm use 16

npm run build --prefix client

DEPLOY_TARGET="$1"

if [ "$DEPLOY_TARGET" == "dev" ]; then
  echo "no dev server :scream:"
elif [ "$DEPLOY_TARGET" == "prod" ]; then
  echo "deploying to prod"
  CLOUDFRONT_DISTRIBUTION_ID="$SVELTEPUZZLE_PROD_DISTR_ID"
  CLOUDFRONT_S3_BUCKET="s3://$SVELTEPUZZLE_PROD_DISTR_BUCKET/"
else
  echo "Expected dev or prod as argument"
  exit 0
fi

aws s3 sync client/build "$CLOUDFRONT_S3_BUCKET" --size-only --profile "$SVELTEPUZZLE_PROFILE" # --cache-control max-age=86400,public
# aws s3 cp client/build "$CLOUDFRONT_S3_BUCKET" --profile "$SVELTEPUZZLE_PROFILE" --recursive # --cache-control max-age=86400,public

aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --profile "$SVELTEPUZZLE_PROFILE" --paths "/*"

echo "Done!"
