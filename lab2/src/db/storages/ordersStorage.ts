import Order from '../../models/entities/order';
import OrderFilters from '../../models/filters/orderFilters';
import db from '../index';
import { BaseStorage } from './baseStorage';

class OrdersStorage extends BaseStorage {
  public async get(filters: OrderFilters): Promise<Order[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM orders ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values)
  }
}

export default new OrdersStorage();
