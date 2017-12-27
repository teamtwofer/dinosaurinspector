FROM node:9.3.0

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3001