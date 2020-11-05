import db from '../../db';
import ProductLine from '../../models/entities/productLine';
import ProductLinesFilters from '../../models/filters/productLineFilters';
import { BaseStorage } from './baseStorage';

class ProductLinesStorage extends BaseStorage {

  public get(filters: ProductLinesFilters): Promise<ProductLine[]> {
    const { sql, values } = filters.getSQLConditionsAndParameters();
    return this.db.any(`SELECT * FROM product_lines WHERE ${sql}`, values);
  }
}

export default new ProductLinesStorage(db);
