FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

# RUN npm install -g pm2 --unsafe-perm=true --allow-root

COPY package*.json ./

RUN npm install --include=prod

COPY . .

EXPOSE 3001

# CMD ["pm2-runtime", "start", "ecosystem.config.js"]
CMD ["node", "-r", "dotenv/config", "index.js"]
