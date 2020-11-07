import validators from '../utils/typeValidation';
import ProductCategoriesFilters from '../models/filters/productCategoryFilters';
import { IProductCategoryFilters } from '../models/filters/productCategoryFilters';
import productLinesStorage from '../db/storages/productLinesStorage';
import productCategoriesStorage from '../db/storages/productCategoriesStorage';

const onGet = async (_filters: IProductCategoryFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductCategoriesFilters(_filters);
  try {
    const categories = await productCategoriesStorage.get(filters);
    return JSON.stringify(categories, null, 2);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};


const onDelete = async (_filters: IProductCategoryFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductCategoriesFilters(_filters);
  if (filters.isEmpty()) {
    return 'Cannot delete without filters';
  }
  try {
    await productCategoriesStorage.delete(filters);
    return 'Successfully deleted';
  } catch (err) {
    return err.message;
  }
};

const onUpdate = async (id: string, updateFields: IProductCategoryFilters): Promise<string> => {
  const validationErrors = validateFilters(updateFields);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  delete updateFields['_'];
  const filters = new ProductCategoriesFilters(updateFields);
  if (filters.isEmpty()) {
    return 'Cannot update without filters';
  }
  try {
    const idFilter = new ProductCategoriesFilters({ id });
    await productCategoriesStorage.update(idFilter, filters);
    return 'Successfully update';
  } catch (err) {
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
  onGet, onDelete, onUpdate
}
