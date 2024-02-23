# Hack the North 2023 Backend Challenge

## Running this Server

- Make sure you have docker and docker-compose on your machine
- Navigate to the project's directory
- run `docker-compose up`

## Directories
- Our skill and user routes in `routes`
- Our database defined in `database/db.js`
- Logic for each routes defined in `util/`

## Endpoints
I managed to do four of these endpoints within the amount of time I have - I'm in asia travelling right now so, its a bit hard :p
- GET `/users`
- GET `/users/:id`
- GET `/skills`
- GET `/skills/?min_frequency={}&max_frequency={}`


## Design Decisions
I went with three tables for my database, one for users, one for skills and final joint table to allow a correspondance between user and skills. I did this to avoid the possibility of having to write a really nasty looking for-loop for GET requests for users.

## Improvements

Given more time to work on this, I would love to expand it into the rest of the endpoints
`
