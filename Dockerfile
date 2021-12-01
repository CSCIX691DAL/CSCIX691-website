# Step 2: Use build output from 'builder'
FROM nginx:1.17.1-alpine
COPY /dist/X691Website/ /usr/share/nginx/html
