FROM node:22.9.0-alpine3.20

WORKDIR /srv/app

COPY \
	package.json \
	package-lock.json \
	./

RUN npm install

COPY .env ./
COPY src ./src

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
