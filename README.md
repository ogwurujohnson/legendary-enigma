[![Build Status](https://travis-ci.com/ogwurujohnson/legendary-enigma.svg?token=EVLqNwUG2BoGnpYZHwuu&branch=master)](https://travis-ci.com/ogwurujohnson/legendary-enigma)

# Legendary Enigma

A Basic rule validation API

## Getting Started

### Install all necessary packages

`yarn`

### Start the application

`yarn develop` => Starts the development server in watch mode.

`yarn start` => when running on a production environment, starts the server.

### Run all test suites and display coverage

`yarn test`

_______

## Running with Docker

### Build the docker image

`docker build -t validator/web-app .`

### Run the built image

`docker run -p 3000:3000 -d validator/web-app`

_____

## API Documentation

| Methods | Endpoint              | Description                              |
| ------- | --------------------- | ---------------------------------------- |
| GET     | /                     | Returns developer information |
| POST     | /validate-rule      | validates data based on rule given                           |

## Endpoints

**URL**: https://legendary-enigma.herokuapp.com/

**Returns**: Developer information.

```javascript
{
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
        "name": "Johnson Ogwuru",
        "github": "@ogwurujohnson",
        "email": "ogwurujohnson@gmail.com",
        "mobile": "08081200722",
        "twitter": "@devopsjay"
    }
}
```

**URL**: https://legendary-enigma.herokuapp.com/validate-rule

**Payload**:

```javascript
{
  "rule": {
      "field": "missions.carry",
      "condition": "gte",
      "condition_value": 30
    },
    "data": {
      "name": "James Holden",
      "crew": "Rocinante",
      "age": 34,
      "position": "Captain",
      "missions": {
        "carry": 45
      }
    }
}
```

**Returns**: Returns the status of the validation script. Responses could be any of the following depending on what is sent as request

```javascript
{
  "message": "field missions.count successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions.count",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}
```

```javascript
{
  "message": "field 0 failed validation."
  "status": "error",
  "data": {
    "validation": {
      "error": true,
      "field": "0",
      "field_value": "d",
      "condition": "eq",
      "condition_value: "a"
    }
  }
}
```

```javascript
{
  "message": "field 5 is missing from data."
  "status": "error",
  "data": null
}
```

```javascript
{
  "message": "rule should be an object."
  "status": "error",
  "data": null
}
```

```javascript
{
  "message": "Invalid JSON payload passed."
  "status": "error",
  "data": null
}
```
