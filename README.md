# itw-tests

## Install

* [Docker desktop](https://www.docker.com/products/docker-desktop) on your local machine.
(version)

* NodeJS


## Runing project

1. Download image: ```docker-compose up```
2. Run database: ```docker-compose run database```

    with bash: ```docker-compose run database bash```


### Database

* Connecting to database: 

    Run in database bash
    ```psql --host=database --username=test_user --dbname=test_database```
    >Check right db, user credentials in *database.env*.


