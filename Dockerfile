FROM node:14.15.4-alpine as build-step 
#make the directory for the app
RUN mkdir -p /app
#change to the directory
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app

#install the angular dependencies
RUN npm install -g @angular/cli
RUN npm install

COPY . /app

#expose port 443 for all non local resources that need to be retrieved
EXPOSE 443
#expose port 4200 to access the port for local host
EXPOSE 4200

RUN npm run build

#opens the server to be reached by every IP. Without this, 
#it was limited to local host only (which is not local host outside of the docker image).
ENTRYPOINT ng serve --host 0.0.0.0
