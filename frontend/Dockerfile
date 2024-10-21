# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set backend url
ENV REACT_APP_API_URL=http://to-do-app.local

# Build the React application
RUN npm run build

# Use a lightweight Nginx image as the final base image
FROM nginx:alpine

# Copy the built application from the previous stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx web server
EXPOSE 80

# Command to start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
