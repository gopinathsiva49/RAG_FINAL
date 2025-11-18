# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

# Define the build-time argument for the public URL
ARG NEXT_PUBLIC_API_BASE_URL

# Pass the build-time argument as an environment variable so Next.js can use it during 'yarn build'
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Create the production-ready image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# You must also set the variable here for any server-side rendering (SSR) or API routes
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Copy files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Railway provides dynamically via the PORT environment variable
EXPOSE 3000

# Start the Next.js server
CMD ["yarn", "start"]
