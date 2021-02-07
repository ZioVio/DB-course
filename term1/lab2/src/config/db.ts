const user = 'postgres';
const password = 'postgres';
const host = 'localhost';
const port = 5432;
const database = 'shop';

const config = {
  host,
  port,
  user,
  password,
  database,
}

export default config;

export const databaseURL = `postgres:${user}:${password}@${host}:${port}/${database}`;
