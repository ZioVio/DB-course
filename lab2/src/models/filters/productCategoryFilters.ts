import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters from "./baseFilters";
import SQLParameters from "./sqlParameters";

export interface IProductCategoryFilters {
  id?: string;
  name?: string;
}

export default class ProductCategoryFilters extends BaseFilters {

  constructor(private filters: IProductCategoryFilters) {
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
    if (filters.name != null) {
      fieldsWithOperators.push(['name', 'LIKE', '%{}%']);
      values.push(filters.name);
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators);
    return { sql, values };
  }
}


