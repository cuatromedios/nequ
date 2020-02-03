# NeQu Validation ☑️

Validation in NeQu is done by the 
[global validation pipe](https://docs.nestjs.com/techniques/validation#auto-validation) 
that comes with nest, it has the whitelist option enabled by default.

Validation exceptions are handled by 
`/backend/src/common/exceptions.filter.ts`
and will throw a 422 status error along with the fields that
failed the validation

Example of a response that has a validation error:
```json
{
    "statusCode": 422,
    "error": "Bad Request",
    "validation_error": true,
    "message": [
        {
            "target": {},
            "property": "email",
            "children": [],
            "constraints": {
                "isEmail": "email must be an email",
                "isNotEmpty": "email should not be empty"
            }
        },
        {
            "target": {},
            "property": "password",
            "children": [],
            "constraints": {
                "minLength": "password must be longer than or equal to 8 characters",
                "isNotEmpty": "password should not be empty"
            }
        }
    ]
}
```
