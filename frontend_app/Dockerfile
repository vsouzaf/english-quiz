FROM node:22-alpine AS dev
WORKDIR /app
COPY . .
RUN chmod +x /app/docker/entrypoint.sh
CMD ["/bin/sh", "/app/docker/entrypoint.sh"]


FROM node:22-alpine AS prod_builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.27-alpine AS prod
COPY --from=prod_builder /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]