# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Create the production-ready image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Railway provides dynamically via the PORT environment variable
EXPOSE 3000

# Start the Next.js server
CMD ["yarn", "start"]
