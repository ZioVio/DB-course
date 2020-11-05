import validators from '../utils/typeValidation';
import ProductCategoriesFilters from '../models/filters/productLineFilters';
import { IProductCategoryFilters } from '../models/filters/productCategoryFilters';
import productLinesStorage from '../db/storages/productLinesStorage';

const onGet = async (_filters: IProductCategoryFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductCategoriesFilters(_filters);
  try {
    const categories = await productLinesStorage.get(filters);
    return JSON.stringify(categories, null, 2);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const validateFilters = (filters: IProductCategoryFilters): string[] => {
  const errors: string[] = [];
  if (filters.id && !validators.isString(filters.id)) {
    errors.push('id must be a string');
  }
  if (filters.name && !validators.isString(filters.name)) {
    errors.push('name must be a string');
  }
  return errors;
};

export default {
  onGet
}
