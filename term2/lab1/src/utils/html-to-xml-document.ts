import parse5 from 'parse5';
import xmlser from 'xmlserializer';
import { DOMParser } from 'xmldom';

export const HTMLToXMLDocument = (html: string): Document => {
  const document = parse5.parse(html.toString());
  const xhtml = xmlser.serializeToString(document);
  const doc = new DOMParser().parseFromString(xhtml);
  return doc;
}
