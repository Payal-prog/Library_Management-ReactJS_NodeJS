# Stage 1: Build React App
# Use a minimal Node.js image with Node.js 18 installed, names the stage as 'builder'
FROM node:16-alpine AS builder

# Sets the application working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory 
COPY package*.json ./
RUN cat package.json
ENV CI=true 
# Performs a clean install of dependencies as specified in package-lock.json
RUN rm -f package-lock.json
RUN npm install --legacy-peer-deps

# Copy source code into the container's working directory
COPY . .

# Executes the react build script, compiles raw HTML/JS/CSS code into /app/build 
RUN npm run build

# Stage 2: Production Runtime
# Runner stage uses the same Node.js 18 image but is optimized for production
FROM nginx:alpine AS runner

# Copy compiled static assets from builder stage into Nginx's default public web directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose standard HTTP port, informs Docker that Nginx conatiner listens on port 80 at runtime  
EXPOSE 80

# Launches Nginx container in the foreground so that it stays running, preventing the container from exiting immediately after starting
CMD ["nginx", "-g", "daemon off;"]
