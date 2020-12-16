FROM nginx:stable-alpine
COPY ./build /usr/share/nginx/html
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
EXPOSE 80
WORKDIR /usr/share/nginx/html