FROM node:alpine

WORKDIR /database

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 3001
EXPOSE 3111
EXPOSE 9187

CMD ["npm", "start"]