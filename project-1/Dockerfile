FROM node:18-alpine as builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY . /app

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container

# Build the application
RUN npm run build

# Use an official Nginx image as a parent image
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container is launched
CMD ["nginx", "-g", "daemon off;"]