FROM arm32v7/node:20.11.1-alpine3.19

WORKDIR /usr/src/app

RUN npm install -g pm2

COPY package*.json ./

RUN npm install --include=prod

COPY . .

EXPOSE 3001

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
