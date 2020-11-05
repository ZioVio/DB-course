import db from '../../db';
import User from '../../models/entities/user';
import UserFilters from '../../models/filters/userFilters';
import { BaseStorage } from './baseStorage';

class UsersStorage extends BaseStorage {

  public get(filters: UserFilters): Promise<User[]> {
    const { sql, values } = filters.getSQLConditionsAndParameters();
    return this.db.any(`SELECT * FROM users WHERE ${sql}`, values);
  }
}

export default new UsersStorage(db);
