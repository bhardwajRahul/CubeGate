#!/usr/bin/env bash
set -euo pipefail

if [[ "${MIGRATE:-false}" == "true" ]]; then
  if [[ -z "${DATABASE_URL:-}" ]]; then
    echo "MIGRATE=true but DATABASE_URL is not set; skipping migrations." >&2
  else
    echo "Running prisma migrate deploy..."
    prisma migrate deploy || {
      echo "Prisma migrate failed" >&2
      exit 1
    }
  fi
fi
prisma generate || true

exec node server.js
