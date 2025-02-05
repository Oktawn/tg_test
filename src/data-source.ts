import { DataSource } from "typeorm";
import "reflect-metadata";
import { configDotenv } from "dotenv";
import { UsersEntity } from "./entity/Users.entity";

configDotenv({ path: "./pg.env" });
export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_EXTERN),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UsersEntity],
})

