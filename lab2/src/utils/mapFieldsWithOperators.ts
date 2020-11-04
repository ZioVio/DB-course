import toCamelCase from "./toCamelCase";

const mapFieldsWithOperatorsToSQL =
  (fields: [string, string, string?][]): string => {

    return fields.map(([field, op, valTemplate], index) => {
      const currTemplate: string = '$' + (index + 1);
      const replacedValueTemplate = valTemplate?.replace('{}', currTemplate);
      return `${field} ${op} ${replacedValueTemplate || currTemplate}`;
    }).join(' AND ');

}

export default {
  mapFieldsWithOperatorsToSQL,
};
