import Order from '../../models/entities/order';
import OrderFilters from '../../models/filters/orderFilters';
import db from '../index';
import { BaseStorage } from './baseStorage';

class OrdersStorage extends BaseStorage {
  public async get(filters: OrderFilters): Promise<Order[]> {
    const { sql, values } = filters.getSQLConditionsAndParameters();
    return this.db.any(`SELECT * FROM orders WHERE ${sql}`, values);
  }

  // public update(filters: OrderFilters, order: Order): Promise<Order> {
  //   return this.db.any()
  // }
}

export default new OrdersStorage(db);
