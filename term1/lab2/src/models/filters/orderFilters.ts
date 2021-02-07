import { Op, WhereOptions, WhereValue } from 'sequelize';
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

  constructor(public filters: IOrderFilters) {
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

  toWhereOptions(): WhereOptions<any> {
    const filters = this.filters;
    const opts: WhereOptions<any> = {};
    if (filters.id != null) {
      opts.id = {
        [Op.eq]: filters.id,
      };
    }
    if (filters.userId != null) {
      opts.user_id = {
        [Op.eq]: filters.userId,
      };
    }
    if (filters.comment != null) {
      opts.comment = {
        [Op.like]: `%${filters.comment}%`,
      };
    }
    const priceWhereOption: WhereValue = {};
    if (filters.totalPriceFrom != null) {
      priceWhereOption[Op.gte] = filters.totalPriceFrom;
    }
    if (filters.totalPriceTo != null) {
      priceWhereOption[Op.lte] = filters.totalPriceTo;
    }
    if (filters.totalPriceTo != null || filters.totalPriceFrom != null) {
      opts.total_price = priceWhereOption;
    }

    return opts;
  }
}
