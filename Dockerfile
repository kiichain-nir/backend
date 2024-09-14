#  Created Base Image for all stages
FROM node:20-alpine As base
RUN apk add --no-cache libc6-compat

# Install dependencies only when needed
FROM base AS devdeps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --force

FROM base AS builder
WORKDIR /usr/src/app
COPY --from=devdeps /usr/src/app/node_modules ./node_modules
COPY . ./
RUN npm run prisma:generate && \
    npm run build

FROM base AS deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --omit=dev --force && npm cache clean -f

FROM base AS prod
USER node
WORKDIR /usr/src/app
# COPY --chown=node:node --from=builder /usr/src/app/.env ./.env
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --chown=node:node --from=builder /usr/src/app/dist/src ./dist/src
COPY --chown=node:node --from=builder /usr/src/app/prisma ./prisma
COPY --chown=node:node package.json ./
CMD [ "node", "dist/src/main.js" ]