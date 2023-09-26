FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV DB_HOST=snuffleupagus.db.elephantsql.com
ENV DB_PORT=5432
ENV DB_USERNAME=jzkzkqtm
ENV DB_PASSWORD=vINhxaXLfiRC3ILoao6xDXpFLvK7bYMn
ENV DB_DATABASE=jzkzkqtm

CMD ["npm", "run", "start:dev"]