FROM node:14-alpine AS builder


ADD website /app/

WORKDIR /app

RUN yarn cache clean

RUN yarn

RUN yarn build

# NGINX
FROM nginx:alpine

EXPOSE 9011

RUN apk update && apk upgrade && \
  apk --update --no-cache add tzdata ca-certificates

COPY k8s/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/ /usr/share/nginx/html/

