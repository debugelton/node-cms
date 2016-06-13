FROM node:latest

RUN mkdir -p /usr/src/cms && npm install -g nodemon
WORKDIR /usr/src/cms
ADD package.json ./package.json
ADD nodemon.json ./nodemon.json
RUN npm install
COPY ./src ./src
ENV PORT 5000
CMD nodemon src/app.js
