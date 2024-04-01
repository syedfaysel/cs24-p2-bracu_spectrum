# Use an official Node.js image as a base
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Set the environment variable for the backend API URL
ENV NEXT_PUBLIC_BACKEND_API=http://localhost:8000

# Copy the rest of the application code into the container
COPY . .

# Build the frontend
RUN bash -c "npm run build"
# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
