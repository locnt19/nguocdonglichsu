# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:12.18-alpine as builder

WORKDIR /gui_nguocdonglichsu

COPY package.json /gui_nguocdonglichsu/

COPY yarn.lock /gui_nguocdonglichsu/

# RUN npm install

RUN yarn install

COPY ./ /gui_nguocdonglichsu/

ARG configuration=production

# RUN npm run build -- --output-path=./dist/out --configuration ${configuration}

RUN yarn build -- --output-path=./dist/out --configuration ${configuration}

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

COPY --from=builder /gui_nguocdonglichsu/dist/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf


## production mode

# docker build -t nguocdonglichsu:prod .

## development mode
# docker build -t nguocdonglichsu:dev --build-arg configuration="" .

## staging mode
# docker build -t nguocdonglichsu:dev --build-arg configuration="staging" .


## run docker container
# docker run -p 80:80 nguocdonglichsu:prod
