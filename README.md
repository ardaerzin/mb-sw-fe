this repo is created for the Medbelle Front End Challenge, Star Wars Edition

## Getting Started

## Notes

visit: https://mb-sw-fe.vercel.app/

- graph used for all requests
- Chose SSR for data pages, as data is not accessible if no user is present
- jwt token is saved in a cookie / user object is in local storage (just wanted to use 2 methods here)
- users' fav character data perists in local storage
- search functionality
  - results are filtered out on homepage
  - on other pages a search result container is displayed
- info card links on character info pages are not functional since they were out of scope

## Things to Improve
- page transitions (especially to a character info page)

## errors with the api

1. had to leave mass field out of the schema, because of the following error:
  ```
  {
    message: 'Int cannot represent non-integer value: 78.2',
    locations: [ { line: 11, column: 7 } ],
    path: [ 'person', 'mass' ],
    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
      exception: { message: 'Int cannot represent non-integer value: 78.2' }
    }
}
  ```