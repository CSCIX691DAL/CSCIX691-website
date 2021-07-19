FROM node:14.15.4-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app

RUN npm install -g @angular/cli
RUN npm install

COPY . /app

EXPOSE 443
EXPOSE 4200

RUN npm run build

ENTRYPOINT ng serve --host 0.0.0.0