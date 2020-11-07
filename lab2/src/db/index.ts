import dbConfig from '../config/db';
import pgp from 'pg-promise';
const db = pgp()(dbConfig);

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
