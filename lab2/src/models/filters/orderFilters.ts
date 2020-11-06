import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters, { areFiltersEmpty, IFilters } from "./baseFilters";
import SQLParameters from "./sqlParameters";

export interface IOrderFilters extends IFilters {
  id?: string;
  userId?: string;
  totalPriceFrom?: number;
  totalPriceTo?: number;
  // used only in updating
  totalPrice?: number;
  comment?: string;
}

export default class OrderFilters extends BaseFilters {

  constructor(private filters: IOrderFilters) {
    super();
  }

  isEmpty(): boolean {
    return areFiltersEmpty(this.filters);
  }

  getSQLConditionsAndValues({ startValueIndex = 1, separator = ' AND ' } = {}): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string ][] = [];
    const values: any[] = [];
    if (filters.id != null) {
      fieldsWithOperators.push(['id', '=']);
      values.push(filters.id);
    }
    if (filters.userId != null) {
      fieldsWithOperators.push(['user_id', '=']);
      values.push(filters.userId);
    }
    if (filters.comment != null) {
      fieldsWithOperators.push(['comment', 'LIKE']);
      values.push('%' + filters.comment + '%');
    }
    if (filters.totalPriceFrom != null) {
      fieldsWithOperators.push(['total_price', '>=']);
      values.push(filters.totalPriceFrom);
    }
    if (filters.totalPriceTo != null) {
      fieldsWithOperators.push(['total_price', '<=']);
      values.push(filters.totalPriceTo);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators, startValueIndex, separator);
    return { sql, values };
  }

  getSQLSettingValues({ startValueIndex = 1, separator = ' , ' } = {}): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string ][] = [];
    const values: any[] = [];

    if (filters.userId != null) {
      fieldsWithOperators.push(['user_id', '=']);
      values.push(filters.userId);
    }
    if (filters.comment != null) {
      fieldsWithOperators.push(['comment', '=']);
      values.push(filters.comment);
    }
    if (filters.totalPrice != null) {
      fieldsWithOperators.push(['total_price', '=']);
      values.push(filters.totalPriceFrom);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators, startValueIndex, separator);
    return { sql, values };
  }
}
