# dinosaurinspector

## Getting started:
1. Clone
1. `npm install` 
    * This installs dependencies for server and client
1. `npm run server:watch`
    * This sets up the build process and the API server.
1. Open `http://localhost:3000`    

## Scripts
1. `npm run server:dev` - Runs the development server without refreshing
1. `npm run server:watch` - Runs the server with refreshing + bundles the client code
1. `npm run lint` - Lints typescript files
1. `npm run lint:fix` - Runs normal lint with fixing
1. `npm run lint:prettier` - Runs a TS formatter called prettier
1. `npm run lint:fmt` - Runs `lint:fix` and `lint:fmt`

## Server stuff
For the server we are using two typescript built libraries, nestjs and typeorm. 

### Database
We use sqlite for testing and we use postgres for development. 
Ensure you create the table in postgres (dinosaur_development)
and create a user `bbayard` with a password `potato`.

## Client stuff
TBD, Sass and some kind of front end. 