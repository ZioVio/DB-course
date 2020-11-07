import SQL from 'sql-template-strings';
import Order from '../../models/entities/order';
import OrderFilters from '../../models/filters/orderFilters';
import db from '../index';
import { BaseStorage } from './baseStorage';

class OrdersStorage extends BaseStorage {
  public async get(filters: OrderFilters): Promise<Order[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM orders ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }

  public async delete(filters: OrderFilters): Promise<any> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `DELETE from orders ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }

  public async update(where: OrderFilters, what: OrderFilters): Promise<any> {
    const { sql: whatSql, values: whatValues } = what.getSQLSettingValues();
    const { sql: whereSql, values: whereValues } = where.getSQLConditionsAndValues({ startValueIndex: whatValues.length + 1 });
    const query = `UPDATE orders SET ${whatSql} WHERE ${whereSql}`;
    return db.any(query, [ ...whatValues, ...whereValues ]);
  }

}

export default new OrdersStorage();
