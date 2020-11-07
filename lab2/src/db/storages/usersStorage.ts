import db from '../../db';
import User from '../../models/entities/user';
import UserFilters from '../../models/filters/userFilters';
import { BaseStorage } from './baseStorage';

class UsersStorage extends BaseStorage {

  public get(filters: UserFilters): Promise<User[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM users ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }

  public async delete(filters: UserFilters): Promise<any> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `DELETE from users ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }

  public async update(where: UserFilters, what: UserFilters): Promise<any> {
    const { sql: whatSql, values: whatValues } = what.getSQLSettingValues();
    const { sql: whereSql, values: whereValues } = where.getSQLConditionsAndValues({ startValueIndex: whatValues.length + 1 });
    const query = `UPDATE users SET ${whatSql} WHERE ${whereSql}`;
    return db.any(query, [ ...whatValues, ...whereValues ]);
  }
}

export default new UsersStorage();
