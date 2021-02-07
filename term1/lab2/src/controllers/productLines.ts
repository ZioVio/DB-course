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

const onDelete = async (_filters: IProductLinesFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new ProductLinesFilters(_filters);
  if (filters.isEmpty()) {
    return 'Cannot delete without filters';
  }
  try {
    await productLinesStorage.delete(filters);
    return 'Successfully deleted';
  } catch (err) {
    return err.message;
  }
};

const onUpdate = async (id: string, updateFields: IProductLinesFilters): Promise<string> => {
  const validationErrors = validateFilters(updateFields);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  delete updateFields['_'];
  const filters = new ProductLinesFilters(updateFields);
  if (filters.isEmpty()) {
    return 'Cannot update without filters';
  }
  try {
    const idFilter = new ProductLinesFilters({ id });
    await productLinesStorage.update(idFilter, filters);
    return 'Successfully update';
  } catch (err) {
    return err.message;
  }
};

const validateFilters = (filters: IProductLinesFilters): string[] => {
  const errors: string[] = [];
  if (filters.id && !validators.isUUIDV4(filters.id)) {
    errors.push('id must be UUIDV4');
  }
  if (filters.name && !validators.isString(filters.name)) {
    errors.push('name must be a string');
  }
  return errors;
};

export default {
  onGet, onDelete, onUpdate
}
