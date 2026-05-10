FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/
RUN npm ci
# server/src needed for @server alias resolution during vite build
COPY server/src server/src
COPY client/ client/
RUN npm run build -w client
EXPOSE 5173
CMD ["sh", "-c", "cd /app/client && /app/node_modules/.bin/vite preview --port 5173 --host"]
