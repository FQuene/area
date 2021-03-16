FROM node:15.5.1

COPY . /area_server

WORKDIR /area_server

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

RUN chmod +x /wait

EXPOSE 5432 8080

RUN yarn install;

CMD /wait && yarn db:init && yarn start:dev