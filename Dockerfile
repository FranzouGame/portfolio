# ================================
# Stage 1: Dependencies
# ================================
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

# ================================
# Stage 2: Builder
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Créer et seeder la DB pendant le build
RUN npx prisma db push
RUN npx tsx prisma/seed.ts

# Builder Nuxt
RUN npm run build

# ================================
# Stage 3: Production
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copier l'app buildée
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copier la DB déjà seedée
COPY --from=builder /app/prisma/dev.db ./prisma/dev.db

RUN chown -R nuxtjs:nodejs /app

ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/prisma/dev.db"
ENV HOST=0.0.0.0
ENV PORT=3000

USER nuxtjs

EXPOSE 3000

# Juste lancer l'app - la DB est déjà prête
CMD ["node", ".output/server/index.mjs"]