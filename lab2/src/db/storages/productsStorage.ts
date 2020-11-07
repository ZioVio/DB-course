import { SQL } from 'sql-template-strings';
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

  public async generate(count: number): Promise<any> {
    const query = SQL`
    INSERT INTO products ("name", image_url, "line", "category", price)
  (SELECT
  md5(RANDOM() :: TEXT) as "name",
  md5(RANDOM() :: TEXT) as image_url,
 	(SELECT id FROM
	product_lines OFFSET
	 floor(RANDOM() * (
		SELECT COUNT(*) FROM product_lines)) LIMIT 1) as "line",
  	(SELECT id FROM
	product_categories OFFSET
	 floor(RANDOM() * (
		SELECT COUNT(*) FROM product_lines)) LIMIT 1) as "category",
  trunc((RANDOM() * 1000)) as price
  FROM
  generate_series(1, ${count}));`;
  return db.any(query.text, query.values);
  }
}

export default new ProductsStorage();
