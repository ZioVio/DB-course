import db from '..';
import ProductLine from '../../models/entities/productLine';
import ProductLinesFilters from '../../models/filters/productLineFilters';
import { BaseStorage } from './baseStorage';

class ProductLinesStorage extends BaseStorage {

  public get(filters: ProductLinesFilters): Promise<ProductLine[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM product_lines ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }
}

export default new ProductLinesStorage();
