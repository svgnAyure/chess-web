# Build stage
FROM node:11 as build-stage

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# Nginx stage
FROM nginx:latest

COPY --from=build-stage /app/build /usr/share/nginx/html