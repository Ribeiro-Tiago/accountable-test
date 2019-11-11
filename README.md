# Accountable test

## Run locally

##### Requirements
- node
- mongodb instance (local or remote server)

##### Setup 
- Copy / rename .env.example to .env
- Set the variables as needed

##### Install depedencies 
``npm i``

##### Run api
``npm start``

##### Run tests just once 
``npm run test``

##### Run api with tests on watch mode 
``npm run start:test``


## Run on docker

##### Requirements
- docker

##### Setup 
Update docker-compose.yml and change / set the environment variables as needed 
*note: db_host must be the same as db container name*

##### Starts db and api containers and runs api tests on --watch
``npm run docker``

##### First time / changes to base image (will build image and run the next command)
``npm run docker:build``

##### Starts containers and runs no tests
``npm run docker:no-test``

##### Access api container terminal 
``npm run docker:api-bash``

##### View api container logs
``npm run docker:api-logs``

##### Access db container terminal 
``npm run docker:db-bash``

##### View db container logs
``npm run docker:db-logs``