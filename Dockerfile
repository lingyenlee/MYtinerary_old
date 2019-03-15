#use node.js as parent image
FROM node:10

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

RUN npm install

COPY . /app

# Command to run the app when container launches 
CMD ["npm", "start"]

# Make port 5000 available to the world outside this container
EXPOSE 5000


