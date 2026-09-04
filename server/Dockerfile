# Stage 1: Build & Dependencies 
# Use a minimal Node.js image with Node.js 18 installed, names the stage as 'builder'
FROM node:18-alpine AS builder

# Sets the application working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory 
COPY package*.json ./

# Performs a clean install of dependencies as specified in package-lock.json
RUN npm ci

# Copy source code into the container's working directory
COPY . .

# Stage 2: Production Runtime
# Runner stage uses the same Node.js 18 image but is optimized for production
FROM node:18-alpine AS runner
WORKDIR /app

# Sets the  NODE_ENV environment variable to 'production' to signal the tools and frameworks that the application
ENV NODE_ENV=production

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the built files and artifacts from the builder stage to the runner stage
COPY --from=builder /app ./

# Security Best Practice: Switches the user from root to a non-root user for better security, reducing potential risks
USER node

# Exposes port 5000 to allow external access to the application
EXPOSE 5000

# Defines the command to run the application, starting the Node.js server using index.js
CMD ["node", "src/db/index.js"]
