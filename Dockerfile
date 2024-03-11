FROM node:18-alpine as builder

ARG branchName
ARG tagName
RUN apk add --no-cache python3 py3-pip make g++
RUN apk add --no-cache bash git openssh

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

# check what files need to be copied
COPY . /app

#RUN export NODE_OPTIONS=--openssl-legacy-provider && ng build && npm install --ignore-scripts --prefer-offline
RUN cd /app && node --max_old_space_size=8600 node_modules/@angular/cli/bin/ng build --configuration production internal-betting-fe && ls -l -a && pwd
RUN pwd && ls -l -a /app/dist/internal-betting-fe

FROM httpd:2.4
RUN rm -rf /usr/local/apache2/htdocs/*

RUN pwd && ls -l -a
COPY .htaccess /usr/local/apache2/htdocs/
COPY --from=builder /app/dist/internal-betting-fe /usr/local/apache2/htdocs/
COPY docker-start.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-start.sh

RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/LoadModule deflate_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/AllowOverride/s/None/All/' /usr/local/apache2/conf/httpd.conf

CMD ["docker-start.sh"]
