import mapper from '../../utils/mapFieldsWithOperators';
import BaseFilters from "./baseFilters";
import SQLParameters from "./sqlParameters";

export interface IProductLinesFilters {
  id?: string;
  name?: string;
}

export default class ProductLinesFilters extends BaseFilters {

  constructor(private filters: IProductLinesFilters) {
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
      fieldsWithOperators.push(['name', 'LIKE']);
      values.push('%' + filters.name + '%');
    }

    const sql: string = mapper.mapFieldsWithOperatorsToSQL(fieldsWithOperators);
    return { sql, values };
  }
}


