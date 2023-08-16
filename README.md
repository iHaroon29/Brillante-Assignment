# Express.js RESTful API Template

The following a simple express.js application that makes an external request to a goldPriceTracker and updates prices accordingly for the items available in the datebase. Video Link - https://drive.google.com/file/d/1AG9cFV1SgULmOs7ROvtExETUPE_s_iBT/view?usp=drive_link

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Additional Information](#additional-information)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [License](#license)

## Features

- An Express.js application harnessing the power of Node.js and MongoDB and pre-configured with necessary middleware and error handling.
- Includes routes to fetch and update item prices accordingly.
- Utilizes native Fetch (Node.js finally support native Fetch API) to make HTTP requests to the goldTracker API.
- Includes Basic API Testing and Cron-job setup scripts to automate price updation process.

## Requirements

- Node.js (version >= 16)
- npm or yarn

## Getting Started

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/iHaroon29/Brillante-Assignment.git
   cd brillante-assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. Run the server:

   ```bash
   npm run start:dev
   ```

   Your API will be accessible at `http://localhost:5500`.

2. Postman collection has been provided in the github to import the API into postman
3. Run Tests:

   ```bash
   npm test
   ```

## Additional Information :

An .env.example file is provided which give insight on various environmental variables used for the project. due to security reasons I won't be sharing my mongoDB atlus URL, feel free to fill the missing variables after creating a .env file. You will also need to include few products by following the schema i've written by using the POST request present it the routes file, i would loved to automate that process as well so that you have a set of products ready to use from the get go.

## Project Structure

The project structure follows a basic organization for an Express.js app:

```
express-rest-api-template/
├── config/
│   ├── app.config.js
│   └── ...
├── controllers/
│   ├── example.controller.js
│   └── ...
├── jobs/
│   └── api.jobs.js
├── middleware/
│   ├── authenication.middleware.js
│   └── ...
├── routes/
│   └── gold.route.js
├── schema/
│   └── gold.schema.js
├── test
|   └── api.test.js
├── app.js
└── index.js
└── ...
```

- `controllers`: Contains your route handlers and business logic.
- `config`: Contains app configurations.
- `jobs`:Contain files to setup cron-jobs.
- `middleware`: Contains custom middleware, including the validation and authentication middleware.
- `routes`: Defines your API routes and connects them to controllers.
- `test`:Contains tests for API end points.
- `schema`:Contains mongoose schema.
- `test`:Contains basic API test written in chai.
- `app.js`: Is a setup file for express application.
- `index.js`: Main entry point of your HTTP/HTTPS Server.

## Routes

The following are the available routes and their responses:

##### Base-URL `http://localhost:5500`

### GET /api/v1/health

#### Description

Returns a simple message indicating the health of the API and current date.

#### Response:

`on success`

```json
{
  "message": "Healthy :)",
  "date": "today's date-here"
}
```

`on failure`

```json
{
  "message": "Internal Server Error",
  "errType": "Server"
}
```

### GET `/api/v1/goldPrice?`

#### Query Parameters

- generate = boolean value
- token = string

#### Description

GET request to the gold tracker endpoint to generate a new price value.

#### Response:

`on success`

```json
{
  "status": "OK"
}
```

`on failure`

```json
{
  "message": " Missing Token || Invalid Token || Internal Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

### GET `/api/v1/goldPrice?`

#### Description

GET request to the gold tracker endpoint retrieve current price of gold.

#### Query Parameters

- current = boolean value
- token = string

#### Response:

`on success`

```json
{
  "price": "current-price-here"
}
```

`on failure`

```json
{
  "message": " Missing Token || Invalid Token || Generic Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

### GET `/api/v1/goldPrice?`

#### Query Parameters

- time_range_max = number value
- token = string

#### Description

GET request to the gold tracker endpoint retrieve min price of gold in said range. Values of min_range and max_range vary between [1,30]

#### Example Response:

`on success`

```json
{
  "minPrice": "current-price-here",
  "date": "date on which min price was generated"
}
```

`on failure`

```json
{
  "message": "Invalid time_max_range || Missing Token || Invalid Token || Generic Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

### GET `/api/v1/item?`

#### Query Parameters

- time_range_max = number value

#### Description

GET request to our API endpoint retrieve current and best prices of items min in said range. Values of min_range and max_range vary between [1,30]. The endpoint returns an array of items containing their current prices and best prices.

#### Response:

`on success`

```json
{
  "items": "item-list-here"
}
```

`on failure`

```json
{
  "message": "Invalid time_max_range || Generic Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

### GET `/api/v1/item?`

#### Query Parameters

- id = ( string - type of ObjectID ) || null

#### Description

GET request to our API endpoint retrieve current and best prices of item. The endpoint returns an array of items containing their current prices and best prices between the range [0,30]

#### Response:

`on success`

```json
{
  "items": "item-list-here"
}
```

`on failure`

```json
{
  "message": "Invalid ID string || Generic Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

### GET `/api/v1/item?`

#### Query Parameters

- id = ( string - type of ObjectID )
- time_range_max = number value

#### Description

GET request to our API endpoint retrieve current and best prices of item. The endpoint returns an array of items containing their current prices and best prices between the given range.

#### Response:

`on success`

```json
{
  "items": "item-list-here"
}
```

`on failure`

```json
{
  "message": "Invalid ID string || Invalid time_range_max || Generic Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

### PATCH `/api/v1/item`

#### Query Parameters

- id = ( string - type of ObjectID ) || null

#### Description

PATCH request to our API endpoint to update the prices of items or a single item.

#### Response:

`on success`

```json
{
  "status": "OK"
}
```

`on failure`

```json
{
  "message": "Generic Server Error",
  "errType": "Type of Error (Client / Server)"
}
```

## License

This project is licensed under the [ISC License](LICENSE).

---
