# rentalCarApp
Rental Car App

Requirements:

Node.js

Example Ubuntu

```bash
sudo apt-get install nodejs
```

####If you have "docker" can be run bash script for installation
The script is using default postgreSQL settings:
```
database: postgres
username: postgres
```
In main folder run:
```
./install.sh
```

####You can use and custom installation

PostgreSQL
For username you can use default username = postgres.
Example with docker

```bash 
docker pull postgres

docker run --rm --name (container name) -e POSTGRES_PASSWORD=(your password) -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data (image name)
```


Install npm packages in api and in the client.

```bash
npm install
```

You have to create two config files for postgreSQL in main directory of api.

#####Create .env file 

example:
```bash
PORT=3000
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME= your db username
DB_PASSWORD= your db password
DB_DATABASE_NAME= your db name
Collapse
```

#####Create ormconfig.json file

example:

```bash
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your db username",
  "password": "your db password",
  "database": "your db name",
  "entities": [
    "src/database/entities/**/*.ts"
  ],
  "migrations": [
    "src/database/migration/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/database/entities",
    "migrationsDir": "src/database/migration"
  }
}
```

After that run migrations:

```bash
npm run typeorm:run
```

Seed database(Not required)

```bash
npm run seed
```

Start Nest server:
```bash
npm run start:dev
```

####In client folder

Install npm packages:
```bash
npm install
```

Start React server:
```bash
npm run start
```

You can run unit tests
```bash
npm run test
```

You can run end-to-end tests
```bash
nightwatch src/nightwatch/nw-test.js -e chrome
```