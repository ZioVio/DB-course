import db from '../../db';
import Product from '../../models/entities/product';
import ProductFilters from '../../models/filters/productFilters';
import { BaseStorage } from './baseStorage';

class ProductsStorage extends BaseStorage {

  public get(filters: ProductFilters): Promise<Product[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM products ${sql.length ? 'WHERE' : ''} ${sql}`;
    // const query = 'SELECT * from products INNER JOIN product_lines on products.line = product_lines.id'
    return db.any(query, values);
  }

  public delete(filters: ProductFilters): Promise<Product[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `DELETE from products ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }

  public async update(where: ProductFilters, what: ProductFilters): Promise<any> {
    const { sql: whatSql, values: whatValues } = what.getSQLSettingValues();
    const { sql: whereSql, values: whereValues } = where.getSQLConditionsAndValues({ startValueIndex: whatValues.length + 1 });
    const query = `UPDATE products SET ${whatSql} WHERE ${whereSql}`;
    return db.any(query, [ ...whatValues, ...whereValues ]);
  }
}

export default new ProductsStorage();
