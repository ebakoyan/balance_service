FROM node:22.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx nest build

EXPOSE $APP_PORT
EXPOSE $APP_PORT_DEBUG

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npx nest start --debug 0.0.0.0:$APP_PORT_DEBUG --watch"]
