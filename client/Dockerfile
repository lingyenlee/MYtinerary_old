#use node.js as parent image
FROM node:10

# Set the working directory to /app
WORKDIR /app

COPY . /app

RUN npm install

# Command to run the app when container launches 
CMD npm start

# Make port 5000 available to the world outside this container
EXPOSE 3000




