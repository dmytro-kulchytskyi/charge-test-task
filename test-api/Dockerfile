FROM node:12

WORKDIR /home/testtask

COPY package*.json ./

RUN npm ci
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
