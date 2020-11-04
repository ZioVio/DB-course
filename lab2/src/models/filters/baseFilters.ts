import SQLParameters from "./sqlParameters";

export interface IFilters {
}

export default abstract class BaseFilters {
  abstract getSQLConditionsAndParameters(): SQLParameters;
}
