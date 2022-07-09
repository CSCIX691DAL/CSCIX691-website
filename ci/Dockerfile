FROM node:14.15.4-alpine as build
WORKDIR /usr/src/app
COPY . ./
RUN npm install -g @angular/cli
RUN npm install
RUN ng build

FROM nginx:latest

COPY --from=build /usr/src/app/ci/nginx_config.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/X691Website /usr/share/nginx/html

EXPOSE 80
