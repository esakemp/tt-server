FROM node:10.15-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm ci
EXPOSE 8080

CMD npm run dev