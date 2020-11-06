import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters, { IFilters, SQLConditionsParams } from "./baseFilters";
import { areFiltersEmpty } from './baseFilters';
import SQLParameters from "./sqlParameters";


export interface IProductFilters {
  id?: string;
  name?: string;
  category?: string;
  line?: string;
  price?: number;
  priceFrom?: number;
  priceTo?: number;
}


export default class ProductFilters extends BaseFilters {
  constructor(private filters: IProductFilters) {
    super();
  }

  isEmpty(): boolean {
    return areFiltersEmpty(this.filters);
  }

  getSQLConditionsAndValues({ startValueIndex = 1, separator = ' AND ' } = {}): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string, string? ][] = [];
    const values: any[] = [];
    if (filters.id != null) {
      fieldsWithOperators.push(['id', '=']);
      values.push(filters.id);
    }
    if (filters.name != null) {
      fieldsWithOperators.push(['name', 'LIKE']);
      values.push('%' + filters.name + '%');
    }
    if (filters.category != null) {
      fieldsWithOperators.push(['category', '=']);
      values.push(filters.category);
    }
    if (filters.line != null) {
      fieldsWithOperators.push(['line', '=']);
      values.push(filters.line);
    }
    if (filters.priceFrom != null) {
      fieldsWithOperators.push(['price', '>=']);
      values.push(filters.priceFrom);
    }
    if (filters.priceTo != null) {
      fieldsWithOperators.push(['price', '<=']);
      values.push(filters.priceTo);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators, startValueIndex, separator);
    return { sql, values };
  }

  getSQLSettingValues({ startValueIndex = 1, separator = ' , ' } = {}): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string, string? ][] = [];
    const values: any[] = [];
    if (filters.name != null) {
      fieldsWithOperators.push(['name', '=']);
      values.push(filters.name);
    }
    if (filters.category != null) {
      fieldsWithOperators.push(['category', '=']);
      values.push(filters.category);
    }
    if (filters.line != null) {
      fieldsWithOperators.push(['line', '=']);
      values.push(filters.line);
    }
    if (filters.price != null) {
      fieldsWithOperators.push(['price', '=']);
      values.push(filters.priceFrom);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators, startValueIndex, separator);
    return { sql, values };
  }
}
