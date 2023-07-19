FROM node:19.8.1-alpine3.16

WORKDIR /app
COPY package.json . 
RUN npm install -g npm@latest && npm install
COPY src src
ENTRYPOINT [ "sh", "-c", "npm start" ]
