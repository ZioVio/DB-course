import db from '..';
import ProductLine from '../../models/productLine';
import ProductLinesFilters from '../../models/filters/productLineFilters';
import BaseStorage from './baseStorage';

class ProductLinesStorage extends BaseStorage {


  // public async delete(filters: ProductLinesFilters): Promise<any> {
  //   const { sql, values } = filters.getSQLConditionsAndValues();
  //   const query = `DELETE from product_lines ${sql.length ? 'WHERE' : ''} ${sql}`;
  //   return db.any(query, values);
  // }

  // public async update(where: ProductLinesFilters, what: ProductLinesFilters): Promise<any> {
  //   const { sql: whatSql, values: whatValues } = what.getSQLSettingValues();
  //   const { sql: whereSql, values: whereValues } = where.getSQLConditionsAndValues({ startValueIndex: whatValues.length + 1 });
  //   const query = `UPDATE product_lines SET ${whatSql} WHERE ${whereSql}`;
  //   return db.any(query, [ ...whatValues, ...whereValues ]);
  // }
}

export default new ProductLinesStorage(ProductLine);
