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

const onDelete = async (_filters: IProductFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductFilters(_filters);
  if (filters.isEmpty()) {
    return 'Cannot delete without filters';
  }
  try {
    await productsStorage.delete(filters);
    return 'Successfully deleted';
  } catch (err) {
    return err.message;
  }
};

const onUpdate = async (id: string, updateFields: IProductFilters): Promise<string> => {
  const validationErrors = validateFilters(updateFields);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  delete updateFields['_'];
  const filters = new ProductFilters(updateFields);
  if (filters.isEmpty()) {
    return 'Cannot update without filters';
  }
  try {
    const idFilter = new ProductFilters({ id });
    await productsStorage.update(idFilter, filters);
    return 'Successfully update';
  } catch (err) {
    return err.message;
  }
};

const onGenerate = async (count) => {
  count = parseInt(count);
  if (isNaN(count) || count < 0) {
    return console.log('Count should be a number and more than 0');
  }
  try {
    await productsStorage.generate(count);
    return `Successfully generated ${count} products`;
  } catch (err) {
    return err.message;
  }
}

const validateFilters = (filters: IProductFilters): string[] => {
  const errors: string[] = [];
  if (filters.id && !validators.isUUIDV4(filters.id)) {
    errors.push('id must be UUIDV4');
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
  if (filters.price && !validators.isNumber(filters.price)) {
    errors.push('price must be a number');
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
  onGet, onDelete, onUpdate, onGenerate
}
