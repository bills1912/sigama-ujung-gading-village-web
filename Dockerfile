# ---- Tahap 1: build aplikasi Vite ----
FROM node:lts-alpine AS build

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /app

# Copy manifest dulu supaya layer install di-cache selama package.json tidak berubah
COPY package*.json ./
RUN npm ci

# Copy sisa source code, lalu build ke folder dist/
COPY . ./
RUN npm run build

# ---- Tahap 2: serve hasil build dengan Caddy ----
FROM caddy

WORKDIR /app

COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite

COPY --from=build /app/dist ./dist

CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
