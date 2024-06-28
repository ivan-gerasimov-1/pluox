FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --include=prod

COPY . .

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "index.js"]
