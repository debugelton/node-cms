FROM node:latest

RUN mkdir -p /usr/src/www && npm install -g nodemon
WORKDIR /usr/src/www
ADD package.json ./package.json
RUN npm install
COPY ./src ./src
CMD nodemon src/app.js
