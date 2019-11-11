FROM node:10

# add necessary root files
ADD package.json /app/package.json
ADD jest.config.js /app/jest.config.js
ADD tsconfig.json /app/tsconfig.json

# add code 
ADD src /app/src

# change working dir
WORKDIR /app

# install deps and run api
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]