import dbConfig, { databaseURL } from '../config/db';
import pgp from 'pg-promise';
import { Sequelize } from 'sequelize';
const db = pgp()(dbConfig);

export const sequelize = new Sequelize(databaseURL, {
  dialect: 'postgres',
});

export default {
  ...db,
  any: async (query: pgp.QueryParam, values: any[]): Promise<any> => {
    const before = Date.now();
    const result = await db.any(query, values);
    const after = Date.now();
    console.log(`Request time: ${after - before}ms`);
    return result;
  }
};
