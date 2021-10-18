
ARG REACT_APP_CLIENT_ID
ARG REACT_APP_REDIRECT_ID=http://localhost:3000/

# build environment
FROM node:16.11.1 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY . .
RUN npm run build

# production environment
FROM nginx:1.21.3-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
RUN chmod +r /usr/share/nginx/html/*
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]