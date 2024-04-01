# syntax=docker/dockerfile:1
# Use the official Node.js image as base
FROM node

# Set environment variables
ENV PORT=8000
ENV MONGO_URI=mongodb+srv://syedrajo20:rajo2000@mernworkouts.uqw8mlu.mongodb.net/ecosync?retryWrites=true&w=majority
ENV JWT_SECRET=bracuspectrum@verysecret
ENV ADMIN_EMAIL=admin@ecosync.com
ENV ADMIN_USERNAME=admin
ENV ADMIN_PASSWORD=adminpassword
ENV ADMIN_ROLE_NAME=sys_admin

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN bash -c "npm install"

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE $PORT

# Command to run your app using npm
CMD ["npm", "start"]
