# Stage 1 : Build the project
FROM node:24-alpine AS build
# Prisma use openssl and the alpine images couldn't have it
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
RUN npm ci
# .dockerignore ignore the useless files
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine AS prod
RUN apk add --no-cache openssl
WORKDIR /app
# Put the env in prod
ENV NODE_ENV=production
COPY package*.json ./
# npm ci without dev dependencies
RUN npm ci --omit=dev
# Copy the build folder from stage build and the prisma client generated
COPY --from=build /app/dist/ ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma/
EXPOSE 3000
CMD ["node", "dist/main"]