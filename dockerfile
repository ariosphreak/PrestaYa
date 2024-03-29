FROM node:10-alpine
WORKDIR /usr/src/prestaya
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "server.js" ]