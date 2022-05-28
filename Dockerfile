FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --only=prod

EXPOSE 3000

CMD ['npm', 'start']



