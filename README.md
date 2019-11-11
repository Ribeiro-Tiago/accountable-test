# Accountable test

## Run api 

### Run locally

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


### Run on docker

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


## How to use
After the API is running you can access it via your defined host and port (localhost:3000 by default). You have some existing endpoints: 


#### Government 
- ``GET /government/balance`` 
Gives you the current balance of Corg's government

#### Trader
- ``GET /trader?page=number``
Lists all existing inhabitants (traders). Because it's a list, it has pagination, showing 12 per page. You can speciy the page you want with ``?page=number`` although not required. If no page speciify, page 1 is default.

- ``GET /trader/:id``
Returns the trader with the ``:id`` provided

- ``POST /trader``
Creates a new random trader. No fields are provided

#### Offer
- ``GET /offer?page=number``
Lists all existing offers. Because it's a list, it has pagination, showing 12 per page. You can speciy the page you want with ``?page=number`` although not required. If no page speciify, page 1 is default.

- ``GET /offer/:id``
Returns the offer with the ``:id`` provided

- ``POST /offer/post``
Creates a new offer. Must send offer object via request body.
**Offer object: { owner: string; item: itemType; price: number; quantity: number; }**
Where ``ItemType = "book" | "bike" | "coal" | "cheese";`` and ``owner`` is the trader id of the person who created the offer

- ``POST /offer/:id/accept?buyer=buyerId``
Tries to accepts the offer related to the ``id``. Only works if the buyer related to the ``buyerId`` can buy the item (has enough currency, it's not many in a row, etc)