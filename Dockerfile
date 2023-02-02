
#stage 1
FROM node:16-alpine as build

WORKDIR /app
COPY / ./
COPY package*\.json ./

RUN npm install -g @vue/cli && npm i && npm run build -c staging --base-href /humhum-user/
COPY . .

#stage 2
FROM nginx:alpine
COPY ./vue.config /etc/nginx/vue.config
COPY --from=build /app/dist/humhum-user-portal /usr/share/nginx/html/humhum-user/
