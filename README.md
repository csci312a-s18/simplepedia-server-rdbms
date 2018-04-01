# Simplepedia SQL Server

This is a RDMS-backed Simplepedia server implementation designed for
stand-alone use or deployment to Heroku. In development mode it uses a sqlite3
backend, and in production mode a PostgreSQL backend.

The server is not intended to run on its own, but instead launched from the
top-level directory (in testing) or deployed from the top-level on Heroku. See
the top-level README for a guide to preparing the production database.

## Development

### Prepare the database

To prepare the development sqlite3 database (`simplepedia.db`):

1. Run the migration

	````
	npx knex migrate:latest --env development
	````

2. Seed the database from `seed.json`

    ```
    npx knex seed:run --env development
    ```

3. Verify the seed was successful by opening the database from the command line:

	```
	sqlite3 simplepedia.db
	```

	and then querying the available articles: `select * from Article;`.

### Testing

The test suite can be launched with `npm test`.

### Linting with eslint

The server is configured with the aggressive AirBnB eslint rules. These rules
were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
```

and `.eslintrc.json` configured with:

```
{
  "extends": "airbnb-base",
	"env": {
		"jest": true
	}
}
```

The linter can be run with:

```
npx eslint .
```
