FROM node:16

WORKDIR /APP

COPY . .

RUN npm i && npm run build
EXPOSE 1251
ENTRYPOINT ["node","server.js"]