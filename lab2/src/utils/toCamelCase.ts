const toCamelCase = (s: string): string => {
  if (!s) {
    return s;
  }
  return [...s].map((char, index)=> {
    if (s[index - 1] === '_') {
      return char.toUpperCase();
    }
    return char;
  }).join('').replace('_', '');
}

export default toCamelCase;
