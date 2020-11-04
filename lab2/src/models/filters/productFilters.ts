import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters, { IFilters } from "./baseFilters";
import SQLParameters from "./sqlParameters";


interface IProductFilters {
  id?: string;
  name?: string;
  category?: string;
  line?: string;
  priceFrom?: number;
  priceTo?: number;
}


export default class ProductFilters extends BaseFilters {

  constructor(private filters: IProductFilters) {
    super();
  }

  getSQLConditionsAndParameters(): SQLParameters {
    const filters = this.filters;
    const fieldsWithOperators: [ string, string, string? ][] = [];
    const values: any[] = [];
    if (filters.id != null) {
      fieldsWithOperators.push(['id', '==']);
      values.push(filters.id);
    }
    if (filters.name != null) {
      fieldsWithOperators.push(['name', 'LIKE', '%{}%']);
      values.push(filters.name);
    }
    if (filters.category != null) {
      fieldsWithOperators.push(['category', '==']);
      values.push(filters.category);
    }
    if (filters.line != null) {
      fieldsWithOperators.push(['line', '==']);
      values.push(filters.line);
    }
    if (filters.priceFrom != null) {
      fieldsWithOperators.push(['total_price', '>=']);
      values.push(filters.priceFrom);
    }
    if (filters.priceTo != null) {
      fieldsWithOperators.push(['total_price', '<=']);
      values.push(filters.priceTo);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators);
    return { sql, values };
  }
}
