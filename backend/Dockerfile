FROM node:20-alpine

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production --legacy-peer-deps || npm install --only=production --legacy-peer-deps

COPY dist ./dist

EXPOSE 3001

CMD ["node", "dist/main.js"]
