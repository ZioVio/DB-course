import db from '../../db';
import User from '../../models/entities/user';
import UserFilters from '../../models/filters/userFilters';
import { BaseStorage } from './baseStorage';

class UsersStorage extends BaseStorage {

  public get(filters: UserFilters): Promise<User[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM users ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values)
  }
}

export default new UsersStorage();
