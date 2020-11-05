import db from '../../db';
import Product from '../../models/entities/product';
import ProductFilters from '../../models/filters/productFilters';
import { BaseStorage } from './baseStorage';

class ProductsStorage extends BaseStorage {

  public get(filters: ProductFilters): Promise<Product[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM products ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }
}

export default new ProductsStorage();
