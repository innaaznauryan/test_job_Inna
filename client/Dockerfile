FROM node:19.8.1-alpine3.16

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "build"]