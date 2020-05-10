#!/bin/sh

docker inspect --type=image postgres
if [ $? -eq 0 ];
then
     echo "Postgres image existing"
else
     echo "Postgres image missing"
     echo "Pull docker image for postgreSQL"
     docker pull postgres;
fi

echo "To run docker container postgreSQL"
echo "Set docker container name:"
read containerName

echo "Set database password:"
read password

docker run --rm --name $containerName \
        -e POSTGRES_PASSWORD=$password \
        -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

echo "Docker start container"

docker start $containerName

cd ./api

echo "Install api dependencies"

npm install;

echo "We need clean database. For this project we use default postgreSQL database with name postgres";
echo "Set DB connection"

echo "
PORT=3000
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME= postgres
DB_PASSWORD= $password
DB_DATABASE_NAME= postgres
Collapse
" > .env

ls -l .env

echo "{
  \"type\": \"postgres\",
  \"host\": \"localhost\",
  \"port\": 5432,
  \"username\": \"postgres\",
  \"password\": \"$password\",
  \"database\": \"postgres\",
  \"entities\": [
    \"src/database/entities/**/*.ts\"
  ],
  \"migrations\": [
    \"src/database/migration/**/*.ts\"
  ],
  \"cli\": {
    \"entitiesDir\": \"src/database/entities\",
    \"migrationsDir\": \"src/database/migration\"
  }
}"> ormconfig.json

ls -l ormconfig.json

echo "Create db tables"
npm run typeorm:run

echo "Run REST API"
gnome-terminal --tab --title="restApi" --command="npm run start:dev"

cd ../client
echo "Install client dependencies"
npm install

echo "Run client"
gnome-terminal --tab --title="ReactApp" --command="npm run start"