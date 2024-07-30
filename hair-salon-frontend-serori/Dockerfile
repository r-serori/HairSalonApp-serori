FROM node:21.5.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

# CMD ["npm", "start"]

CMD ["npm", "run", "dev"]



