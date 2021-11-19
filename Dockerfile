FROM node:14.15.4-alpine
WORKDIR /usr/app
COPY . .
RUN npm i
RUN npx next telemetry disable
ENV NODE_ENV production
RUN npm run build
CMD [ "npm", "start" ]
