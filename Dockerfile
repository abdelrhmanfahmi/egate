
#stage 1
FROM node:16-alpine as build

WORKDIR /app
COPY package*\.json ./
RUN npm i
COPY . .

RUN mv .env.docker .env
RUN mv vue.config.docker.js vue.config.js

RUN npm run build
#stage 2
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html/humhum-user/
