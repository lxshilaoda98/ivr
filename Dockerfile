FROM node:current-alpine3.16

MAINTAINER "n1n1n1_owner@163.com"

WORKDIR /root

ADD ./dist ./dist
ADD ./app.js ./app.js
ADD ./node_modules ./node_modules

EXPOSE 8083

CMD [ "node", "app.js" ]
