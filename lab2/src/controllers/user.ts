import UserFilters, { IUserFilters } from './../models/filters/userFilters';
import validators from '../utils/typeValidation';
import usersStorage from '../db/storages/usersStorage';

const onGet = async (_filters: IUserFilters): Promise<string> => {
  const validationErrors = validateFilters(_filters);
  if (validationErrors.length) {
    return validationErrors.join('\n');
  }
  const filters = new UserFilters(_filters);
  try {
    const users = await usersStorage.get(filters);
    return JSON.stringify(users, null, 2);
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

const validateFilters = (filters: IUserFilters): string[] => {
  const errors: string[] = [];
  if (filters.email && !validators.isString(filters.email)) {
    errors.push('Email must be a string');
  }
  if (filters.firstName && !validators.isString(filters.firstName)) {
    errors.push('firstName must be a string');
  }
  if (filters.lastName && !validators.isString(filters.lastName)) {
    errors.push('lastName must be a string');
  }
  if (filters.phoneNumber && !validators.isNumber(filters.phoneNumber)) {
    errors.push('phoneNumber must be a string');
  }
  if (filters.id && !validators.isString(filters.id)) {
    errors.push('id must be a string');
  }
  return errors;
};

export default {
  onGet
}
