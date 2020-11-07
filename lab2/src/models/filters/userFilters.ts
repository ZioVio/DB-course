import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters, { IFilters, SQLConditionsParams } from "./baseFilters";
import SQLParameters from './sqlParameters';
import { areFiltersEmpty } from './baseFilters';


export interface IUserFilters {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
}


export default class UserFilters extends BaseFilters {
  constructor(private filters: IUserFilters) {
    super();
  }

  isEmpty(): boolean {
    return areFiltersEmpty(this.filters);
  }

  public getSQLConditionsAndValues({ startValueIndex = 1, separator = ' AND ' } = {}): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string, string? ][] = [];
    const values: any[] = [];
    if (filters.id != null) {
      fieldsWithOperators.push(['id', '=']);
      values.push(filters.id);
    }
    if (filters.firstName != null) {
      fieldsWithOperators.push(['first_name', 'LIKE']);
      values.push('%' + filters.firstName + '%');
    }
    if (filters.lastName != null) {
      fieldsWithOperators.push(['last_name', 'LIKE']);
      values.push('%' + filters.lastName + '%');
    }
    if (filters.email != null) {
      fieldsWithOperators.push(['email', 'LIKE']);
      values.push('%' + filters.email + '%');
    }
    if (filters.phoneNumber != null) {
      fieldsWithOperators.push(['phone_number', '=']);
      values.push(filters.phoneNumber);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators, startValueIndex, separator);
    return { sql, values };
  }

  getSQLSettingValues({ startValueIndex = 1, separator = ' , ' } = {}): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string, string? ][] = [];
    const values: any[] = [];
    if (filters.firstName != null) {
      fieldsWithOperators.push(['first_name', '=']);
      values.push(filters.firstName);
    }
    if (filters.lastName != null) {
      fieldsWithOperators.push(['last_name', '=']);
      values.push(filters.lastName);
    }
    if (filters.email != null) {
      fieldsWithOperators.push(['email', '=']);
      values.push(filters.email);
    }
    if (filters.phoneNumber != null) {
      fieldsWithOperators.push(['phone_number', '=']);
      values.push(filters.phoneNumber);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators, startValueIndex, separator);
    return { sql, values };
  }
}
