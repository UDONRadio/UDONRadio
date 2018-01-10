FROM node:latest

ADD . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
CMD ["npm", "run", "build", "--production"]
