FROM node:22.10.0-alpine

WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait

RUN chmod +x /wait

COPY ./package*.json ./

RUN npm ci --silent --also=dev

COPY . .

RUN npm run build

RUN npx prisma generate

CMD ["/bin/sh", "-c", "/wait && npx prisma migrate deploy && npx prisma db seed && npm run start:prod"]
