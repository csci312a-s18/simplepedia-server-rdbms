module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './simplepedia-test.db',
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/test',
    },
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './simplepedia.db',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
  },
};
