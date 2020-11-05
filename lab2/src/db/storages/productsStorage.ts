import db from '../../db';
import Product from '../../models/entities/product';
import ProductFilters from '../../models/filters/productFilters';
import { BaseStorage } from './baseStorage';

class ProductsStorage extends BaseStorage {

  public get(filters: ProductFilters): Promise<Product[]> {
    const { sql, values } = filters.getSQLConditionsAndParameters();
    return this.db.any(`SELECT * FROM products WHERE ${sql}`, values);
  }
}

export default new ProductsStorage(db);
