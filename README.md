# itw-tests

## Install

* Node.js (>= v14.16)
* Yarn (v1.x)
* [Docker](https://www.docker.com/products/docker-desktop) on your local machine.
(version)

## Runing project

1. Create and run database: `docker-compose up -d`
2. Migrate database schema: `(cd backend && yarn run migration:up)`
3. Seed database with data: `(cd backend && yarn run seeds:up)`
4. Start backend server: `(cd backend && yarn run dev)`
5. Start frontend server: `(cd frontend && yarn run dev)`

