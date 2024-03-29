FROM node:21-alpine
RUN mkdir -p /home/node/prestaya
WORKDIR /home/node/prestaya
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "src/server.js" ]