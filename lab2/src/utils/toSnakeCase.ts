import isUpperCase from "./isUpperCase";

const toSnakeCase = (s: string): string => {
  return [...s]
        .map(char => isUpperCase(char) ? `_${char.toLowerCase()}` : char)
        .join('');
}

export default toSnakeCase;
