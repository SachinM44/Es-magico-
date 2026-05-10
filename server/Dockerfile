FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/
RUN npm ci
COPY server/ server/
RUN npm run build -w server
EXPOSE 4000
CMD ["sh", "-c", "cd /app/server && /app/node_modules/.bin/prisma migrate deploy && node /app/server/dist/index.js"]
