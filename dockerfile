FROM node:10-alpine
RUN mkdir -p  /usr/src/prestaya && chown -R node:node /usr/src/prestaya
WORKDIR /usr/src/prestaya
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "server.js" ]