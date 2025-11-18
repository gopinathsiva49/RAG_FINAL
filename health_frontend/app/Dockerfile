# Base image for Node.js
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install Yarn (globally, bypassing mise)
RUN npm install -g yarn@1.22.22

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the app and build
COPY . .
RUN yarn build

# Final Stage (Serve the built app)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /usr/bin/yarn /usr/bin/yarn

# Expose the port (Next.js default)
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]