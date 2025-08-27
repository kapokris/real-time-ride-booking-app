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

# /users/login Endpoint Documentation

## Endpoint
**POST** `/users/login`

## Description
This endpoint is used to authenticate a user. It validates the input data, checks the credentials, and returns a token for authenticated access.

## Headers
- **Content-Type**: `application/json`

## Request Body
The endpoint expects a JSON object with the following structure:

### Fields
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

### Example
```json
{
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
    { "msg": "Invalid email format", "param": "email" },
    { "msg": "Password must be at least 6 characters long", "param": "password" }
  ]
}
{
  "message": "Invalid email or password"
}
{
  "message": "Internal server error"
}
### Documentation for `/users/profile` and `/users/logout`

#### `/users/profile`
- **Description**: This endpoint retrieves the profile information of the currently authenticated user.
- **Method**: GET
- **Authentication**: Required (Bearer Token or Session-based authentication).
- **Response**:
  - **200 OK**: Returns the user's profile data, including fields such as `id`, `name`, `email`, and other relevant details.
  - **401 Unauthorized**: Returned if the user is not authenticated.
- **Example Response**:
  ```json
  {
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2023-01-01T12:00:00Z"
  }
  ```

#### `/users/logout`
- **Description**: This endpoint logs out the currently authenticated user by invalidating their session or token.
- **Method**: POST
- **Authentication**: Required (Bearer Token or Session-based authentication).
- **Response**:
  - **200 OK**: Indicates that the user has been successfully logged out.
  - **401 Unauthorized**: Returned if the user is not authenticated.
- **Example Response**:
  ```json
  {
    "message": "Successfully logged out."
  }
  ```
  ### Documentation for `/captains/register` and `/captains/login`

  #### `/captains/register`
  - **Description**: This endpoint is used to register a new captain. It validates the input data, hashes the password, and creates a captain record in the database.
  - **Method**: POST
  - **Headers**:
    - **Content-Type**: `application/json`
  - **Request Body**:
    - **fullName** (object)
      - **firstname** (string, required): Must be at least 3 characters long.
      - **lastname** (string, optional): Must be at least 3 characters long if provided.
    - **email** (string, required): Must be a valid email address.
    - **password** (string, required): Must be at least 6 characters long.
    - **licenseNumber** (string, required): Must be a valid license number.
  - **Example Request**:
    ```json
    {
      "fullName": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "password": "securePassword123",
      "licenseNumber": "CAP123456"
    }
    ```
  - **Responses**:
    - **201 Created**: Returns the created captain's details and a token.
      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "captain": {
          "_id": "64f1c2e9b7a603d2f9f8b1e9",
          "fullName": {
            "firstname": "Jane",
            "lastname": "Smith"
          },
          "email": "jane.smith@example.com",
          "licenseNumber": "CAP123456"
        }
      }
      ```
    - **400 Bad Request**: Validation errors.
      ```json
      {
        "errors": [
          { "msg": "First name must be at least 3 characters long", "param": "fullName.firstname" },
          { "msg": "Invalid email format", "param": "email" }
        ]
      }
      ```
    - **409 Conflict**: Email or license number already exists.
      ```json
      {
        "message": "Email or license number already exists"
      }
      ```
    - **500 Internal Server Error**: Generic server error.
      ```json
      {
        "message": "Internal server error"
      }
      ```

  #### `/captains/login`
  - **Description**: This endpoint is used to authenticate a captain. It validates the input data, checks the credentials, and returns a token for authenticated access.
  - **Method**: POST
  - **Headers**:
    - **Content-Type**: `application/json`
  - **Request Body**:
    - **email** (string, required): Must be a valid email address.
    - **password** (string, required): Must be at least 6 characters long.
  - **Example Request**:
    ```json
    {
      "email": "jane.smith@example.com",
      "password": "securePassword123"
    }
    ```
  - **Responses**:
    - **200 OK**: Returns the authenticated captain's details and a token.
      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "captain": {
          "_id": "64f1c2e9b7a603d2f9f8b1e9",
          "fullName": {
            "firstname": "Jane",
            "lastname": "Smith"
          },
          "email": "jane.smith@example.com",
          "licenseNumber": "CAP123456"
        }
      }
      ```
    - **400 Bad Request**: Validation errors.
      ```json
      {
        "errors": [
          { "msg": "Invalid email format", "param": "email" },
          { "msg": "Password must be at least 6 characters long", "param": "password" }
        ]
      }
      ```
    - **401 Unauthorized**: Invalid email or password.
      ```json
      {
        "message": "Invalid email or password"
      }
      ```
    - **500 Internal Server Error**: Generic server error.
      ```json
      {
        "message": "Internal server error"
      }
      ```