# Stage 1 as Builder
FROM node:12.18-alpine as builder

COPY package.json yarn.lock ./

RUN yarn install && mkdir /gui_nguocdonglichsu && mv ./node_modules ./gui_nguocdonglichsu

WORKDIR /gui_nguocdonglichsu

COPY . .

RUN npm run ng build --prod


FROM nginx:alpine

# !/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page

RUN rm -rf /usr/share/nginx/html/*

# Copy from the Stage 1
COPY --from=builder /gui_nguocdonglichsu/dist /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT [ "nginx", "-g", "-daemon off;" ]
