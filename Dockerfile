FROM node:latest

WORKDIR /retail

COPY retail1 retail1

WORKDIR /retail/retail1

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]