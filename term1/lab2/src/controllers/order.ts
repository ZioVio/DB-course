import OrderFilters, { IOrderFilters } from './../models/filters/orderFilters';
import validators from '../utils/typeValidation';
import ordersStorage from '../db/storages/ordersStorage';
import Order from '../models/entities/order';

const onGet = async (_filters: IOrderFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new OrderFilters(_filters);
  try {
    const orders = await ordersStorage.get(filters);
    return JSON.stringify(orders, null, 2);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const onDelete = async (_filters: IOrderFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new OrderFilters(_filters);
  if (filters.isEmpty()) {
    return 'Cannot delete without filters';
  }
  try {
    await ordersStorage.delete(filters);
    return 'Successfully deleted';
  } catch (err) {
    return err.message;
  }
};

const onUpdate = async (id: string, updateFields: IOrderFilters): Promise<string> => {
  const validationErrors = validateFilters(updateFields);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  delete updateFields['_'];
  const filters = new OrderFilters(updateFields);
  if (filters.isEmpty()) {
    return 'Cannot update without filters';
  }
  try {
    const idFilter = new OrderFilters({ id });
    await ordersStorage.update(idFilter, filters);
    return 'Successfully update';
  } catch (err) {
    return err.message;
  }
};



const validateFilters = (filters: IOrderFilters): string[] => {
  const errors: string[] = [];
  if (filters.id && !validators.isUUIDV4(filters.id)) {
    errors.push('id must be UUIDV4');
  }
  if (filters.totalPriceFrom && !validators.isNumber(filters.totalPriceFrom)) {
    errors.push('totalPriceFrom must be a string');
  }
  if (filters.totalPriceTo && !validators.isNumber(filters.totalPriceTo)) {
    errors.push('totalPriceTo must be a string');
  }
  if (filters.comment && !validators.isString(filters.comment)) {
    errors.push('comment must be a string');
  }
  return errors;
};

export default {
  onGet, onDelete, onUpdate
}
