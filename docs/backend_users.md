# NeQu Users and authentication 👨‍💼

NeQu includes [migrations](backend_database.md) to create the 
needed tables for basic authentication, make sure to 
run `npm run migrate` on a new project to set them up.

Authentication is based on a stateless model where a bearer
token is sent through the headers of any request that needs
authentication

To obtain a token send a matching `email` and `password` 
combination to the `/api/login` endpoint.
