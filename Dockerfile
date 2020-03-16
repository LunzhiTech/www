# This dockerfile uses the ubuntu image
# VERSION 2 - EDITION 1
# Author: docker_user
# Command format: Instruction [arguments / command] ..

# Base image to use, this must be set as the first line
FROM node:latest

# Maintainer: docker_user <docker_user at email.com> (@docker_user)
MAINTAINER stevelee stevelee@email.com

ENV NODE_ENV production

EXPOSE 80 443
# Commands to update the image
WORKDIR /root

COPY . .

RUN npm install

ENTRYPOINT ["node", "--experimental-modules", "--experimental-json-modules", "index"]
