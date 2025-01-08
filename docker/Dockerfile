# Stage 1: Build the React app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY ../package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application files
COPY .. .

# Build the React app
ARG PUBLIC_URL=/
ENV PUBLIC_URL=$PUBLIC_URL
RUN yarn build

# Stage 2: Set up production image
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build .

# docker/default.conf needs to be valid for the specified PUBLIC_URL
COPY docker/default.conf /etc/nginx/conf.d/default.conf

COPY docker/hc-config.sh /docker-entrypoint.d/hc-config.sh
RUN chmod +x /docker-entrypoint.d/hc-config.sh

RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
