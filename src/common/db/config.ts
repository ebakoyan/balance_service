import { Options } from 'sequelize';

export const development: Options = {
  dialect: 'postgres',
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: Number.parseInt(process.env.PG_PORT!),
};

console.log({ development });
