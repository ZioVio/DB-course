import toCamelCase from "./toCamelCase";

const mapFieldsWithOperatorsToSQL =
  (fields: [string, string, string?][], startValueIndex: number = 1, separator = ' AND '): string => {

    return fields.map(([field, op, valTemplate], index) => {
      const currTemplate: string = '$' + (index + startValueIndex);
      const replacedValueTemplate = valTemplate?.replace('{}', currTemplate);
      return `${field} ${op} ${replacedValueTemplate || currTemplate}`;
    }).join(separator);

}

export default {
  mapFieldsWithOperatorsToSQL,
};
