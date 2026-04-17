# Use Node.js 18 as the base image
FROM node:18-slim

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the production bundle
RUN npm run build

# Install 'serve' globally to host the static files
RUN npm install -g serve

# Expose the port used by Cloud Run
EXPOSE 8080

# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "8080"]
