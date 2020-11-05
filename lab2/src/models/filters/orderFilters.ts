import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters, { IFilters } from "./baseFilters";
import SQLParameters from "./sqlParameters";

export interface IOrderFilters extends IFilters {
  id?: string;
  userId?: string;
  totalPriceFrom?: number;
  totalPriceTo?: number;
  comment?: string;
}

export default class OrderFilters extends BaseFilters {

  constructor(private filters: IOrderFilters) {
    super();
  }

  getSQLConditionsAndValues(): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string, string? ][] = [];
    const values: any[] = [];
    if (filters.id != null) {
      fieldsWithOperators.push(['id', '==']);
      values.push(filters.id);
    }
    if (filters.userId != null) {
      fieldsWithOperators.push(['user_id', '==']);
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

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators);
    return { sql, values };
  }
}
