FROM node:18-alpine
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Prisma vorher kopieren und client generieren
COPY prisma ./prisma
RUN npx prisma generate

# Restlicher Code
COPY . .

# Entrypoint kümmert sich um migrate deploy / db push
COPY docker-entrypoint.sh /entry.sh
RUN chmod +x /entry.sh

EXPOSE 5001
CMD ["sh", "/entry.sh"]
