import OrderFilters, { IOrderFilters } from './../models/filters/orderFilters';
import validators from '../utils/typeValidation';
import ordersStorage from '../db/storages/ordersStorage';

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

const validateFilters = (filters: IOrderFilters): string[] => {
  const errors: string[] = [];
  if (filters.id && !validators.isString(filters.id)) {
    errors.push('id must be a string');
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
  onGet
}
