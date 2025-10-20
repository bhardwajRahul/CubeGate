ARG NODE_IMAGE=node:22-alpine

# ---------- base ----------
FROM ${NODE_IMAGE} AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat openssl wget bash
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
RUN corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# ---------- runner ----------
FROM ${NODE_IMAGE} AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat openssl wget bash
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

# Copy full node_modules from deps so pnpm symlinks and @prisma/engines resolve correctly
COPY --from=deps /app/node_modules ./node_modules
ENV PATH="/app/node_modules/.bin:${PATH}"

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5 \
    CMD wget -qO- http://127.0.0.1:${PORT}/api/health || wget -qO- http://127.0.0.1:${PORT} || exit 1

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 3000
CMD ["/entrypoint.sh"]
