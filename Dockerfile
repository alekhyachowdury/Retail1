FROM alekhyachowdhury/react-retail1:latest

WORKDIR /retail/retail1

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]