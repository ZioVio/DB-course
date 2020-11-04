import pgp from 'pg-promise';
import * as pg from 'pg';

type DbType = pgp.IDatabase<{}, pg.IClient>;

export class BaseStorage {
  constructor(protected db: DbType) {
  }
}
