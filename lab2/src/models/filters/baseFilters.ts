import SQLParameters from "./sqlParameters";

export interface IFilters {
}

export interface SQLConditionsParams {
  startValueIndex: number;
  separator: string;
}

export default abstract class BaseFilters {
  abstract getSQLConditionsAndValues(opts: SQLConditionsParams): SQLParameters;
  abstract getSQLSettingValues(opts: SQLConditionsParams): SQLParameters;
  abstract isEmpty(): boolean;
}


export const areFiltersEmpty = (filters) => {
  console.log(filters);
  return !Object.keys(filters).length ||
            !filters ||
            filters['length'] === 0;
}
