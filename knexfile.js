// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./app/database/migrations"
    }, 
    seeds: {
      tableName: 'knex_seeds',
      directory: "./app/database/seeds"
    }, 
  },

  metadataholder: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST_2,
      user : process.env.DB_USER_2,
      password : process.env.DB_PASSWORD_2,
      database : process.env.DB_DATABASE_2
    },   
  },
 

  dsqlite: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
