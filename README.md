# itw-tests

## Install

* Node.js (>= v14)
* [Docker](https://www.docker.com/products/docker-desktop) on your local machine.
(version)

## Runing project

1. Create and run database: `docker-compose up -d`
2. Migrate database schema: `(cd backend && npm run migration:up)`
3. Seed database with data: `(cd backend && npm run seeds:up)`
4. Start backend server: `(cd backend && npm run dev)`
5. Start frontend server: `(cd frontend && npm run dev)`

