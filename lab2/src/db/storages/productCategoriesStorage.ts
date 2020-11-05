import db from '../../db';
import ProductCategory from '../../models/entities/productCategory';
import ProductCategoryFilters from '../../models/filters/productCategoryFilters';
import { BaseStorage } from './baseStorage';

class ProductCategoriesStorage extends BaseStorage {

  public get(filters: ProductCategoryFilters): Promise<ProductCategory[]> {
    const { sql, values } = filters.getSQLConditionsAndParameters();
    return this.db.any(`SELECT * FROM product_categories WHERE ${sql}`, values);
  }
}

export default new ProductCategoriesStorage(db);
