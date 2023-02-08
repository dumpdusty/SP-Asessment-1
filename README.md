# Business Day Checker
Returns the number of business days it will take for a payment to be allocated into an account.

## Run Locally

```
npm install
npm start
```

## API

The entire API is accessible under `/api/v1` and the following endpoints are available:

- `GET /api/v1/settlementDate`
- `GET /api/v1/isBusinessDay`

## API automated tests

```
npm test
```

#### There is a few tests with various types of data passed to the API
