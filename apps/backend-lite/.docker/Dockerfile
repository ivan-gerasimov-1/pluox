FROM node:22.9.0-alpine3.20

WORKDIR /srv/app

COPY package.json ./

RUN npm install --omit=dev

COPY .env ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
