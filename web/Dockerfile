FROM node:15.5.1

COPY . /client_web_area

WORKDIR /client_web_area

RUN yarn install; yarn build;

CMD ["yarn", "prod"]
