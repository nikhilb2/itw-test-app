#!/bin/sh

if [ ! -f "./public/css/styles.min.css" ]; then
  echo "[./bin/dev-start] Building styles"
  yarn run build:styles
fi

echo "[./bin/dev-start] Starting dev server"
yarn run dev:server
