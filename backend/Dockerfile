# ~/Desktop/UW_PICO_5.09/backend/Dockerfile
FROM node:20-alpine AS builder

# 1) Tools
RUN apk add --no-cache tini curl

# 2) Arbeitsverzeichnis
WORKDIR /app

# 3) Nur Manifest zuerst (Cache)
COPY package*.json ./

# 4) Install – mit Fallback, falls kein package-lock.json
#    (Wir brauchen devDeps, damit Prisma CLI verfügbar ist)
RUN npm ci || npm install --no-audit --no-fund

# 5) Rest des Codes
COPY . .

# 6) Prisma Client generieren (nutzt lokale .env zur Buildzeit NICHT; ist okay)
RUN npx prisma generate || true

# 7) Runtime
FROM node:20-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY --from=builder /usr/bin/tini /sbin/tini
COPY --from=builder /app /app

EXPOSE 5001
ENTRYPOINT ["/sbin/tini","--"]
CMD ["node","server.js"]
