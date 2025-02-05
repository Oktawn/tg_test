import { configDotenv } from "dotenv";
import type { Knex } from "knex";
configDotenv({ path: "./pg.env" });

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_EXTERN),
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  }

};

module.exports = config;
