FROM node:18 AS base
FROM base AS deps

RUN apt-get update && apt-get install -y python3 build-essential

WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/node_modules/assemblyscript ./node_modules/assemblyscript
COPY --from=builder /app/node_modules/binaryen ./node_modules/binaryen
COPY --from=builder /app/node_modules/long ./node_modules/long
RUN mv ./node_modules/assemblyscript/bin/asc.js ./node_modules/assemblyscript/bin/asc.mjs

RUN mkdir ./node_modules/.bin
RUN ln -s ../assemblyscript/bin/asc.mjs ./node_modules/.bin/asc

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
