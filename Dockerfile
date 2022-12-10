
ARG REACT_APP_CLIENT_ID
ARG REACT_APP_REDIRECT_ID=http://localhost:3000/

# build environment
FROM node:18.12 as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --only=production
COPY . .
RUN yarn run build

# production environment
FROM nginx:1.23.2-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN chmod +r /usr/share/nginx/html/*
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]