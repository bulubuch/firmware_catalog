FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm cli --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "server.js" ]