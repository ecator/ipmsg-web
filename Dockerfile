FROM node:16-slim

WORKDIR /APP

COPY public public
COPY src src
COPY index.html .
COPY package*.json ./
COPY server.js .
COPY vite.config.js .

RUN npm i && npm run build && rm -rf node_modules && npm i --production && npm cache clean -f

EXPOSE 1251
ENTRYPOINT ["node","server.js"]