# --- Build Stage ---
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Serve Stage ---
FROM nginx:1.27-alpine
# API-Proxy zu http://backend:5001
COPY nginx.conf /etc/nginx/conf.d/default.conf
# gebaute Assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
