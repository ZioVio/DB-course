const isString = (s: string) => typeof s === 'string';
const isNumber = (n: number) => typeof n === 'number';
const isUUIDV4 = (s: string) =>
  /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i.test(s);

export default {
  isString, isNumber, isUUIDV4
}
