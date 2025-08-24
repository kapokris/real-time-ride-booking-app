# /users/register Endpoint Documentation

## Endpoint
**POST** `/users/register`

## Description
This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a user record in the database.

## Headers
- **Content-Type**: `application/json`

## Request Body
The endpoint expects a JSON object with the following structure:

### Fields
- **fullName** (object)
  - **firstname** (string, required): Must be at least 3 characters long.
  - **lastname** (string, optional): Must be at least 3 characters long if provided.
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

### Example
```json
{
  "fullName": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e9b7a603d2f9f8b1e8",
    "fullName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
{
  "errors": [
    { "msg": "First name must be at least 3 characters long", "param": "fullName.firstname" },
    { "msg": "Invalid email format", "param": "email" }
  ]
}
{
  "message": "Email already exists"
}
{
  "message": "Internal server error"
}