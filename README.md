## To run app use 'docker-compose up' command

# Charge Full Stack API Take Home

Design and code a two endpoint API Server using the following specs:

`POST /organizations?data=full&process=true`

`GET /organizations?data=full`

To Submit your solution:

- clone this repo

- push your solution to a public repo

## Tech Requirements

**Server**

[NodeJs](https://nodejs.org/en/) & [Express](https://expressjs.com/)

**Database**

[Postgres](https://www.postgresql.org/) & [Sequelize](https://sequelize.org/)

**Message Queue**

[bullmq](https://github.com/taskforcesh/bullmq) & [redis](https://redis.io/)

**Suggested**

[Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for orchestration

## Logic Requirements:

**Request Body**

```json
{
    "identifier": "niels.bohr@charge.io",
    "businessName": "Charge Technology Group, Inc",
    "dba": "Charge",
    "ein": "1234567",
    "businessType": "corporation",
    "bankAccountType": "checking",
    "businessStreetAddress": "1100 Highland Ave",
    "businessCity": "Manhattan Beach",
    "businessState": "CA",
    "businessZip": "90266",
    "businessCountry": "US",
    "contactFirstName": "Ira",
    "contactLastName": "Karaba",
    "contactTitle": "President",
    "contactPhone": "3237178850",
    "contactEmail": "ira@charge.io",
    "website": "https://charge.io",
    "ip": "76.171.141.40",
    "deviceFingerprint": "3093vne0ig4n048gweviasefv4oinveslkefjelkjfe",
    "meta": {
        "key": "value"
    },
    "additionalChecks": [
        {
            "name": "bankVerification",
            "data": {
                "type": "checking",
                "account_number": "1234567",
                "routing_number": "1234567"
            }
        }
    ]
}
```

**Authorization**
- Provide a hard coded API Key for authentication

**Query Parameters**
- if `process=true` place the request body in the 
[bullmq](https://github.com/taskforcesh/bullmq) message queue. The `queue` worker should then add the `PROCESSED` status to the `statusHistory` array in the response:
```json
  {
    "status": "PROCESSED",
    "user": {
      "id": "775671ff-f70d-415d-b523-f50b05139ac9",
      "identifier": "admin@admin.com"
    },
    "createdAt": "2020-04-20T03:11:23.762Z"
  }
```

- if `process=false` simply return the response, do not add the extra status since the job is not added to the `queue`
- if `data=none`, the `data` object in the response should be empty
- if `data=base64`, the `data` object in the response should be the request body in base 64 encoded
- if `data=full`, the `data` object in the response should be the entire request body

**Request Body**
- for the `POST` request body, simply use the body provided in the spec
- validate data structure to see if fields are not provided

**Response Object**
For the response of the `POST` and `GET` requests:

- if `process=true`:

the `result` object in the response should be:
```json
{
  "id": "f1207990-fae1-4208-b6f1-98ecfc5c6f44",
  "identifier": "niels.bohr@charge.io",
  "source": {
    "method": "api",
    "version": "1.0",
    "user": {
      "id": "775671ff-f70d-415d-b523-f50b05139ac9",
      "identifier": "admin@admin.com"
    },
    "createdAt": "2020-04-20T03:11:23.732Z"
  },
  "data": {
    "organization": {
      "id": "f1207990-fae1-4208-b6f1-98ecfc5c6f44",
      "accountId": "15b55f81-a6a4-434d-ba9d-c3778d7b3a1b",
      "externalId": null,
      "identifier": "niels.bohr@quantum.com",
      "businessName": "Charge Technology Group, Inc",
      "dba": "Charge",
      "ein": "1234567",
      "businessType": "corporation",
      "bankAccountType": "checking",
      "businessStreetAddress": "1100 Highland Ave",
      "businessCity": "Manhattan Beach",
      "businessState": "CA",
      "businessZip": "90266",
      "businessCountry": "US",
      "contactFirstName": "Ira",
      "contactLastName": "Karaba",
      "contactTitle": "President",
      "contactPhone": "3237178850",
      "contactEmail": "ira@charge.io",
      "website": "https://charge.io",
      "ip": "76.171.141.40",
      "deviceFingerprint": "3093vne0ig4n048gweviasefv4oinveslkefjelkjfe",
      "meta": {
        "key": "value"
      },
      "additionalChecks": [
        {
          "name": "bankVerification",
          "data": {
            "type": "checking",
            "account_number": "1234567",
            "routing_number": "1234567"
          }
        }
      ],
      "people": [],
      "createdAt": "2020-04-20T03:11:23.698Z",
      "updatedAt": "2020-04-20T03:11:23.698Z"
    }
  },
  "result": {
    "status": "PROCESSED",
    "codes": [],
    "statusHistory": [
      {
        "status": "PROCESSED",
        "user": {
          "id": "775671ff-f70d-415d-b523-f50b05139ac9",
          "identifier": "admin@admin.com"
        },
        "createdAt": "2020-04-20T03:11:23.762Z"
      },
      {
        "status": "PROCESSING",
        "user": {
          "id": "775671ff-f70d-415d-b523-f50b05139ac9",
          "identifier": "admin@admin.com"
        },
        "createdAt": "2020-04-20T03:11:23.762Z"
      },
      {
        "status": "CREATED",
        "user": {
          "id": "775671ff-f70d-415d-b523-f50b05139ac9",
          "identifier": "admin@admin.com"
        },
        "createdAt": "2020-04-20T03:11:23.762Z"
      }
    ],
    "checks": [],
    "createdAt": "2020-04-20T03:11:23.733Z"
  },
  "notes": [],
  "updatedAt": "2020-04-20T03:11:23.698Z",
  "createdAt": "2020-04-20T03:11:23.698Z"
}
```

- if `process=false`:

the `result` object in the response should be:
```json
{
  "id": "f1207990-fae1-4208-b6f1-98ecfc5c6f44",
  "identifier": "niels.bohr@charge.io",
  "source": {
    "method": "api",
    "version": "1.0",
    "user": {
      "id": "775671ff-f70d-415d-b523-f50b05139ac9",
      "identifier": "admin@admin.com"
    },
    "createdAt": "2020-04-20T03:11:23.732Z"
  },
  "data": {
    "organization": {
      "id": "f1207990-fae1-4208-b6f1-98ecfc5c6f44",
      "accountId": "15b55f81-a6a4-434d-ba9d-c3778d7b3a1b",
      "externalId": null,
      "identifier": "niels.bohr@quantum.com",
      "businessName": "Charge Technology Group, Inc",
      "dba": "Charge",
      "ein": "1234567",
      "businessType": "corporation",
      "bankAccountType": "checking",
      "businessStreetAddress": "1100 Highland Ave",
      "businessCity": "Manhattan Beach",
      "businessState": "CA",
      "businessZip": "90266",
      "businessCountry": "US",
      "contactFirstName": "Ira",
      "contactLastName": "Karaba",
      "contactTitle": "President",
      "contactPhone": "3237178850",
      "contactEmail": "ira@charge.io",
      "website": "https://charge.io",
      "ip": "76.171.141.40",
      "deviceFingerprint": "3093vne0ig4n048gweviasefv4oinveslkefjelkjfe",
      "meta": {
        "key": "value"
      },
      "additionalChecks": [
        {
          "name": "bankVerification",
          "data": {
            "type": "checking",
            "account_number": "1234567",
            "routing_number": "1234567"
          }
        }
      ],
      "people": [],
      "createdAt": "2020-04-20T03:11:23.698Z",
      "updatedAt": "2020-04-20T03:11:23.698Z"
    }
  },
  "result": {
    "status": "PROCESSING",
    "codes": [],
    "statusHistory": [
      {
        "status": "PROCESSING",
        "user": {
          "id": "775671ff-f70d-415d-b523-f50b05139ac9",
          "identifier": "admin@admin.com"
        },
        "createdAt": "2020-04-20T03:11:23.762Z"
      },
      {
        "status": "CREATED",
        "user": {
          "id": "775671ff-f70d-415d-b523-f50b05139ac9",
          "identifier": "admin@admin.com"
        },
        "createdAt": "2020-04-20T03:11:23.762Z"
      }
    ],
    "checks": [],
    "createdAt": "2020-04-20T03:11:23.733Z"
  },
  "notes": [],
  "updatedAt": "2020-04-20T03:11:23.698Z",
  "createdAt": "2020-04-20T03:11:23.698Z"
}
```

- the `source` object should indicate what user sent the request
- the `checks` array in the response should be empty
- the `notes` array in the response should be empty
- use valid time stamps 
- note how when `process=false` the `statusHistory` does not have the `PROCESSED` status


**Response Status**

`POST`

- Only code for `201`, `400`, and `401`.

`GET`

- Only code for `200` and `401`.

**Data Structures**

You can organize the data structures in any way you want.

## Bonus

Write a one command cli in [go](https://golang.org/) that allows for making the post request:

```
charge post organizations --authorization=MY_API_KEY --body=body.json
```

## Questions

How would you scale this API to process millions of requests?

What you think would make this API more secure or easily extensible?
