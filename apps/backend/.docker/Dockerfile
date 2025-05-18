FROM node:22.15.1-alpine3.21

WORKDIR /srv/app

COPY package.json ./

RUN npm install --omit=dev

COPY .env ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
