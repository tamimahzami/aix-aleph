FROM node:18-alpine

WORKDIR /app

# Manifeste + Prisma-Schema zuerst, damit npm postinstall prisma findet
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

# App-Code
COPY . .

# Prisma Client generieren (zur Sicherheit zusätzlich)
RUN npx prisma generate

EXPOSE 5001
CMD ["node", "server.js"]
