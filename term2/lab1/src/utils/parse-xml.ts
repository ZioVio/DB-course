
import xmldom from 'xmldom';

const parser = new xmldom.DOMParser();

export const parseXML = (xml: string): Document => {
  return parser.parseFromString(xml);
}
