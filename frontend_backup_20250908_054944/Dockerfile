# --- builder ---
FROM node:20-alpine AS builder
WORKDIR /app

# nur deps zuerst -> schnellerer Cache
COPY package*.json ./
# robust: ci bevorzugt, fällt bei fehlendem Lockfile auf install zurück
RUN npm ci || npm install --no-audit --no-fund

# restliches Projekt
COPY . .

# Production-Build
RUN npm run build

# --- runtime ---
FROM nginx:alpine

# eigene Nginx-Config (liefert SPA und proxy't /api zum Backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# gebaute Assets deployen
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
