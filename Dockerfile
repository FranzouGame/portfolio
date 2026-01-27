# ================================
# Stage 1: Dependencies
# ================================
FROM node:20-alpine AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci

# ================================
# Stage 2: Builder
# ================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les dépendances du stage précédent
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Builder l'application Nuxt
RUN npm run build

# ================================
# Stage 3: Production
# ================================
FROM node:20-alpine AS runner
WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Copier les fichiers nécessaires
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Créer le dossier pour la DB SQLite et donner les permissions
RUN mkdir -p /app/prisma && chown -R nuxtjs:nodejs /app

# Variables d'environnement
ENV NODE_ENV=production
ENV DATABASE_URL="file:/app/prisma/dev.db"
ENV HOST=0.0.0.0
ENV PORT=3000

# Changer vers l'utilisateur non-root
USER nuxtjs

# Exposer le port
EXPOSE 3000

# Script de démarrage
CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && node .output/server/index.mjs"]
