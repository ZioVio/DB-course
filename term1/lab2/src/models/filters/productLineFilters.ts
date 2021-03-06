import { Op, WhereOptions } from 'sequelize';
import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters, { SQLConditionsParams } from "./baseFilters";
import { areFiltersEmpty } from './baseFilters';
import SQLParameters from "./sqlParameters";

export interface IProductLinesFilters {
  id?: string;
  name?: string;
}

export default class ProductLinesFilters extends BaseFilters {

  constructor(public filters: IProductLinesFilters) {
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
      fieldsWithOperators.push(['id', '==']);
      values.push(filters.id);
    }
    if (filters.name != null) {
      fieldsWithOperators.push(['name', 'LIKE']);
      values.push('%' + filters.name + '%');
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

    return opts;
  }
}


