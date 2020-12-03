import db from '../../db';
import ProductCategory from '../../models/productCategory';
import ProductCategoryFilters from '../../models/filters/productCategoryFilters';
import BaseStorage from './baseStorage';

class ProductCategoriesStorage extends BaseStorage {

  // public async delete(filters: ProductCategoryFilters): Promise<any> {
  //   const { sql, values } = filters.getSQLConditionsAndValues();
  //   const query = `DELETE from product_categories ${sql.length ? 'WHERE' : ''} ${sql}`;
  //   return db.any(query, values);
  // }

  // public async update(where: ProductCategoryFilters, what: ProductCategoryFilters): Promise<any> {
  //   const { sql: whatSql, values: whatValues } = what.getSQLSettingValues();
  //   const { sql: whereSql, values: whereValues } = where.getSQLConditionsAndValues({ startValueIndex: whatValues.length + 1 });
  //   const query = `UPDATE product_categories SET ${whatSql} WHERE ${whereSql}`;
  //   return db.any(query, [ ...whatValues, ...whereValues ]);
  // }
}

export default new ProductCategoriesStorage(ProductCategory);
