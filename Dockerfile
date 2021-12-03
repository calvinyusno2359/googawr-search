FROM node:10
# uses serve's webserver to serve react app
RUN npm install -g serve
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# calls serve here
CMD ["serve", "-s", "build", "-l", "3000"]
