ARG VITE_SPOTIFY_CLIENT_ID
ARG VITE_SPOTIFY_REDIRECT_URL=http://127.0.0.1:3000/

# build environment
FROM node:22-alpine AS builder
ARG VITE_SPOTIFY_CLIENT_ID
ARG VITE_SPOTIFY_REDIRECT_URL
ENV VITE_SPOTIFY_CLIENT_ID=$VITE_SPOTIFY_CLIENT_ID
ENV VITE_SPOTIFY_REDIRECT_URL=$VITE_SPOTIFY_REDIRECT_URL
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

# production environment
FROM nginx:1.30-alpine
RUN apk upgrade --no-cache \
  && rm -rf /etc/nginx/conf.d
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN chmod +r /usr/share/nginx/html/*
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
