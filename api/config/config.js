module.exports = {
  development: {
    username: 'admin',
    password: 'password1',
    database: 'test-server',
    host: 'db',
    dialect: 'postgres',
  },
  'development-local': {
    username: 'admin',
    password: 'password1',
    database: 'test-server',
    host: 'db.dev.localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_URL,
    dialect: 'postgres',
  },
};
