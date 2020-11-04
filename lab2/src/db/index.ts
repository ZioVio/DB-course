import dbConfig from '../config/db';
import pgp from 'pg-promise';
const db = pgp()(dbConfig);

export default db;
