import db from '../../db';
import ProductCategory from '../../models/entities/productCategory';
import ProductCategoryFilters from '../../models/filters/productCategoryFilters';
import { BaseStorage } from './baseStorage';

class ProductCategoriesStorage extends BaseStorage {

  public get(filters: ProductCategoryFilters): Promise<ProductCategory[]> {
    const { sql, values } = filters.getSQLConditionsAndValues();
    const query = `SELECT * FROM product_categories ${sql.length ? 'WHERE' : ''} ${sql}`;
    return db.any(query, values);
  }
}

export default new ProductCategoriesStorage();
