# Step 1: Build the React application
FROM node:18.15.0 AS build

# Set the working directory in the builder
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Step 2: Serve the React production build with nginx
FROM nginx:alpine

# Copy the custom nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the production build from the builder to nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]