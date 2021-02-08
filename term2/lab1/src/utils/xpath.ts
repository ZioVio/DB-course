import xpath from 'xpath';

export const selectHTML = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});
export const selectXML = (expr: string, doc: Document) => xpath.select(expr, doc);
