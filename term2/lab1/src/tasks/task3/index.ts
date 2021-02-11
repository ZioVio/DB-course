import fsPromise from 'fs/promises';
import { PRODUCTS_TO_SCRAP_COUNT } from './config';
import { getProducts } from './get-products';
import { HTMLToXMLDocument } from './../../utils/html-to-xml-document';
import { getHtml } from "../../utils/html-fetcher"
import { productsToXML } from './products-to-xml';
import config from '../../config';

/**
 * returns XML
 */
export const run = async (url: string): Promise<string> => {
  const html = await getHtml(url);
  const doc = HTMLToXMLDocument(html);
  const products = getProducts(doc, PRODUCTS_TO_SCRAP_COUNT);
  const xml = productsToXML(products);
  await fsPromise.writeFile(config.TASK3_FILE_NAME, xml);
  return xml;
}
