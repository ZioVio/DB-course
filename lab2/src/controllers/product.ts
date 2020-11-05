import ProductFilters, { IProductFilters } from './../models/filters/productFilters';
import validators from '../utils/typeValidation';
import productsStorage from '../db/storages/productsStorage';

const onGet = async (_filters: IProductFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductFilters(_filters);
  try {
    const products = await productsStorage.get(filters);
    return JSON.stringify(products, null, 2);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const validateFilters = (filters: IProductFilters): string[] => {
  const errors: string[] = [];
  if (filters.id && !validators.isString(filters.id)) {
    errors.push('id must be a string');
  }
  if (filters.category && !validators.isString(filters.category)) {
    errors.push('category must be a string');
  }
  if (filters.line && !validators.isString(filters.line)) {
    errors.push('line must be a string');
  }
  if (filters.name && !validators.isString(filters.name)) {
    errors.push('name must be a string');
  }
  if (filters.priceFrom && !validators.isNumber(filters.priceFrom)) {
    errors.push('priceFrom must be a number');
  }
  if (filters.priceTo && !validators.isNumber(filters.priceTo)) {
    errors.push('priceTo must be a number');
  }
  return errors;
};

export default {
  onGet
}
