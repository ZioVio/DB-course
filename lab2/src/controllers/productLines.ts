import { IProductLinesFilters } from './../models/filters/productLineFilters';
import validators from '../utils/typeValidation';
import ProductLinesFilters from '../models/filters/productLineFilters';
import productLinesStorage from '../db/storages/productLinesStorage';

const onGet = async (_filters: IProductLinesFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductLinesFilters(_filters);
  try {
    const lines = await productLinesStorage.get(filters);
    return JSON.stringify(lines, null, 2);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const validateFilters = (filters: IProductLinesFilters): string[] => {
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
