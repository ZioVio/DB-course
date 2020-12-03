import { Op, WhereOptions, WhereValue } from 'sequelize';
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
  constructor(public filters: IProductFilters) {
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

  toWhereOptions(): WhereOptions<any> {
    const filters = this.filters;
    const opts: WhereOptions<any> = {};

    if (filters.id != null) {
      opts.id = {
        [Op.eq]: filters.id,
      };
    }
    if (filters.name != null) {
      opts.name = {
        [Op.like]: `%${filters.name}%`,
      };
    }
    if (filters.category != null) {
      opts.category = {
        [Op.eq]: filters.category,
      };
    }
    if (filters.line != null) {
      opts.line = {
        [Op.eq]: filters.line,
      };
    }

    const priceWhereOption: WhereValue = {};
    if (filters.priceTo != null) {
      priceWhereOption[Op.lte] = filters.priceTo;
    }
    if (filters.priceFrom != null) {
      priceWhereOption[Op.gte] = filters.priceFrom;
    }
    if (filters.priceTo != null || filters.priceFrom != null) {
      opts.price = priceWhereOption;
    }

    return opts;
  }
}
