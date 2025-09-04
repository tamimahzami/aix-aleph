# Build-Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime-Stage
FROM nginx:alpine
# App ausliefern
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx: Single-Page-App + API-Proxy
RUN <<'NGINX' cat >/etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  # Static SPA
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }

  # Proxy zur Backend-API
  location /api/ {
    proxy_pass http://backend:5001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_http_version 1.1;
  }
}
NGINX
