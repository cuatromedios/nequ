# NeQu Users and authentication 👨‍💼

NeQu includes [migrations](backend_database.md) to create the 
needed tables for basic authentication, make sure to 
run `npm run migrate` on a new project to set them up.

Authentication is based on a stateless model where a bearer
token is sent through the headers of any request that needs
authentication

To obtain a token send a matching `email` and `password` 
combination to the `/api/login` endpoint.

## Initial user 🔑

When migrations run for the first time, an admin user
will be generated, look for the randomly generate email 
and password inside the output of where the migration was ran.

## Relevant routes 🗂

| path | method | description |
|------|--------|-------------|
|`/api/login`|`POST`|Receives email and password and returns an auth token|
|`/api/me`|`GET`|Returns the user that belongs to the bearer token sent through headers|
|`/api/logout`|`DELETE`|Invalidates the bearer token sent through headers|


## Authentication middleware 👮‍♀️

By default, all routes have the authentication middleware applied
except for the login route, to exclude another route from authentication
add it to `routesWithoutAuth` inside `/backend/src/common/middleware/auth.middleware.ts`.

The authentication middleware will take the bearer token sent by
the client and get the user that corresponds to that token, if it
doesn't exists it will return a `403` status error and will not enter
to the route.

If the user is found it will be appended to the request allowing
controller routes to access it, for example:

```typescript
@Get('example_route')
doSomethingWithUser(@Body('user') user: User) {
  return user.email
}
```
