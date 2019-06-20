# Grolist backend
This projects provides a RESTful API (JSON) for a "Shared Real-time Grocery List".

The implementation of all features and their stability are "work-in-progress"

## The goal: Shared Real-time Grocery List
> Grocery list web-application that can be shared in real-time by multiple people.
Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way. Each person has the same grocery list on their phone. When one of you checks a grocery item off the shared list, it updates on everyone else’s list, preventing anyone from purchasing duplicate items. Similarly, items added to the list on any phone update to the same list.

## Deployment
Heroku was chosen as hosting platform:
https://grolist-api.herokuapp.com

## Built with
* [JavaScript](https://www.javascript.com/) - Vanilla JS
* [Node](https://nodejs.org/en/) - Runtime environment
* [CORS](https://github.com/expressjs/cors) - Cross origin resource sharing
* [Express](https://expressjs.com/) - Web framework
* [Passport (Local & JWT)](http://www.passportjs.org/) - Authentication
* [PostgreSQL](https://www.postgresql.org/) - Persistency
* [Sequelize](http://docs.sequelizejs.com/) - ORM
* [Jasmine](https://jasmine.github.io/) - Testing framework

## Features
- CRUD actions listed below
- User creation via passport local strategy
- User authentication - Combining passport local and JWT strategies


## Endpoints
- `GET /api/lists/all`
- `GET /api/lists/:id`
- `POST /api/lists/create`
- `POST /api/lists/:id/update`
- `DELETE /api/lists/:id/delete`
- `GET /api/lists/:listId/items/all`
- `GET /api/lists/:listId/items/:id`
- `POST /api/lists/:listId/create`
- `POST /api/lists/:listId/items/:id/update`
- `DELETE /api/lists/:listId/items/:id/delete`
- `POST /api/users/log_in`
- `POST /api/users/create`
- `POST /api/users/:id/reset_password`


## Possible enhancements
* Real-Time Synchronicity - Propagate state using WebSockets
* Authorization - Enhance lists access, add roles, share lists